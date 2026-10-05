/** 블로그(인사이트) frontmatter 단일 소스 (ADR-007). 검증 로직의 정본은 scripts/generate-posts.mjs — 상수는 여기와 동기 유지. */
export const CATEGORIES = {
  'agents-build':  '에이전트 직접 만들기',
  'agents-ops':    'AI 코딩 에이전트 운용',
  'models':        '모델 전쟁 — 출시·가격·벤치마크',
  'infra':         '혼자 만드는 인프라·빌드로그',
  'retrospective': '엔지니어링 회고',
} as const
export type Category = keyof typeof CATEGORIES
export const CATEGORY_IDS = Object.keys(CATEGORIES) as Category[]

export interface Post {
  slug: string
  title: string
  description: string
  date: string            // YYYY-MM-DD
  category: Category
  tags: string[]          // 소문자·하이픈 (한글 허용)
  series?: string
  lang: 'ko' | 'en'
  readingMinutes: number
}
export interface CategoryIndex { id: Category; label: string; count: number }
