# TASK-002: codemon.ai 디자인 업그레이드

## 🎯 목표
codemon.ai를 임팩트 있는 다크모드 포트폴리오 사이트로 업그레이드

## 📚 레퍼런스
- Awwwards 포트폴리오: https://www.awwwards.com/websites/portfolio/
- 다크 포트폴리오 모음: https://www.wallofportfolios.in/dark-theme
- 다크 미니멀 레이아웃: https://webdesignledger.com/dark-minimalist-layouts/

## 📋 상세 요구사항

### 1. 히어로 섹션 개선
- [ ] 타이핑 효과 애니메이션 (typewriter-effect 사용)
- [ ] 그라데이션 텍스트 (purple → pink)
- [ ] 배경에 subtle한 애니메이션 (파티클 or 그리드)
- [ ] CTA 버튼 호버 효과 (glow)
- [ ] 스크롤 다운 인디케이터

### 2. Features 섹션 개선
- [ ] 글래스모피즘 카드 스타일
- [ ] 호버 시 lift + glow 효과
- [ ] Lucide React 아이콘 사용
- [ ] 스크롤 시 순차 등장 애니메이션 (framer-motion)

### 3. Tech Stack 섹션 개선
- [ ] 카테고리별 그룹핑 (Languages, AI/ML, Infra, DB)
- [ ] 기술 아이콘 추가
- [ ] 호버 시 툴팁 or 살짝 bounce

### 4. Projects 섹션 개선
- [ ] 프로젝트 카드 with 썸네일
- [ ] 호버 시 오버레이 + 상세 정보
- [ ] 라이브 데모 / GitHub 링크 버튼
- [ ] 프로젝트 데이터:
  - 타로몬: AI 타로 리딩
  - 메모몬: 텔레그램 메모 봇
  - 뉴스몬: AI/Tech 뉴스 수집

### 5. 전체 스타일

**tailwind.config.js 확장:**
```js
colors: {
  background: '#0a0a0a',
  foreground: '#fafafa',
  accent: { purple: '#a855f7', pink: '#ec4899' }
},
animation: {
  'glow': 'glow 2s ease-in-out infinite alternate',
  'float': 'float 3s ease-in-out infinite',
}
```

**globals.css:**
- 다크 배경 (#0a0a0a)
- 커스텀 스크롤바
- selection 색상

## 📦 필요한 패키지
```bash
npm install framer-motion typewriter-effect lucide-react
```

## ✅ 완료 조건
1. [ ] 히어로: 타이핑 효과 + 애니메이션 작동
2. [ ] Features: 글래스모피즘 카드 + 호버 효과
3. [ ] Tech Stack: 아이콘 + 카테고리 그룹핑
4. [ ] Projects: 썸네일 카드 갤러리
5. [ ] 전체: 다크모드 통일, 부드러운 트랜지션
6. [ ] `npm run build` 성공
7. [ ] 모바일 반응형

## 📝 참고사항
- Nextra 3 기반 (MDX + 컴포넌트)
- 기존 구조 유지하면서 스타일 업그레이드
- 성능 최적화 (이미지 lazy loading)
