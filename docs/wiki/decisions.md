# 기술 결정 기록 (ADR)

> 템플릿: `_templates/ADR.md`

---

## ADR-001: Nextra 3 선택

- **상태:** 승인
- **날짜:** 2024-01-29

### 맥락
브랜드 사이트 + 기술 블로그 + 문서를 하나의 프레임워크로 운영해야 함.

### 선택지
1. **Nextra 3** — Next.js 기반 문서 프레임워크. MDX 지원, 테마 내장, Pages Router.
2. **Docusaurus** — React 기반 문서 프레임워크. 플러그인 생태계.
3. **Astro** — 정적 사이트 빌더. 콘텐츠 중심.

### 결정
Nextra 3 선택. Next.js 14 Pages Router 위에서 돌아가므로 커스텀 컴포넌트(React) 자유도가 높고, MDX로 콘텐츠 작성이 편리함. 문서 테마가 기본 제공되어 별도 UI 작업 최소화.

### 결과
- 블로그, 문서, 랜딩 페이지를 하나의 프로젝트로 관리
- `_meta.ts`로 네비게이션 제어
- Tailwind CSS + Framer Motion 자유롭게 사용 가능

---

## ADR-002: 프리빌트 배포 방식

- **상태:** 승인
- **날짜:** 2026-02-15

### 맥락
Vercel 배포 시 빌드 시간을 줄이고 안정성을 높이기 위해 프리빌트 방식 도입.

### 선택지
1. **git push → Vercel 자동 빌드** — 간단하지만 빌드 실패 시 롤백 필요
2. **로컬 프리빌트 → Vercel deploy --prebuilt** — 빌드 검증 후 배포

### 결정
프리빌트 방식 선택. `vercel build --prod` 로컬 실행 후 `vercel deploy --prebuilt --prod`로 배포.

### 결과
- 배포 전 빌드 검증 가능
- Vercel 빌드 시간 절약
- Sentry sourcemap 업로드 등 빌드 후 작업 로컬에서 처리

---

## ADR-003: data/news.json 수동 관리

- **상태:** 승인
- **날짜:** 2026-03-11

### 맥락
News 섹션에 뉴스 데이터를 어떻게 관리할지 결정 필요.

### 선택지
1. **MDX 파일** — 블로그처럼 pages/news/ 하위에 MDX 파일
2. **JSON 파일** — data/news.json에 뉴스 메타데이터 관리
3. **CMS** — 외부 CMS 연동

### 결정
JSON 파일 방식 선택. 뉴스는 외부 링크 중심이라 별도 페이지 불필요. JSON으로 관리하면 컴포넌트에서 직접 import 가능.

### 결과
- `data/news.json`에 뉴스 항목 추가만 하면 됨
- NewsIndex 컴포넌트가 JSON 데이터를 렌더링
- 로디몬이 뉴스 발행 시 JSON 파일만 수정

---

## ADR-004: 화면 유실 방지 — 라우트 인벤토리 + 브랜치 원장

- **상태:** 승인
- **날짜:** 2026-07-21

### 맥락
브랜치 관리 실수로 **예전 화면이 프로덕션에서 사라지는 사고**가 반복됐다. 원인 3종:

1. 배포가 `vercel deploy --prebuilt --prod` (ADR-002) 방식이라 **git이 아닌 로컬 디스크 스냅샷**이 올라간다.
   워크트리가 3개(`renew`, `codemon-site`, `.claude/worktrees/*`)라 뒤처진 트리에서 배포하면 다른 작업이 통째로 덮인다.
