/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://codemon.ai',
  generateRobotsTxt: true,
  exclude: ['/p/*', '/en/p/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/p/' },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/blog')) {
      priority = 0.8
    } else if (path.startsWith('/en')) {
      priority = 0.6
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
