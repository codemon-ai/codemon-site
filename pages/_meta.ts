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
  }
}
