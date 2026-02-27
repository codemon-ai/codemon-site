# codemon.ai 사이트 리뉴얼 계획서

> 작성일: 2026.02.27
> 기준 문서: brandsite-strategy.md / contents-strategy.md / seo-marketing-strategy
> 현재 스택: Nextra 3 + Next.js 14 (Pages Router) + Tailwind + Framer Motion + Vercel

---

## 현재 상태 요약

| 항목 | 현재 | 비고 |
|------|------|------|
| Hero 메시지 | "Pro Vibe Coder & Cracked Engineer" + "혼자서 팀을 대체합니다" | 개인 브랜딩 느낌 |
| Features 4칸 | AI가 일한다 / 생각하면 만든다 / 경계가 없다 / 오래 살아남았다 | 추상적 |
| CTA | "만들고 싶은 게 있나요?" → 데모 사이트 보기 | 외주 중심 |
| About | 커리어 타임라인 + Stats + TechStack + Projects | AI 팀 소개 없음 |
| Showcase | 데모 사이트 7개 (클리닉, 스토어 등 외주 예시) | Before/After 없음 |
| Projects | 13개 프로젝트 카드 (운영6 + 개발7) | 대시보드형 아님 |
| Blog | ~35개 글, 태그 기반 필터 | 카테고리 3분류 없음 |
| Docs | "🚧 준비 중" 한 페이지 | 사실상 비어있음 |
| 수익화 장치 | 없음 | 이메일 수집, CTA→유료 없음 |
| 네비게이션 | Home / Blog / Showcase / Tools / Docs / Projects / About | 순서 조정 필요 |

---

## Phase 1 — 핵심 메시지 교체 (즉시, 1~3일)

> 목표: 방문자가 3초 안에 "이 사람 뭐 하는 사람?" 을 알게 한다

### 1-1. Home — Hero 섹션 리뉴얼

**현재:**
```
Pro Vibe Coder & Cracked Engineer
혼자서 팀을 대체합니다
```

**변경:**
```
codemon.ai
AI로 일하는 방식을 바꾸는 엔지니어

AI 에이전트와 함께 설계하고, 직접 만들고, 바로 배포합니다.
```

**작업:**
- [ ] `components/Hero.tsx` — 타이틀/서브타이틀/설명 텍스트 교체
- [ ] `pages/index.mdx` — Hero props 업데이트
- [ ] CTA 버튼 2개 추가: `[문의하기]` `[쇼케이스 보기 →]`

### 1-2. Home — Features (4 Pillars) 교체

**현재:**
```
01. AI가 일한다
02. 생각하면 만든다
03. 경계가 없다
04. 오래 살아남았다
```

**변경:**
```
01. AI 에이전트 설계 — 반복 업무를 AI 팀에게 넘기는 시스템을 만듭니다
02. 빠른 실증(PoC) — 아이디어를 동작하는 프로토타입으로 바꿉니다
03. End-to-End AX — 기획부터 배포, 자동화까지 AI 팀이 함께 끝냅니다
04. 현장 경험 — 대기업 시스템과 스타트업 속도, 양쪽을 아는 엔지니어
```

**작업:**
- [ ] `components/Features.tsx` — features 배열 데이터 교체

### 1-3. Home — CTA 섹션 메시지 변경

**현재:** "만들고 싶은 게 있나요?" (외주 중심)
**변경:** "AI로 바꾸고 싶은 업무가 있나요?" (AX 컨설팅 중심)

**작업:**
- [ ] `components/ContactCTA.tsx` — 헤딩, 설명, 버튼 텍스트 교체
- [ ] 버튼 2개: `[문의하기]` + `[쇼케이스 보기 →]`

---

## Phase 2 — About 페이지 리뉴얼 (3~5일)

> 목표: "왜 이 사람이어야 해?" — 스토리 + AI 팀으로 신뢰 구축

### 2-1. About 구조 변경

**현재:** 간단한 소개 + Career + Stats + TechStack + Projects
**변경:** 3섹션 구조

```
[섹션 1: 스토리]
"Pro Vibe Coder & Cracked Engineer" (여기서 활용!)
- 커리어 타임라인 (기존 Career 컴포넌트 활용)
- 대기업 → 스타트업 → AI/AX Engineer 여정

[섹션 2: AI Agent Team] ⭐ 신규
"저는 혼자 일하지 않습니다. AI 에이전트 팀과 함께합니다."
- 7명 에이전트 카드 (캐릭터 이모지 + 이름 + 동물 + 역할 + 거주지)
- 로디🦊 누비🐕 베어🐻‍❄️ 뉴비🐣 나래🦜 옥토🐙 아울🦉

[섹션 3: 일하는 방식]
1. 문제 파악 → 2. 설계 → 3. 구축 → 4. 운영
```

