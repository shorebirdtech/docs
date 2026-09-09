import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

// Serves the raw Markdown/MDX source for every docs page at its URL + `.md`,
// so AI agents can fetch page content directly instead of scraping rendered HTML.
export const prerender = true;

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs', (entry) => !entry.data.draft);
  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { entry } = props;
  // Strip MDX component imports; they're an implementation detail, not content.
  const body = (entry.body ?? '').replace(/^import .+\n+/gm, '').trimStart();

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(entry.data.title)}`,
    entry.data.description
      ? `description: ${JSON.stringify(entry.data.description)}`
      : undefined,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  return new Response(`${frontmatter}\n\n${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
