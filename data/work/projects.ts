export interface WorkProject {
  slug: string
  name: string
  realName: boolean
  client: string
  industry: string
  period: string
  status: 'live' | 'building' | 'done'
  summary: string
  role: string
  stack: string[]
  highlights: string[]
  screenshots: string[] // /images/work/<slug>/*
  liveUrl?: string
  detail?: boolean
}

// Phase 1: 디어유 1건. 나머지 10건은 Phase 2에서 추가.
export const workProjects: WorkProject[] = [
  {
    slug: 'dearu',
    name: '디어유 · bubble HOUSE',
    realName: true,
    client: '디어유(DearU)',
    industry: '커머스 · Shopify',
    period: '2026.06 —',
    status: 'live',
    summary: 'Shopify 스토어에 고객 등급·혜택(스토어크레딧) 엔진을 붙인 미들웨어 앱.',
    role: '기획 · 백엔드 · Shopify 앱 개발',
    stack: ['Shopify', 'Next.js', 'Supabase', 'Webhooks'],
    highlights: [
      '주문/결제 웹훅 기반 스토어크레딧 자동 적립',
      '고객 등급 세그먼트 · 자동 할인 연동',
      '실검증 테스트 하네스로 회귀 검증',
    ],
    screenshots: ['/images/work/dearu/cover.png'],
    detail: false,
  },
]
