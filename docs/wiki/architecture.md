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
| 배포 | Vercel (프리빌트 방식) | - |
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
│   ├── p/                  # Private pages (hidden)
│   └── api/                # API routes (OG image, Telegram chat)
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
│   └── ChatWidget.tsx      # 텔레그램 챗 위젯
├── data/                   # 데이터 파일
│   └── news.json           # 뉴스 데이터
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

```bash
# 프리빌트 배포 (권장)
vercel build --prod
vercel deploy --prebuilt --prod

# 자동 배포
git push → Vercel auto deploy (main 브랜치)
```

---

## 페이지 레이아웃 규칙

- `index` 페이지: `layout: 'raw'` (사이드바/TOC 없음)
- 기타 페이지: Nextra docs 표준 레이아웃
- 다크모드 기본, `dark:` variant 필수
