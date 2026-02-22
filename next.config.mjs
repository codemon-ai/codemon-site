import nextra from 'nextra'
import { withSentryConfig } from '@sentry/nextjs'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = withNextra({
  reactStrictMode: true,
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
