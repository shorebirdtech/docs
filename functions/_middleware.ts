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

interface Env {
  ASSETS: Fetcher;
}

// Static assets and non-content routes never have a Markdown sibling; skip
// negotiation for them entirely.
const SKIP_PATTERN =
  /\.(css|js|mjs|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|pdf|xml|txt|map)$/i;

function markdownSiblingPath(pathname: string): string {
  const trimmed =
    pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;
  return trimmed === '/' ? '/index.md' : `${trimmed}.md`;
}

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

const MARKDOWN_404_BODY = `# 404 Not Found

The requested page does not exist on Shorebird Documentation.

## Where to look next:
- [Docs Home](https://docs.shorebird.dev/)
- [Getting Started Guide](https://docs.shorebird.dev/getting-started/)
- [Code Push Overview](https://docs.shorebird.dev/code-push/)
- [API Reference](https://docs.shorebird.dev/account/api/)
- [Endpoint Reachability](https://docs.shorebird.dev/system/endpoint-reachability/)
- [LLMs Overview (llms.txt)](https://docs.shorebird.dev/llms.txt)
- [Full Documentation (llms-full.txt)](https://docs.shorebird.dev/llms-full.txt)
- [Sitemap](https://docs.shorebird.dev/sitemap-index.xml)
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

function addAgentLinkHeaders(headers: Headers, pathname?: string): void {
  const parts: string[] = [];
  if (pathname) {
    const mdPath = markdownSiblingPath(pathname);
    parts.push(`<${mdPath}>; rel="alternate"; type="text/markdown"`);
  }
  parts.push(AGENT_LINK_HEADERS);
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

type Preference = 'markdown' | 'json' | 'html' | 'either' | 'none';

function negotiate(acceptHeader: string | null): Preference {
  if (!acceptHeader) return 'either';
  const entries = parseAccept(acceptHeader);
  const markdown = scoreFor(entries, 'text/markdown');
  const html = scoreFor(entries, 'text/html');
  const json = scoreFor(entries, 'application/json');

  if (markdown < 0 && html < 0 && json < 0) {
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
    url.pathname.endsWith('.md')
  ) {
    return context.next();
  }

  const preference = negotiate(request.headers.get('Accept'));

  if (preference === 'none') {
    return new Response('Not Acceptable', {
      status: 406,
      headers: { Vary: 'Accept' },
    });
  }

  if (preference === 'markdown') {
    const markdownUrl = new URL(markdownSiblingPath(url.pathname), url);
    // Preserve the original method (GET or HEAD) rather than always issuing
    // a GET, so a HEAD probe doesn't pull down a full body it didn't ask for.
    const markdownResponse = await context.env.ASSETS.fetch(
      new Request(markdownUrl, { method: request.method }),
    );
    if (markdownResponse.ok) {
      const headers = new Headers(markdownResponse.headers);
      addVaryAccept(headers);
      addAgentLinkHeaders(headers, url.pathname);
      return new Response(
        request.method === 'HEAD' ? null : markdownResponse.body,
        {
          status: markdownResponse.status,
          headers,
        },
      );
    }

    // No Markdown sibling directly for this path. Fetch the default response
    // to check whether this is a real 404 or a non-content route.
    const fallbackResponse = await context.next();
    if (fallbackResponse.status === 404) {
      const notFoundHeaders = new Headers();
      notFoundHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
      addVaryAccept(notFoundHeaders);
      addAgentLinkHeaders(notFoundHeaders, url.pathname);
      return new Response(
        request.method === 'HEAD' ? null : MARKDOWN_404_BODY,
        {
          status: 404,
          headers: notFoundHeaders,
        },
      );
    }

    const headers = new Headers(fallbackResponse.headers);
    addVaryAccept(headers);
    addAgentLinkHeaders(headers, url.pathname);
    return new Response(fallbackResponse.body, {
      status: fallbackResponse.status,
      headers,
    });
  }

  if (preference === 'json') {
    const fallbackResponse = await context.next();
    if (fallbackResponse.status === 404) {
      const notFoundHeaders = new Headers();
      notFoundHeaders.set('Content-Type', 'application/json; charset=utf-8');
      addVaryAccept(notFoundHeaders);
      addAgentLinkHeaders(notFoundHeaders, url.pathname);
      return new Response(request.method === 'HEAD' ? null : JSON_404_BODY, {
        status: 404,
        headers: notFoundHeaders,
      });
    }

    const headers = new Headers(fallbackResponse.headers);
    addVaryAccept(headers);
    addAgentLinkHeaders(headers, url.pathname);
    return new Response(fallbackResponse.body, {
      status: fallbackResponse.status,
      headers,
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  addVaryAccept(headers);
  addAgentLinkHeaders(headers, url.pathname);
  return new Response(response.body, { status: response.status, headers });
};
