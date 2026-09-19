import {
  CHANGELOG_DESCRIPTION,
  CHANGELOG_TITLE,
  ENTRIES,
  groupByMonth,
  type ChangelogEntry,
} from '~/data/changelog';

// The Markdown twin of `/changelog/`. `[...slug].md.ts` only covers content
// collection pages, and the changelog is a standalone `.astro` page, so without
// this route the `<link rel="alternate" type="text/markdown">` that `Head.astro`
// emits for every page would point at a 404, and `Accept: text/markdown` on
// `/changelog/` would fall back to HTML.
export const prerender = true;

function entryToMarkdown(e: ChangelogEntry): string {
  return [
    `### ${e.title}`,
    `**${e.type}** in ${e.area}, version ${e.version}, ${e.date}. Permalink: [/changelog/#${e.id}](/changelog/#${e.id})`,
    e.summary,
    e.bullets.map((b) => `- ${b}`).join('\n'),
    e.code && ['```sh', e.code, '```'].join('\n'),
    e.docLink && `Docs: [${e.docLink.label}](${e.docLink.href})`,
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function GET() {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(CHANGELOG_TITLE)}`,
    `description: ${JSON.stringify(CHANGELOG_DESCRIPTION)}`,
    '---',
  ].join('\n');

  const body = [
    frontmatter,
    `${CHANGELOG_DESCRIPTION} Newest first.`,
    ...groupByMonth(ENTRIES).flatMap((group) => [
      `## ${group.label}`,
      ...group.items.map(entryToMarkdown),
    ]),
  ].join('\n\n');

  // As in `[...slug].md.ts`, this header only applies in `astro dev` and
  // `astro preview`; `public/_headers` sets it in production.
  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
