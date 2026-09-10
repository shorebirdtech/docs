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
        const [key, value] = param.trim().split('=');
        if (key === 'q' && value) q = Number.parseFloat(value) || 0;
      }
      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((entry): entry is AcceptEntry => entry !== null);
}

// Highest (q * 10 + specificity) among entries matching `target`, or -1 if
// nothing in the header would accept it.
function scoreFor(entries: AcceptEntry[], target: string): number {
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

type Preference = 'markdown' | 'html' | 'either' | 'none';

function negotiate(acceptHeader: string | null): Preference {
  if (!acceptHeader) return 'either';
  const entries = parseAccept(acceptHeader);
  const markdown = scoreFor(entries, 'text/markdown');
  const html = scoreFor(entries, 'text/html');

  if (markdown < 0 && html < 0) {
    const rejectsEverything = entries.some(
      (e) => e.type === '*/*' && e.q === 0,
    );
    return rejectsEverything ? 'none' : 'either';
  }
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
    const markdownResponse = await context.env.ASSETS.fetch(
      markdownUrl.toString(),
    );
    if (markdownResponse.ok) {
      const headers = new Headers(markdownResponse.headers);
      headers.set('Vary', 'Accept');
      return new Response(markdownResponse.body, {
        status: markdownResponse.status,
        headers,
      });
    }
    // No Markdown sibling for this path (e.g. a non-docs route) — fall
    // through and serve HTML instead of a hard 406.
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.append('Vary', 'Accept');
  return new Response(response.body, { status: response.status, headers });
};
