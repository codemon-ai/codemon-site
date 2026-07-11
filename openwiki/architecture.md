---
title: "codemon-site 아키텍처 개요"
type: code-doc
created: 2026-07-11
updated: 2026-07-11
tags: [code-wiki, codemon-site]
related: []
source_commit: 49990f6fa225
generator: repo-wiki-gen (claude -p)
---

> ⚠️ 자동 생성 문서 — 손편집 금지 (재생성 시 덮어씀). 소스: 레포 코드.
# 아키텍처 개요

## 기술 스택

- **프레임워크:** Next.js 14 (Pages Router) + Nextra 3.3.x (`nextra-theme-docs`) — `next.config.mjs`에서 `withNextra`로 래핑
- **언어/UI:** TypeScript, React 18, Tailwind CSS 3, Framer Motion
- **AI:** `@anthropic-ai/sdk` (강의 데모의 Claude 스트리밍), `mcp-demo-server/`의 `@modelcontextprotocol/sdk`
- **데이터:** Supabase (`@supabase/supabase-js`), Vercel Blob (`@vercel/blob`)
- **기타:** Resend(이메일, `@react-email/components`), Sentry(`sentry.*.config.ts`), next-sitemap, `@vercel/og`

## 디렉토리 구조 (핵심만)

```
pages/            # Pages Router — MDX 콘텐츠 + TSX 페이지
  api/            # API 라우트 (admin, chat, demo, newsletter, survey)
  blog/ docs/     # 공개 콘텐츠 (MDX)
  partner/        # 비공개 강의 자료 (lecture-* 6종)
  admin/          # 관리자 대시보드
components/       # demo/, lecture/, admin/ 컴포넌트
lib/              # 서버 로직 (supabase, survey, chat, telegram, email, newsletter)
data/demo/        # 강의 데모 목업 데이터 (config.ts + JSON)
mcp-demo-server/  # Claude Desktop용 로컬 MCP 서버 (별도 패키지)
scripts/          # 빌드 스크립트 (generate-posts.mjs 등)
middleware.ts     # /admin/* 세션 쿠키 가드
```

## 설계 원칙·특이사항

- `prebuild`로 `scripts/generate-posts.mjs`가 블로그 MDX frontmatter를 스캔해 `data/posts.json`을 생성 — 글 목록은 빌드 타임 산출물
- `middleware.ts`는 `/admin/*`만 매칭해 `admin_session` 쿠키 없으면 `/admin/login`으로 리다이렉트
- GitHub auto-deploy 비활성 — `vercel build --prod` → `vercel deploy --prebuilt --prod` 프리빌트 전용 (`CLAUDE.md` 배포 섹션)
- 저장소 이원화: 설문은 Supabase(`survey_responses`), 채팅 세션·뉴스레터 구독자는 Vercel Blob JSON — `scripts/migrate-blob-to-supabase.ts` 마이그레이션 스크립트 존재
- 콘텐츠(MDX) 발행은 별도 운영자(로디몬) 담당, Claude Code는 기능 개발만 (`CLAUDE.md` 역할 분담)
