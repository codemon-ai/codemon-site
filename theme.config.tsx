import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>codemon</span>,
  project: {
    link: 'https://github.com/codemon-ai',
  },
  docsRepositoryBase: 'https://github.com/codemon-ai/codemon-site',
  footer: {
    content: '© 2024 codemon.ai',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="codemon" />
      <meta property="og:description" content="Pro Vibe Coder & Cracked Engineer" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: true,
  i18n: [
    { locale: 'ko', name: '한국어' },
    { locale: 'en', name: 'English' },
  ],
}

export default config
