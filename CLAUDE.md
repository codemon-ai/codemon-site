# codemon-site

AI/AX 엔지니어 CodeMon의 브랜드 사이트 + 기술 블로그 + 문서

> **현재 Phase:** 리뉴얼 진행 중 (2026.02~)

## 작업 시작 전 필수
1. `docs/INDEX.md` 읽기 — 작업별 경로, 문서 구조, 최근 변경 확인
2. `docs/changelog/` 최신 파일 읽기 — 직전 작업 맥락 파악

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run start   # Start production server
```

## 팀 역할 분담

| 역할 | 누가 | 하는 일 |
|------|------|---------|
| **코드몬** (사람) | 프로젝트 오너 | 글 작성 (옵시디언), 방향 결정, 최종 승인 |
| **로디몬** (OpenClaw AI) | 퍼블리셔 + 운영 | 이미지 생성, MDX 변환, git push, 발행 |
| **Claude Code** (너) | 개발자 | 사이트 기능 개발, 컴포넌트 구현, 버그 수정 |

### Claude Code가 하지 않는 것
- 콘텐츠(MDX) 직접 작성/발행 (로디몬 담당)
- `ecosystem.config.js` 수정
- 환경변수 값 커밋
- `rm` 사용 (`trash` 사용)

## Conventions

- React functional components + TypeScript
- Tailwind CSS, `dark:` variant 필수
- Framer Motion 애니메이션 (staggered reveal)
- `index` 페이지: `layout: 'raw'`, 기타: Nextra docs 레이아웃
- 포인트 컬러: `#a855f7` (보라) — 상세: `docs/spec/design-guide.md`

## DoD (작업 완료 시 필수)

1. `docs/changelog/YYYY-MM-DD.md` 업데이트
2. 구조 변경 시 `docs/wiki/` 해당 문서 업데이트
3. 새 기술 결정 시 `docs/wiki/decisions.md`에 ADR 추가
4. `docs/INDEX.md` 최근 변경 목록 갱신

## 블로그 포스트 템플릿

```mdx
---
title: "제목"
description: "한 줄 요약 (SEO)"
date: 2026-02-17
author: codemon
tags: [태그1, 태그2]
---
```

이미지 경로: `/images/blog/{slug}/01.png`
메타 등록: `pages/blog/_meta.ts`에 최신 글 맨 위 추가

## 슬라이드 제작

강의 발표 슬라이드를 단일 HTML로 생성하는 스킬:

```
.claude/skills/frontend-slides/
```

- `/frontend-slides` 스킬 호출로 사용
- 제로 의존성 단일 HTML (인라인 CSS/JS)
- 12가지 스타일 프리셋, 키보드 네비게이션, 16:9
- PPT 변환: `python3 scripts/extract-pptx.py`
- 배포: `bash scripts/deploy.sh ./my-deck/`

## Related
- Nextra 3.x: https://nextra.site
- 프로젝트 구조/스택 상세: `docs/wiki/architecture.md`
- 디자인 가이드: `docs/spec/design-guide.md`
- 리뉴얼 계획: `docs/prd/renovation-plan.md`
