// cspell:words astro astrojs rehype

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightAutoSidebar from 'starlight-auto-sidebar';
import starlightImageZoom from 'starlight-image-zoom';

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
          autogenerate: { directory: 'code-push', collapsed: true },
        },
        {
          label: 'CI (Beta)',
          collapsed: true,
          autogenerate: { directory: 'ci' },
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
    '/architecture': '/code-push/system-architecture/',
    '/billing': '/account/billing/',
    '/code-push/overview': '/code-push',
    '/code-push/continuous-integration/codemagic': '/code-push/ci/codemagic',
    '/code-push/continuous-integration/fastlane/': '/code-push/ci/fastlane/',
    '/code-push/continuous-integration/generic/': '/code-push/ci/generic/',
    '/code-push/guides/submitting/app-store/':
      'code-push/guides/stores/app-store/',
    '/code-push/guides/submitting/play-store/':
      '/code-push/guides/stores/play-store/',
    '/code_push/initialize': '/code-push/initialize/',
    '/code_push/patch': '/code-push/patch/',
    '/code_push/preview': '/code-push/preview/',
    '/code_push/release': '/code-push/release/',
    '/code_push/run': '/code-push/preview/',
    '/concepts': '/code-push/',
    '/faq': '/code-push/faq/',
    '/flavors': '/code-push/guides/flavors/android/',
    '/flutter-version': '/getting-started/flutter-version/',
    '/getting-started/quick-start/': '/getting-started/',
    '/guides/': '/code-push/guides/development-workflow/',
    '/guides/code-push-quickstart': '/getting-started/',
    '/guides/code_push_quickstart': '/getting-started/',
    '/guides/crash-reporting/': '/code-push/crash-reporting/uploading-symbols/',
    '/guides/crash-reporting/integrations/crashlytics/':
      '/code-push/crash-reporting/crashlytics/',
    '/guides/crash-reporting/integrations/sentry/':
      '/code-push/crash-reporting/integrations/sentry/',
    '/guides/crash-reporting/uploading-symbols':
      '/code-push/crash-reporting/uploading-symbols/',
    '/guides/development-workflow': '/code-push/guides/development-workflow/',
    '/guides/fastlane': '/code-push/ci/fastlane/',
    '/guides/flavors': '/code-push/guides/flavors/android/',
    '/guides/flavors/android': '/code-push/guides/flavors/android/',
    '/guides/flavors/ios': '/code-push/guides/flavors/ios/',
    '/guides/hybrid-app': '/code-push/guides/hybrid-apps/android/',
    '/guides/hybrid-app/android': '/code-push/guides/hybrid-apps/android/',
    '/guides/hybrid-app/ios': '/code-push/guides/hybrid-apps/ios/',
    '/guides/hybrid-apps/android': '/code-push/guides/hybrid-apps/android/',
    '/guides/hybrid-apps/ios': '/code-push/guides/hybrid-apps/ios/',
    '/guides/patch-signing': '/code-push/guides/patch-signing/',
    '/guides/percentage-based-rollouts':
      '/code-push/guides/percentage-based-rollouts/',
    '/guides/release/android': '/code-push/guides/stores/play-store/',
    '/guides/release/ios': '/code-push/guides/stores/app-store/',
    '/guides/staging-patches': '/code-push/guides/staging-patches/',
    '/guides/submitting/app-store': '/code-push/guides/stores/app-store/',
    '/guides/submitting/play-store': '/code-push/guides/stores/play-store/',
    '/guides/testing-patches': '/code-push/guides/testing-patches/',
    '/orgs': '/account/orgs/',
    '/overview': '/code-push/',
    '/shorebird-account/billing': '/account/billing/',
    '/shorebird-account/delete-account': '/account/delete-account/',
    '/shorebird-account/orgs': '/account/orgs/',
    '/shorebird-system/security': '/system/security/',
    '/shorebird-system/status': '/system/status/',
    '/status/': '/system/status/',
    '/teams': '/account/orgs/',
    '/troubleshooting': 'code-push/troubleshooting/',
    '/uninstall': '/code-push/uninstall/',
    '/update-strategies': '/code-push/update-strategies/',
  },
});
