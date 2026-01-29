# 알려진 이슈 및 해결 방법

## 이슈 #1: 홈페이지 레이아웃/스타일 깨짐

### 증상
- 홈페이지(`/`)에서 Nextra 테마 스타일이 적용되지 않음
- 텍스트가 기본 스타일로만 렌더링됨
- 다른 페이지(Projects, Blog, Docs)는 정상

### 원인
`pages/_meta.ts`에서 홈페이지에 `layout: 'raw'` 설정이 적용되어 있음:

```typescript
index: {
  title: 'Home',
  type: 'page',
  theme: {
    layout: 'raw'  // 이 설정이 문제
  }
}
```

`layout: 'raw'`는 Nextra의 기본 레이아웃(사이드바, 스타일링 등)을 제거하고
순수 콘텐츠만 렌더링합니다.

### 해결 방법

#### 방법 1: raw 레이아웃 제거 (권장)
```typescript
index: {
  title: 'Home',
  type: 'page'
  // theme 설정 제거
}
```

#### 방법 2: 커스텀 홈페이지 스타일 적용
`layout: 'raw'`를 유지하면서 커스텀 CSS/컴포넌트로 스타일링

### 상태
- [ ] 수정 필요

---

## 이슈 #2: Nextra 컴포넌트 import 오류

### 증상
```
Error: Element type is invalid: expected a string but got: undefined
```

### 원인
Nextra 3에서 일부 컴포넌트 import 경로가 변경됨.
`Cards`, `Card`, `Callout` 등의 컴포넌트가 `nextra/components`에서
정상적으로 export되지 않는 경우가 있음.

### 해결 방법
MDX에서 Nextra 컴포넌트 대신 순수 마크다운 사용:

**변경 전**:
```mdx
import { Cards, Card, Callout } from 'nextra/components'

<Cards>
  <Card title="Projects" href="/projects" />
</Cards>
```

**변경 후**:
```mdx
## 프로젝트

- [Projects](/projects) - 프로젝트 목록
```

### 상태
- [x] 해결됨 (마크다운으로 대체)

---

## 이슈 #3: _meta.json 지원 중단

### 증상
```
Error: Support of "_meta.json" was removed, use "_meta.{js,jsx,ts,tsx}" instead
```

### 원인
Nextra 3에서 `_meta.json` 파일 지원이 제거됨.

### 해결 방법
모든 `_meta.json` 파일을 `_meta.ts`로 변환:

```typescript
// pages/_meta.ts
export default {
  index: 'Home',
  about: 'About'
}
```

### 상태
- [x] 해결됨

---

## 이슈 #4: footer.text 타입 오류

### 증상
```
Type error: 'text' does not exist in type
```

### 원인
Nextra 3에서 footer 설정 API가 변경됨.

### 해결 방법
`theme.config.tsx`에서 `footer.text` → `footer.content`로 변경:

```typescript
footer: {
  content: '© 2024 codemon.ai'  // text → content
}
```

### 상태
- [x] 해결됨