**작업:**
- [ ] `components/AgentTeam.tsx` — 신규 컴포넌트 생성 (에이전트 7명 카드)
- [ ] `components/WorkProcess.tsx` — 신규 컴포넌트 (4단계 프로세스)
- [ ] `pages/about.mdx` — 구조 재배치 ("Pro Vibe Coder"는 About 스토리로 이동)
- [ ] `components/Career.tsx` — 현재 → AI/AX Engineer 단계 추가

---

## Phase 3 — Showcase 리뉴얼 (5~7일)

> 목표: "실제로 뭘 만들었지?" — Before/After + AI 기여도로 증거 제시

### 3-1. Showcase 카드 구조 변경

**현재:** 외주 데모 사이트 7개 (클리닉, 스토어, 대시보드 등)
**변경:** 실제 프로젝트 중심 + Before/After + AI 팀 기여도

```
[프로젝트 카드]
├── 프로젝트명
├── 카테고리 (AI 자동화 / AX 구축 / 도구 제작)
├── 문제 (Before)
├── 해결 (What)
├── 결과 (After + 숫자)
├── 기술 스택
├── AI 팀 기여도 (어떤 에이전트가 뭘 했는지)
└── [자세히 보기 →]
```

**초기 콘텐츠:**
- tools.codemon.ai (15개 개발자 도구)
- codemon.ai 사이트 자체 (이 리뉴얼!)
- AI 에이전트 워크플로우
- 기존 외주 데모 중 유지할 것 선별

**작업:**
- [ ] `components/ShowcaseCard.tsx` — 카드 구조 리디자인 (Before/After, AI 기여도)
- [ ] `pages/showcase.mdx` — 콘텐츠 교체 (실제 프로젝트 중심)

---

## Phase 4 — Projects 대시보드화 (7~10일)

> 목표: "지금 뭘 하고 있지?" — 살아있는 사이트

### 4-1. Projects 구조 변경

**현재:** 운영 중 / 개발 중 2그룹, 단순 카드 나열
**변경:** 대시보드형, 4그룹

```
🟢 Active — 진행중 프로젝트
📝 Writing — 집필중인 글 (제목 + 진행률)
🔵 Planned — 예정된 프로젝트/글
⚫ Completed → Showcase 보기
```

**공개 수준 3단계 표시:**
- 🟢 Public: 전부 공개
- 🟡 Partial: 이름 비공개, 업종/결과만
- 🔴 Private: "비공개 프로젝트 N건 진행중"

**작업:**
- [ ] `components/ProjectCard.tsx` — 상태 뱃지, 진행률 바, 공개수준 추가
- [ ] `pages/projects/index.mdx` — 4그룹 재구성

---

## Phase 5 — Docs 구축 (10~14일)

> 목표: "정리도 잘하네" — For Everyone + For Builders 2트랙

### 5-1. Docs 구조 설계

**현재:** "🚧 준비 중" 한 페이지
**변경:**

```
Docs
├── index.mdx (개요 + 2트랙 소개)
├── 🟦 for-everyone/
│   ├── vibe-coding-start.mdx — 바이브 코딩 시작하기
│   └── ai-automation-intro.mdx — AI로 반복 업무 없애기
└── 🟧 for-builders/
    ├── claude-code-workflow.mdx — Claude Code 실전 워크플로우
    └── ai-agent-team-building.mdx — AI 에이전트 팀 구성하기
```

**작업:**
- [ ] `pages/docs/_meta.ts` — 2트랙 네비게이션 구성
- [ ] `pages/docs/index.mdx` — 개요 페이지 (For Everyone / For Builders 안내)
- [ ] 초기 가이드 2~4개 작성 (킥오프 콘텐츠)

---

## Phase 6 — Blog 카테고리 정리 (병행)

> 목표: "진짜 아는구나" — 3카테고리로 전문성

### 6-1. 블로그 카테고리 체계화

**현재:** 태그 기반 (ai, tips, insight, news, project, series, hands-on, 인프라)
**변경:** 3대 카테고리 + 태그 유지

```
AX 실전기 — "직접 해봤다" (hands-on, project)
AI 도구 리뷰 — "써봤다" (tips, news)
AX 인사이트 — "이렇게 생각한다" (insight, series)
```

**작업:**
- [ ] `components/BlogIndex.tsx` — 카테고리 필터 추가 (기존 태그 위에)
- [ ] 기존 35개 글에 카테고리 매핑 (frontmatter에 category 필드 추가)

