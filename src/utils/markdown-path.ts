// Shared by functions/_middleware.ts (content negotiation) and
// src/components/starlight/Head.astro (the <link rel="alternate"> tag) so
// the URL a browser is told to fetch for Markdown always matches the URL
// the middleware actually negotiates to.
export function markdownSiblingPath(pathname: string): string {
  const trimmed =
    pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;
  return trimmed === '/' ? '/index.md' : `${trimmed}.md`;
}
