/// <reference types="@cloudflare/workers-types" />

// Content negotiation for AI agents: a request for a normal docs URL with
// `Accept: text/markdown` gets that page's Markdown sibling instead of HTML,
// on the same URL a person would visit. The `.md` URLs themselves (added in
// #654) keep working unchanged — this adds the "ask the canonical URL for
// Markdown" path on top, which is what agent-friendliness scanners check for.
//
// Cloudflare's dashboard-level "Markdown for Agents" (AI Crawl Control) does
// the same thing, but only for a zone on Cloudflare DNS with a Pro/Business
// plan — shorebird.dev isn't (DNS lives elsewhere, just CNAMed to Pages), so
// this reimplements the negotiation ourselves. Recipe:
// https://acceptmarkdown.com/recipes/cloudflare-workers

import { markdownSiblingPath } from '../src/utils/markdown-path';

interface Env {
  ASSETS: Fetcher;
}

// Static assets never have a Markdown or JSON sibling; skip negotiation for
// them entirely. `/.well-known/*` is skipped too: those are single-format
// discovery/config files (RFC 8615) with their own declared Content-Type —
// they don't participate in the markdown/html/json negotiation this
// middleware does for docs pages, and running them through it would 406
// a request that correctly sends that file's own declared Accept type,
// since `negotiate()` only knows about text/markdown, text/html, and
// application/json.
const SKIP_PATTERN =
  /\.(css|js|mjs|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|pdf|xml|txt|map)$/i;

interface AcceptEntry {
  type: string;
  q: number;
  specificity: 0 | 1 | 2;
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((part): AcceptEntry | null => {
      const [rawType, ...params] = part.trim().split(';');
      const type = rawType?.trim().toLowerCase();
      if (!type) return null;
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split('=').map((s) => s.trim());
        if (key === 'q' && value) q = Number.parseFloat(value) || 0;
      }
      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((entry): entry is AcceptEntry => entry !== null);
}

// Highest (q * 10 + specificity) among entries matching `target`, or -1 if
// nothing in the header would accept it. An exact-type entry with q=0 is a
// hard exclusion (RFC 9110 §12.5.1) that a less-specific wildcard can't
// override, so it's checked before falling back to wildcard matches.
function scoreFor(entries: AcceptEntry[], target: string): number {
  const exact = entries.find((e) => e.type === target);
  if (exact && exact.q === 0) return -1;

  const group = `${target.split('/')[0]}/*`;
  let best = -1;
  for (const entry of entries) {
    const matches =
      entry.type === target || entry.type === '*/*' || entry.type === group;
    if (matches && entry.q > 0)
      best = Math.max(best, entry.q * 10 + entry.specificity);
  }
  return best;
}

// Link response headers for agent discovery (RFC 8288)
const AGENT_LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/ai-catalog.json>; rel="service-desc"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/agent-instructions.txt>; rel="agent-instructions"',
  '</.well-known/agent.json>; rel="agent"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/openid-configuration>; rel="openid-configuration"',
  '</account/api/>; rel="service-doc"',
  '<https://api.shorebird.dev/openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="alternate"; type="text/plain"',
  '</opensearch.xml>; rel="search"; type="application/opensearchdescription+xml"',
  '</humans.txt>; rel="author"; type="text/plain"',
  '</.well-known/security.txt>; rel="security-policy"; type="text/plain"',
].join(', ');

// Fallback only: used if fetching the real /404.md (below) somehow fails.
const MARKDOWN_404_FALLBACK = `# 404 Not Found

The requested page does not exist on Shorebird Documentation.

See [the docs home](https://docs.shorebird.dev/) or
[the sitemap](https://docs.shorebird.dev/sitemap-index.xml).
`;

const JSON_404_BODY = JSON.stringify(
  {
    error: {
      code: 'not_found',
      message: 'The requested documentation resource does not exist.',
      status: 404,
      resolution_hints: [
        'Consult the documentation homepage at https://docs.shorebird.dev/',
        'Review curated LLM documentation at https://docs.shorebird.dev/llms.txt',
        'Explore full documentation at https://docs.shorebird.dev/llms-full.txt',
        'Inspect the REST OpenAPI 3.1 specification at https://api.shorebird.dev/openapi.json',
        'Verify endpoint connectivity at https://docs.shorebird.dev/system/endpoint-reachability/',
        'Browse the sitemap at https://docs.shorebird.dev/sitemap-index.xml',
      ],
    },
  },
  null,
  2,
);

// The build already renders a proper Markdown 404 page (via the
// [...slug].md.ts route from #654, since 404.md is a normal docs entry) —
// fetch that instead of hand-maintaining a second copy of its link list
// here, which would drift from the real page over time.
async function fetch404Markdown(assets: Fetcher, url: URL): Promise<string> {
  try {
    const response = await assets.fetch(new URL('/404.md', url).toString());
    if (response.ok) return await response.text();
  } catch {
    // fall through to the generic fallback below
  }
  return MARKDOWN_404_FALLBACK;
}

