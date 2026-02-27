# codemon-site

AI/AX 엔지니어 CodeMon의 브랜드 사이트 + 기술 블로그 + 문서

## Tech Stack

- **Framework:** Nextra 3.3.x (nextra-theme-docs)
- **Runtime:** Next.js 14.x (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Nextra theme
- **Animation:** Framer Motion
- **Deploy:** Vercel (git push → auto deploy)
- **Analytics:** Google Analytics + Vercel Analytics
- **Error Tracking:** Sentry

## Project Structure

```
codemon-site/
├── pages/              # Pages Router
│   ├── _app.tsx        # App wrapper (GA, Analytics, ChatWidget)
│   ├── _meta.ts        # Top-level navigation
│   ├── index.mdx       # Home (layout: raw)
│   ├── about.mdx       # About page
│   ├── showcase.mdx    # Showcase page
│   ├── projects/       # Projects section (15 projects)
│   ├── blog/           # Blog section (~35 articles)
│   ├── docs/           # Documentation section
│   ├── en/             # English version (i18n)
│   ├── p/              # Private pages (hidden)
│   └── api/            # API routes (OG image, Telegram chat)
├── components/         # React components
│   ├── Hero.tsx        # Landing hero section
│   ├── Features.tsx    # 4 Pillars features cards
│   ├── ContactCTA.tsx  # CTA section
│   ├── BlogIndex.tsx   # Blog index with tag filtering
│   ├── ProjectCard.tsx # Project card component
│   ├── ShowcaseCard.tsx # Showcase card component
│   ├── Career.tsx      # Career timeline
│   ├── Stats.tsx       # Stats counter
│   ├── TechStack.tsx   # Tech stack showcase
│   ├── Footer.tsx      # Footer component
│   └── ChatWidget.tsx  # Telegram chat widget
├── styles/globals.css  # Global CSS (glass, animations)
├── theme.config.tsx    # Nextra theme config + SEO
├── next.config.mjs     # Next.js + Nextra + Sentry config
├── tailwind.config.js  # Tailwind config (colors, animations)
├── scripts/generate-posts.mjs  # Blog metadata extraction
└── docs/               # Internal docs (not public pages)
    ├── RENOVATION-PLAN.md  # ⭐ 사이트 리뉴얼 계획서
    ├── DESIGN-GUIDE.md     # ⭐ 디자인 가이드라인
    └── ...
```

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build (prebuild → build → postbuild)
npm run start   # Start production server
```

## 리뉴얼 진행 중 (2026.02~)

> 상세 계획: `docs/RENOVATION-PLAN.md`
> 디자인 가이드: `docs/DESIGN-GUIDE.md`

### 포지셔닝 변경

```
Before: "Pro Vibe Coder & Cracked Engineer" + "혼자서 팀을 대체합니다"
After:  "AI로 일하는 방식을 바꾸는 엔지니어" + AI 에이전트 팀과 함께
```

- "Pro Vibe Coder"는 About 페이지 스토리텔링 요소로 이동
- Home에는 명확한 가치 제안 중심

### 핵심 메시지 (4 Pillars)

```
01. AI 에이전트 설계 — 반복 업무를 AI 팀에게 넘기는 시스템
02. 빠른 실증(PoC) — 아이디어를 동작하는 프로토타입으로
03. End-to-End AX — 기획부터 배포, 자동화까지
04. 현장 경험 — 대기업 시스템과 스타트업 속도
```

### CTA

```
"AI로 바꾸고 싶은 업무가 있나요?"
[문의하기]  [쇼케이스 보기 →]
```

## Design Guide (요약)

> 상세: `docs/DESIGN-GUIDE.md`

### 컬러 — 흑백 + 보라 포인트

```
배경:   #0a0a0a (다크) / #ffffff (라이트)
텍스트: #fafafa (다크) / #000000 (라이트)
포인트: #a855f7 (보라) — 버튼, 링크, hover, 강조에만
서브:   gray 계열만 (border, muted text)
```

- `accent.pink` 사용하지 않음 → 보라 단일
- `primary` 블루 계열 사용 최소화 → 포인트는 보라
- 그라디언트는 `보라→진보라` 방향으로만

### 원칙
- 색은 최소로, 여백은 넉넉히
- 포인트 컬러는 "누르거나 봐야 할 곳"에만
- 다크모드 기본, 라이트모드도 깔끔하게

## Conventions

### Page Layout
- `index` page: `layout: 'raw'` (no sidebar/TOC)
- Other pages: Standard Nextra docs layout

### Components
- React functional components with TypeScript
- Tailwind CSS for styling
- Support dark mode with `dark:` variants
- Framer Motion for animations (staggered reveal pattern)

### AI 에이전트 팀

```
길벗 (CodeMon) — Founder & AI/AX Engineer
├── 로디 🦊 PM & Orchestrator (Mac Mini M1)
├── 누비 🐕 QA & Debugger (MacBook Air M2)
├── 베어 🐻‍❄️ Design & Frontend (MacBook Pro 회사)
├── 뉴비 🐣 Research & Scout (MacBook Pro 회사)
├── 나래 🦜 Content & Marketing (TBD)
├── 옥토 🐙 Backend & Infra (TBD)
└── 아울 🦉 Data & Automation (TBD)
```

## 팀 역할 분담

| 역할 | 누가 | 하는 일 |
|------|------|---------|
| **코드몬** (사람) | 프로젝트 오너 | 글 작성 (옵시디언), 방향 결정, 최종 승인 |
| **로디몬** (OpenClaw AI) | 퍼블리셔 + 운영 | 이미지 생성 (Gemini), MDX 변환, git push, 발행 |
| **Claude Code** (너) | 개발자 | 사이트 기능 개발, 컴포넌트 구현, 버그 수정 |

### Claude Code가 하지 않는 것
- 콘텐츠(MDX) 직접 작성/발행 (로디몬 담당)
- `ecosystem.config.js` 수정
- 환경변수 값 커밋
- `rm` 사용 (`trash` 사용)

## 블로그 포스트 템플릿

```mdx
---
title: "제목"
description: "한 줄 요약 (SEO)"
date: 2026-02-17
author: codemon
tags: [태그1, 태그2]
---

# 제목

도입부 — 왜 이걸 했는지, 어떤 문제였는지.

---

## 배경 / 문제

## 해결 과정

## 결과

## 배운 점

---

*관련 링크나 코드*
```

이미지 경로: `/images/blog/{slug}/01.png`
메타 등록: `pages/blog/_meta.ts`에 최신 글 맨 위 추가

## Related
- Nextra 3.x: https://nextra.site
- SWR Site (reference): https://swr.vercel.app
