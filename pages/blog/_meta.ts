// 포스트 목록은 frontmatter → data/posts.json 이 단일 소스 (ADR-007). 여기엔 index 레이아웃만 둔다.
export default {
  index: {
    title: '전체 글',
    theme: { layout: 'raw', breadcrumb: false, sidebar: false, toc: false, pagination: false },
  },
}
