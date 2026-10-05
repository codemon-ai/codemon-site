/** 강의 카탈로그 단일 소스 (스펙 §4.3). outline/deliverables 는 P4.3에서 채움. */
export interface Lecture {
  slug: string
  title: string
  kind: 'self' | 'corporate'
  audience: '실무자' | '개발자' | '임원' | '비개발자'
  hours: number
  outline: { title: string; minutes: number }[]
  prerequisites: string[]
  deliverables: string[]
  refs: string[]                 // /partner/*, /webinar
  visibility: 'public' | 'anonymous' | 'private'
  clientLabel?: string
  summary: string
}
export const lectures: Lecture[] = [
  { slug: 'claude-masterclass', title: 'Claude 마스터클래스 — Chat부터 Code까지', kind: 'corporate', audience: '실무자', hours: 7, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-ai-masterclass'], visibility: 'public', summary: '10개 파트 · 업무 자동화부터 바이브 코딩 배포까지 Claude 생태계 전체.' },
  { slug: 'claude-build', title: '클로드로 만드는 나만의 지식노트 + 배포되는 내 사이트', kind: 'corporate', audience: '비개발자', hours: 4, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-claude-build', '/slides/lecture-claude-build.html'], visibility: 'public', summary: '지식노트 볼트부터 라이브 사이트 배포까지 4시간 실습.' },
  { slug: 'trading-bot', title: '신호가 오면 자동 주문하는 나만의 투자 봇 (페이퍼)', kind: 'corporate', audience: '개발자', hours: 2, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-trading-bot', '/slides/lecture-trading-bot.html'], visibility: 'public', summary: '웹훅-주문-알림 파이프라인, 페이퍼 전용.' },
  { slug: 'startup-ai', title: 'AI 시대, 5명이 50명을 이기는 법', kind: 'corporate', audience: '임원', hours: 3, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-startup-ai', '/partner/lecture-startup-ai/slides'], visibility: 'public', summary: '스타트업 대표·C-Level — 실제 AI 팀 운영 사례 + 자동화 데모.' },
  { slug: 'agency-ai', title: 'AI 에이전트로 에이전시 업무 자동화하기', kind: 'corporate', audience: '실무자', hours: 1.5, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-agency-ai', '/partner/lecture'], visibility: 'public', summary: '에이전시 대표·기획자·개발자 — 멀티 에이전트 워크플로우, 80분.' },
  { slug: 'podl-ai', title: 'AI로 일하는 방법', kind: 'corporate', audience: '실무자', hours: 3, outline: [], prerequisites: [], deliverables: [], refs: ['/partner/lecture-podl-ai', '/partner/lecture-podl-ai/demo'], visibility: 'public', summary: '전 직무 실무자 — 팀별 AI 적용 라이브 데모 + 실전 가이드.' },
  { slug: 'webinar-vibe-coding', title: '웨비나 — Claude 바이브 코딩 핸즈온', kind: 'self', audience: '비개발자', hours: 2, outline: [], prerequisites: [], deliverables: [], refs: ['/webinar', '/webinar/prep', '/webinar/handbook'], visibility: 'public', summary: '무료 셀프 코스 — 사전 준비 가이드 + 참가자 핸드북.' },
]
export const getLecture = (slug: string) => lectures.find((l) => l.slug === slug)
