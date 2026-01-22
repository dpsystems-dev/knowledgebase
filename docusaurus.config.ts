import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DP Systems',
  tagline: 'Documentation for DP Systems products',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // GitHub Pages deployment config
  url: 'https://dpsystems-dev.github.io',
  baseUrl: '/knowledgebase/',
  organizationName: 'dpsystems-dev',
  projectName: 'knowledgebase',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    // ABM Web Portal docs plugin
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'abm-web-portal',
        path: 'products/abm-web-portal',
        routeBasePath: 'abm-web-portal',
        sidebarPath: './sidebarsAbmWebPortal.ts',
      },
    ],
    // ABM Service Docket Email Processor docs plugin
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'abm-service-docket-email-processor',
        path: 'products/abm-service-docket-email-processor',
        routeBasePath: 'abm-service-docket-email-processor',
        sidebarPath: './sidebarsAbmServiceDocketEmailProcessor.ts',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DP Systems',
      logo: {
        alt: 'DP Systems Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'generalSidebar',
          position: 'left',
          label: 'General',
        },
        {
          type: 'doc',
          docId: 'description',
          docsPluginId: 'abm-web-portal',
          label: 'ABM Web Portal',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'description',
          docsPluginId: 'abm-service-docket-email-processor',
          label: 'Docket Email Processor',
          position: 'left',
        },
        {
          href: 'https://github.com/dpsystems-dev/knowledgebase',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'General',
              to: '/docs/intro',
            },
            {
              label: 'ABM Web Portal',
              to: '/abm-web-portal/description',
            },
            {
              label: 'Docket Email Processor',
              to: '/abm-service-docket-email-processor/description',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/dpsystems-dev/knowledgebase',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DP Systems. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
