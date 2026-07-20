# codemon-site Docs Index

## 시스템 요약
- **프로젝트:** codemon.ai 브랜드 사이트 + 블로그 + 문서
- **스택:** Nextra 3.3.x + Next.js 14 (Pages Router) + TypeScript + Tailwind
- **배포:** Vercel (프리빌트: `vercel build --prod` → `vercel deploy --prebuilt --prod`)
- **현재 Phase:** 리뉴얼 진행 중 (2026.02~)

## 작업별 경로

| 작업 | 읽을 문서 |
|------|-----------|
| 리뉴얼 작업 | `prd/renovation-plan.md` → `spec/design-guide.md` |
| 새 기능 추가 | `wiki/architecture.md` → 관련 `spec/` |
| 컴포넌트 수정 | `spec/design-guide.md` + `wiki/architecture.md` |
| 블로그/뉴스 발행 | `CLAUDE.md` 역할 분담 섹션 (로디몬 담당) |
| 배포 | `wiki/deployment.md` + `CLAUDE.md` 배포 섹션 |
| 버그 수정 | `wiki/issues.md` + `changelog/` 최근 |
| 기술 결정 | `wiki/decisions.md` |
| 프로젝트 목록 | `wiki/projects.md` |
| **화면 유실 확인 / 라우트 점검** | `wiki/route-inventory.md` + `scripts/check-routes.sh` |
| **브랜치·PR 정리, 미머지 작업물 확인** | `wiki/branches.md` |
| 비공개 페이지 | `prd/private-page.md` |
| 강의 데모 시스템 | `CLAUDE.md` 데모 시스템 섹션 + `data/demo/config.ts` |

## 문서 구조 (CODA)

```
docs/
├── INDEX.md            ← 이 파일 (라우팅 테이블)
├── prd/                ← WHY: 왜 만드나
│   ├── renovation-plan.md
│   └── private-page.md
├── spec/               ← HOW: 구현 약속
│   ├── design-guide.md
│   ├── task-001.md
│   └── task-002.md
├── wiki/               ← NOW: 현재 실제 상태
│   ├── architecture.md
│   ├── deployment.md
│   ├── setup.md
│   ├── issues.md
│   ├── projects.md
│   ├── route-inventory.md   ← 살아있어야 할 화면 209개 기준선
│   ├── branches.md          ← 브랜치·PR 원장 (유실 방지)
│   └── decisions.md
├── changelog/          ← DELTA: 변경 기록
│   ├── 2024-01-29.md
│   ├── 2026-03-11.md
│   └── 2026-03-19.md
├── _templates/
│   └── ADR.md
└── drafts/
```

## 최근 주요 변경 (top 3)

- **[2026-07-21]** 기반 정비 — 라우트 인벤토리(209개 전수 점검, 유실 0) + 브랜치·PR 원장 + `check-routes.sh` + ADR-004 화면 유실 방지
- **[2026-06-27]** Claude Build + Trading Bot 핸즈온 강의 2종 개요/HTML 가이드 추가, 공개 문구 톤 정리, 1과정 공식 MCP/Skill 도구 목록 보강
- **[2026-04-21]** Airpremia Lv1 서베이(`/survey/airpremia-lv1`) 추가 + `lib/survey.ts` 화이트리스트 전환
- **[2026-04-06]** 데모 3~7 전용 컴포넌트 구현 + Demo 6 패키지 라벨 + Demo 7 반품 분석 + 설명 팝업 + Stitch MCP 연동
