# codemon.ai 콘텐츠 중심 리뉴얼 — 마스터 로드맵

> **For agentic workers:** 이 문서는 페이즈 단위 로드맵이다. 각 페이즈는 착수 시 `docs/plans/2026-MM-DD-renewal-p<N>-<slug>.md`로 **태스크 단위 상세 계획**(superpowers:writing-plans 형식, 체크박스 스텝)을 먼저 쓰고, superpowers:subagent-driven-development로 실행한다. 페이즈 끝마다 배포 + `check-routes.sh` 통과가 게이트다.

**Goal:** codemon.ai를 `인사이트 · 실습 · 강의 · 사례 · About + [뉴스레터 구독]` 구조의 콘텐츠 중심 사이트로 바꾸고, Swiss Signal 디자인을 전 페이지에 적용하며, high-techer·airpremia 자료와 research-saas 다이제스트를 콘텐츠로 흘려보낸다.

**Architecture:** Nextra 3 + Next.js 14 Pages Router 유지. 데이터는 `data/*.ts`(cases·lectures·practice) + frontmatter(블로그) + `data/digest/*.json`(다이제스트)로 단일화. 게이트 3종(work 비번·practice 이메일·admin 세션)은 기존 HMAC 쿠키 패턴 복제. research-saas와는 JSON 파일 커밋으로만 결합(런타임 의존 없음).

**Tech Stack:** Next.js 14, Nextra 3.3, TypeScript, Tailwind 3.4, Supabase, Resend, Vercel 프리빌트 배포, Pretendard(jsdelivr).

**Spec:** `docs/prd/site-renewal-2026.md`

## Global Constraints

- **리뉴얼은 프로덕션(codemon.ai) 직접 배포 금지.** 전 과정을 **`renew.codemon.ai`** 서브도메인(프리뷰 배포 alias)에만 올려 검수하고, 최종 게이트에서만 apex로 승격(단일 컷오버). → 화면 유실 리스크 0. (작업 브랜치: `codemon-ai/design-renew`)
- 승격 시에만 `vercel deploy --prebuilt --prod`. 배포 직후 `./scripts/check-routes.sh` 실패 0
- 페이지 추가/삭제/이동 시 `docs/wiki/route-inventory.md` 갱신 (현재 기준선 134)
- 색: `--paper #FFFFFF / --ink #001D3D / --ink-2 #003566 / --signal #FFC300 / --band #000814`. 보라·그라데이션·글로우·blur·그림자·둥근 모서리 금지
- 서체: Pretendard 400/700/900 단일
- `dark:` variant 필수 (라이트 기본, 다크 반전)
- 테스트 러너 없음. 검증은 `npm run build` + `check-routes.sh` + `playwright-cli` 스크린샷
- `rm` 금지(`trash`), `ecosystem.config.js`·환경변수 값 커밋 금지
- 콘텐츠(MDX) 발행은 로디몬. Claude Code는 변환 스크립트·컴포넌트·데이터 스키마까지
- high-techer·airpremia **B등급 이관은 G1·G2(귀속 확인) 전 착수 금지**. A등급만 선행

---

## 페이즈 개요

| P | 이름 | 기간 | 산출 | 게이트 |
|---|---|---|---|---|
| 0 | 수집 장치 + 정리 | 1주 | 뉴스레터 폼 5곳, nav 5+2, 인벤토리 | check-routes 0 |
| 1 | 디자인 토큰·셸 | 1주 | Swiss Signal 전 페이지 | 라이트/다크 스크린샷 8장 |
| 2 | 콘텐츠 데이터 정규화 | 1주 | frontmatter 스키마, cases/lectures/practice 데이터 | build 통과, 39편 카테고리 100% |
| 3 | 핵심 페이지 | 2주 | 홈·인사이트·실습(게이트)·강의·사례·문의·뉴스레터 | 폼→admin→Slack, 게이트 해제 |
| 4 | 자료 이관 | 2주 (P3와 병렬) | A등급 → 실습 15·강의 카탈로그, B등급(G1·G2 후) | 브랜드 grep 0 |
| 5 | research-saas 다이제스트 | 2주 | export CLI, `/admin/digest`, 발송, 아카이브 | 주간 1호 실발송 |
| 6 | **콘텐츠 자동 발행 파이프라인** | 상시 | Codex 조사·이미지 + Fable 5.1 수용판단 → 3일 1편 인사이트 발행 | P2 스키마 후 가동 |

