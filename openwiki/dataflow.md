---
title: "codemon-site 데이터 흐름"
type: code-doc
created: 2026-07-11
updated: 2026-07-11
tags: [code-wiki, codemon-site]
related: []
source_commit: 49990f6fa225
generator: repo-wiki-gen (claude -p)
---

> ⚠️ 자동 생성 문서 — 손편집 금지 (재생성 시 덮어씀). 소스: 레포 코드.
# 데이터 흐름

## 시나리오 1: 강의 데모 — Claude 스트리밍

1. 사용자가 `/partner/lecture-podl-ai/demo`의 데모 컴포넌트(`components/demo/*Demo.tsx`)에서 실행 → 먼저 `GET /api/demo/data?type=influencers` 등으로 `data/demo/*.json` 목업 로드
2. `POST /api/demo/claude` (`pages/api/demo/claude.ts`)가 prompt/systemPrompt를 받아 `ANTHROPIC_API_KEY`로 Anthropic SDK 스트림 생성
3. `text/event-stream`으로 `{type:'text'|'done'|'error'}` SSE 이벤트를 클라이언트에 중계 → `StreamingOutput.tsx`가 렌더링. 서버 측 저장 없음.

## 시나리오 2: 강의 설문 제출

1. `/survey/<lectureId>` 폼 → `POST /api/survey/submit` (`pages/api/survey/submit.ts`)
2. `lib/survey.ts`가 `SUPPORTED_LECTURE_IDS` 화이트리스트로 검증 후 Supabase `survey_responses` 테이블에 insert (`lib/supabase.ts`의 service role 클라이언트, RLS 우회)

## 시나리오 3: 방문자 채팅 → 텔레그램 릴레이

1. 방문자 메시지 → `POST /api/chat/send` → `lib/chat.ts`가 세션을 Vercel Blob `chat/sessions/<id>.json`에 저장
2. `lib/telegram.ts`가 Telegram Bot API(`sendMessage`)로 운영자에게 알림 (`TELEGRAM_CHAT_BOT_TOKEN`/`TELEGRAM_CHAT_NOTIFY_ID` 미설정 시 조용히 스킵)
3. 운영자 응답은 텔레그램 웹훅(`pages/api/tghook.ts`, `pages/api/chat/webhook.ts`)으로 수신 → 세션에 반영, 클라이언트는 `GET /api/chat/messages`로 폴링(폴링 방식은 미확인)

## 환경변수

`ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `ADMIN_PASSWORD`, `TELEGRAM_CHAT_BOT_TOKEN`, `TELEGRAM_CHAT_NOTIFY_ID`, `SLACK_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, Sentry용 `SENTRY_ORG`/`SENTRY_PROJECT`

## 외부 서비스

- **Anthropic Claude API** — 데모 스트리밍
- **Supabase** — 설문·구독자 영속화
- **Vercel Blob** — 채팅 세션, 뉴스레터 JSON
- **Resend** — 트랜잭션 이메일
- **Telegram Bot API** — 채팅 알림/릴레이
- **Sentry, Vercel Analytics, Google Analytics** — 관측/분석