function addAgentLinkHeaders(headers: Headers, pathname: string): void {
  const parts = [
    `<${markdownSiblingPath(pathname)}>; rel="alternate"; type="text/markdown"`,
    AGENT_LINK_HEADERS,
  ];
  const linkValue = parts.join(', ');

  const existing = headers.get('Link');
  if (!existing) {
    headers.set('Link', linkValue);
  } else if (!existing.includes('api-catalog')) {
    headers.set('Link', `${existing}, ${linkValue}`);
  }
}

// Adds Accept to a response's Vary header without dropping other Vary
// dimensions the underlying asset/edge layer may have already set (e.g.
// Accept-Encoding), and without duplicating Accept if it's already there.
function addVaryAccept(headers: Headers): void {
  const existing = headers.get('Vary');
  const tokens = existing
    ? existing.split(',').map((t) => t.trim().toLowerCase())
    : [];
  if (!tokens.includes('accept')) {
    headers.set('Vary', existing ? `${existing}, Accept` : 'Accept');
  }
}

// Shared tail end of every response this middleware returns: adds the Vary
// and Link headers, and nulls the body for HEAD so a negotiated response
// doesn't send content a HEAD request didn't ask for.
function respond(
  request: Request,
  pathname: string,
  body: BodyInit | null,
  status: number,
  headers: Headers,
): Response {
  addVaryAccept(headers);
  addAgentLinkHeaders(headers, pathname);
  return new Response(request.method === 'HEAD' ? null : body, {
    status,
    headers,
  });
}

type Preference = 'markdown' | 'json' | 'html' | 'either' | 'none';

function negotiate(acceptHeader: string | null): Preference {
  if (!acceptHeader || !acceptHeader.trim()) return 'either';
  const entries = parseAccept(acceptHeader);
  if (entries.length === 0) return 'either';
  const markdown = scoreFor(entries, 'text/markdown');
  const html = scoreFor(entries, 'text/html');
  const json = scoreFor(entries, 'application/json');

  if (markdown < 0 && html < 0 && json < 0) {
    // Only 406 when the client explicitly rejected everything (an
    // unqualified `*/*;q=0`). A client that just didn't list one of our
    // three representations — e.g. a health check sending
    // `Accept: text/plain` — gets the default HTML rather than a hard
    // failure; RFC 9110 §12.5.1 permits serving a non-preferred
    // representation instead of 406 for exactly this reason.
    const rejectsEverything = entries.some(
      (e) => e.type === '*/*' && e.q === 0,
    );
    return rejectsEverything ? 'none' : 'either';
  }
  if (json > markdown && json > html) return 'json';
  if (markdown > html) return 'markdown';
  if (html > markdown) return 'html';
  return 'either';
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);

  if (
    (request.method !== 'GET' && request.method !== 'HEAD') ||
    SKIP_PATTERN.test(url.pathname) ||
    url.pathname.startsWith('/.well-known/') ||
    url.pathname.endsWith('.md')
  ) {
    return context.next();
  }

  const preference = negotiate(request.headers.get('Accept'));

  if (preference === 'none') {
    return respond(
      request,
      url.pathname,
      'Not Acceptable\n\nAvailable: text/html, text/markdown\n',
      406,
      new Headers({ 'Content-Type': 'text/plain; charset=utf-8' }),
    );
  }

  if (preference === 'markdown') {
    const markdownUrl = new URL(markdownSiblingPath(url.pathname), url);
    // Preserve the original method (GET or HEAD) rather than always issuing
    // a GET, so a HEAD probe doesn't pull down a full body it didn't ask for.
    const markdownResponse = await context.env.ASSETS.fetch(
      new Request(markdownUrl, { method: request.method }),
    );
    if (markdownResponse.ok) {
      return respond(
        request,
        url.pathname,
        markdownResponse.body,
        markdownResponse.status,
        new Headers(markdownResponse.headers),
      );
    }

    // No Markdown sibling directly for this path. Fetch the default response
    // to check whether this is a real 404 or a non-content route.
    const fallbackResponse = await context.next();
    if (fallbackResponse.status === 404) {
      const notFoundBody = await fetch404Markdown(context.env.ASSETS, url);
      return respond(
        request,
        url.pathname,
        notFoundBody,
        404,
        new Headers({ 'Content-Type': 'text/markdown; charset=utf-8' }),
      );
    }

    return respond(
      request,
      url.pathname,
      fallbackResponse.body,
      fallbackResponse.status,
      new Headers(fallbackResponse.headers),
    );
  }

  if (preference === 'json') {
    const fallbackResponse = await context.next();
    if (fallbackResponse.status === 404) {
      return respond(
        request,
        url.pathname,
        JSON_404_BODY,
        404,
        new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
      );
    }

    return respond(
      request,
      url.pathname,
      fallbackResponse.body,
      fallbackResponse.status,
      new Headers(fallbackResponse.headers),
    );
  }

  const response = await context.next();
  return respond(
    request,
    url.pathname,
    response.body,
    response.status,
    new Headers(response.headers),
  );
};