총 **약 8~9주**(P3·P4 병렬 기준). 페이즈 순서는 고정, P4는 P2 완료 후 P3와 동시 진행 가능. **P6는 P2(frontmatter 스키마) 완료 후 상시 가동.**

### IA 변경 (2026-10, 오너 확정)
- nav = `홈 · 인사이트 · 강의 · 사례 · About` + [KO/EN][뉴스레터] — **홈 추가, 실습 메뉴 제거.**
- 실습(데모·실습 자료)은 **사례**(결과물성)·**인사이트**(교육 레시피)로 흡수. 리드 수집은 뉴스레터 폼 중심. → **P3 Task 3.4(실습 목록·이메일 게이트) 삭제**, `lib/practice/*`·`pages/api/practice/*` 불필요. `data/practice.ts`(P2) 폐기.
- 사례(`/cases`)에 `kind` 값 **`ax`(AX 구축)** 추가 — AX 구축 + 외주 개발 + 자체 서비스 3필터.
- 히어로 확정: "당신의 업무에 AI를 도입하세요." / "기업의 실제 업무에 AI를 붙이고, 구성원이 직접 사용하도록 진단·적용·교육까지 함께 합니다."

---

## Phase 0 — 수집 장치 + 정리 (1주)

가장 먼저 하는 이유: 지금은 콘텐츠를 만들어도 **수집 장치가 없다**. 디자인보다 우선.

### Task 0.1 뉴스레터 폼 임베드
**Files:** Modify `components/NewsletterSignup.tsx`(variant prop: `inline | footer | gate`), `components/Footer.tsx`, `pages/index.mdx`, `components/BlogIndex.tsx`(글 하단은 P3에서), `theme.config.tsx`(navbar 버튼)
**Produces:** `<NewsletterSignup variant="inline" source="home" />`, `source` 값이 Supabase `subscribers.source`로 저장
**Deliverable:** 홈 1 + 푸터 1 + 헤더 버튼 → `/newsletter`(임시로 `/subscribe` 리다이렉트)
**Verify:** 3곳에서 제출 → `subscribers` 행 `source` 구분 확인

### Task 0.2 중복 판정 Supabase 단일화
**Files:** Modify `lib/newsletter.ts`(Blob 조회 제거, `upsert` 반환값으로 기존 여부 판정), `pages/api/newsletter/subscribe.ts`
**Verify:** 동일 이메일 2회 → 2회째 "이미 구독 중" (Blob 비운 상태에서도)

### Task 0.3 nav 재편
**Files:** Modify `pages/_meta.ts`
- `about`·`blog`(title 인사이트) 유지 / `showcase`·`projects`·`news`·`docs`·`tools` → `display: 'hidden'`
- `yonsei` hidden 등록 (현재 미등록)
- `practice`·`lectures`·`cases`·`newsletter`는 P3에서 페이지와 함께 추가
**Verify:** nav에 `인사이트 · About`만 + 버튼. 숨긴 라우트 전부 200

### Task 0.4 인벤토리·문서
**Files:** Modify `docs/wiki/route-inventory.md`(`/webinar` 3 반영, 134 기준선), `docs/wiki/decisions.md`(ADR-005~009 초안), `docs/changelog/2026-09-XX.md`, `docs/INDEX.md`
**Verify:** `check-routes.sh` 134/0

