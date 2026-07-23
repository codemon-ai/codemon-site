# 브랜치 · PR 원장 (Branch Ledger)

> **NOW 문서.** "예전 화면이 사라졌다"는 사고를 막기 위한 브랜치 상태 기준선.
> 브랜치를 지우기 전, PR을 닫기 전, 배포하기 전에 여기를 본다.
>
> **마지막 정비: 2026-07-24** — `origin/main` = `8456140` (PR #27~#30 머지 완료).
> 2026-07-21 기준선(PR #26, `ffbe929`)에서 열려 있던 PR 4건을 모두 머지하고 안전 브랜치를 정리했다.

---

## 2026-07-24 정리 결과 (PR #27~#30 머지 + 브랜치 삭제)

`#28 → #27 → #29 → #30` 순서로 4건 모두 머지(리허설대로 충돌 0). 머지 후 `origin/main` 빌드 통과(정적 페이지 223개).

⚠️ **미완료 1건 — Supabase 마이그레이션(수동).** PR #30(설문 4문항)은 코드만 main에 있고,
`survey_responses` 테이블에 컬럼 4개가 아직 없다. **다음 프로덕션 배포 전 반드시** 아래 SQL 실행:
```sql
ALTER TABLE survey_responses
  ADD COLUMN IF NOT EXISTS learnings text,
  ADD COLUMN IF NOT EXISTS follow_along text,
  ADD COLUMN IF NOT EXISTS would_help text,
  ADD COLUMN IF NOT EXISTS improvements text;
```
안 하면 배포 시 insert 실패 → 설문 응답이 어드민에서 안 보인다. (GitHub auto-deploy 꺼져 있어 **머지만으론 배포 안 됨** → 현재 프로덕션은 안전.)
자동 실행 시도했으나 DB 비밀번호·키체인 토큰 미접근 + supabase CLI v2.75(원격 쿼리 미지원)로 막힘 → Supabase SQL Editor에서 수동 실행 또는 Supabase MCP 인증 필요.

### 삭제한 원격 브랜치 (복원용 SHA — GitHub나 `git push origin <sha>:refs/heads/<name>`로 복구 가능)
모두 삭제 전 `origin/main`에 내용 반영 확인 완료(미반영 커밋 0 또는 main이 더 최신):

| 브랜치 | 삭제 시 SHA | 사유 |
|--------|-------------|------|
| `deploy/wikicbow-study-math-sync` | `51ae2ac` | PR #12 머지됨 |
| `feat/survey-airpremia-lv1` | `00be2f1` | PR #7 머지됨 |
| `feat/yonsei-deep-learning-wikicbow` | `4675897` | PR #9 머지됨 |
| `feature/lecture-yonsei` | `2e2cc0b` | PR #4 머지됨 |
| `feature/partner-lead-capture` | `733279d` | PR #3 머지됨 |
| `feature/yonsei-east-asian-history` | `795b7bf` | PR #6 머지됨 |
| `worktree-karpathy-wiki-lecture1` | `5f0ed7d` | PR #24 머지됨 |
| `feat/about-education` | `25953fa` | **PR #30으로 내용 복원**(체리픽) — main과 코드 동일 확인 |
| `feature/partner-admin` | `31c50bb` | PR #5로 어드민 반영됨. 나머지 diff는 **main이 더 최신**(머지 시 화면 대량 삭제되는 위험 브랜치라 폐기) |
| `vercel/vercel-web-analytics-to-nextjs-que93t` | `c9f047a` | `@vercel/analytics` 이미 main 반영. 브랜치는 247커밋 뒤처진 구버전이라 폐기 |

> `backup/pr28-pre-rebase`(`49990f6`)는 #28 리베이스 전 백업 — 안전 확인됐으므로 함께 정리.
> PR 머지로 자동 삭제된 브랜치: `feat/partner-{claude-build-html,handson-guides,lecture-claude-build,trading-bot-plus-fixes}`, `feat/yonsei-founding-myself`, `fix/partner-claude-build-html-path`, #27~#30 브랜치.

---

## (이하 2026-07-21 기록 — 참고용)

---

## 왜 이 문서가 있나 (사고 원인 3종)

1. **프리빌트 배포 = 로컬 작업트리 스냅샷.**
   배포는 `vercel deploy --prebuilt --prod`로, **git이 아니라 "지금 내 디스크"** 를 올린다.
   따라서 `main`보다 뒤처진 브랜치/워크트리에서 배포하면 **다른 브랜치의 화면이 프로덕션에서 통째로 사라진다.**
   → 배포 전 `main` 리베이스, 배포 후 `./scripts/check-routes.sh` 필수.
2. **머지되지 않은 PR을 닫아버림.** PR #8이 실제로 그렇게 닫혔다(아래 ⚠️ 항목).
3. **라우트 vs 정적파일 충돌.** `public/partner/*.html`이 `pages/partner/` 라우트에 가려 404
   (2026-06-23, PR #20 → #21로 `/slides/` 이전하며 복구).

---

## 현재 브랜치 상태 (2026-07-21)

### 🟡 열린 PR — 처리 필요

| PR | 브랜치 | 내용 | 상태 | 권장 |
|----|--------|------|------|------|
| #27 | `docs/code-wiki` | `openwiki/` 자동생성 코드위키 4문서 + CLAUDE.md 이원(📖코드/📝지식) 체계 | ✅ 머지 가능 (ahead 1 / behind 0) | 그대로 머지 |
| #28 | `docs/partner-lectures-handoff` | 파트너 강의 2종(claude-build / trading-bot) 인수인계 기록 + 2026-07 기술검증 | ⚠️ **CONFLICTING** (ahead 1 / behind 7) — `docs/INDEX.md`, `docs/changelog/2026-06-27*`가 PR #24와 충돌 | `git rebase origin/main` 후 충돌 정리 → 머지 |
| #29 | `docs/site-baseline-inventory` | 이 문서 + 라우트 인벤토리 + `check-routes.sh` + ADR-004 | ✅ 머지 가능 | 먼저 머지 |
| #30 | `feat/about-education-revive` | 닫힌 PR #8 작업물 복원 (`/about` 학력 + 설문 4문항) | ✅ 머지 가능 (build 통과) | **Supabase 마이그레이션 먼저** 실행 후 머지 |

#### 겹침 검증 완료 (2026-07-21) — 4개 PR 동시 안전

`origin/main` 위에 4개를 순서대로 실제 머지해보는 **리허설**을 돌려 확인했다.

| PR | 건드리는 파일 | 기존 라인 삭제 |
|----|---------------|----------------|
| #28 | `docs/INDEX.md`, `changelog/2026-06-27.md`, `lecture-{claude-build,trading-bot}.md` | **0** (순수 추가) |
| #27 | `CLAUDE.md`(맨 끝 섹션 추가), `openwiki/*` | **0** (순수 추가) |
| #29 | `CLAUDE.md`, `docs/INDEX.md`, `wiki/{branches,decisions,deployment,route-inventory}.md`, `changelog/2026-07-21.md`, `scripts/check-routes.sh` | 16 — 전부 **깨진 nvm 배포 명령·구 체크리스트 교체분** |
| #30 | `components/*`, `lib/*`, `pages/api/survey/submit.ts`, `changelog/2026-04-22.md` | 8 — 전부 **한 줄 교체**(import·파라미터·CSV select) |

- 충돌 제거 조치: #28은 `origin/main` 위로 **리베이스**(백업 `backup/pr28-pre-rebase`), #30은 `docs/INDEX.md`
  "최근 주요 변경" 수정을 **아예 빼서** #28/#29와의 겹침을 원천 제거(기록은 `changelog/2026-04-22.md`가 담당).
- 결과: **#28 → #27 → #29 → #30 순서로 충돌 0**, 합쳐진 상태에서 `npm run build` 통과(정적 페이지 223개 생성).
- 어떤 PR도 페이지·라우트 파일을 삭제하지 않는다 → 이 4건 머지로 사라지는 화면 없음.

> 원칙: **INDEX/CLAUDE.md 같은 공용 문서는 "추가만"**. 기존 줄을 지우거나 순서를 바꾸면 다른 브랜치와 충돌하고,
> 충돌을 잘못 풀면 그 순간 남의 작업이 사라진다. 한 번에 하나씩 머지하고 다음 브랜치는 `git rebase origin/main`.

### ✅ 머지 안 된 채 닫힌 PR — **복원 완료** (2026-07-21)

| 브랜치 | PR | 미반영 커밋 | 내용 | 처리 |
|--------|----|------------|------|------|
| `feat/about-education` | #8 (**CLOSED, 미머지**) | `9b34569`, `25953fa` | ① `/about` 학력 섹션(`components/Career.tsx`) ② 설문 4문항 확장(`learnings`/`follow_along`/`would_help`/`improvements` — SurveyForm·lib/survey·submit API·admin SurveyTable) + `docs/changelog/2026-04-22.md` | → **PR #30 `feat/about-education-revive`** 로 복원. 원본 브랜치는 main 대비 38커밋 뒤처져 있어 리베이스 대신 **`origin/main` 위로 체리픽** |

복원 시 확인한 것:
- 충돌은 `docs/INDEX.md` 최근변경 목록 1건뿐 → 날짜순 정리로 해결
- `lib/survey.ts`는 그 사이 main이 `SUPPORTED_LECTURE_IDS` 화이트리스트로 전환됨 → **main 최신 구조 유지**한 채 4필드만 추가
- `npm run build` 통과, `origin/main` 대비 순수 추가 diff(회귀 없음)
- ⚠️ 머지/배포 전 **Supabase 마이그레이션 필수** (`survey_responses`에 컬럼 4개). 안 하면 insert 실패 → 듀얼 라이트가 Blob으로만 떨어져 **어드민에서 설문 응답이 안 보인다.**

> PR #30 머지 후 `feat/about-education` 원본 브랜치 삭제 가능.

### 🟢 머지 완료 — 삭제해도 안전 (내용 100% main에 있음)

`deploy/wikicbow-study-math-sync` · `feat/partner-claude-build-html` · `feat/partner-handson-guides` ·
`feat/partner-lecture-claude-build` · `feat/partner-trading-bot-plus-fixes` · `feat/survey-airpremia-lv1` ·
`feat/yonsei-deep-learning-wikicbow` · `feat/yonsei-founding-myself` · `feature/lecture-yonsei` ·
`feature/partner-lead-capture` · `feature/yonsei-east-asian-history` · `fix/partner-claude-build-html-path` ·
`worktree-karpathy-wiki-lecture1`

### 🟢 기타 — 삭제해도 안전 (검증 완료)

| 브랜치 | 이유 |
|--------|------|
| `feature/partner-admin` | PR #5 머지됨. `ahead=3`으로 보이지만 `main`과 실제 차이는 `docs/INDEX.md`·`lib/survey.ts` 뿐이고 **main 쪽이 더 최신**(설문 화이트리스트 전환). 어드민 코드 전량 main에 존재. |
| `vercel/vercel-web-analytics-to-nextjs-que93t` | PR #2 닫힘. `@vercel/analytics`는 이미 main의 `package.json`·`pages/_app.tsx`에 반영됨. |

> 삭제는 코드몬 승인 후: `git push origin --delete <branch>`

### 로컬 워크트리

| 경로 | 브랜치 | 비고 |
|------|--------|------|
| `~/orca/workspaces/codemon-site/renew` | `codemon-ai/renew` | 현재 주 작업 트리 (= origin/main 시점) |
| `~/workspace/codemon/codemon-site` | `docs/partner-lectures-handoff` | PR #28 작업 트리 |
| `~/workspace/codemon/codemon-site/.claude/worktrees/karpathy-wiki-lecture1` | `worktree-karpathy-wiki-lecture1` | 머지 완료, 정리 대상 |

> ⚠️ 워크트리가 여러 개라 **어느 디스크에서 `vercel build` 했는지**가 사고의 핵심 변수다.
> 배포 직전 반드시 `pwd && git rev-parse --abbrev-ref HEAD && git status --short && git log --oneline -1` 확인.

---

## PR 히스토리 (전체)

| # | 상태 | 날짜 | 내용 |
|---|------|------|------|
| 28 | OPEN | 2026-07-17 | 파트너 강의 2종 인수인계 기록 |
| 27 | OPEN | 2026-07-11 | 코드 위키(openwiki/) + CLAUDE.md 이원 체계 |
| 26 | 머지 | 2026-06-27 | 1과정 공식 MCP/Skill 도구 목록 보강 |
| 25 | 머지 | 2026-06-27 | 핸즈온 가이드 문구 톤 정리 |
| 24 | 머지 | 2026-06-27 | 1번 강의 STEP 1 카파시 LLM Wiki 핵심 보강 |
| 23 | 머지 | 2026-06-24 | 두 강의 단계별 핸즈온 가이드(전체 자료) |
| 22 | 머지 | 2026-06-24 | 자동 투자 봇(페이퍼) 강의 추가 |
| 21 | 머지 | 2026-06-23 | 강의자료 HTML 서빙 경로 `/slides/`로 수정 (404 복구) |
| 20 | 머지 | 2026-06-23 | 클로드 핸즈온 강의 전체 자료 HTML |
| 19 | 머지 | 2026-06-23 | 클로드 핸즈온 강의 페이지 추가 |
| 18~11 | 머지 | 2026-06-02~09 | 연세대 WikiCBOW 발표자료 시리즈(슬라이드 16장·나레이션·study 모드) |
| 10 | 머지 | 2026-06-09 | 졸업에세이 '나를 창업한다는 것' |
| 9 | 머지 | 2026-06-02 | 딥러닝 WikiCBOW 발표자료 |
| 8 | **닫힘(미머지)** | 2026-06-12 | `/about` 학력 섹션 + 설문 4문항 → ⚠️ 위 표 참조 |
| 7 | 머지 | 2026-04-21 | airpremia-lv1 설문 + dansaek.co 피칭 |
| 6 | 머지 | 2026-04-16 | 동아시아 선사와역사 시험대비 + 100문제 |
| 5 | 머지 | 2026-04-13 | 어드민 시스템(구독자/설문/메일링) |
| 4 | 머지 | 2026-04-06 | 심연의 미학 발표자료 |
| 3 | 머지 | 2026-03-31 | 뉴스레터 구독 + QR + 강의 후 설문 |
| 2 | 닫힘 | 2026-06-12 | Vercel Web Analytics (이미 main 반영) |
| 1 | 머지 | 2026-02-01 | 랜딩 페이지 디자인 업그레이드 |

---

## 운영 규칙 (필수)

1. **작업 시작 전** — `git fetch origin && git rebase origin/main`. 하루 이상 묵은 브랜치는 그대로 배포 금지.
2. **PR은 머지 또는 명시적 폐기 중 하나로만 끝낸다.** 그냥 닫지 않는다. 폐기 시 이 문서에 이유를 남긴다.
3. **브랜치 삭제 전** — `git log --oneline origin/main..origin/<branch>`로 미반영 커밋 0인지 확인.
4. **배포는 `main` 기준 트리에서만.** 배포 직전 `pwd` + 브랜치 + `git status` 확인.
5. **배포 직후** — `./scripts/check-routes.sh` 실행. 실패 0이어야 완료.
6. 이 문서와 [라우트 인벤토리](./route-inventory.md)를 함께 갱신한다.
