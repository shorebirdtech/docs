import { defineConfig } from 'astro/config';
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
        baseUrl: 'https://github.com/shorebirdtech/docs/edit/main/docs/',
      },
      favicon: 'favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: site + 'og.png?v=1' },
        },
        {
          tag: 'meta',
          attrs: { property: 'twitter:image', content: site + 'og.png?v=1' },
        },
      ],
      customCss: ['./src/tailwind.css'],
      expressiveCode: {
        themes: ['dark-plus', 'github-light'],
      },
      sidebar: [
        {
          label: 'Getting Started',
          link: '/',
        },
        {
          label: 'Overview',
          link: '/overview',
        },
        {
          label: 'Code Push',
          autogenerate: {
            directory: 'code-push',
          },
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Code Push Quickstart',
              link: '/guides/code-push-quickstart',
            },
            {
              label: 'Release',
              autogenerate: {
                directory: 'guides/release',
              },
            },
            {
              label: 'Staging Patches',
              link: '/guides/staging-patches',
            },
            {
              label: 'Flavors',
              autogenerate: {
                directory: 'guides/flavors',
              },
            },
            {
              label: 'Hybrid Apps',
              autogenerate: {
                directory: 'guides/hybrid-apps',
              },
            },
            {
              label: 'Crash Reporting',
              link: '/guides/crash-reporting',
            },
          ],
        },
        {
          label: 'Continuous Integration',
          autogenerate: {
            directory: 'ci',
          },
        },
        {
          label: 'Flutter Version',
          link: '/flutter-version',
        },
        {
          label: 'Teams',
          link: '/teams',
        },
        {
          label: 'Update Strategies',
          link: '/update-strategies',
        },
        {
          label: 'Concepts',
          link: '/concepts',
        },
        {
          label: 'FAQ',
          link: '/faq',
        },
        {
          label: 'Status',
          link: '/status',
        },
        {
          label: 'Architecture',
          link: '/architecture',
        },
        {
          label: 'Uninstall',
          link: '/uninstall',
        },
        {
          label: 'Troubleshooting',
          link: '/troubleshooting',
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
  redirects: {
    // Redirects to preserve legacy URLs.
    'code_push/initialize': 'code-push/initialize/',
    'code_push/release': 'code-push/release/',
    'code_push/preview': 'code-push/preview/',
    'code_push/patch': 'code-push/patch/',
    'guides/code_push_quickstart': '/guides/code-push-quickstart',
  },
});
