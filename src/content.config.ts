import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { autoSidebarLoader } from 'starlight-auto-sidebar/loader';
import { autoSidebarSchema } from 'starlight-auto-sidebar/schema';
import { changelogSchema } from '~/data/changelog-schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  autoSidebar: defineCollection({
    loader: autoSidebarLoader(),
    schema: autoSidebarSchema(),
  }),
  // One Markdown file per entry; see `src/content/changelog/_template.md`.
  changelog: defineCollection({
    loader: glob({
      base: './src/content/changelog',
      pattern: ['*.md', '!_*.md'],
    }),
    schema: changelogSchema,
  }),
};
