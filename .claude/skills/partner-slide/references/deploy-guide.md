# 슬라이드 배포 가이드

## 배포 구조

```
public/slides/{slug}.html          → https://codemon.ai/slides/{slug}.html (정적 파일)
pages/partner/{slug}/slides.mdx    → https://codemon.ai/partner/{slug}/slides (iframe 페이지)
```

## iframe 페이지 템플릿

```mdx
---
title: "{제목} — 슬라이드"
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

## 배포 명령어

```bash
# 1. 빌드
npm run build

# 2. 프리빌트 배포
vercel build --prod && vercel --prod --prebuilt
```

## 직접 HTML 접근

슬라이드 HTML은 `public/` 폴더에 있으므로 직접 접근 가능:
`https://codemon.ai/slides/{slug}.html`

iframe 페이지는 Nextra 사이트 내에서 보여주는 래퍼:
`https://codemon.ai/partner/{slug}/slides`
