# codemon.ai 콘텐츠 중심 리뉴얼 — 설계 스펙

> 작성: 2026-09-23 · 상태: **승인 대기** · 이전 계획: `renovation-plan.md`(2026-02, 메시지 교체 중심 — 이 문서로 대체)
> 조사 근거: 슬랙 `#ax-codemon-site` 2026-09-19 시안 10종, 2026-09-23 조사 보고서(레퍼런스·research-saas·자산 인벤토리·high-techer·airpremia)

---

## 1. 목표

코드몬(AI/AX Engineer · Forward Deployed Engineer, 1인 법인)의 사이트를 **콘텐츠 중심**으로 바꾼다.
방문자는 무료 콘텐츠(인사이트·실습·뉴스레터)로 들어오고, 두 갈래로 나간다:

| 고객 | 원하는 것 | 사이트가 파는 것 | 종착점 |
|---|---|---|---|
| 기업 의사결정자 | 우리 업무에 AI 도입 | AX 진단 · 2주 PoC · 현장 투입(FDE) | 프로젝트 문의 폼 |
| 교육 담당자 | 구성원에게 AI 교육 | 기업 강의 · 워크숍 | 강의 문의 폼 |

두 고객은 **동등**하다. 홈에서 분기한다.

**성공 기준**
- 뉴스레터 구독 폼이 5곳에 있고 매주 다이제스트가 나간다
- 실습 페이지가 이메일 게이트로 리드를 모은다
- 블로그가 카테고리 5개로 정리되어 신규 글이 `_meta` 수동 관리 없이 올라간다
- research-saas 콘텐츠가 사람 리터칭 1회를 거쳐 codemon.ai에 실린다
- 라이트/다크 양쪽에서 보라색·글로우·유리 카드가 0개다

---

## 2. 정보 구조 (IA)

### 2.1 네비게이션

```
인사이트 · 실습 · 강의 · 사례 · About            [KO / EN]  [뉴스레터 구독]
```

| 메뉴 | 라우트 | 담는 것 | 데이터 소스 |
|---|---|---|---|
| **인사이트** | `/insights` | 블로그 39편 + 신규 + 주간 다이제스트 아카이브 | `pages/blog/*.mdx`(라우트 유지, `/blog`→`/insights` 리다이렉트 없음 — 기존 URL 보존, nav 라벨만 인사이트) + `data/digest/*.json` |
| **실습** | `/practice` | 데모 7종 + high-techer 12개 + airpremia 18개 후보 중 선별 | `data/practice.ts` + `pages/practice/*.mdx` |
| **강의** | `/lectures` | 무료 셀프 코스 + 기업 출강 카탈로그 + 문의 항목 | `data/lectures.ts` |
| **사례** | `/cases` | `/work` 18 + `/showcase` 자체 서비스 4 + `/projects` 7 통합 | `data/cases.ts` |
| **About** | `/about` | 소개 · 법인 정보 · 일하는 방식 · 프로젝트 문의 | MDX |
| (버튼) 뉴스레터 구독 | `/newsletter` | 레터 소개 + 지난 호 아카이브 + 구독 폼 | Supabase `subscribers` |
| (버튼) KO / EN | `/en/*` | 기존 트리 유지, 스위처만 신설 | — |

### 2.2 nav에서 내리는 것 (코드 보관, 라우트 유지)

| 라우트 | 처리 | 이유 |
|---|---|---|
| `/showcase` | nav 제거. 자체 서비스 4건은 `/cases`로 이관, 데모 사이트 7건·자동화 7건은 페이지에 남김 | 나중에 취사선택 |
| `/projects` | nav 제거. 7건 `/cases`로 이관. 상세 MDX 6개는 유지 | 통합 |
| `/news` | nav 제거. `data/news.json` 10건은 다이제스트 아카이브 첫 호로 흡수 | research-saas가 대체 |
| `/docs` | nav 제거 | 내용 없음. 향후 프로젝트별 GitHub 연동 docs는 ADR로 기록 |
| Tools 외부 링크 | nav 제거, 푸터로 | — |
| `/partner/lecture-podl-ai/demo/*` | **유지**(폐기 결정 철회). `/practice`에서 링크, 디자인 리스킨 | 이메일 게이트 리드 자산 |
| `/partner/*` 나머지 | 유지(숨김). `/lectures` 카탈로그에서 레퍼런스로 링크 | — |
| `/yonsei/*` | `_meta.ts`에 hidden 등록 (현재 미등록 고아) | 유실 방지 |
| `/webinar/*` | 유지. `/practice`·`/lectures`에서 링크 | — |

