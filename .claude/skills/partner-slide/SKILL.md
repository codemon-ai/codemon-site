---
name: partner-slide
description: codemon.ai 강의 슬라이드(HTML)를 생성하거나 업데이트한다. "슬라이드 만들어줘", "강의 슬라이드 생성", "프레젠테이션 만들기", "partner slide" 요청 시 사용. frontend-slides 스킬을 활용하여 단일 HTML 슬라이드를 생성하고, codemon.ai에 배포한다. 발표자 스크립트(MD)도 함께 생성한다.
---

# partner-slide — 강의 슬라이드 HTML 생성/업데이트

강의 개요 MDX를 기반으로 슬라이드 HTML을 생성하고 codemon.ai에 배포한다.

## 의존 스킬

- `frontend-slides` — 실제 HTML 생성에 사용 (`.claude/skills/frontend-slides/`)

## 파일 구조

```
public/slides/{slug}.html          # 슬라이드 HTML
pages/partner/{slug}/slides.mdx    # iframe 페이지
docs/{slug}-script.md              # 발표자 스크립트 (선택)
```

## 워크플로우

### 1. 소스 읽기

`pages/partner/{slug}/index.mdx` 에서 커리큘럼 구조를 추출한다.
- 장/모듈 구분
- 데모 목록
- 핵심 데이터/표

### 2. 슬라이드 구성 설계

MDX 내용을 슬라이드 단위로 분해:
- 1 모듈 = 2~5장 슬라이드
- 표/데이터 = 1장
- 도식화 필요 = CSS 다이어그램
- 데모 = "LIVE DEMO" 배지
- 장 전환 = 장 표지 슬라이드

**밀도 제한** (frontend-slides SKILL.md 기준):
- 타이틀: 1 heading + 1 subtitle
- 콘텐츠: 1 heading + 4-6 bullets OR 2 paragraphs
- 카드 그리드: 최대 6개 (2x3 or 3x2)
- 초과 시 슬라이드 분할

### 3. HTML 생성

frontend-slides 스킬의 Phase 3 워크플로우로 생성:

1. `viewport-base.css` 전체 인라인 포함
2. `html-template.md` 구조 따르기
3. 스타일: 다크 테마 (Neon Cyber 계열)
4. 폰트: Noto Sans KR + JetBrains Mono (Google Fonts)
5. 네비게이션: 키보드(←→), URL 해시(#slide=N), 도트, 프로그레스바
6. 터치/스와이프 지원

저장: `public/slides/{slug}.html`

### 4. iframe 페이지 생성

`pages/partner/{slug}/slides.mdx`:

```mdx
---
title: "{강의 제목} — 슬라이드"
---

<iframe
  src="/slides/{slug}.html"
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    border: 'none',
    zIndex: 9999,
    background: '#0a0a14'
  }}
  allowFullScreen
/>
```

### 5. 메타 업데이트

`pages/partner/{slug}/_meta.ts`에 slides 추가:

```ts
export default {
  index: '강의 개요',
  slides: {
    title: '📺 강의 슬라이드',
    theme: { layout: 'raw' }
  },
}
```

### 6. 인덱스 링크 추가

`pages/partner/index.mdx`에서 해당 강의에 슬라이드 링크 추가:

```
[강의 개요 보기 →](/partner/{slug}) | [슬라이드 보기 →](/partner/{slug}/slides)
```

### 7. 발표자 스크립트 (선택)

`docs/lecture-{slug}-script.md` 생성:
- 슬라이드별 설명 요약 + 전환 멘트
- 데모 슬라이드에 준비물/URL/예상 시간
- 문서 끝에 데모 준비 체크리스트

### 8. 검증 + 배포

```bash
npm run build
vercel build --prod && vercel --prod --prebuilt
```

확인: `https://codemon.ai/partner/{slug}/slides`

## 기존 슬라이드 업데이트

기존 `public/slides/{slug}.html`이 있으면:
1. 기존 HTML 읽기
2. 변경 사항 반영 (슬라이드 추가/수정/삭제)
3. 덮어쓰기
4. 빌드 → 배포

## 기존 슬라이드 목록

| slug | 슬라이드 URL | 방식 |
|------|------------|------|
| lecture-agency-ai | /partner/lecture#slide=0 | React 컴포넌트 (별도 관리) |
| lecture-startup-ai | /partner/lecture-startup-ai/slides | HTML (이 스킬로 관리) |
