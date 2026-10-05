# codemon-site 아키텍처

> 현재 상태 기준 문서. 변경 시 업데이트 필수.

---

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Nextra (nextra-theme-docs) | 3.3.x |
| 런타임 | Next.js (Pages Router) | 14.x |
| 언어 | TypeScript | - |
| 스타일링 | Tailwind CSS + Nextra theme | - |
| 애니메이션 | Framer Motion | ^12.x |
| 배포 | Vercel CLI 프리빌트 전용 (auto-deploy 비활성화) | - |
| AI SDK | @anthropic-ai/sdk (데모 시스템 Claude API 프록시) | - |
| 저장소 | Vercel Blob (설문, 챗, 뉴스레터) | - |
| 분석 | Google Analytics + Vercel Analytics | - |
| 에러 추적 | Sentry | - |

---

## 프로젝트 구조

```
codemon-site/
├── pages/                  # Pages Router
│   ├── _app.tsx            # App wrapper (GA, Analytics, ChatWidget)
│   ├── _meta.ts            # 최상위 네비게이션
│   ├── index.mdx           # Home (layout: raw)
│   ├── about.mdx           # About
│   ├── showcase.mdx        # Showcase
│   ├── projects/           # Projects (15개)
│   ├── blog/               # Blog (~35개 글)
│   ├── news/               # News 섹션
│   ├── docs/               # Documentation
│   ├── en/                 # English (i18n)
│   ├── partner/            # 강의 자료 (3개 강의 + 데모 시스템)
│   │   ├── lecture-agency-ai/
│   │   ├── lecture-startup-ai/
│   │   ├── lecture-podl-ai/
│   │   │   ├── demo/      # 라이브 데모 5개 + 대시보드
│   │   │   └── index.mdx
│   │   └── survey/
│   ├── p/                  # Private pages (hidden)
│   └── api/                # API routes
│       ├── demo/           # Claude API 프록시 + 데이터 서빙
│       ├── chat/           # Telegram 챗
│       ├── survey/         # 설문
│       └── og.tsx          # OG 이미지
├── components/             # React 컴포넌트
│   ├── Hero.tsx            # 랜딩 히어로
│   ├── Features.tsx        # 4 Pillars 카드
│   ├── ContactCTA.tsx      # CTA 섹션
│   ├── BlogIndex.tsx       # 블로그 인덱스 (태그 필터)
│   ├── NewsIndex.tsx       # 뉴스 인덱스
│   ├── ProjectCard.tsx     # 프로젝트 카드
│   ├── ShowcaseCard.tsx    # 쇼케이스 카드
│   ├── Career.tsx          # 커리어 타임라인
│   ├── Stats.tsx           # 통계 카운터
│   ├── TechStack.tsx       # 기술 스택
│   ├── Footer.tsx          # 푸터
│   ├── ChatWidget.tsx      # 텔레그램 챗 위젯
│   └── demo/               # 라이브 데모 컴포넌트
│       ├── DemoShell.tsx   # 공통 데모 레이아웃 (입력|출력 split)
│       ├── StreamingOutput.tsx # Claude 스트리밍 응답
│       ├── DataPreview.tsx # 목업 데이터 테이블
│       └── Dashboard.tsx   # 풀스크린 대시보드 + 드릴다운
├── data/                   # 데이터 파일
│   ├── news.json           # 뉴스 데이터
│   └── demo/               # 데모 목업 데이터 (회사 교체로 재사용)
│       ├── config.ts       # 회사 설정 (이름, 업종, 채널, 팀)
│       ├── influencers.json
│       ├── sales.json
│       ├── sns-posts.json
│       ├── products.json
│       └── marketing-copy.json
├── styles/globals.css      # 글로벌 CSS (glass, animations)
├── theme.config.tsx        # Nextra 테마 + SEO
├── next.config.mjs         # Next.js + Nextra + Sentry
├── tailwind.config.js      # Tailwind (colors, animations)
├── scripts/
│   └── generate-posts.mjs  # 블로그 메타데이터 추출
└── docs/                   # 내부 문서 (CODA 구조)
    ├── INDEX.md            # 라우팅 테이블
    ├── prd/                # WHY: 왜 만드나
    ├── spec/               # HOW: 구현 약속
    ├── wiki/               # NOW: 현재 상태
    ├── changelog/          # DELTA: 변경 기록
    ├── _templates/         # 템플릿
    └── drafts/             # 초안
```

---

## AI 에이전트 팀

```
길벗 (CodeMon) — Founder & AI/AX Engineer
├── 로디 🦊 PM & Orchestrator (Mac Mini M1)
├── 누비 🐕 QA & Debugger (MacBook Air M2)
├── 베어 🐻‍❄️ Design & Frontend (MacBook Pro 회사)
├── 뉴비 🐣 Research & Scout (MacBook Pro 회사)
├── 나래 🦜 Content & Marketing (TBD)
├── 옥토 🐙 Backend & Infra (TBD)
└── 아울 🦉 Data & Automation (TBD)
```

