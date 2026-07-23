---
title: "codemon-site 주요 모듈"
type: code-doc
created: 2026-07-11
updated: 2026-07-11
tags: [code-wiki, codemon-site]
related: []
source_commit: 49990f6fa225
generator: repo-wiki-gen (claude -p)
---

> ⚠️ 자동 생성 문서 — 손편집 금지 (재생성 시 덮어씀). 소스: 레포 코드.
# 주요 모듈

## 1. 강의 데모 API
- **책임:** Claude API 프록시(SSE 스트리밍)와 목업 데이터 서빙. 모델 `claude-sonnet-4-6`, K-뷰티 브랜드 AI 비서 기본 시스템 프롬프트.
- **진입점:** `pages/api/demo/claude.ts`, `pages/api/demo/data.ts`
- **의존:** `@anthropic-ai/sdk`, `data/demo/config.ts` + JSON 6종(influencers, sales, sns-posts, products, marketing-copy 등)

## 2. 데모 UI 컴포넌트
- **책임:** 강의(lecture-podl-ai)용 라이브 데모 7종 — 시딩/리포트/트래킹/콘텐츠/현지화/라벨/반품 각각 Demo+Viewer 쌍.
- **진입점:** `components/demo/DemoShell.tsx`, `components/demo/StreamingOutput.tsx` 외 20개 파일
- **의존:** `pages/api/demo/*` 호출, `pages/partner/lecture-podl-ai/`에서 사용

## 3. 설문(survey)
- **책임:** 강의 설문 수집·검증. 화이트리스트 `SUPPORTED_LECTURE_IDS` 4종으로 lectureId 검증.
- **진입점:** `lib/survey.ts`, `pages/api/survey/submit.ts`, `pages/survey/`
- **의존:** `lib/supabase.ts`(admin client), `@vercel/blob`

## 4. 방문자 채팅
- **책임:** 사이트 방문자 채팅 세션 관리와 텔레그램 릴레이(운영자 알림·응답).
- **진입점:** `lib/chat.ts`, `pages/api/chat/{send,messages,tg,webhook}.ts`, `pages/api/tghook.ts`
- **의존:** Vercel Blob(`chat/sessions/*.json`), `lib/telegram.ts`

## 5. 뉴스레터·이메일
- **책임:** 구독자 저장(Blob `newsletter/subscribers.json`)과 Resend 발송(`noreply@codemon.ai`).
- **진입점:** `lib/newsletter.ts`, `lib/email.ts`, `pages/api/newsletter/subscribe.ts`, `emails/`
- **의존:** Vercel Blob, Supabase, Resend

## 6. 관리자(admin)
- **책임:** 비밀번호 로그인, 구독자/설문/메일링 관리.
- **진입점:** `middleware.ts`, `pages/api/admin/login.ts`, `lib/admin/auth.ts`, `pages/admin/`
- **의존:** `ADMIN_PASSWORD` 환경변수, 세션 쿠키 `admin_session`

## 7. MCP 데모 서버
- **책임:** BO:DL 데모 데이터를 Claude Desktop에 노출하는 로컬 MCP 서버 (별도 npm 패키지, `tsx src/index.ts`로 실행).
- **진입점:** `mcp-demo-server/src/index.ts`
- **의존:** `@modelcontextprotocol/sdk`
