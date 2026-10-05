import nextra from 'nextra'
import { withSentryConfig } from '@sentry/nextjs'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = withNextra({
  reactStrictMode: true,
  experimental: {
    // /admin/digest 가 런타임에 inbox JSON 을 읽는다 (Vercel 서버리스 번들 포함)
    outputFileTracingIncludes: { '/api/admin/digest/list': ['./data/digest/inbox/**'] },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // 리뉴얼 P3: 구독 페이지 → 뉴스레터 허브
      { source: '/subscribe', destination: '/newsletter', permanent: true },
      // 리뉴얼 P5: 다이제스트 목록은 뉴스레터 아카이브
      { source: '/insights/digest', destination: '/newsletter', permanent: false },
      // 리뉴얼 P3: /work 상세 → /cases 상세 (login 제외). 공개 범위 확정 전까지 307, 최종 프로모트 시 301로
      { source: '/work/:slug((?!login$).*)', destination: '/cases/:slug', permanent: false },
      {
        source: '/partner/survey/lecture-agency-ai',
        destination: '/survey/lecture-agency-ai',
        permanent: true,
      },
      {
        source: '/partner/survey/lecture-startup-ai',
        destination: '/survey/lecture-startup-ai',
        permanent: true,
      },
      {
        source: '/partner/survey/lecture-podl-ai',
        destination: '/survey/lecture-podl-ai',
        permanent: true,
      },
    ]
  },
})

export default withSentryConfig(nextConfig, {
  // Sentry webpack plugin options
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  // Source map upload disabled for now
  sourcemaps: {
    disable: true,
  },
  // Auto-instrumentation
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  autoInstrumentAppDirectory: true,
})
