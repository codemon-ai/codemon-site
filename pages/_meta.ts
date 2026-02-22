export default {
  index: {
    title: 'Home',
    type: 'page',
    theme: {
      layout: 'raw',
      breadcrumb: false,
      footer: true,
      sidebar: false,
      toc: false,
      pagination: false
    }
  },
  blog: {
    title: 'Blog',
    type: 'page'
  },
  showcase: {
    title: 'Showcase',
    type: 'page',
    theme: {
      layout: 'default',
      breadcrumb: false,
      sidebar: false,
      toc: false,
      pagination: false
    }
  },
  tools: {
    title: 'Tools',
    type: 'page',
    href: 'https://tools.codemon.ai',
    newWindow: true
  },
  docs: {
    title: 'Docs',
    type: 'page'
  },
  projects: {
    title: 'Projects',
    type: 'page'
  },
  about: {
    title: 'About',
    type: 'page'
  },
  p: {
    type: 'folder',
    display: 'hidden'
  },
  en: {
    title: 'English',
    type: 'page',
    display: 'hidden'
  }
}
