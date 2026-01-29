# 프로젝트 셋업 과정

## 개요

codemon.ai를 Nextra 기반으로 새로 구축하는 과정을 기록합니다.

## 1. 프로젝트 생성

### 1.1 초기 시도 - 템플릿 사용 (실패)

```bash
npx create-next-app codemon-site -e https://github.com/shuding/nextra-docs-template
```

**문제**: 의존성 충돌 발생
- `nextra@4.6.1`이 `next@>=14`를 요구하는데 템플릿은 `next@13`을 사용
- `npm error ERESOLVE unable to resolve dependency tree`

### 1.2 수동 설치 (성공)

```bash
mkdir codemon-site && cd codemon-site
npm init -y
npm install next@14 react@18 react-dom@18 nextra@3 nextra-theme-docs@3
npm install typescript @types/node @types/react --save-dev
```

## 2. 설정 파일

### 2.1 next.config.mjs

```javascript
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  reactStrictMode: true,
})
```

### 2.2 theme.config.tsx

```tsx
import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>codemon</span>,
  project: {
    link: 'https://github.com/coffeemon',
  },
  footer: {
    content: '© 2024 codemon.ai',  // Nextra 3에서는 'text' 대신 'content' 사용
  },
  // ...
}

export default config
```

### 2.3 pages/_app.tsx (필수)

Nextra 3에서는 커스텀 App 컴포넌트가 필수입니다.

```tsx
import type { AppProps } from 'next/app'
import 'nextra-theme-docs/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### 2.4 _meta.ts (JSON → TypeScript)

Nextra 3에서는 `_meta.json`이 제거되고 `_meta.ts`를 사용해야 합니다.

**변경 전** (`_meta.json`):
```json
{
  "index": "Home",
  "about": "About"
}
```

**변경 후** (`_meta.ts`):
```typescript
export default {
  index: {
    title: 'Home',
    type: 'page'
  },
  about: {
    title: 'About',
    type: 'page'
  }
}
```

## 3. Nextra 3 주요 변경사항

| 항목 | Nextra 2 | Nextra 3 |
|------|----------|----------|
| 메타 파일 | `_meta.json` | `_meta.ts` |
| 푸터 설정 | `footer.text` | `footer.content` |
| App 컴포넌트 | 선택 | 필수 |
| 컴포넌트 import | `nextra/components` | 일부 변경됨 |

## 4. 빌드 테스트

```bash
npm run build
```

성공 시 17개 페이지가 생성됩니다.

## 5. 참고 자료

- [Nextra 공식 문서](https://nextra.site)
- [Next.js Pages Router](https://nextjs.org/docs/pages)