### Task 0.5 배포
`npm run build` → `vercel build --prod` → `vercel deploy --prebuilt --prod` → `check-routes.sh`

---

## Phase 1 — 디자인 토큰·셸 (1주)

### Task 1.1 토큰
**Files:** Modify `tailwind.config.js`(`accent.purple`·`glow`·`float`·`backdropBlur` 삭제, `paper/ink/ink-2/signal/band` 추가), `styles/globals.css`(`:root`/`.dark` 변수, `foreground`→`ink`·`background`→`paper` 별칭 유지), Pretendard `<link>` in `pages/_app.tsx`
**Verify:** `grep -rn "a855f7\|accent-purple\|animate-glow\|backdrop-blur" pages components` → 0

### Task 1.2 헤더·푸터
**Files:** Modify `theme.config.tsx`(logo, navbar.extraContent = `<LangSwitch/> <SubscribeButton/>`, footer.content), Create `components/shell/LangSwitch.tsx`(`/`↔`/en` 경로 매핑, `en` 페이지 없으면 `/en`), `components/shell/SubscribeButton.tsx`
**Verify:** 모든 페이지 헤더 동일. `/partner/*`·`/webinar/*`·`/yonsei/*`에서 깨짐 0 (스크린샷 3장)

### Task 1.3 Nextra 문서 레이아웃 톤 맞춤
**Files:** Modify `styles/globals.css`(nextra 변수 `--nextra-primary-hue` 등 ink로, 링크 밑줄 1px, 코드블록 배경 `#F3F4F6`/다크 `#001D3D`)
**Verify:** 블로그 글 1, partner 1, yonsei 1 라이트/다크 6장

### Task 1.4 기존 컴포넌트 보라 제거
**Files:** Modify `components/Hero.tsx`·`Features.tsx`·`ContactCTA.tsx`·`ProjectCard.tsx`·`ShowcaseCard.tsx`·`work/WorkCard.tsx`·`NewsIndex.tsx`·`BlogIndex.tsx`(색 클래스만 교체, 구조는 P3에서)
**Verify:** grep 0 + 홈 스크린샷

### Task 1.5 배포 + 스크린샷 8장 대조

---

## Phase 2 — 콘텐츠 데이터 정규화 (1주)

### Task 2.1 블로그 frontmatter 스키마 + 검증
**Files:** Create `lib/content/schema.ts`(zod 없이 수동 검증 — 의존성 추가 안 함), Modify `scripts/generate-posts.mjs`(TAG_MAP 삭제, 스키마 검증, category 인덱스 출력 `data/posts.json` + `data/categories.json`), Delete `pages/blog/_meta.ts`
**Produces:** `data/posts.json: Post[]` (`{slug,title,description,date,category,tags,series?,readingMinutes}`)
**Verify:** 39편 전부 통과. 스키마 위반 1편 만들어 빌드 실패 확인 후 되돌림

### Task 2.2 39편 이관
**Files:** Modify `pages/blog/*.mdx` 39개 frontmatter — 매핑표:

| slug 패턴 | category |
|---|---|
| building-multi-agent-*, ai-agent-outsourcing-company, teaching-skills-to-ai-agents, agent-skills-ecosystem, skill-engineering-real-practice, claudemd-delete-paper-webmcp, coda-ai-documentation-framework, cloud-blog-skill-reference, claude-code-delegation, ai-bot-collaboration, ai-native-engineer-agent-orchestration, llm-harness-driven-agent | `agents-build` |
| ai-coding-agents-comparison, claude-code-agent-teams, claude-code-ban-risk-gemini-exchange, claude-code-2-1-59-update, openclaw-100days-real-experience, free-claude-code-with-glm5, 3-dollar-ai-dev-team, gemini-cli-google-mcp-handson, ai-file-management-system | `agents-ops` |
| sonnet-46-*, sonnet46-*, opus-surrounded, llm-price-war-2026, gemini-3-vs-31-pro-real-code-review, google-nano-banana-2-release | `models` |
| mac-mini-startup-infra, vercel-telegram-realtime-chat, ai-showcase-7demos-one-app, blog-seo-basics-to-practice, curl-special-characters-tips, forest99, clawdbot-gateway-crash-fix | `infra` |
| system-separation-moves-complexity, reading-vs-understanding-api-docs | `retrospective` |

