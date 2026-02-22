import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
// ChatWidget moved to _app.tsx

const SITE_URL = 'https://codemon.ai'
const SITE_NAME = 'codemon'
const DEFAULT_DESCRIPTION = 'Pro Vibe Coder & Cracked Engineer'
const Head = () => {
  const { asPath, locale } = useRouter()
  const { frontMatter, title } = useConfig()

  const pageTitle = frontMatter.title || title || SITE_NAME
  const description = frontMatter.description || DEFAULT_DESCRIPTION
  const tags = frontMatter.tags ? frontMatter.tags.join(',') : ''
  const ogImage = frontMatter.image
    ? `${SITE_URL}${frontMatter.image}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(pageTitle)}&tags=${encodeURIComponent(tags)}`
  const canonical = `${SITE_URL}${asPath === '/' ? '' : asPath}`
  const isBlog = asPath.startsWith('/blog/') && asPath !== '/blog/'
  const isEn = asPath.startsWith('/en')

  // hreflang: /en 접두사로 한/영 판별
  const koPath = isEn ? asPath.replace(/^\/en/, '') || '/' : asPath
  const enPath = isEn ? asPath : `/en${asPath}`

  // JSON-LD
  let jsonLd: object | null = null
  if (asPath === '/') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description: DEFAULT_DESCRIPTION,
    }
  } else if (isBlog) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pageTitle,
      description,
      author: {
        '@type': 'Person',
        name: frontMatter.author || 'codemon',
      },
      ...(frontMatter.date && { datePublished: frontMatter.date }),
      ...(frontMatter.tags && { keywords: frontMatter.tags.join(', ') }),
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    }
  }

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={isEn ? 'en_US' : 'ko_KR'} />
      <meta property="og:type" content={isBlog ? 'article' : 'website'} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="ko" href={`${SITE_URL}${koPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${koPath}`} />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>codemon</span>,
  project: {
    link: 'https://github.com/codemon-ai',
  },
  docsRepositoryBase: 'https://github.com/codemon-ai/codemon-site',
  footer: {
    content: '© 2024 codemon.ai',
  },
  head: Head,
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
  ),
}

export default config
