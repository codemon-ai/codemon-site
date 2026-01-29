import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>codemon</span>,
  project: {
    link: 'https://github.com/coffeemon',
  },
  docsRepositoryBase: 'https://github.com/coffeemon/codemon-site',
  footer: {
    text: '© 2024 codemon.ai',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="codemon" />
      <meta property="og:description" content="AI Engineer & Full-Stack Developer" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – codemon'
    }
  },
  primaryHue: 200,
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
  nextThemes: {
    defaultTheme: 'dark',
  },
}

export default config