### 2.3 홈 구성

Swiss Signal 시안 4(숫자 띠 제거본) 그대로:

1. 헤더 — 로고 · 메뉴 5 · KO/EN · 뉴스레터 구독
2. Hero — 헤드라인 "AI 도입, 슬라이드가 아니라 코드로 답합니다" + 분기 2열(옐로 블록=기업 → `/about#work-with-me`, 아웃라인=교육 → `/lectures`)
3. 하는 일 3열 — AX 진단 / 2주 PoC / 현장 투입(FDE), 산출물·기간
4. 대표 사례 3건 — 결과 한 줄 굵게, 문제/한 일 작게
5. 강의 3개 — 대상·시간·출강 문의
6. 최근 인사이트 3 + 최신 다이제스트 1
7. 실습 소개 — "2개 공개, 나머지는 구독자" + 뉴스레터 인라인 폼
8. 일하는 방식 3단계
9. 문의 CTA 2버튼 (`#000814` 밴드)
10. 푸터 — 법인 정보(KO + "Codemon Inc. · Seoul, Korea") · Projects/Tools/개인정보/이용약관

---

## 3. 디자인 시스템 — Swiss Signal

### 3.1 컨셉 선정 과정 (기록)

| 단계 | 내용 |
|---|---|
| 문제 | 현 사이트: 다크 + 보라 그라데이션(`#a855f7`) + 글로우. 오너 평가 "어둡고, AI가 만든 티가 나고, 고객에게 뭘 하는 사람인지 불명확" |
| 팔레트 출처 | coolors.co/palettes/trending 48개 중 브랜드 사이트에 맞는 것 선별 |
| 1차 시안 (5) | 라이트·명확: 1 Paper&Ink(Rustic Charm) · 2 Navy Consulting(Deep Sea) · 3 Warm Educator(Neutral Harmony) · **4 Swiss Signal**(Golden Twilight 반전) · 5 Teal Blueprint(Ocean Sunset) |
| 2차 시안 (5) | 신뢰·다크 허용·다국어: 6 Charcoal Ledger · 7 Midnight Navy · 8 Graphite Global · 9 Slate Green · 10 Navy&Gold |
| 중간 결정 | 숫자 강조(18건·12회·20년) 전면 제외 — 1~10 모두 재구성 |
| 최종 | **시안 4 Swiss Signal** |

**선정 이유**
1. **헤드라인이 곧 히어로** — "무엇을 하는 사람인지"를 타이포 하나로 3초 안에 전달. 불명확성 문제에 직접 답한다
2. **옐로 블록 vs 아웃라인** — 두 고객(기업/교육)을 색이 아닌 채움/비움으로 구분해 동등하게 보이면서도 시선 순서가 생긴다
3. **룰과 그리드만으로 구조** — 카드·그림자·그라데이션·아이콘 0. "AI 냄새" 항목이 원천 차단된다
4. **Pretendard 단일** — 라틴 글리프가 Inter 계열이라 KO/EN 혼용 시 무게가 맞는다. 다국어 전제에 부합
5. **흰 바탕 + 네이비** — 신뢰. 다크 모드는 `#000814` 바탕에 흰 글씨 + 옐로 유지로 반전 가능

### 3.2 토큰

```css
:root {
  --paper:   255 255 255;   /* #FFFFFF 배경 */
  --ink:       0  29  61;   /* #001D3D 본문·헤드라인 */
  --ink-2:     0  53 102;   /* #003566 보조 텍스트·룰 */
  --signal:  255 195   0;   /* #FFC300 옐로 — 블록·바·주 버튼 배경만. 흰 바탕 위 텍스트 색으로 금지 */
  --band:      0   8  20;   /* #000814 CTA 밴드·다크 배경 */
  --rule:      0  29  61;   /* 룰은 ink, 1px 또는 2px */
}
:root[data-theme="dark"], .dark {
  --paper:     0   8  20;
  --ink:     255 255 255;
  --ink-2:   200 208 220;
  --band:      0  29  61;
}
```

