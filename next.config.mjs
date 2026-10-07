import nextra from 'nextra'
import { withSentryConfig } from '@sentry/nextjs'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = withNextra({
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // 웨비나 발표 슬라이드: 정적 HTML을 /webinar/slides 경로로 서빙 (public/webinar/는 pages/webinar/ 라우트에 가려 404)
      { source: '/webinar/slides', destination: '/files/webinar/slides.html' },
    ]
  },
  async redirects() {
    return [
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
