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
              label: 'Staging Patches',
              link: '/guides/staging-patches',
            },
            {
              label: 'Development Workflow',
              link: '/guides/development-workflow',
            },
            {
              label: 'Patch Signing (beta)',
              link: '/guides/patch-signing',
            },
            {
              label: 'Crash Reporting',
              link: '/guides/crash-reporting',
            },
            {
              label: 'Flavors',
              autogenerate: {
                directory: 'guides/flavors',
              },
            },
            {
              label: 'Submitting to Stores',
              autogenerate: {
                directory: 'guides/submitting',
              },
            },
            {
              label: 'Hybrid Apps',
              autogenerate: {
                directory: 'guides/hybrid-apps',
              },
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
          label: 'Crash Reporting',
          autogenerate: {
            directory: 'guides/crash-reporting',
          },
        },
        {
          label: 'Flutter Version',
          link: '/flutter-version',
        },
        {
          label: 'Organizations',
          link: '/organization',
        },
        {
          label: 'Update Strategies',
          link: '/update-strategies',
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
  markdown: {
    rehypePlugins: [rehypeSlug, ...rehypeAutolink()],
  },
  redirects: {
    // Redirects to preserve legacy URLs.
    ci: '/ci/github',
    'code_push/initialize': 'code-push/initialize/',
    'code_push/patch': 'code-push/patch/',
    'code_push/preview': 'code-push/preview/',
    'code_push/release': 'code-push/release/',
    'code_push/run': 'code-push/preview',
    guides: '/',
    'guides/add-to-app/ios': 'guides/hybrid-apps/ios',
    'guides/code_push_add_to_app': 'guides/hybrid-apps/android',
    'guides/code_push_quickstart': 'guides/code-push-quickstart',
    'guides/crash-reporting': 'guides/crash-reporting/uploading-symbols',
    'guides/fastlane': 'ci/fastlane',
    'guides/flavors': 'guides/flavors/android',
    'guides/hybrid-app': 'guides/hybrid-apps/android',
    'guides/hybrid-app/android': 'guides/hybrid-apps/android',
    'guides/hybrid-app/ios': 'guides/hybrid-apps/ios',
    'guides/release/android': 'guides/submitting/play-store',
    'guides/release/ios': 'guides/submitting/app-store',
    concepts: 'overview',
    teams: 'organizations',
  },
});
