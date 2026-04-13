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
