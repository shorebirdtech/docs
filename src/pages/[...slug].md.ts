import mdxServer from '@astrojs/mdx/server.js';
import type { APIContext, GetStaticPaths } from 'astro';
import { experimental_AstroContainer } from 'astro/container';
import { getCollection, render, type CollectionEntry } from 'astro:content';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

// Serves Markdown for every docs page at its URL + `.md`, so AI agents can
// fetch page content directly instead of scraping rendered HTML. Renders
// each entry through the real Astro/Starlight pipeline (same as
// `starlight-llms-txt`'s `/llms-full.txt`) rather than returning
// `entry.body` as-is, so remark plugins (e.g. version placeholder
// substitution) and MDX components are resolved instead of leaking into
// the output as raw source.
export const prerender = true;

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs', (entry) => !entry.data.draft);
  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

const astroContainer = await experimental_AstroContainer.create({
  renderers: [{ name: 'astro:jsx', ssr: mdxServer }],
});

const htmlToMarkdown = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify);

export async function GET(context: APIContext) {
  const { entry } = context.props as { entry: CollectionEntry<'docs'> };

  const { Content } = await render(entry);
  const html = await astroContainer.renderToString(Content, context);
  const markdown = String(await htmlToMarkdown.process(html)).trim();

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

  // This header only takes effect in `astro dev`/`astro preview`: with
  // `prerender = true` the route is written to disk as a static `.md` file,
  // and `public/_headers` is what actually sets Content-Type in production.
  return new Response(`${frontmatter}\n\n${markdown}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
