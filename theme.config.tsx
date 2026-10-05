import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { LangSwitch } from './components/shell/LangSwitch'
import { SubscribeButton } from './components/shell/SubscribeButton'
import { PostFooter } from './components/insights/PostFooter'
// ChatWidget moved to _app.tsx

const SITE_URL = 'https://codemon.ai'
const SITE_NAME = 'codemon'
const DEFAULT_DESCRIPTION = 'AI로 일하는 방식을 바꾸는 엔지니어'
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

/** 블로그 글 경로에만 전환 사다리(PostFooter) 주입 */
const Main = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter()
  const isPost = /^\/blog\/[^/?#]+/.test(asPath)
  return (<>{children}{isPost && <PostFooter />}</>)
}

const config: DocsThemeConfig = {
  main: Main,
  logo: <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>codemon</span>,
  project: {
    link: 'https://github.com/codemon-ai',
  },
  docsRepositoryBase: 'https://github.com/codemon-ai/codemon-site/blob/main',
  navbar: {
    extraContent: (
      <div className="ml-2 flex items-center gap-3">
        <LangSwitch />
        <SubscribeButton />
      </div>
    ),
  },
  footer: {
    content: (
      <div className="flex w-full flex-col gap-3 text-sm md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-black tracking-tight text-base">codemon</div>
          <div className="text-ink/60 text-xs leading-relaxed">
            Codemon Inc. · Seoul, Korea<br />AI/AX Engineering · Forward Deployed Engineer
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-ink/60">
          <a href="/projects" className="hover:text-ink">Projects</a>
          <a href="https://tools.codemon.ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Tools</a>
          <a href="/privacy" className="hover:text-ink">개인정보처리방침</a>
          <a href="/terms" className="hover:text-ink">이용약관</a>
          <span>&copy; {new Date().getFullYear()} codemon.ai</span>
        </div>
      </div>
    ),
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
}

export default config