---

## 컬러 시스템

```
배경:   #0a0a0a (다크) / #ffffff (라이트)
텍스트: #fafafa (다크) / #000000 (라이트)
포인트: #a855f7 (보라) — 버튼, 링크, hover, 강조에만
서브:   gray 계열만 (border, muted text)
```

- `accent.pink` 미사용 → 보라 단일
- 그라디언트는 `보라→진보라` 방향만

---

## 배포 방식

GitHub auto-deploy **비활성화**. Vercel CLI 프리빌트 전용:

```bash
# 1. 로컬 빌드 (env -i로 nvm 재귀 우회)
env -i HOME=/Users/codemon PATH="..." /bin/bash -c 'npm run build'

# 2. Vercel 프리빌트 + 배포
env -i HOME=/Users/codemon PATH="..." /bin/bash -c 'vercel build --prod'
env -i HOME=/Users/codemon PATH="..." /bin/bash -c 'vercel deploy --prebuilt --prod'

# 3. 검증 (verify-deploy 스킬)
playwright-cli open https://codemon.ai/<path>
```

상세 경로는 `CLAUDE.md` 배포 섹션 참조.

---

## 페이지 레이아웃 규칙

- `index` 페이지: `layout: 'raw'` (사이드바/TOC 없음)
- 기타 페이지: Nextra docs 표준 레이아웃
- 다크모드 기본, `dark:` variant 필수

## 콘텐츠 데이터 계층 (리뉴얼 P2, 2026-10-06)

| 파일 | 역할 |
|------|------|
| `lib/content/schema.ts` | 블로그 frontmatter 타입·카테고리 5종 상수 (ADR-007) |
| `scripts/generate-posts.mjs` | prebuild: frontmatter 검증(위반=빌드 실패) → `data/posts.json`, `data/categories.json` |
| `data/cases.ts` | 사례 25건 — `kind: ax\|client\|product\|lab`, `visibility`. `workCases`(client+ax)가 /work 소스 |
| `data/lectures.ts` | 강의 카탈로그 7건 (refs → /partner, /webinar) |
| `data/start-here.ts` | 인사이트 "여기부터" 3편 |

`pages/blog/_meta.ts`에는 포스트를 나열하지 않는다 — 제목·순서는 frontmatter가 단일 소스.

### 자료 이관 도구 (리뉴얼 P4)

| 파일 | 역할 |
|------|------|
| `scripts/strip-brand.mjs` | 브랜드 치환표 + 잔여 grep (`--write`) |
| `scripts/convert-lesson.mjs` | 교안/보충자료 HTML → 인사이트 MDX (스피커노트 제거) |
| `scripts/convert-resource.mjs` | 제공자료 HTML → CopyBox/TroubleCard/Checklist MDX |
| `components/content/*` | 이관 콘텐츠용 컴포넌트 |
| `content/migrated/blog/` | 스테이징 (ADR-012) — 빌드 대상 아님 |

### 다이제스트 (리뉴얼 P5) — 운영은 `digest-ops.md`

| 파일 | 역할 |
|------|------|
| `lib/content/digest.ts` | Digest 타입, export→item 변환, ISO 주차 |
| `data/digest/inbox/*.json` | research-saas export 원본 (주차별) |
| `lib/admin/digest.ts` · `pages/api/admin/digest/*` · `pages/admin/digest.tsx` | 리터칭 UI/API (Supabase `digests`) |
| `scripts/generate-digests.mjs` | prebuild: published → `data/digest/<week>.json` + `index.json` |
| `pages/insights/digest/[week].tsx` | 공개 페이지 (SiteShell) |
| `emails/Digest.tsx` · `pages/api/admin/digest/send.ts` | 발송 |

### 콘텐츠 자동 발행 파이프라인 (리뉴얼 P6) — 운영은 `content-pipeline-ops.md`

| 파일 | 역할 |
|------|------|
| `scripts/content-pipeline.mjs` | draft(Codex) → judge(Fable 5.1+WebSearch) → images(OpenAI Images) → enqueue |
| `scripts/content-prompts/{draft,judge}.md` | 프롬프트 템플릿 (편집 가능) |
| `scripts/content-schedule.mjs` | 3일 간격 큐 pop → `pages/blog/<slug>.mdx` → PR |
| `data/content-queue/{queue,log}.json`, `batches/<id>/` | 큐·발행 이력·배치 산출물(판정 근거 보관) |
| `ops/launchd/ai.codemon.content-schedule.plist` | 매일 09:10 스케줄 템플릿 |