(합계 12/9/8/7/3 = 39. `clawdbot-gateway-crash-fix`는 infra로 — 회고 성격도 있으나 인프라 사고 분석)
태그 정규화: 소문자·하이픈, `claude-code`·`ai-agent`·`tips`로 통일. `google-nano-banana-2-release`에 `date: 2026-02-28` 추가.
**Verify:** `data/categories.json` 카운트 12/9/8/7/3

### Task 2.3 cases 데이터 통합
**Files:** Create `data/cases.ts`(`Case` 타입 = `WorkProject` + `kind` + `visibility`, `realName` 제거), 데이터 이관: work 18(kind client, visibility public) + showcase 자체 서비스 4(product: 타로몬·슬림몬·달러시그널·숲에서99일밤) + projects 7(lab). Delete `data/work/projects.ts`(import 경로 갱신 `pages/work/[slug].tsx`·`components/work/WorkCard.tsx`)
**Produces:** `cases: Case[]`, `getPublicCases()`, `getCase(slug)`
**Verify:** `/work` 기존 동작 유지(비번 게이트), 29건 로드

### Task 2.4 lectures·practice 데이터
**Files:** Create `data/lectures.ts`(partner 6종 + 웨비나 + codemon-class 2 = 9건, `kind`·`visibility` 채움), `data/practice.ts`(데모 7 + 빈 슬롯 — 실습 본문은 P4), `data/start-here.ts`(3편)
**Verify:** 타입 체크 통과

### Task 2.5 배포 (외형 변화 없음, 데이터만)

---

## Phase 3 — 핵심 페이지 (2주)

### Task 3.1 홈
**Files:** Rewrite `pages/index.mdx` + Create `components/home/{Hero,Services,Cases,Lectures,Insights,PracticeTeaser,Process,CTA}.tsx` (시안 `04-swiss-signal.html`을 Tailwind로 옮김). Delete `components/Features.tsx`·`ContactCTA.tsx`(대체)
**Verify:** 시안 PNG와 나란히 비교, 390px 모바일

### Task 3.2 인사이트 목록 + 카테고리 URL
**Files:** Rewrite `components/BlogIndex.tsx`(페이지네이션 12, start-here 블록, 카테고리 탭), Create `pages/insights/index.tsx`(→ `/blog` 목록 재사용), `pages/insights/[category].tsx`, `pages/insights/digest/[week].tsx`(P5에서 데이터 연결)
**Verify:** `/insights/agents-build` 12편, 페이지네이션 2페이지

### Task 3.3 글 상세 전환 사다리
**Files:** Create `components/insights/PostFooter.tsx`(다음 글 → 관련 4 → 뉴스레터 → 관련 실습 2 → 강의 CTA), `theme.config.tsx`의 `main` 래퍼로 블로그 경로에만 주입
**Verify:** 글 1편 하단 5블록 순서

### Task 3.4 실습 목록 + 이메일 게이트
**Files:** Create `pages/practice/index.tsx`, `pages/practice/[slug].tsx`(MDX 로더), `components/practice/{Gate,CopyBox,Checklist,TroubleCard,StepList}.tsx`, `lib/practice/gate.ts`(HMAC 쿠키 `practice_unlock`, 30일), `pages/api/practice/unlock.ts`(이메일 → subscribers 조회 or 구독 → 쿠키), `middleware.ts`(변경 없음 — 게이트는 페이지 내 조건 렌더)
**Produces:** `isUnlocked(req): boolean`, `unlock(email): Promise<{ok, isNew}>`
**Verify:** 미구독 → 입력 → 해제 → 새 탭 유지 / 기존 구독자 즉시 해제 / 쿠키 삭제 시 다시 잠김

