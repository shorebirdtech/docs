import mdxServer from '@astrojs/mdx/server.js';
import type { APIContext, GetStaticPaths } from 'astro';
import { experimental_AstroContainer } from 'astro/container';
import { getCollection, render, type CollectionEntry } from 'astro:content';
import type { ElementContent } from 'hast';
import { matches, selectAll } from 'hast-util-select';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { unlistedPages } from '~/unlisted';
import { HEADING_ANCHOR_LINK_SELECTOR } from '~/utils/heading-anchor';

// Serves Markdown for every docs page at its URL + `.md`, so AI agents can
// fetch page content directly instead of scraping rendered HTML. Renders
// each entry through the real Astro/Starlight pipeline (same as
// `starlight-llms-txt`'s `/llms-full.txt`) rather than returning
// `entry.body` as-is, so remark plugins (e.g. version placeholder
// substitution) and MDX components are resolved instead of leaking into
// the output as raw source.
export const prerender = true;

export const getStaticPaths = (async () => {
  // Unlisted pages are reachable at their HTML URL but are not published as
  // agent-facing Markdown, which would hand out the full text of a page that
  // is deliberately not advertised.
  const docs = await getCollection(
    'docs',
    (entry) => !entry.data.draft && !unlistedPages.includes(entry.id),
  );
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
  // Drop Starlight's heading anchor links (see `~/utils/heading-anchor`). The
  // heading itself is kept.
  .use(function stripHeadingAnchorLinks() {
    const strip = (node: { children?: ElementContent[] }) => {
      if (!node.children) return;
      node.children = node.children.filter(
        (child) => !matches(HEADING_ANCHOR_LINK_SELECTOR, child),
      );
      for (const child of node.children) {
        if (child.type === 'element') strip(child);
      }
    };
    return (tree) => strip(tree as { children?: ElementContent[] });
  })
  // `<Tabs>` renders as a `<starlight-tabs>` custom element; without this,
  // hast-util-to-mdast has no idea what it is and drops the tab labels
  // while running every panel's content together with no separation.
  // Converted to a list instead, same as starlight-llms-txt does for
  // /llms-full.txt.
  .use(function starlightTabsToList() {
    return (tree) => {
      for (const instance of selectAll(
        'starlight-tabs',
        tree as Parameters<typeof selectAll>[1],
      )) {
        const tabs = selectAll('[role="tab"]', instance);
        const panels = selectAll('[role="tabpanel"]', instance);
        instance.tagName = 'ul';
        instance.properties = {};
        instance.children = [];
        for (let i = 0; i < Math.min(tabs.length, panels.length); i++) {
          const tab = tabs[i];
          const panel = panels[i];
          if (!tab || !panel) continue;
          const label = tab.children
            .filter((child) => child.type === 'text' && child.value.trim())
            .map((child) => (child.type === 'text' ? child.value.trim() : ''))
            .join('');
          instance.children.push({
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'p',
                properties: {},
                children: [{ type: 'text', value: label }],
              },
              panel as ElementContent,
            ],
          });
        }
      }
    };
  })
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
