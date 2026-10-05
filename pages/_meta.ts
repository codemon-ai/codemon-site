export default {
  index: {
    title: '홈',
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
    display: 'hidden',
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
    display: 'hidden',
    type: 'page'
  },
  blog: {
    title: '인사이트',
    type: 'page'
  },
  news: {
    title: 'News',
    display: 'hidden',
    type: 'page'
  },
  tools: {
    title: 'Tools',
    display: 'hidden',
    type: 'page',
    href: 'https://tools.codemon.ai',
    newWindow: true
  },
  docs: {
    title: 'Docs',
    display: 'hidden',
    type: 'page',
    theme: {
      pagination: false
    }
  },
  yonsei: {
    type: 'folder',
    display: 'hidden'
  },
  p: {
    type: 'folder',
    display: 'hidden'
  },
  partner: {
    type: 'folder',
    display: 'hidden',
    theme: {
      sidebar: false,
    }
  },
  work: {
    type: 'folder',
    display: 'hidden',
    theme: {
      sidebar: false,
    }
  },
  webinar: {
    type: 'folder',
    display: 'hidden',
    theme: {
      sidebar: false,
    }
  },
  admin: {
    type: 'folder',
    display: 'hidden'
  },
  subscribe: {
    title: '뉴스레터 구독',
    type: 'page',
    display: 'hidden'
  },
  survey: {
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
  },
  terms: {
    title: '이용약관',
    type: 'page',
    display: 'hidden'
  }
}