### Task 3.5 강의 카탈로그
**Files:** Create `pages/lectures/index.tsx`, `pages/lectures/[slug].tsx`, `components/lectures/{Card,Outline,InquiryBlock}.tsx`
**Verify:** corporate 강의 하단 "문의 시 보낼 항목" → `/contact?type=lecture` 프리필

### Task 3.6 사례 통합 페이지
**Files:** Create `pages/cases/index.tsx`, `pages/cases/[slug].tsx`(private면 `/work` 게이트로), `next.config.mjs` redirects `/work/:slug` → `/cases/:slug` (301), `/projects/:slug` 유지
**Verify:** public 상세 비번 없이, private 상세 비번 요구, 리다이렉트 301

### Task 3.7 문의
**Files:** Create `pages/contact.tsx`(탭 2), `pages/api/contact.ts`(honeypot·rate limit·Supabase·Slack), `lib/contact/{store,notify,ratelimit}.ts`, `pages/admin/inquiries.tsx`, `lib/admin/inquiries.ts`; Supabase 마이그레이션 `inquiries` (SQL은 스펙 §4.5)
**Verify:** 폼 2종 → 행 + admin + Slack. honeypot 채우면 200이지만 저장 0. 4회째 429

### Task 3.8 뉴스레터 페이지
**Files:** Create `pages/newsletter.tsx`(소개·아카이브·폼), `emails/Digest.tsx`; `pages/subscribe.mdx` → `/newsletter` 리다이렉트
**Verify:** 폼 제출, 아카이브 빈 상태 문구

### Task 3.9 About 재작성 + nav 완성
**Files:** Rewrite `pages/about.mdx`(사진·소개·Career·법인·일하는 방식·문의 앵커), Modify `pages/_meta.ts`(practice·lectures·cases 추가 → 최종 5칸)
**Verify:** nav `인사이트 · 실습 · 강의 · 사례 · About`

### Task 3.10 배포 + 전체 검증(스펙 §8)

---

## Phase 4 — 자료 이관 (2주, P2 후 P3와 병렬)

### Task 4.1 변환 스크립트
**Files:** Create `scripts/convert-lesson.mjs`(high-techer 교안 HTML → MDX), `scripts/convert-resource.mjs`(제공자료 → MDX + 컴포넌트), `scripts/strip-brand.mjs`(치환표 + grep 리포트)
**Verify:** 샘플 1편 변환 → `npm run build` 통과, 육안 대조

### Task 4.2 A등급 실습 15개 (G1·G2 무관)
- 데모 7: `data/practice.ts` gate 설정(seeding·report 공개, 5 게이트) + `components/demo/DemoShell.tsx` 토큰 리스킨
- high-techer 4: 첫 아티팩트 / FAQ 답변기 / 폴더 카탈로그(연습폴더 zip) / 대시보드 7요소(sales_2030.csv) — 출처는 **제공자료(B+)가 아니라 showcase·데이터셋(A)** 기반으로 신규 MDX 작성
- airpremia v4 4: 업무 분해표(T1) / 보고서 Skill(ZIP) / 메일 12통 분류(T3) / Cowork 첫 출근(sample-cowork-folder)
- 다운로드 자산 → `public/files/practice/<slug>/`
**Verify:** 15개 `/practice/*` 200, 게이트 9개 잠김, 브랜드 grep 0

### Task 4.3 강의 카탈로그 채우기
- `data/lectures.ts` 9건에 outline·deliverables·refs 채움(출처: high-techer curriculum-v2, airpremia v4 Part 구조, partner MDX)
- 실적 라벨: 연세대 public / 하이테커 VOD `public`(G1 후, 전엔 `private`) / 항공사 `anonymous` "항공사 임직원 AI 교육(7H, 2026-07)" / 포들 public
**Verify:** `/lectures` 9건, corporate 4건에 문의 블록

