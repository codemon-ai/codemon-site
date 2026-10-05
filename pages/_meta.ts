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
  lectures: {
    title: '강의',
    type: 'page'
  },
  cases: {
    title: '사례',
    type: 'page'
  },
  about: {
    title: 'About',
    type: 'page'
  },
  insights: {
    title: '인사이트 카테고리',
    type: 'page',
    display: 'hidden'
  },
  contact: {
    title: '문의',
    type: 'page',
    display: 'hidden',
    theme: { layout: 'raw', breadcrumb: false, sidebar: false, toc: false, pagination: false }
  },
  newsletter: {
    title: '뉴스레터',
    type: 'page',
    display: 'hidden',
    theme: { layout: 'raw', breadcrumb: false, sidebar: false, toc: false, pagination: false }
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
