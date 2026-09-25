import {
  CHANGELOG_DESCRIPTION,
  CHANGELOG_TITLE,
  getEntries,
  groupByMonth,
  releaseNotesUrl,
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
    [
      `**${e.type}** in ${e.area}, ${e.date}`,
      e.version &&
        `, Shorebird CLI ${e.version} ([release notes](${releaseNotesUrl(e.version)}))`,
      `. Permalink: [/changelog/#${e.id}](/changelog/#${e.id})`,
    ]
      .filter(Boolean)
      .join(''),
    e.summary,
    e.bullets.map((b) => `- ${b}`).join('\n'),
    e.code && ['```sh', e.code, '```'].join('\n'),
    e.docLink && `Docs: [${e.docLink.label}](${e.docLink.href})`,
  ]
    .filter(Boolean)
    .join('\n\n');
}

export async function GET() {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(CHANGELOG_TITLE)}`,
    `description: ${JSON.stringify(CHANGELOG_DESCRIPTION)}`,
    '---',
  ].join('\n');

  const body = [
    frontmatter,
    `Each entry names the Shorebird CLI release that shipped it, if any; compare it with \`shorebird --version\`, and run \`shorebird upgrade\` to get newer changes. RSS feed: [/changelog.xml](/changelog.xml)`,
    ...groupByMonth(await getEntries()).flatMap((group) => [
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
