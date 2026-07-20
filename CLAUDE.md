# codemon-site

AI/AX 엔지니어 CodeMon의 브랜드 사이트 + 기술 블로그 + 문서

> **현재 Phase:** 리뉴얼 진행 중 (2026.02~)

## 작업 시작 전 필수
1. `docs/INDEX.md` 읽기 — 작업별 경로, 문서 구조, 최근 변경 확인
2. `docs/changelog/` 최신 파일 읽기 — 직전 작업 맥락 파악
3. `git fetch origin && git rebase origin/main` — 묵은 브랜치에서 시작하지 않기
4. `docs/wiki/branches.md` 확인 — 열린 PR / 미머지 작업물 파악

## 🚨 화면 유실 방지 (최우선 규칙)

배포는 git이 아니라 **로컬 디스크 스냅샷**(`vercel deploy --prebuilt --prod`)이다.
→ `main`보다 뒤처진 트리에서 배포하면 **다른 브랜치의 화면이 프로덕션에서 사라진다.** (실제 사고 다수)

| 시점 | 필수 행동 |
|------|-----------|
| 작업 시작 | `git fetch origin && git rebase origin/main` |
| 배포 직전 | `pwd && git rev-parse --abbrev-ref HEAD && git status --short && git log --oneline -1` 확인 (워크트리가 여러 개다) |
| 배포 직후 | `./scripts/check-routes.sh` — 실패 0이어야 완료 |
| 페이지 추가/삭제/이동 | `docs/wiki/route-inventory.md` 갱신 |
| PR 종료 | 머지 or **명시적 폐기 + 이유 기록**. 그냥 닫지 않는다 |
| 브랜치 삭제 전 | `git log --oneline origin/main..origin/<branch>` 로 미반영 커밋 0 확인 |

- 살아있어야 할 화면 목록: `docs/wiki/route-inventory.md`
- 브랜치/PR 상태 원장: `docs/wiki/branches.md`
- ⚠️ `public/partner/`에 HTML 두지 말 것 — `pages/partner/` 라우트에 가려 404 (`/slides/` 사용)

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
5. 페이지 추가/삭제/이동 시 `docs/wiki/route-inventory.md` 갱신
6. 배포했다면 `./scripts/check-routes.sh` 통과 확인

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

> ⚠️ 2026-07-21 확인: `~/.nvm`은 **더 이상 존재하지 않는다** (node v22.23.0 @ `~/.local/bin`, hermes/fnm).
> 예전 문서의 `~/.nvm/versions/node/v22.14.0/bin` 경로는 `npm: command not found`로 실패한다.

```bash
CLEAN='env -i HOME=/Users/codemon PATH=/Users/codemon/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin'

# 1. 로컬 빌드
$CLEAN /bin/bash -c 'npm run build'

# 2. Vercel 프리빌트 + 배포 (배포 직전 pwd/브랜치/git status 확인!)
$CLEAN /bin/bash -c 'vercel build --prod'
$CLEAN /bin/bash -c 'vercel deploy --prebuilt --prod'

# 3. 검증 — 라우트 생존 확인 (필수) + 눈으로 확인
./scripts/check-routes.sh
playwright-cli open https://codemon.ai/<path>
```

## Related
- Nextra 3.x: https://nextra.site
- 프로젝트 구조/스택 상세: `docs/wiki/architecture.md`
- 디자인 가이드: `docs/spec/design-guide.md`
- 리뉴얼 계획: `docs/prd/renovation-plan.md`