2. 머지되지 않은 PR을 그냥 닫아 작업물이 브랜치에만 남았다 (PR #8).
3. `public/partner/*.html`이 `pages/partner/` 라우트에 가려 404 (2026-06-23, PR #20→#21).

### 선택지
1. **GitHub auto-deploy로 복귀** — 브랜치=배포가 되어 안전하지만 ADR-002의 빌드 사전검증 이점을 잃음
2. **인벤토리 + 자동 점검 스크립트 + 브랜치 원장** — 프리빌트 유지하면서 사고를 즉시 탐지
3. 현행 유지 (사람 주의력에 의존)

### 결정
2번. 프리빌트 배포(ADR-002)는 유지하되, "무엇이 살아있어야 하는가"를 문서로 고정하고 기계로 검증한다.

- `docs/wiki/route-inventory.md` — 존재해야 할 화면 209개의 기준선
- `scripts/check-routes.sh` — 전 라우트 HTTP 점검, 실패 시 exit 1 (배포 직후 필수)
- `docs/wiki/branches.md` — 브랜치·PR 원장. 미머지 작업물, 삭제 안전 여부 명시
- `CLAUDE.md` 최상단에 "화면 유실 방지" 규칙 배치

### 결과
- 배포로 화면이 사라지면 `check-routes.sh`가 즉시 잡는다 (사후 몇 주 뒤 발견 → 배포 직후 발견)
- PR은 머지 또는 명시적 폐기로만 종료 → 브랜치에 고아 작업물이 남지 않음
- 2026-07-21 전수 점검 기준선 확보: 공개 129 + 비공개 65 + 정적 15 = 209개 전부 정상, 유실 0건
- 미반영 작업물 1건 발견(`feat/about-education`: /about 학력 섹션 + 설문 4문항) → 되살림/폐기 결정 대기

---

## ADR-005: research-saas 통합 — 별도 도메인 폐기, 주간 다이제스트 + admin 리터칭

- **상태:** 승인 (2026-09-23) · **초안 기록:** 2026-10-06 (P0)

### 맥락
research-saas(로디 맥, SQLite)가 수집·보강한 뉴스를 어디에 실을지. 별도 `research.codemon.ai` vs codemon.ai 통합.

### 결정
codemon.ai **안으로 통합**. 주 1회 `engine export --json` → `data/digest/inbox/` 커밋 → `/admin/digest`에서 **사람 리터칭(A4)** 후 확정·발송. 자동 발행 경로 없음. 실시간 피드는 4회 운영 후 별도 스펙.

### 결과
- 런타임 의존 없음(JSON 파일 결합) · 뉴스는 다이제스트 아카이브로 흡수(`/news` nav 제거)

---

## ADR-006: 디자인 시스템 Swiss Signal — 보라 은퇴, 라이트 기본

- **상태:** 승인 (2026-09-23) · **초안 기록:** 2026-10-06 (P0)

### 맥락
현 사이트(다크 + 보라 그라데이션 + 글로우)는 "어둡고 AI 티가 나고 뭘 하는 사람인지 불명확". 시안 10종 중 선정.

### 결정
**Swiss Signal**: `#FFFFFF` paper · `#001D3D` ink · `#003566` ink-2 · `#FFC300` signal(블록·버튼 배경만) · `#000814` band. Pretendard 단일. 라이트 기본, 다크 반전. 룰·타이포·그리드만으로 구조.
**금지**: 보라 계열·글로우·그라데이션·그림자·blur·둥근 모서리·이모지 아이콘·균등 카드 그리드·숫자 강조·헤드라인 단어 색강조·링크 끝 `→`.

### 결과
- `tailwind.config` 토큰을 rgb 변수(`<alpha-value>`)로 — #62 패턴 재사용. `foreground/background`는 ink/paper 별칭 유지(partner·yonsei·webinar 호환)

---

## ADR-007: 블로그 frontmatter 단일 소스 — `_meta.ts` 폐지

- **상태:** 승인 (2026-09-23) · **초안 기록:** 2026-10-06 (P0)

### 결정
`pages/blog/_meta.ts` 삭제. `scripts/generate-posts.mjs`가 frontmatter(`title/description/date/category/tags/series?/lang?`)를 **빌드 시 검증**하고 `data/posts.json`·`data/categories.json` 생성. category는 5종(`agents-build/agents-ops/models/infra/retrospective`), 실 URL `/insights/<category>`.

### 결과
- 신규 글이 `_meta` 수동 관리 없이 올라감 · 스키마 위반 시 빌드 실패(조용한 누락 방지) · 콘텐츠 자동 발행 파이프라인(ADR-010)의 전제

---

## ADR-008: 만든 것 3목록(work·showcase·projects) → `/cases` 통합, `kind`·`visibility` 필드

- **상태:** 승인 (2026-09-23, 2026-10 `kind:'ax'` 추가) · **초안 기록:** 2026-10-06 (P0)

### 결정
`data/work/projects.ts` → `data/cases.ts`. `kind: 'ax' | 'client' | 'product' | 'lab'`(AX 구축 / 외주 / 자체 / 실험), `visibility: 'public' | 'anonymous' | 'private'`(`realName` 대체). `private`만 기존 `/work` 비번 게이트. `/work/*` → `/cases/*` 301.

### 결과
- 사례 페이지에서 **AX 구축 + 외주 개발 + 자체 서비스** 3필터 · 라우트 보존(`/projects/*` 상세 유지)

---

## ADR-009: 실습 메뉴 제거 — 데모 7종은 유지하되 사례·인사이트로 흡수

- **상태:** 승인 (2026-10, 2026-09-23 "실습 이메일 게이트" 결정을 **대체**) · **초안 기록:** 2026-10-06 (P0)

### 맥락
원안은 데모 7종을 `/practice` + 이메일 게이트 리드 자산으로. 오너 검토에서 **메뉴를 줄이고**(홈·인사이트·강의·사례·About) 교육 레시피는 인사이트에 직접 싣기로.

### 결정
`/practice`·이메일 게이트(`lib/practice/*`, `api/practice/*`) **만들지 않음**. 데모 7종(`/partner/lecture-podl-ai/demo/*`)은 **유지**(숨김)하고, 결과물성은 `/cases`, 교육 레시피는 인사이트 글로. 리드 수집은 **뉴스레터 폼**(헤더·홈·푸터·글 하단·뉴스레터 페이지)이 담당.

### 결과
- P3 범위 축소(게이트·실습 로더 불필요) · 데모 폐기 철회는 유지(화면 유실 없음)

---

## ADR-010: 콘텐츠 자동 발행 파이프라인 — Codex 조사·이미지 / Fable 5.1 수용 판단, 3일 1편

- **상태:** 승인 (2026-10-06) · **초안 기록:** 2026-10-06 (P0)

### 맥락
약 6개월간 인사이트 발행 0 → 유입 엔진이 꺼짐. 로디몬 수동 발행만으로는 주기 유지 불가.

### 결정
**Codex**가 주제·초안을 배치 생성하고 채택 글당 **관련 이미지 3~5개** 생성. **Fable 5.1**이 각 초안의 **수용 여부를 판단**하되 **웹서칭으로 사실 확인**(모델·가격·날짜·출시) 후 통과/반려(사유 기록), 통과분에 `<!-- verified: YYYY-MM -->`. Claude Code는 스키마·큐(`data/content-queue/`)·**3일 간격 스케줄**(`scripts/content-schedule.mjs`)을 구현. 최종 발행 승인은 로디몬 경로 유지.

### 결과
- 목표 **3일 1편**(월 ~10편) · ADR-007 스키마(P2) 완료 후 가동 · 콘텐츠 자체 생성이라 G1·G2 게이트 무관