### Task 4.4 읽기 자료 → 인사이트 (A등급)
- high-techer extras 15 중 범용 10편 + airpremia 교재 5(용어사전·Transformer·LLM여정·프롬프팅·왜 AI/AX) → `pages/blog/` MDX, category 매핑(대부분 `models`·`agents-ops`), 로디몬 발행
**Verify:** frontmatter 검증 통과

### Task 4.5 B등급 (G1·G2 확인 후에만)
- high-techer 제공자료 21 → 실습 확장, 슬라이드 → `public/slides/hightecher/`
- airpremia v3fd 교안·슬라이드, 부서별 프롬프트 26(익명화), Field Manual 45 → 실습·인사이트
- 각 항목 `strip-brand.mjs` 통과 + 사실 재검증 주석
**Verify:** 브랜드 grep 0, `[촬영전확인]` grep 0

### Task 4.6 G3·G4 처리
- G3: Supabase `survey_responses where lecture_id='airpremia-lv1'` 조회 → N·평균 → 인용 가능하면 `data/lectures.ts` 항공사 항목 `outcome` 필드
- G4: 두 레포 README/CLAUDE.md 평문 비밀번호 제거는 **코드몬 직접**(다른 레포). 이 레포에는 복사 금지 확인만

---

## Phase 5 — research-saas 다이제스트 (2주)

### Task 5.1 export CLI (research-saas 레포, 별도 PR)
- `engine export --since 2026-09-16 --json out.json` — `item ⋈ item_enrich` where enrich 존재, published_at ≥ since, label ≠ vendor(옵션)
- HANDOFF.md D1·D3 갱신: "codemon.ai 통합, 주간 export"
**Verify:** 로디에서 실행 → JSON 필드 11개, 1주치 ~150건

### Task 5.2 inbox 수집
**Files:** Create `data/digest/inbox/.gitkeep`, `scripts/digest-pull.sh`(cnet으로 export 실행 + scp + `git checkout -b digest/YYYY-WW` + commit) — 수동 실행부터, launchd는 4회 안정 후
**Verify:** `data/digest/inbox/2026-W39.json` 커밋

### Task 5.3 `/admin/digest` 리터칭 UI
**Files:** Create `pages/admin/digest.tsx`(inbox 목록: 체크·코멘트·순서·intro), `pages/api/admin/digest/{list,save,send}.ts`, `lib/admin/digest.ts`(save → `data/digest/YYYY-WW.json` — Vercel은 읽기 전용 FS이므로 **Supabase `digests` 테이블**에 저장하고 빌드 시 `scripts/generate-digests.mjs`가 JSON으로 내려받음)
**Produces:** `Digest` 타입(스펙 §5.2)
**Verify:** 30건 선택·저장 → 재로드 유지

### Task 5.4 공개 + 발송
**Files:** `pages/insights/digest/[week].tsx` 데이터 연결, `pages/newsletter.tsx` 아카이브, `emails/Digest.tsx` 발송(`/admin/mailing` 캠페인 type `digest`), `data/news.json` → `2026-W10.json` 변환
**Verify:** 1호 실발송(테스트 구독자) + `/insights/digest/2026-W39` 200

### Task 5.5 운영 문서
`docs/wiki/digest-ops.md`: 주간 루틴(월 pull → 화 리터칭 → 수 발송), 장애 시 대응, research-saas 연락 경로

---

## Phase 6 — 콘텐츠 자동 발행 파이프라인 (상시, P2 후)

**문제:** 약 6개월간 인사이트(블로그) 발행 0 → 유입 엔진이 꺼져 있다.
**목표:** **3일에 1편** 인사이트에 발행(월 ~10편). 배치로 만들어 큐에서 간격 발행.

