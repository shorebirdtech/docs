// cspell:words astro astrojs rehype

import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import { rehypeAutolink } from './plugins/rehype-autolink';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';

const site = 'https://docs.shorebird.dev/';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Shorebird',
      tagline: 'Flutter Code Push',
      logo: {
        light: './src/assets/shorebird-light.svg',
        dark: './src/assets/shorebird-dark.svg',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/shorebirdtech/shorebird',
        discord: 'https://discord.gg/shorebird',
      },
      editLink: {
        baseUrl: 'https://github.com/shorebirdtech/docs/edit/main/',
      },
      favicon: 'favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: site + 'open-graph.png?v=1' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: site + 'open-graph.png?v=1',
          },
        },
      ],
      components: {
        Head: './src/components/starlight/Head.astro',
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
      },
      customCss: ['./src/tailwind.css'],
      expressiveCode: {
        themes: ['dark-plus', 'github-light'],
      },
      sidebar: [
        {
          label: 'Welcome',
          link: '/',
        },
        {
          label: 'Getting Started',
          collapsed: true,
          autogenerate: { directory: 'Getting Started' },
        },
        {
          label: 'Code Push',
          collapsed: true,
          autogenerate: { directory: 'Code Push' },
        },
        {
          label: 'Account',
          collapsed: true,
          autogenerate: { directory: 'account' },
        },
        {
          label: 'System',
          collapsed: true,
          autogenerate: { directory: 'system' },
        },
        {
          label: 'FAQ & Troubleshooting',
          link: '/faq',
        },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnFallbackPages: false,
          errorOnInconsistentLocale: true,
        }),
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, ...rehypeAutolink()],
  },
  redirects: {
    // Redirects to preserve legacy URLs.
    '/code_push/initialize': '/code-push/initialize/',
    '/code_push/patch': '/code-push/patch/',
    '/code_push/preview': '/code-push/preview/',
    '/code_push/release': '/code-push/release/',
    '/code_push/run': '/code-push/preview',
    '/concepts': '/code-push/overview',
    '/overview': '/code-push/overview',
    '/shorebird-account/billing': '/account/billing',
    '/shorebird-account/delete-account': '/account/delete-account',
    '/shorebird-account/orgs': '/account/orgs',
    '/shorebird-system/security': '/system/security',
    '/shorebird-system/status': '/system/status',
    '/teams': '/account/orgs',
  },
});
