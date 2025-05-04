// cspell:words astro astrojs rehype

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightAutoSidebar from 'starlight-auto-sidebar';
import starlightImageZoom from 'starlight-image-zoom'

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
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/shorebirdtech/docs',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/shorebird',
        },
      ],
      editLink: { baseUrl: 'https://github.com/shorebirdtech/docs/edit/main/' },
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
      components: { Head: './src/components/starlight/Head.astro' },
      customCss: ['./src/tailwind.css'],
      expressiveCode: { themes: ['dark-plus', 'github-light'] },
      sidebar: [
        { label: 'Welcome', link: '/' },
        {
          label: 'Getting Started',
          collapsed: true,
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Code Push',
          collapsed: true,
          autogenerate: { directory: 'code-push' },
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
        { label: 'FAQ & Troubleshooting', link: '/faq' },
      ],
      plugins: [
        starlightAutoSidebar(),
        starlightImageZoom(),
        starlightLinksValidator({
          errorOnFallbackPages: false,
          errorOnInconsistentLocale: true,
        }),
      ],
    }),
  ],
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
    '/flutter-version/': '/getting-started/flutter-version/',
    '/troubleshooting/': '/faq/',
    '/guides/patch-signing/': '/code-push/guides/patch-signing/',
  },
});
