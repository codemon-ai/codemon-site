---
title: "codemon-site 코드 위키"
type: code-doc
created: 2026-07-11
updated: 2026-07-11
tags: [code-wiki, codemon-site]
related: []
source_commit: 49990f6fa225
generator: repo-wiki-gen (claude -p)
---

> ⚠️ 자동 생성 문서 — 손편집 금지 (재생성 시 덮어씀). 소스: 레포 코드.
# codemon-site 코드 위키

codemon-site는 AI/AX 엔지니어 CodeMon의 브랜드 사이트(codemon.ai)로, Nextra 3.x(Next.js 14 Pages Router) 기반의 기술 블로그 + 문서 + 비공개 강의 자료 플랫폼이다. 정적 콘텐츠(MDX 블로그/문서)와 동적 기능(Claude API 스트리밍 강의 데모, 뉴스레터, 강의 설문, 방문자 채팅→텔레그램 릴레이, 관리자 대시보드)이 한 코드베이스에 공존하며, Vercel 프리빌트 방식으로 배포된다. 데이터 저장은 Supabase와 Vercel Blob을 병행한다.

## 문서 목록

- **[architecture.md](architecture.md)** — 기술 스택, 디렉토리 구조, 설계 원칙과 특이사항
- **[modules.md](modules.md)** — 핵심 모듈 7개의 책임·진입점·의존 관계
- **[dataflow.md](dataflow.md)** — 강의 데모 스트리밍, 설문 제출, 방문자 채팅의 데이터 흐름 + 환경변수/외부 서비스 목록

기존 운영 문서는 `docs/INDEX.md`(라우팅 테이블)와 `docs/wiki/`에 별도로 관리된다.
