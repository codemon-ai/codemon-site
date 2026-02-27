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
  about: {
    title: 'About',
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
  projects: {
    title: 'Projects',
    type: 'page'
  },
  blog: {
    title: 'Blog',
    type: 'page'
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
  p: {
    type: 'folder',
    display: 'hidden'
  },
  en: {
    title: 'English',
    type: 'page',
    display: 'hidden'
  },
  privacy: {
    title: '개인정보처리방침',
    type: 'page',
    display: 'hidden'
  }
}
