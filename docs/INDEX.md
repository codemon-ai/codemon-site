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
| 배포 | `wiki/deployment.md` |
| 버그 수정 | `wiki/issues.md` + `changelog/` 최근 |
| 기술 결정 | `wiki/decisions.md` |
| 프로젝트 목록 | `wiki/projects.md` |
| 비공개 페이지 | `prd/private-page.md` |

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
│   └── decisions.md
├── changelog/          ← DELTA: 변경 기록
│   ├── 2024-01-29.md
│   └── 2026-03-11.md
├── _templates/
│   └── ADR.md
└── drafts/
```

## 최근 주요 변경 (top 3)

- **[2026-03-11]** CODA 프레임워크 적용, News 섹션 추가
- **[2026-03-11]** curl 블로그 글 + partner 페이지 git 동기화
- **[2024-01-29]** 프로젝트 초기 셋업 (Nextra 3 + Next.js 14)
