import { CHANGELOG_DESCRIPTION, getEntries } from '~/data/changelog';

// RSS 2.0 feed of the changelog, so readers can subscribe instead of checking
// the page. Written by hand rather than with `@astrojs/rss`, since a flat list
// of entries needs only a few tags.
export const prerender = true;

const SITE = 'https://docs.shorebird.dev';

function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function GET() {
  const entries = await getEntries();
  const items = entries.map((e) => {
    const link = `${SITE}/changelog/#${e.id}`;
    // Feed readers show the description as plain text, so drop the
    // backticks that mark inline code on the page.
    const description = e.summary.replaceAll('`', '');
    return [
      '    <item>',
      `      <title>${escapeXml(`${e.type}: ${e.title}`)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${new Date(e.date).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(e.area)}</category>`,
      `      <description>${escapeXml(description)}</description>`,
      '    </item>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Shorebird changelog</title>',
    `    <link>${SITE}/changelog/</link>`,
    `    <atom:link href="${SITE}/changelog.xml" rel="self" type="application/rss+xml" />`,
    `    <description>${escapeXml(CHANGELOG_DESCRIPTION)}</description>`,
    '    <language>en-us</language>',
    entries[0] &&
      `    <lastBuildDate>${new Date(entries[0].date).toUTCString()}</lastBuildDate>`,
    ...items,
    '  </channel>',
    '</rss>',
  ]
    .filter(Boolean)
    .join('\n');

  // As in `changelog.md.ts`, this header only applies in `astro dev` and
  // `astro preview`; `public/_headers` sets it in production.
  return new Response(`${xml}\n`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