- **서체**: Pretendard 400 / 700 / 900. 숫자·날짜·코드는 Pretendard `tnum` (모노스페이스 도입 안 함)
- **타입 스케일**: Hero 96–112px/900/−0.03em · 섹션 제목 40px/700 · 본문 17px/400/1.7 · 캡션 13px
- **그리드**: 12칸, 좌 3칸 섹션 제목 / 우 9칸 본문. 최대 폭 1280. 여백 64px(모바일 16px)
- **모서리**: 0. **그림자**: 0. **그라데이션**: 0
- **모션**: 첫 진입 Hero 1회 reveal만. 섹션별 fade-up 금지. `prefers-reduced-motion` 존중
- **금지 목록**: 보라 계열, 글로우, backdrop-blur, 이모지 아이콘, 균등 카드 그리드, ALL-CAPS 트래킹 라벨, 헤드라인 한 단어 색 강조, 링크 끝 `→`

### 3.3 Tailwind 반영

`tailwind.config.js`: `accent.purple` 삭제, `glow`/`float` 키프레임 삭제, `backdropBlur` 삭제. `colors`에 `paper/ink/ink-2/signal/band` 추가(rgb 변수 방식 — #62의 `foreground/background` 패턴 재사용). `styles/globals.css`에 토큰 정의. 기존 `text-foreground`·`bg-background`는 `ink`/`paper`의 별칭으로 유지해 partner·yonsei·webinar 페이지가 깨지지 않게 한다.

### 3.4 Nextra 셸

`theme.config.tsx`: `logo`(Pretendard 900 "codemon"), `navbar.extraContent`(KO/EN 토글 + 구독 버튼), `footer.content`(법인 정보 2줄), `primaryHue` 옐로 대신 `primarySaturation 0` + 커스텀 CSS로 링크 색 ink. `darkMode: true` 유지, 기본 테마 라이트.

---

## 4. 콘텐츠 모델

### 4.1 인사이트 (블로그)

frontmatter 스키마 강제(빌드 시 검증, 누락되면 빌드 실패):

```yaml
title: string          # 필수
description: string    # 필수 (SEO)
date: YYYY-MM-DD       # 필수, 날짜 리터럴
category: agents-build | agents-ops | models | infra | retrospective   # 필수, 5개 중 1
tags: string[]         # 소문자·하이픈, TAG_MAP 폐지
series?: string        # 연재 슬러그 (예: multi-agent-local)
lang?: ko | en         # 기본 ko
```

| category | 라벨 | 현 편수 |
|---|---|---|
| `agents-build` | 에이전트 직접 만들기 | 12 |
| `agents-ops` | AI 코딩 에이전트 운용 | 9 |
| `models` | 모델 전쟁 — 출시·가격·벤치마크 | 8 |
| `infra` | 혼자 만드는 인프라·빌드로그 | 7 |
| `retrospective` | 엔지니어링 회고 | 3 |

- `pages/blog/_meta.ts`는 **삭제**. `scripts/generate-posts.mjs`가 frontmatter에서 `data/posts.json` + 카테고리 인덱스를 생성하고, `pages/blog/index.mdx`·`pages/insights/[category].tsx`가 이를 렌더
- 카테고리는 **실 URL** `/insights/agents-build` (쿼리 필터 금지)
- 목록: 페이지당 12편 페이지네이션. 최상단 고정 블록 "여기부터 읽으세요"(수동 선정 3편, `data/start-here.ts`)
- 글 상세 하단 전환 사다리(순서 고정): 다음 글 1 → 관련글 4(같은 category 최신) → 뉴스레터 인라인 폼 → 관련 실습 2(태그 매칭) → 강의 CTA
- 기존 39편 이관: 태그 정규화 매핑표는 `docs/plans/`의 이관 태스크에 명시. `date` 없는 1편(`google-nano-banana-2-release`) 보정

### 4.2 실습

```ts
interface Practice {
  slug: string
  title: string
  summary: string
  source: 'demo' | 'hightecher' | 'airpremia' | 'webinar' | 'original'
  level: 'free' | 'pro'            // 필요한 Claude 구독
  tools: string[]                  // ['Claude.ai', 'Claude Code', 'Obsidian']
  minutes: number
  gate: 'public' | 'subscriber'    // 이메일 게이트
  steps: number
  href: string                     // /practice/<slug> 또는 /partner/lecture-podl-ai/demo/<x>
  relatedTags: string[]
}
```

- **게이트**: `gate: 'subscriber'`인 페이지는 학습목표 3줄 + 이메일 입력. `POST /api/newsletter/subscribe`(기존) 성공 → 쿠키 `practice_unlock`(HMAC, 30일) 발급 → 본문 노출. 이미 구독자면 이메일 입력만으로 해제(Supabase `subscribers` 조회). 로그인 없음
- 첫 공개 세트: **데모 2개 공개(seeding, report) + 5개 게이트**, high-techer 4개(첫 아티팩트 / FAQ 답변기 / 폴더 카탈로그 / 대시보드 7요소), airpremia v4 4개(업무 분해표 / 보고서 Skill / 메일 12통 분류 / Cowork 첫 출근) — 총 15개, 공개 6 / 게이트 9
- 페이지 구조: 목표 → 준비물 → 단계(번호, 복사 버튼 있는 프롬프트 블록) → 확인(체크리스트) → 다음 실습. 컴포넌트 `CopyBox`·`Checklist`·`TroubleCard` 신설(high-techer 자료 페이지 구조 이식)

### 4.3 강의

```ts
interface Lecture {
  slug: string
  title: string
  kind: 'self' | 'corporate'       // 무료 셀프 / 기업 출강
  audience: '실무자' | '개발자' | '임원' | '비개발자'
  hours: number
  outline: { title: string; minutes: number }[]
  prerequisites: string[]
  deliverables: string[]           // 실습 산출물 예시
  refs: string[]                   // /partner/*, /webinar 링크
  visibility: 'public' | 'anonymous' | 'private'   // 실적 표기
  clientLabel?: string             // anonymous일 때 "항공사 임직원" 등
}
```

- `kind: 'corporate'` 페이지 하단에 **문의 시 보낼 항목** 고정 블록: 대상·인원·시간·온/오프라인·희망 시기·사내 도구(MS365/Google) → `/contact?type=lecture`로 프리필
- 가격 표기 없음. "시간·비용·실습 범위·교육 후 지원은 협의 후 확정"
- 실적: 연세대(public), 하이테커 VOD(public, 귀속 확인 후), 항공사 임직원 v4(anonymous), 포들(public)

### 4.4 사례

`data/work/projects.ts`의 `WorkProject`를 `data/cases.ts`로 이동·확장:

```ts
kind: 'client' | 'product' | 'lab'          // 외주 / 자체 서비스 / 실험
visibility: 'public' | 'anonymous' | 'private'   // realName 대체
```

- `public`·`anonymous`: 비번 없이 목록·상세 열람. `anonymous`는 `clientLabel`로 표기, 스크린샷은 블러 처리 이미지 별도 제공
- `private`: 기존 `/work` 비번 게이트 그대로(쿠키 `work_session`). 목록에서는 "비공개 N건" 카운트만
- 이관: work 18(전부 public) + showcase 자체 서비스 4(product) + projects 7(lab)
- `/work/*` 라우트는 `/cases/*`로 301. `route-inventory.md` 갱신

### 4.5 문의

Supabase 테이블 `inquiries`:

```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('project','lecture')),
  org text, name text not null, contact text not null,
  body text not null, meta jsonb default '{}',
  created_at timestamptz default now()
);
```

- `POST /api/contact` — honeypot 필드 + IP당 5분 3회 제한 + 저장 + Slack `#ax-codemon-site` 알림(기존 slack_send 토큰 재사용, Vercel env `SLACK_BOT_TOKEN`)
- `/admin/inquiries` — 목록·검색·CSV(기존 `/admin/subscribers` 패턴 복제)
- 폼 2종 필드: 프로젝트(회사·담당자·연락처·바꾸고 싶은 업무·희망 시기·예산 범위 선택) / 강의(기관·담당자·연락처·대상·인원·시간·희망 일정·온/오프라인)

### 4.6 뉴스레터

- 폼 배치 **5곳**: 헤더 버튼 → `/newsletter` / 홈 실습 섹션 인라인 / 글 하단 사다리 / 실습 게이트 / 푸터
- `/newsletter`: 소개 + 지난 호 목록(`data/digest/*.json`) + 폼
- 발송: 기존 `/admin/mailing`(Resend + `emails/Newsletter.tsx`) 재사용. 다이제스트 템플릿 `emails/Digest.tsx` 신설
- 중복 판정을 Blob 스냅샷에서 **Supabase 단일 소스**로 전환(현재 Blob 비면 오판)

---

## 5. research-saas 통합

**결정(2026-09-23)**: 별도 `research.codemon.ai` 대신 **codemon.ai 안으로 통합**. research-saas 쪽 D3·D1은 이 결정으로 갱신한다(해당 레포 `docs/HANDOFF.md`에 반영 요청).

### 5.1 경계

| 위치 | 책임 |
|---|---|
| research-saas (로디, Python) | 수집·중복제거·LLM 보강. **신규**: `engine export --since <date> --json <path>` — `item ⋈ item_enrich`를 JSON 배열로 출력 (필드: id, url, title, author, published_at, lang, category, keywords, summary_ko, label, axis) |
| codemon-connectalive 또는 launchd | 주 1회 export → `codemon-site/data/digest/inbox/YYYY-WW.json` 커밋(브랜치 `digest/YYYY-WW`) |
| codemon-site `/admin/digest` | **리터칭 UI**: inbox 항목 목록, 체크 선택, 한 줄 코멘트 편집, 순서 조정 → `data/digest/YYYY-WW.json` 확정 저장 + 뉴스레터 발송 버튼 |
| codemon-site 공개 | `/insights/digest/YYYY-WW` 페이지 + `/newsletter` 아카이브 + Resend 발송 |

- A4(사람 리터칭 필수)는 `/admin/digest` 확정 단계가 담당. 자동 발행 경로 없음
- 실시간 피드(`/news` 부활, B안 승격)는 **이 스펙 범위 밖**. export가 안정되고 주간 운영이 4회 이상 돌아간 뒤 별도 스펙
- 기존 `data/news.json` 10건은 `2026-W10.json`으로 변환해 첫 아카이브 호로 둔다

### 5.2 다이제스트 JSON

```ts
interface Digest {
  week: string                 // "2026-W39"
  publishedAt: string
  intro: string                // 리터칭 시 작성
  items: {
    id: number; url: string; title: string; source: string
    summaryKo: string; keywords: string[]; category: 'fde'|'aipm'|'aimkt'
    label: 'primary'|'news'|'analysis'|'vendor'
    comment?: string           // 코드몬 한 줄
  }[]
}
```

---

## 6. 자료 이관 (high-techer · airpremia)

### 6.1 게이트 (실행 전 필수)

| # | 게이트 | 누가 | 상태 |
|---|---|---|---|
| G1 | **하이테커 IP 귀속 확인** — VOD 2컨텐츠(유상 제작) 공개 범위 서면 합의 | 코드몬 | 미확인 |
| G2 | **airpremia v3fd·v4 귀속 확인** — 하이테커 컨텐츠 재구성 + 인재키움 편성표 기반 | 코드몬 | 미확인 |
| G3 | airpremia 설문 응답 조회(Supabase `survey_responses`, `airpremia-lv1`) — N·만족도 인용 가능 여부 | Claude Code | 미조회 |
| G4 | 비밀번호 평문 문서 격리 — `high-techer/online-vod-site/README.md:23`, `airpremia/CLAUDE.md:27-28`, `_HANDOFF.md`, `docs/INDEX.md` | 코드몬 | 미처리 |

G1·G2 확인 전에는 **A등급(가상 데이터·범용 교양) 자산만** 이관한다.

### 6.2 이관 대상 (등급별)

| 출처 | 즉시(A) | 브랜드 제거 후(B) | 비공개(C) |
|---|---|---|---|
| high-techer | showcase 4, extras 15, 데이터셋(sales_2030.csv·연습폴더·wiki-samples), codemon-class 4, 웨비나 킷 | 제공자료 21, 교안 20, 슬라이드 176장 | 실습형 프로젝트·퀴즈·진단 PPTX, 모범답안(합의 전), 강사프로필, 제작 내부 문서 |
| airpremia | 교재 MD 5(용어사전·Transformer·LLM여정·프롬프팅·왜 AI/AX), v4 키트 T1~T6·샘플·dashboard-kit·para-kit, v2 mock xlsx 12, v3 seeds(wiki/mcp 템플릿), 하네스루프 가이드 | 부서별 프롬프트 26, v4 슬라이드 6덱, v3fd 교안 11·슬라이드 9, v2 교시 5·tips 18, v1 교재·슬라이드, v3 Field Manual 45 | 컨설팅 산출물(실명 27명), v2 "실데이터" 7종(사내 서식), 제안서, CLAUDE.md·_HANDOFF.md, instructor/my-dept-system, .firecrawl |

### 6.3 변환 규칙

- HTML 교안(`.slide` 카드 + `details.script`) → MDX: 카드=`##`, script=`<Details>` 접기, `.prompt`=코드블록. 변환 스크립트 `scripts/convert-lesson.mjs`(셀렉터 균일)
- 제공자료 HTML(`.pbox`+copy, `.trouble`, `.checklist`) → MDX + `CopyBox`/`TroubleCard`/`Checklist`
- 슬라이드 덱 → `public/slides/<course>/` 정적 + iframe(기존 패턴). `../assets/` 경로 정리
- 브랜드 문자열 치환 스크립트 `scripts/strip-brand.mjs`: "HIGHTECHER", "codemon × HIGHTECHER", "AIRPREMIA × CODEMON.AI", `#E34027`/`#182749`/`#C8102E`, `airpremia.vercel.app`, `hightecher-lectures.vercel.app` → 치환 후 grep 0 확인
- 🎙️ 스피커노트·강사 체크·`[촬영전확인]` 마커 제거
- 사실 유효기간: 모델명·UI 서술은 2026-07 기준. 이관 시 `<!-- verified: 2026-09 -->` 주석 없는 문단은 게시 전 재검증

---

## 7. 범위 밖

- `/en` 콘텐츠 보강(스텁 7편) — 로디몬. 이번엔 스위처 UI만
- 실시간 뉴스 피드(B안) — 별도 스펙
- AirQuiz/Hunt 라이브 게임 이식(Redis·Host 게이트) — 별도
- 블로그 본문 레이아웃 시안 5개 — 별도 세션(디자인 스킬), 이 스펙은 토큰만 물려줌
- 광고·스폰서 — 도입하지 않음(결정)
- `/p/*` 60페이지 인증 — 별도 이슈

---

## 8. 검증

- `npm run build` 통과, frontmatter 검증 실패 0
- `./scripts/check-routes.sh` 실패 0 (인벤토리 갱신 후 기준선 134 + 신규)
- 라이트/다크 스크린샷 대조: 홈·인사이트 목록·글 상세·실습 게이트·강의·사례·partner 1·webinar 1
- 폼 2종 제출 → `inquiries` 행 + `/admin/inquiries` 표시 + Slack 알림 3종 확인
- 실습 게이트: 미구독 → 이메일 입력 → 해제 → 새 탭에서 쿠키로 유지 / 기존 구독자 이메일 → 즉시 해제
- 브랜드 문자열 grep 0: `HIGHTECHER|AIRPREMIA|airpremia\.vercel|hightecher-lectures`
- 모바일 390px: 가로 스크롤 0, Hero 헤드라인 3줄 이내
- Lighthouse 접근성 90+ (옐로 위 텍스트 대비 확인)

---

## 9. 결정 기록 (ADR 후보 → `docs/wiki/decisions.md`)

- ADR-005 research-saas 통합(별도 도메인 폐기), 주간 다이제스트 + admin 리터칭
- ADR-006 디자인 시스템 Swiss Signal, 보라 은퇴, 라이트 기본
- ADR-007 블로그 frontmatter 단일 소스, `_meta.ts` 폐지
- ADR-008 만든 것 3목록 → `/cases` 통합, visibility 필드
- ADR-009 데모 7종 폐기 철회 → 실습 이메일 게이트
