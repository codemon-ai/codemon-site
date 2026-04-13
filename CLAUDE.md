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

## 강의 자료 (partner/)

강의 개요(MDX) + 슬라이드(HTML) + 데모 + 배포를 관리하는 스킬:

| 스킬 | 경로 | 용도 |
|------|------|------|
| `partner-lecture` | `.claude/skills/partner-lecture/` | 강의 개요 MDX 생성/업데이트 + 배포 |
| `partner-slide` | `.claude/skills/partner-slide/` | 강의 슬라이드 HTML 생성/업데이트 + 배포 |
| `frontend-slides` | `.claude/skills/frontend-slides/` | 범용 HTML 프레젠테이션 생성 (partner-slide가 내부 호출) |
| `publish-private-content` | `.claude/skills/publish-private-content/` | /partner/ 배포 워크플로우 (빌드→커밋→배포→검증) |
| `verify-deploy` | `.claude/skills/verify-deploy/` | 배포 후 playwright-cli 기반 페이지 검증 |

**현재 강의 목록:**
- `lecture-agency-ai`: 개요 `/partner/lecture-agency-ai` + 슬라이드 `/partner/lecture#slide=0`
- `lecture-startup-ai`: 개요 `/partner/lecture-startup-ai` + 슬라이드 `/partner/lecture-startup-ai/slides`
- `lecture-podl-ai`: 개요 `/partner/lecture-podl-ai` + 데모 `/partner/lecture-podl-ai/demo` + 대시보드 `/partner/lecture-podl-ai/demo/dashboard`

**데모 시스템 (lecture-podl-ai):**
- `data/demo/`: 목업 데이터 (config, 인플루언서, 매출, SNS, 제품, 마케팅카피) — 회사 교체로 재사용
- `components/demo/`: DemoShell, StreamingOutput, DataPreview, Dashboard
- `pages/api/demo/`: Claude API 프록시(스트리밍) + 데이터 서빙
- 환경변수: `ANTHROPIC_API_KEY` (Vercel Dashboard에서 설정)

## 진행중 작업 (TODO)

**데모 페이지 (lecture-podl-ai) — 7개 완료:**
- [x] Demo 1 시딩 — 인플루언서별 병렬 생성 + 톤 드롭다운 + 마크다운 뷰어 새창
- [x] Demo 2 리포트 — 1000건 데이터 + SVG 차트 5개 + 리포트 새창
- [x] Demo 3 소재 트래킹 — KPI + 필터 + 정렬 테이블 + 차트 뷰어
- [x] Demo 4 콘텐츠 생성 — 제품 카드 + 4유형 병렬 스트리밍 + 탭 뷰어
- [x] Demo 5 글로벌 현지화 — 5마켓 토글 + 병렬 현지화 + 비교 뷰어
- [x] Demo 6 패키지 라벨링 — 4개국 규제 + 병렬 스트리밍 + 국가별 비교 뷰어
- [x] Demo 7 반품 분석 — 200건 반품 + 필터 + 사유 패턴 분석 + CS 메시지
- [x] 전 데모 📖 설명 팝업 버튼 (비개발자 대상 다이어그램)

**MCP 연동:**
- [x] 로컬 MCP 서버 기본 구축 (mcp-demo-server/, 도구 6개)
- [x] Google Stitch 2.0 MCP 연동 (.mcp.json, API key, 라벨 디자인 7스크린 생성)
- [ ] MCP 고수준 워크플로우 도구 추가 (generate_seeding_email, generate_daily_report 등)
- [ ] Claude Desktop Project Instructions 템플릿 작성

**기타:**
- [ ] 강의 슬라이드 HTML 생성 (partner-slide 스킬)

## 배포

GitHub auto-deploy **비활성화** 상태. Vercel CLI 프리빌트 전용:

```bash
# 1. 로컬 빌드 (nvm 재귀 우회)
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'npm run build'

# 2. Vercel 프리빌트 + 배포
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/Users/codemon/Library/pnpm:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'vercel build --prod'
env -i HOME=/Users/codemon PATH="/Users/codemon/.nvm/versions/node/v22.14.0/bin:/Users/codemon/Library/pnpm:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin" /bin/bash -c 'vercel deploy --prebuilt --prod'

# 3. 검증 (verify-deploy 스킬)
playwright-cli open https://codemon.ai/<path>
```

## Related
- Nextra 3.x: https://nextra.site
- 프로젝트 구조/스택 상세: `docs/wiki/architecture.md`
- 디자인 가이드: `docs/spec/design-guide.md`
- 리뉴얼 계획: `docs/prd/renovation-plan.md`
