import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DPSystems Knowledge Base',
  tagline: 'Documentation for DPSystems products',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Cloudflare Pages deployment config
  // TODO: Update this URL after creating Cloudflare Pages project
  url: 'https://knowledgebase.pages.dev',
  baseUrl: '/',

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
    // Add more products here in the future
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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
      title: 'DPSystems Knowledge Base',
      logo: {
        alt: 'DPSystems Logo',
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
        {to: '/blog', label: 'Updates', position: 'left'},
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
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dpsystems-dev/knowledgebase',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DPSystems. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