**역할 분담**
- **Codex** — ① 주제 발굴 + 초안을 **한 번에 배치** 생성 ② 채택본만 글당 **관련 이미지 3~5개** 생성(`/images/blog/<slug>/01~05`)
- **Fable 5.1** — 각 초안 **수용 판단**(채택/반려). **웹서칭으로 사실 확인**(모델명·가격·날짜·출시 등) 후 통과. 반려 사유 기록. 통과분은 본문에 `<!-- verified: YYYY-MM -->`
- **Claude Code** — frontmatter 스키마·카테고리 매핑·이미지 경로 검증, 배치 큐, 3일 간격 스케줄 스크립트

**흐름:** Codex 배치 초안 → Fable 사실검증·수용판단 → 채택본 Codex 이미지 3~5 → frontmatter 스키마 통과 → 큐 적재 → 3일 간격 pop·발행

### Task 6.1 파이프라인 스크립트
**Files:** Create `scripts/content-pipeline.mjs`(배치 초안 수집 + Fable 판정 연동 + 스키마 검증), `scripts/content-schedule.mjs`(큐에서 3일 간격 pop → `pages/blog/*.mdx` 생성/커밋), `data/content-queue/`(배치 큐 JSON)
**Produces:** 큐 항목 = `{slug, title, category, body(mdx), images[3..5], verifiedAt, status: 'queued'|'published'}`
**Verify:** 배치 1회 → Fable 판정 로그(채택/반려+사유) → 채택본 큐 적재 + 이미지 3~5 생성 확인

### Task 6.2 수용 판단(Fable 5.1) + 웹서칭 사실검증
- Fable 5.1 에이전트: 초안별 사실 주장 추출 → 웹서칭 대조 → 채택/반려 + 근거 URL. P2 카테고리 5종 중 분류 강제
**Verify:** 반려 케이스 1건 사유 기록, 채택 케이스 `verified` 주석 삽입

### Task 6.3 이미지 생성(Codex) 3~5/글
- 각 채택 글의 핵심 개념·다이어그램·썸네일 등 **관련 이미지 3~5개**. 경로·alt·blog 본문 삽입 규칙 고정
**Verify:** 글당 3~5개, 경로 `/images/blog/<slug>/`, build 통과

### Task 6.4 스케줄 발행
- `content-schedule.mjs` cron(또는 로디 launchd) 3일 간격: 큐 head pop → MDX 커밋 → (renew 검수 후) 발행. 발행 이력 `data/content-queue/log.json`
**Verify:** 2주 운영(5편) 간격·카테고리 분포 확인

> MDX 최종 발행은 로디몬 승인 경로 유지. Claude Code는 파이프라인·스크립트·스키마까지. 콘텐츠 자체 생성이라 G1·G2 게이트 무관.

---

## 리스크

| 리스크 | 대응 |
|---|---|
| G1·G2 귀속 확인 지연 | P4.2·4.3·4.4는 A등급만으로 완료 가능. B등급은 별도 마일스톤 |
| research-saas 스키마 변경(레포 2일차) | export JSON 필드를 스펙 §5.2로 고정, 계약 테스트 1개 |
| Nextra 셸 커스텀 한계(navbar extra) | 1.2에서 막히면 `components/shell/Navbar.tsx` 전면 교체(`navbar.component`) |
| 라이트 기본 전환 시 partner·yonsei 슬라이드 iframe 대비 | 정적 HTML은 자체 스타일이라 무영향. 감싸는 페이지만 토큰 |
| 실습 게이트가 SEO 크롤러를 막음 | 게이트 페이지는 학습목표·준비물까지 공개 렌더, 본문만 조건부 |

## 이 계획 이후

- 블로그 본문 시안 5개(디자인 스킬 세션) → P3.3 이후 적용
- 실시간 뉴스 피드(B안) — P5 4회 운영 후 별도 스펙
- `/en` 스텁 정리 — 로디몬
