# codemon-site Docs Index

## 시스템 요약
- **프로젝트:** codemon.ai 브랜드 사이트 + 블로그 + 문서
- **스택:** Nextra 3.3.x + Next.js 14 (Pages Router) + TypeScript + Tailwind
- **배포:** Vercel (프리빌트: `vercel build --prod` → `vercel deploy --prebuilt --prod`)
- **현재 Phase:** 리뉴얼 진행 중 (2026.02~)

## 작업별 경로

| 작업 | 읽을 문서 |
|------|-----------|
| 리뉴얼 작업 (2026-09~) | `prd/site-renewal-2026.md` → `plans/2026-09-23-site-renewal-roadmap.md` (구 계획 `prd/renovation-plan.md`는 대체됨) |
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
| 외주 쇼케이스(/work) | `prd/work-showcase.md` + `plans/2026-08-31-work-showcase.md` (숨김·비번보호, 배포 완료) |
| 강의 데모 시스템 | `CLAUDE.md` 데모 시스템 섹션 + `data/demo/config.ts` |
| 파트너 강의 관리 (지식노트+사이트 / 투자봇) | `lecture-claude-build.md`, `lecture-trading-bot.md` (인수인계 기록 — 위치·커리큘럼·빌드 출처·TODO) |

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

- **[2026-10-06]** 리뉴얼 **P4 완료(프리뷰)** — 변환 스크립트 3종(strip-brand·convert-lesson·convert-resource), A등급 15편 `content/migrated/blog/` 스테이징(로디몬 발행), 강의 카탈로그 outline 채움(+private 3), 데모 7종 리스킨·사례화. G3 N=1 인용불가, G4 0건 — `changelog/2026-10-06.md`
- **[2026-10-06]** 리뉴얼 **P3 완료(프리뷰)** — 홈(Swiss Signal 10섹션)·인사이트 카테고리 URL+페이지네이션+글 하단 사다리·/lectures·/cases(+/work→/cases 307)·/contact(+admin 문의함)·/newsletter(/subscribe 308)·About. ⚠️ Supabase inquiries DDL 수동 적용 필요 — `changelog/2026-10-06.md`
- **[2026-10-06]** 리뉴얼 **P2 완료(프리뷰)** — frontmatter 스키마(5 카테고리, 위반=빌드 실패)·39편 이관·`data/cases.ts`(25건, kind)·`data/lectures.ts`·`data/start-here.ts`, blog _meta 수동 목록 제거 — `changelog/2026-10-06.md`
- **[2026-10-06]** 리뉴얼 **P1 완료(프리뷰)** — Swiss Signal 토큰(paper/ink/signal/band)·Pretendard·Nextra 톤·LangSwitch/구독 버튼 셸, 공개면 22파일 보라 제거(글로우·그라데이션·glass 0). 다크 옐로 버튼 on-signal — `changelog/2026-10-06.md`
- **[2026-10-06]** 리뉴얼 **P0 완료(프리뷰)** — 뉴스레터 폼 3곳(홈·푸터·헤더)+`source` 저장, 중복판정 Supabase 단일화, nav 재편(홈·인사이트 / showcase·projects·news·docs·tools 숨김), ADR-005~010 초안 — `changelog/2026-10-06.md`
- **[2026-09-23]** 콘텐츠 중심 리뉴얼 **스펙 + 6페이즈 로드맵** 작성(Swiss Signal 디자인, 메뉴 `인사이트·실습·강의·사례·About`, research-saas 통합, high-techer/airpremia 이관 게이트) — `prd/site-renewal-2026.md`·`plans/2026-09-23-site-renewal-roadmap.md`·`changelog/2026-09-23.md`
- **[2026-09-21]** `/webinar` 허브화 + `/webinar/prep`·`/webinar/handbook`(참가자 핸드북) 서빙, 정적 파일 `public/files/webinar/` — `changelog/2026-09-21.md`
- **[2026-09-18]** `/webinar` 웨비나 사전 준비 가이드 신설(Claude Code·플러그인·Playwright MCP·Orca 설치) — `changelog/2026-09-18.md`
- **[2026-08-31]** 외주 쇼케이스 `/work`(숨김·비번보호) **구현·배포 완료** — 11건 카드 + 상세 케이스 3건(Phase 1~3). `prd/work-showcase.md`·`changelog/2026-08-31.md`
- **[2026-07-24]** 열린 PR 5건(#27~#31) 전량 머지 + 설문 4문항 Supabase 마이그레이션 완료 + 안전 브랜치 정리
- **[2026-07-21]** 기반 정비 — 라우트 인벤토리(209개 전수 점검, 유실 0) + 브랜치·PR 원장 + `check-routes.sh` + ADR-004 화면 유실 방지
- **[2026-06-27]** Claude Build + Trading Bot 핸즈온 강의 2종 개요/HTML 가이드 추가, 공개 문구 톤 정리, 1과정 공식 MCP/Skill 도구 목록 보강
- **[2026-06-27]** 파트너 강의 2종(지식노트+사이트, 투자봇) 인수인계 기록 추가(`docs/lecture-claude-build.md`, `docs/lecture-trading-bot.md`) — codemon-site에서 이어 관리용
- **[2026-04-21]** Airpremia Lv1 서베이(`/survey/airpremia-lv1`) 추가 + `lib/survey.ts` 화이트리스트 전환
- **[2026-04-06]** 데모 3~7 전용 컴포넌트 구현 + Demo 6 패키지 라벨 + Demo 7 반품 분석 + 설명 팝업 + Stitch MCP 연동