---

## Phase 7 — 수익화 기반 세팅 (14~21일)

> 목표: 이메일 수집 + 유료 전환 퍼널 시작

### 7-1. 이메일 수집 장치

**작업:**
- [ ] 뉴스레터 구독 폼 추가 (스티비 연동)
  - 블로그 글 하단
  - Home CTA 섹션
  - 사이드바 or 팝업
- [ ] 리드마그넷 기획 (무료 체크리스트/가이드 1개)

### 7-2. 블로그 → 유료 CTA 연결

**작업:**
- [ ] 블로그 글 하단에 관련 유료 상품 CTA 배너 컴포넌트
- [ ] 검로드/크티 상품 연결 준비

---

## Phase 8 — 네비게이션 & SEO 최적화 (병행)

### 8-1. 네비게이션 순서 재정리

**현재:** Home / Blog / Showcase / Tools / Docs / Projects / About
**변경:** Home / About / Showcase / Projects / Blog / Tools / Docs

**이유:** 방문자 퍼널 순서
```
Home(첫인상) → About(신뢰) → Showcase(증거) → Projects(깊이)
→ Blog(전문성) → Tools(유입) → Docs(체계)
```

**작업:**
- [ ] `pages/_meta.ts` — 순서 재배치

### 8-2. SEO 강화

- [ ] 각 페이지 meta description 전략 문서 기준으로 업데이트
- [ ] Blog 글 slug/제목 SEO 키워드 최적화 점검
- [ ] JSON-LD 구조화 데이터 확인/보강

---

## 실행 우선순위 요약

| 순서 | Phase | 작업 | 예상 기간 | 임팩트 |
|------|-------|------|-----------|--------|
| 1 | **Phase 1** | Hero + Features + CTA 메시지 교체 | 1~3일 | ⭐⭐⭐⭐⭐ |
| 2 | **Phase 8-1** | 네비게이션 순서 변경 | 30분 | ⭐⭐⭐ |
| 3 | **Phase 2** | About 리뉴얼 (AI 팀 소개) | 3~5일 | ⭐⭐⭐⭐⭐ |
| 4 | **Phase 3** | Showcase 리뉴얼 | 5~7일 | ⭐⭐⭐⭐ |
| 5 | **Phase 4** | Projects 대시보드화 | 3~5일 | ⭐⭐⭐ |
| 6 | **Phase 5** | Docs 구축 | 7~14일 | ⭐⭐⭐⭐ |
| 7 | **Phase 6** | Blog 카테고리 정리 | 2~3일 | ⭐⭐⭐ |
| 8 | **Phase 7** | 수익화 기반 세팅 | 7~14일 | ⭐⭐⭐⭐ |

---

## 디자인 가이드라인 — 흑백 + 보라 포인트

### 컬러 시스템

```
배경:     #0a0a0a (다크) / #ffffff (라이트)
텍스트:   #fafafa (다크) / #000000 (라이트)
포인트:   #a855f7 (보라) — 버튼, 링크, hover, 강조에만 사용
서브:     gray 계열만 (border, muted text 등)
```

### 제거/통일 대상

| 현재 | 변경 |
|------|------|
| `accent.pink: #ec4899` | 제거 → 보라 단일 |
| `primary` 블루 계열 (50~900) | 사용 최소화, 포인트는 보라로 |
| Footer 버튼 `보라→핑크 그라디언트` | `보라 단색` or `보라→진보라 그라디언트` |
| Stats 아이콘 4색 (파/보/주/노) | `보라` 단일 or `흑백` |
| Career 아이콘 3색 (파/빨/보핑) | `보라` 단일 or `흑백` |
| glow 애니메이션 보라↔핑크 | 보라 단일 glow |

### 원칙
- 색은 최소로, 여백은 넉넉히
- 포인트 컬러는 "누르거나 봐야 할 곳"에만
- 다크모드 기본, 라이트모드도 깔끔하게

---

## 핵심 원칙

1. **전략 문서가 기준** — 감이 아니라 문서에 적힌 대로
2. **메시지 먼저** — 코드보다 메시지가 먼저 (무슨 말을 할지 정하고 → 코드로 구현)
3. **점진적 배포** — Phase 1만 해도 첫인상이 달라진다
4. **만들면서 채운다** — Showcase, Blog, Docs는 만들면서 콘텐츠가 쌓이는 구조

---

*이 계획서는 brandsite-strategy.md, contents-strategy.md, seo-marketing-strategy 문서를 기반으로 작성되었습니다.*
