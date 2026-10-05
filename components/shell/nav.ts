/** 공개 네비 5칸 — pages/_meta.ts 와 동기 (Nextra 네비 + tsx 페이지 SiteShell 공용) */
export const NAV = [
  { href: '/', label: '홈' },
  { href: '/blog', label: '인사이트', match: ['/blog', '/insights'] },
  { href: '/lectures', label: '강의' },
  { href: '/cases', label: '사례' },
  { href: '/about', label: 'About' },
]
