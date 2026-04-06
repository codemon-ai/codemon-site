# 보들(BO:DL) Brand Design System

> Essential Softness — 보들보들한 피부를 위한 부드러움

## Brand Identity

- **Brand Name**: 보들 (BO:DL)
- **Industry**: K-뷰티 스킨케어
- **Positioning**: 고효능이지만 순한 — "효과가 강하면 자극도 강하다"는 편견을 깨는 브랜드
- **Tone**: 부드럽고 신뢰감 있는, 프리미엄하면서 친근한

## Colors

### Primary
- **Purple (Accent)**: `#a855f7` — 브랜드 포인트 컬러
- **Deep Purple**: `#9333ea` — 호버/강조
- **Light Purple**: `#c084fc` — 서브 액센트

### Neutral
- **Background Dark**: `#0f0f1a` — 다크 모드 배경
- **Surface Dark**: `#1e1e3a` — 카드/패널
- **Text Primary**: `#fafafa` — 다크 모드 본문
- **Text Secondary**: `#a1a1aa` — 보조 텍스트

### Background Light
- **Background**: `#ffffff`
- **Surface**: `#fafafa`
- **Text Primary**: `#0a0a0a`

### Semantic
- **Success**: `#10b981` (emerald-500)
- **Warning**: `#f59e0b` (amber-500)
- **Error**: `#ef4444` (red-500)
- **Info**: `#60a5fa` (blue-400)

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Scale
- **Heading 1**: 22px, weight 700
- **Heading 2**: 18px, weight 600, color `#a855f7`
- **Heading 3**: 15px, weight 600
- **Body**: 14px, weight 400, line-height 1.8
- **Caption**: 12px, weight 400, color `#a1a1aa`
- **Badge**: 10px, weight 500

## Spacing

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px
- **2xl**: 32px

## Components

### Cards
```css
border-radius: 8px;
border: 1px solid rgba(255, 255, 255, 0.06);
padding: 16px;
background: rgba(255, 255, 255, 0.02);
```

### Buttons
```css
/* Primary */
background: #a855f7;
color: white;
border-radius: 8px;
padding: 8px 16px;
font-weight: 600;

/* Secondary */
border: 1px solid rgba(255, 255, 255, 0.06);
background: transparent;
```

### Status Badges
- Idle: `text-gray-400`
- Generating: `text-amber-500 animate-pulse`
- Done: `text-emerald-500`
- Error: `text-red-500`

## Package Label Design Guidelines

### 정면 라벨 (Front)
- 브랜드명 "보들 BO:DL" 상단 배치
- 제품명 중앙, 한글 + 영문 병기
- USP 한 줄 (부드러운 톤)
- 용량 표기

### 후면 라벨 (Back)
- 전성분 (INCI) — 국가별 규격 준수
- 사용방법 — 3단계 이내 간결하게
- 주의사항 — 법적 필수 항목
- 제조/판매업자, 제조번호, 사용기한
- 바코드 영역

### 수출용 라벨 추가 요소
- 국가별 언어 (영어/아랍어/일본어 등)
- 규제 마크 (FDA NDC, EU CPNP, 할랄 인증 마크)
- 수입자 정보

### 디자인 원칙
- 여백 충분히 — 고급스러운 느낌
- 성분 텍스트는 가독성 우선 (최소 5pt)
- 보라 포인트 컬러는 제품명/브랜드명에만 사용
- 나머지는 모노톤 (흰/검/회색)
