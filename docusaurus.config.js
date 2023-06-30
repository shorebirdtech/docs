// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Shorebird',
  tagline: 'Home of the Shorebird documentation.',
  url: 'https://docs.shorebird.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'shorebirdtech',
  trailingSlash: false,
  projectName: 'docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/shorebirdtech/docs/tree/main/',
          sidebarCollapsed: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/open-graph.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Shorebird',
        logo: {
          alt: 'Shorebird Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/shorebirdtech/shorebird',
            position: 'right',
            className: 'navbar-github-icon',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/',
              },
              {
                label: 'Code Push',
                to: '/code-push',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'shorebird.dev',
                href: 'https://shorebird.dev',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/shorebirdtech/shorebird',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/shorebird',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/shorebirddev',
              },
            ],
          },
        ],
      },
      prism: {
        additionalLanguages: ['bash', 'dart', 'powershell', 'yaml'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
