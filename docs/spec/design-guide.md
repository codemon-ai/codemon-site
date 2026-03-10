# codemon.ai 디자인 가이드라인

> 최종 정리: 2026.02.27
> 테마: 흑백 미니멀 + 보라 포인트

---

## 1. 컬러 시스템

### 1.1 베이스 (흑백)

| 용도 | 다크모드 | 라이트모드 |
|------|----------|------------|
| 배경 | `#0a0a0a` | `#ffffff` |
| 텍스트 | `#fafafa` | `#000000` |
| 텍스트 muted | `white/50` | `black/50` |
| 보더 | `white/[0.06]` | `black/[0.08]` |
| 보더 hover | `white/[0.12]` | `black/[0.15]` |

### 1.2 포인트 (보라)

```
메인:   #a855f7  (accent-purple, Tailwind purple-500)
진한:   #7c3aed  (purple-600, hover/active)
연한:   #a855f7/10  (배경 tint용)
```

**사용처:**
- CTA 버튼 배경
- 링크 hover 색상
- 아이콘 강조
- 선택/활성 상태
- 미세한 배경 그라디언트 (섹션 구분)

### 1.3 사용하지 않는 색

| 색 | 이전 용도 | 대체 |
|----|-----------|------|
| `accent.pink #ec4899` | 그라디언트 끝 | 제거 → 보라 단일 |
| `primary blue` 계열 | 링크, 버튼 | 보라로 대체 |
| 오렌지/빨강/노랑 아이콘 | Stats, Career | 보라 or 흑백으로 |

---

## 2. 타이포그래피

### 2.1 기본 (Nextra 기본 폰트 유지)

```
본문: system-ui, sans-serif
코드: monospace (Nextra 기본)
```

### 2.2 크기 가이드

| 요소 | 크기 | 비고 |
|------|------|------|
| Hero 타이틀 | `text-5xl md:text-7xl lg:text-8xl` | 가장 큰 텍스트 |
| 섹션 제목 | `text-3xl md:text-4xl` | 각 섹션 h2 |
| 카드 제목 | `text-2xl` | Features, Showcase 등 |
| 본문 | `text-lg md:text-xl` | Hero 설명, CTA 텍스트 |
| 캡션/라벨 | `text-sm` | 번호, 메타 정보 |

### 2.3 font-weight

- 타이틀: `font-bold` (700)
- 카드 제목: `font-semibold` (600)
- 본문: `font-normal` (400)
- 넘버링: `font-mono` + muted 색상

---

## 3. 컴포넌트 스타일 패턴

### 3.1 카드

```tsx
// 기본 카드
className="p-8 rounded-2xl border border-black/[0.08] dark:border-white/[0.06]
           hover:border-black/[0.15] dark:hover:border-white/[0.12]
           transition-all duration-300"
```

### 3.2 Glass 효과

```css
.glass {
  background: rgba(0, 0, 0, 0.03);        /* 라이트 */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.dark .glass {
  background: rgba(255, 255, 255, 0.05);   /* 다크 */
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 3.3 CTA 버튼

```tsx
// Primary (보라 배경)
className="px-8 py-3 rounded-full bg-accent-purple text-white
           font-semibold hover:opacity-80 transition-opacity"

// Secondary (흑백 반전)
className="px-8 py-3 rounded-full bg-black dark:bg-white
           text-white dark:text-black font-semibold
           hover:opacity-80 transition-opacity"
```

### 3.4 애니메이션

```tsx
// Framer Motion 기본 패턴
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}     // or whileInView
transition={{ duration: 0.8 }}

// 순차 등장 (staggered)
transition={{ duration: 0.5, delay: i * 0.1 }}
```

### 3.5 Glow 효과 (보라 단일)

```js
// tailwind.config.js
glow: {
  '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
  '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' },
}
```

---

## 4. 레이아웃

### 4.1 섹션 구조

```
max-w-3xl mx-auto   → 텍스트 중심 (Hero, CTA)
max-w-4xl mx-auto   → 카드 그리드 (Features)
max-w-5xl mx-auto   → 넓은 그리드 (Stats, Projects)
```

### 4.2 섹션 간격

```
py-24 px-6   → 표준 섹션 패딩
py-16 px-6   → 작은 섹션 패딩
min-h-screen → Hero 섹션만
```

### 4.3 그리드

```
md:grid-cols-2   → Features (2x2)
grid-cols-2 md:grid-cols-4  → Stats (4열)
md:grid-cols-3   → Showcase, Projects (3열)
```

---

## 5. 다크/라이트 모드

### 원칙
- 다크모드가 기본 (대부분의 방문자 환경)
- 라이트모드도 동일한 수준으로 지원
- 모든 컴포넌트에 `dark:` variant 필수

### 패턴
```tsx
// 텍스트
text-black dark:text-white           // 주요 텍스트
text-black/50 dark:text-white/50     // muted 텍스트

// 배경
bg-white dark:bg-black               // 섹션 배경

// 보더
border-black/[0.08] dark:border-white/[0.06]
```

---

## 6. 변경 체크리스트

Phase 1 작업 시 아래 파일들의 컬러를 통일:

- [ ] `tailwind.config.js` — accent.pink 제거, primary 정리
- [ ] `styles/globals.css` — glow 애니메이션 보라 단일로
- [ ] `components/Hero.tsx` — 메시지 교체
- [ ] `components/Features.tsx` — 4 Pillars 데이터 교체
- [ ] `components/ContactCTA.tsx` — CTA 메시지 + 버튼 교체
- [ ] `components/Stats.tsx` — 아이콘 그라디언트 → 보라 통일
- [ ] `components/Career.tsx` — 아이콘 그라디언트 → 보라 통일
- [ ] `components/Footer.tsx` — 그라디언트 버튼 → 보라 단색
- [ ] `pages/index.mdx` — Hero props 업데이트
- [ ] `pages/_meta.ts` — 네비게이션 순서 변경

---

*이 문서는 codemon.ai 리뉴얼의 디자인 기준입니다.*
