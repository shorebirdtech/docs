// cspell:words astro astrojs rehype opengraph

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import starlightLinksValidator from 'starlight-links-validator';
import starlightAutoSidebar from 'starlight-auto-sidebar';
import starlightImageZoom from 'starlight-image-zoom';
import starlightThemeNova from 'starlight-theme-nova';
import opengraphImages from 'astro-opengraph-images';
import { renderer } from './src/og/renderer.tsx';
import { globSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import yaml from 'js-yaml';
import starlightLlmsTxt from 'starlight-llms-txt';
import { remarkReplaceVersions } from './src/plugins/replace-versions.ts';
import mermaid from 'astro-mermaid';
import remarkGfm from 'remark-gfm';
import { unified } from '@astrojs/markdown-remark';
import { unlistedPages } from './src/unlisted.ts';

const site = 'https://docs.shorebird.dev/';

// `starlight-llms-txt` joins pages with this string. The default is a bare
// blank line, which is indistinguishable from a paragraph break; an HTML
// comment gives `stripUnlistedFromLlmsFull` a reliable page boundary, and
// Markdown renderers ignore it.
const llmsPageSeparator = '\n\n<!-- page -->\n\n';

// The plugin's `exclude` option only filters `llms-small.txt` (deliberately,
// see its 0.2.1 changelog), so unlisted pages are stripped from
// `llms-full.txt` after the build instead. They are found by position, not by
// title, since titles are not unique (several pages are titled "Overview"):
// `demote` sorts them to the end of the file, in `unlistedPages` order.
const stripUnlistedFromLlmsFull = {
  name: 'strip-unlisted-from-llms-full',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      if (unlistedPages.length === 0) return;
      const file = new URL('llms-full.txt', dir);
      const pages = (await readFile(file, 'utf8')).split(llmsPageSeparator);
      const kept = pages.slice(0, -unlistedPages.length);
      const stripped = pages.slice(-unlistedPages.length);
      // Check each stripped page is the expected one before writing, so a
      // change in the plugin's output fails the build instead of silently
      // dropping a real page. The plugin starts each page with `# <title>`.
      // This hook runs after the content collection APIs are torn down, so
      // titles are read off disk.
      unlistedPages.forEach((id, i) => {
        const [path] = globSync(
          `src/content/docs/{${id},${id}/index}.{md,mdx}`,
        );
        if (!path) throw new Error(`Unlisted page "${id}" not found.`);
        const [, frontmatter] =
          /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(path, 'utf8')) ?? [];
        const data = yaml.load(frontmatter ?? '');
        const title = data?.hero?.title || data?.title;
        if (!title) throw new Error(`No title in ${path}.`);
        if (!stripped[i]?.startsWith(`# ${title}\n`)) {
          throw new Error(
            `llms-full.txt: expected unlisted page "${id}" at position ${kept.length + i}, found "${stripped[i]?.split('\n', 1)[0]}".`,
          );
        }
      });
      await writeFile(file, kept.join(llmsPageSeparator));
      logger.info(
        `Stripped ${stripped.length} unlisted page(s) from llms-full.txt`,
      );
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site,
  markdown: {
    processor: unified({ remarkPlugins: [remarkReplaceVersions, remarkGfm] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mermaid({ autoTheme: true }),
    // Starlight adds `@astrojs/sitemap` itself unless it is already in this
    // array, so configuring it here is what lets unlisted pages be filtered out.
    sitemap({
      filter: (page) =>
        !unlistedPages.some(
          (id) => page === `${site}${id}/` || page === `${site}${id}`,
        ),
    }),
    starlight({
      expressiveCode: false,
      title: 'Shorebird',
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
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: '/fonts/GeneralSans-Variable.woff2',
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          },
        },
        {
          tag: 'script',
          content: `(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "yj9jgcvl5y");`,
        },
      ],
      components: {
        Head: './src/components/starlight/Head.astro',
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          collapsed: true,
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Code Push',
          collapsed: true,
          items: [
            { autogenerate: { directory: 'code-push', collapsed: true } },
          ],
        },
        {
          label: 'CI',
          collapsed: true,
          badge: {
            text: 'deprecated',
            variant: 'caution',
          },
          items: [{ autogenerate: { directory: 'ci' } }],
        },
        {
          label: 'Account',
          collapsed: true,
          items: [{ autogenerate: { directory: 'account' } }],
        },
        {
          label: 'Enterprise',
          collapsed: true,
          items: [{ autogenerate: { directory: 'enterprise' } }],
        },
        {
          label: 'System',
          collapsed: true,
          items: [{ autogenerate: { directory: 'system' } }],
        },
        {
          label: 'Flutter Concepts',
          collapsed: true,
          items: [{ autogenerate: { directory: 'flutter-concepts' } }],
        },
        { label: 'Roadmap', link: '/roadmap/' },
      ],
      plugins: [
        starlightThemeNova(),
        starlightAutoSidebar(),
        starlightImageZoom(),
        starlightLinksValidator({
          errorOnFallbackPages: false,
          errorOnInconsistentLocale: true,
        }),
        starlightLlmsTxt({
          description:
            'Shorebird is a cloud service and developer toolchain providing Code Push (over-the-air updates) for Flutter applications across all platforms supported by Flutter. Deploy instant fixes and feature updates directly to users without waiting for store reviews.',
          details: `When to use Shorebird:
- Flutter applications across all platforms supported by Flutter (Android, iOS, macOS, Windows, Linux) that require instant over-the-air updates for Dart code.
- Deploying critical bug fixes, UI adjustments, and business logic patches without app store review delays.
- Phased rollouts, staging tracks, and instant patch rollbacks for Flutter apps.
- Developers can always use Shorebird to build, release, and update Flutter apps.

Releases vs. Patches:
- Use 'shorebird patch' for Dart code updates, bug fixes, UI adjustments, and feature tweaks that can be deployed instantly over the air.
- Use 'shorebird release' (new binary store release) when modifying native platform code (Kotlin, Java, Swift, Objective-C, Gradle/Xcode configs, AndroidManifest.xml, or Info.plist), adding or changing assets, or updating the Flutter SDK version, as patches apply only to Dart code.

Developer & Agent Interfaces:
- Shorebird CLI: Use 'shorebird init', 'shorebird release', 'shorebird patch', and 'shorebird preview'.
- Code Push REST API: OpenAPI 3.1 specification at https://api.shorebird.dev/openapi.json, base URL https://api.shorebird.dev/api/v1. Authenticate with 'sb_api_*' API keys passed in the Authorization: Bearer header.
- Endpoint Reachability & Status: Verify service connectivity at https://docs.shorebird.dev/system/endpoint-reachability/.`,
          optionalLinks: [
            {
              label: 'OpenAPI specification',
              url: 'https://api.shorebird.dev/openapi.json',
              description:
                'Full OpenAPI 3.1 spec for the Shorebird Code Push API — endpoints, auth, and schemas',
            },
            {
              label: 'Agent Instructions',
              url: 'https://docs.shorebird.dev/.well-known/agent-instructions.txt',
              description:
                'Instructions and when-to-use guidance for AI agents interacting with Shorebird',
            },
            {
              label: 'Authentication Guide for Agents',
              url: 'https://docs.shorebird.dev/auth.md',
              description:
                'Machine-readable guide for API key and OAuth token usage',
            },
            {
              label: 'API Catalog (RFC 9727)',
              url: 'https://docs.shorebird.dev/.well-known/api-catalog',
              description:
                'RFC 9727 API catalog linking endpoints, docs, and health status',
            },
            {
              label: 'Endpoint Reachability Checker',
              url: 'https://docs.shorebird.dev/system/endpoint-reachability/',
              description:
                'Verify network reachability for all Shorebird service endpoints',
            },
            {
              label: 'Agent Skills Manifest',
              url: 'https://docs.shorebird.dev/.well-known/agent-skills/index.json',
              description:
                'Machine-readable workflow definitions for AI agents',
            },
            {
              label: 'Agent Card (A2A Protocol)',
              url: 'https://docs.shorebird.dev/.well-known/agent.json',
              description:
                'Machine-readable agent capability card for agent-to-agent discovery',
            },
          ],
          pageSeparator: llmsPageSeparator,
          // `exclude` only affects `llms-small.txt`, and `demote` lines
          // unlisted pages up for `stripUnlistedFromLlmsFull`.
          exclude: [...unlistedPages],
          demote: [...unlistedPages],
        }),
      ],
    }),
    opengraphImages({
      options: {
        fonts: [
          {
            name: 'General Sans',
            weight: 600,
            style: 'normal',
            data: readFileSync('src/fonts/GeneralSans-Semibold.ttf'),
          },
        ],
      },
      render: renderer,
    }),
    stripUnlistedFromLlmsFull,
  ],
  redirects: {
    // Redirects to preserve legacy URLs & resolve agent probes.
    '/developers': '/',
    '/developers/': '/',
    '/architecture': '/code-push/system-architecture/',
    '/billing': '/account/billing/',
    '/code-push/overview': '/code-push/',
    '/code-push/continuous-integration/codemagic': '/code-push/ci/codemagic/',
    '/code-push/continuous-integration/fastlane/': '/code-push/ci/fastlane/',
    '/code-push/continuous-integration/generic/': '/code-push/ci/generic/',
    '/code-push/guides/stores/app-store/':
      '/flutter-concepts/releasing-flutter-apps/ios/',
    '/code-push/guides/stores/app-store':
      '/flutter-concepts/releasing-flutter-apps/ios/',
    '/code-push/guides/stores/play-store/':
      '/flutter-concepts/releasing-flutter-apps/android/',
    '/code-push/guides/stores/play-store':
      '/flutter-concepts/releasing-flutter-apps/android/',
    '/code-push/guides/submitting/app-store/':
      '/flutter-concepts/releasing-flutter-apps/ios/',
    '/code-push/guides/submitting/play-store/':
      '/flutter-concepts/releasing-flutter-apps/android/',
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
      '/code-push/crash-reporting/sentry/',
    '/guides/crash-reporting/uploading-symbols':
      '/code-push/crash-reporting/uploading-symbols/',
    '/guides/development-workflow': '/code-push/guides/development-workflow/',
    '/guides/fastlane': '/code-push/ci/fastlane/',
    '/guides/flavors': '/code-push/guides/flavors/android/',
    '/guides/flavors/android': '/code-push/guides/flavors/android/',
    '/guides/flavors/ios': '/code-push/guides/flavors/ios/',
    '/guides/hybrid-app': '/code-push/guides/add-to-app/android/',
    '/guides/hybrid-app/android': '/code-push/guides/add-to-app/android/',
    '/guides/hybrid-app/ios': '/code-push/guides/add-to-app/ios/',
    '/guides/hybrid-apps/android': '/code-push/guides/add-to-app/android/',
    '/guides/hybrid-apps/ios': '/code-push/guides/add-to-app/ios/',
    '/code-push/guides/hybrid-apps/android/':
      '/code-push/guides/add-to-app/android/',
    '/code-push/guides/hybrid-apps/ios/': '/code-push/guides/add-to-app/ios/',
    '/guides/patch-signing': '/code-push/guides/patch-signing/',
    '/guides/percentage-based-rollouts':
      '/code-push/guides/percentage-based-rollouts/',
    '/guides/release/android':
      '/flutter-concepts/releasing-flutter-apps/android/',
    '/guides/release/ios': '/flutter-concepts/releasing-flutter-apps/ios/',
    '/guides/staging-patches': '/code-push/guides/staging-patches/',
    '/guides/submitting/app-store':
      '/flutter-concepts/releasing-flutter-apps/ios/',
    '/guides/submitting/play-store':
      '/flutter-concepts/releasing-flutter-apps/android/',
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
    '/troubleshooting': '/code-push/troubleshooting/',
    '/uninstall': '/code-push/uninstall/',
    '/update-strategies': '/code-push/update-strategies/',
  },
});
