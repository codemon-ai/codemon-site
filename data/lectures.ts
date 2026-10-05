/** 강의 카탈로그 단일 소스 (스펙 §4.3). outline은 partner 개요 MDX·웨비나·커리큘럼 문서에서 옮김 (2026-10-06). */
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
  visibility: 'public' | 'anonymous' | 'private'   // private: 카탈로그 비노출 (G1·G2 확인 전)
  clientLabel?: string
  summary: string
  /** G3: 인용 가능한 설문 결과만 (N ≥ 5) */
  outcome?: string
}

export const lectures: Lecture[] = [
  {
    slug: 'claude-masterclass', title: 'Claude 마스터클래스 — Chat부터 Code까지', kind: 'corporate', audience: '실무자', hours: 7,
    outline: [
      { title: 'Part 1. 왜 AI/AX인가', minutes: 25 }, { title: 'Part 2. AI를 활용하기 위한 기초', minutes: 30 },
      { title: 'Part 3. Claude 생태계 — 채팅·코워크·코드', minutes: 15 }, { title: 'Part 4. Claude 채팅 실습', minutes: 75 },
      { title: 'Part 5. Claude 코워크 실습', minutes: 70 }, { title: 'Part 6. Claude 코드(데스크탑) 실습', minutes: 80 },
      { title: 'Part 7. (심화) 터미널에서 쓰는 Claude Code', minutes: 20 }, { title: 'Part 8. (심화) Claude Code 딥서칭', minutes: 30 },
      { title: 'Part 9. (심화) 주식 분석 보고서 만들기', minutes: 25 }, { title: 'Part 10. 종합 — AI와 함께 살아가는 법', minutes: 20 },
    ],
    prerequisites: ['Claude 계정(Pro 권장) + 데스크탑 앱', '노트북 · 실습용 문서/엑셀 1~2개'],
    deliverables: ['실습에 쓴 프롬프트 라이브러리(전 세션)', 'CLAUDE.md 템플릿 + MCP 설정 가이드', '바이브 코딩 프로젝트 보일러플레이트 3종', '30일 AI 활용 로드맵'],
    refs: ['/partner/lecture-ai-masterclass'], visibility: 'public',
    summary: '10개 파트 · 업무 자동화부터 바이브 코딩 배포까지 Claude 생태계 전체.',
  },
  {
    slug: 'claude-build', title: '클로드로 만드는 나만의 지식노트 + 배포되는 내 사이트', kind: 'corporate', audience: '비개발자', hours: 4,
    outline: [
      { title: '0교시. 세팅 & 워밍업', minutes: 20 }, { title: '1교시. LLM 위키 = 나만의 지식 노트', minutes: 60 },
      { title: '2교시. Skill·MCP 개념 + Claude·Cowork 핸즈온', minutes: 60 }, { title: '3교시. 실제 배포되는 사이트 만들기 ★실습 중심', minutes: 90 },
      { title: '4교시. 마무리 & 자립', minutes: 10 },
    ],
    prerequisites: ['GitHub · Vercel 계정(무료, 구글 가입 권장)', '옵시디언(Obsidian) 설치', 'Claude 데스크탑 앱 + Pro 구독'],
    deliverables: ['클로드가 읽고 요약·검색·정리하는 내 지식노트 볼트', '인터넷에 떠 있는 내 사이트 URL', '혼자 이어갈 30일 자립 로드맵'],
    refs: ['/partner/lecture-claude-build', '/slides/lecture-claude-build.html'], visibility: 'public',
    summary: '지식노트 볼트부터 라이브 사이트 배포까지 4시간 실습.',
  },
  {
    slug: 'trading-bot', title: '신호가 오면 자동 주문하는 나만의 투자 봇 (페이퍼)', kind: 'corporate', audience: '개발자', hours: 2,
    outline: [
      { title: '0. 큰 그림 & 안전', minutes: 10 }, { title: '1. 계정·키 준비', minutes: 20 }, { title: '2. 첫 주문 — Alpaca 페이퍼', minutes: 20 },
      { title: '3. ★ 웹훅 봇 — 신호가 오면 자동 주문', minutes: 35 }, { title: '4. 텔레그램 알림 연결', minutes: 15 },
      { title: '5. 시간이 남으면 — Streamlit 대시보드', minutes: 15 }, { title: '6. 마무리 & 리스크', minutes: 5 },
    ],
    prerequisites: ['Alpaca 페이퍼 계정(무료) + API 키', 'Python 3 설치', '텔레그램 봇 토큰(선택)'],
    deliverables: ['curl 신호 → 웹훅 → Alpaca 페이퍼 자동 주문 봇', '텔레그램 체결 알림', '선택형 Streamlit 대시보드'],
    refs: ['/partner/lecture-trading-bot', '/slides/lecture-trading-bot.html'], visibility: 'public',
    summary: '웹훅-주문-알림 파이프라인, 페이퍼 전용. 수익 전략·실거래는 범위 밖.',
  },
  {
    slug: 'startup-ai', title: 'AI 시대, 5명이 50명을 이기는 법', kind: 'corporate', audience: '임원', hours: 3,
    outline: [
      { title: '1장. "지금 AI로 뭘 할 수 있는 건가요?"', minutes: 45 }, { title: '2장. "AI가 진짜 우리 회사 일을 할 수 있나요?"', minutes: 65 },
      { title: '3장. "AI만 있으면 다 되는거 아닌가요?"', minutes: 40 }, { title: '4장. "우리 회사는 어디서부터 시작하죠?"', minutes: 30 },
    ],
    prerequisites: [],
    deliverables: ['월 3달러로 AI 개발팀을 운영한 실제 구조', '리서치→글→이미지→SNS 전 과정 자동화 데모', '우리 회사 시작점 체크리스트'],
    refs: ['/partner/lecture-startup-ai', '/partner/lecture-startup-ai/slides'], visibility: 'public',
    summary: '스타트업 대표·C-Level — 실제 AI 팀 운영 사례 + 자동화 데모.',
  },
  {
    slug: 'agency-ai', title: 'AI 에이전트로 에이전시 업무 자동화하기', kind: 'corporate', audience: '실무자', hours: 1.5,
    outline: [
      { title: '1. 왜 지금 AI 에이전트인가', minutes: 15 }, { title: '2. Claude 생태계 한눈에', minutes: 15 },
      { title: '3. 에이전시에 에이전틱 팀 도입하기 ★', minutes: 25 }, { title: '4. 라이브 데모', minutes: 15 }, { title: '5. 내일부터 할 수 있는 것', minutes: 10 },
    ],
    prerequisites: [],
    deliverables: ['에이전시 업무별 에이전트 도입 지도', '내일부터 적용할 3가지 체크리스트'],
    refs: ['/partner/lecture-agency-ai', '/partner/lecture'], visibility: 'public',
    summary: '에이전시 대표·기획자·개발자 — 멀티 에이전트 워크플로우, 80분 + Q&A.',
  },
  {
    slug: 'podl-ai', title: 'AI로 일하는 방법 — 실무 중심 AX 가이드', kind: 'corporate', audience: '실무자', hours: 3,
    outline: [
      { title: 'Part 1. AI 기본 교양 — "AI, 대체 뭔데?"', minutes: 25 }, { title: 'Part 2. 우리 회사에 적용하면?', minutes: 10 },
      { title: 'Part 3. 실무에 AI 적용하기 — 라이브 데모 7선', minutes: 65 }, { title: 'Part 4. AI로 디자인까지 — Stitch 핸즈온', minutes: 15 },
      { title: 'Part 5. 팀 AI 대시보드 — 7개를 하나로', minutes: 10 }, { title: 'Part 6. 팀별 맞춤 로드맵 + Q&A', minutes: 20 },
    ],
    prerequisites: ['Claude 계정', '팀별 실제 업무 데이터 샘플(선택)'],
    deliverables: ['직무별 라이브 데모 7종(시딩·리포트·소재 트래킹·콘텐츠·현지화·라벨링·반품 분석)', '팀별 AI 적용 로드맵'],
    refs: ['/partner/lecture-podl-ai', '/partner/lecture-podl-ai/demo'], visibility: 'public',
    summary: '전 직무 실무자 — 팀별 AI 적용 라이브 데모 + 실전 가이드. 컨슈머 브랜드 17명 대상 진행.',
  },
  {
    slug: 'webinar-vibe-coding', title: '웨비나 — Claude 바이브 코딩 핸즈온', kind: 'self', audience: '비개발자', hours: 1,
    outline: [
      { title: '① 프롬프트 규칙 5 + 환경 점검', minutes: 6 }, { title: '② 스킬: 내 스킬 만들기 + superpowers', minutes: 6 },
      { title: '③ MCP·플러그인: Vercel 설치·인증·조회', minutes: 6 }, { title: '④ 브레인스토밍 스킬로 아이디에이션', minutes: 7 },
      { title: '⑤ 한방 프롬프트 날려두기', minutes: 4 }, { title: '⑥ 아티팩트로 설계 시각화', minutes: 8 },
      { title: '로컬 확인 + 한 번 수정', minutes: 6 }, { title: '⑦ Playwright 테스트', minutes: 6 }, { title: '⑧ 배포: Preview → Production', minutes: 6 },
    ],
    prerequisites: ['Claude Code 설치', 'Vercel · GitHub 계정'],
    deliverables: ['배포된 포트폴리오 사이트 URL', '내 스킬 1개 + 설계 문서'],
    refs: ['/webinar', '/webinar/prep', '/webinar/handbook'], visibility: 'public',
    summary: '무료 셀프 코스 — 60분 안에 설계·구현·테스트·배포. 사전 준비 가이드 + 참가자 핸드북.',
  },
  // ── G1(하이테커 IP 귀속) 확인 전 비노출 ──
  {
    slug: 'claude-practice-vod', title: '클로드 실무 — 챗 아티팩트에서 로컬 라이브 아티팩트까지 (VOD 10강)', kind: 'corporate', audience: '실무자', hours: 5,
    outline: [
      { title: '1. 출발 세팅 — 계정·모델·안전수칙', minutes: 30 }, { title: '2. 결과 내는 최소한 — 프롬프트 4기술 + Projects', minutes: 30 },
      { title: '3. 챗 아티팩트 ① — 문서에서 화면으로', minutes: 30 }, { title: '4. 챗 아티팩트 ② — AI가 들어간 인터랙티브 앱', minutes: 30 },
      { title: '5. 코워크 시작 — 클로드가 내 파일을 만진다', minutes: 30 }, { title: '6. 코워크 라이브 아티팩트 ① — 대시보드 뼈대', minutes: 30 },
      { title: '7. 코워크 라이브 아티팩트 ② — 내 데이터 연결', minutes: 30 }, { title: '8. 클로드 코드 전환 — 같은 앱, 다른 차원', minutes: 30 },
      { title: '9. 로컬 라이브 아티팩트 ① — 내 컴퓨터에서 굴리기', minutes: 30 }, { title: '10. 로컬 라이브 아티팩트 ② 완성', minutes: 30 },
    ],
    prerequisites: ['Claude Pro', '데스크탑 앱'], deliverables: ['내 데이터로 동작하는 라이브 대시보드(로컬 구동)'],
    refs: [], visibility: 'private', clientLabel: '교육 플랫폼 VOD',
    summary: 'VOD 10강 — 챗 아티팩트, 코워크, 클로드 코드로 이어지는 라이브 아티팩트 제작.',
  },
  {
    slug: 'claude-code-wiki-bot-vod', title: '클로드 코드 심화 — LLM Wiki에서 텔레그램 봇까지 (VOD 10강)', kind: 'corporate', audience: '실무자', hours: 5,
    outline: [
      { title: '1. 워밍업 — 클로드 코드 작업환경 정비', minutes: 30 }, { title: '2. LLM Wiki — RAG와 뭐가 다른가', minutes: 30 },
      { title: '3. 볼트 + CLAUDE.md 스키마', minutes: 30 }, { title: '4. Ingest · Query · Lint — 위키 운영 3대 작업', minutes: 30 },
      { title: '5. 실전 — 내 도메인 지식 위키 구축', minutes: 30 }, { title: '6. claude -p — 대화창 없이 클로드를 부른다', minutes: 30 },
      { title: '7. 내 위키로 답하는 봇 두뇌 완성', minutes: 30 }, { title: '8. 텔레그램 연결', minutes: 30 },
      { title: '9. 되먹임 루프 — 대화를 위키에 적립', minutes: 30 }, { title: '10. 운영·자립 30일 로드맵', minutes: 30 },
    ],
    prerequisites: ['Claude Pro', 'Claude Code CLI', 'Obsidian'], deliverables: ['쓸수록 똑똑해지는 내 지식 위키', '그 위키로 답하는 텔레그램 봇'],
    refs: [], visibility: 'private', clientLabel: '교육 플랫폼 VOD',
    summary: 'VOD 10강 — LLM 위키 구축부터 헤드리스 클로드·텔레그램 봇까지.',
  },
  // ── G2(항공사 v4 귀속) 확인 전 비노출. 확인 후 visibility: 'anonymous' ──
  {
    slug: 'ai-employee-claude-ms365', title: '내일을 대신하는 AI 직원 — Claude + MS365 (7H)', kind: 'corporate', audience: '실무자', hours: 7,
    outline: [
      { title: '1. AI 두뇌 이식하기 (ChatGPT → Claude)', minutes: 90 }, { title: '2. 보고서·엑셀 자동화 템플릿 구축하기', minutes: 60 },
      { title: '3. 나만의 Claude Project로 이메일 자동화 구축하기', minutes: 60 }, { title: '4. 내 업무 대신 일하는 AI 파이프라인 설계하기', minutes: 90 },
      { title: '5. 나만의 AI 직원 만들기 (업무 자동화 설계)', minutes: 90 }, { title: '6. AI 활용 리스크 사례 분석 및 대응 전략 수립하기', minutes: 30 },
    ],
    prerequisites: ['Claude Team/Pro + MS365 커넥터 권한', '실습용 샘플 엑셀·메일함(제공)'],
    deliverables: ['업무 분해표', '보고서 Skill', '이메일 분류표 + Project', '파이프라인 캔버스', 'AI 직원 구성도 · 실행계획', 'AI 활용 체크리스트'],
    refs: [], visibility: 'private', clientLabel: '항공사 임직원 AI 교육 (7H, 2026-07)',
    summary: '하루 7시간 — ChatGPT에서 Claude로 옮기고, 보고서·이메일·파이프라인을 자동화해 나만의 AI 직원을 조립.',
    // G3 조회(2026-10-06): 설문 N=1 → 인용 불가. outcome 미기재.
  },
]
export const publicLectures = lectures.filter((l) => l.visibility !== 'private')
export const getLecture = (slug: string) => lectures.find((l) => l.slug === slug)
