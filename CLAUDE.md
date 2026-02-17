# codemon-site

브랜드 랜딩 + 기술 문서 사이트

## Tech Stack

- **Framework:** Nextra 3.3.x (nextra-theme-docs)
- **Runtime:** Next.js 14.x (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Nextra theme

## Project Structure

```
codemon-site/
├── pages/              # Pages Router
│   ├── _app.tsx        # App wrapper
│   ├── _meta.ts        # Top-level navigation
│   ├── index.mdx       # Brand landing page (layout: raw)
│   ├── about.mdx       # About page
│   ├── projects/       # Projects section
│   ├── blog/           # Blog section
│   └── docs/           # Documentation section
├── components/         # React components
│   ├── Hero.tsx        # Landing hero section
│   └── Features.tsx    # Features cards
├── theme.config.tsx    # Nextra theme config
├── next.config.mjs     # Next.js config
└── tailwind.config.js  # Tailwind config
```

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run start   # Start production server
```

## Conventions

### Page Layout
- `index` page: `layout: 'raw'` (no sidebar/TOC)
- Other pages: Standard Nextra docs layout

### Components
- React functional components with TypeScript
- Tailwind CSS for styling
- Support dark mode with `dark:` variants

### Colors
- Primary: Blue gradient (#3b82f6 → #8b5cf6)
- Background: Light (#ffffff) / Dark (#0a0a0a)

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

## 블로그 포스트 템플릿 (codemon.ai)

기술 블로그. Tech Lead 관점, 개발자 대상.

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
