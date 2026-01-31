# TASK-001: 브랜드 랜딩 페이지 개선

## 작업 목표
Nextra 기반 codemon-site의 홈페이지를 문서 사이트에서 **브랜드 랜딩 페이지**로 개선

## 사전 단계 (필수)
- [ ] CLAUDE.md 없음 → 프로젝트 분석 후 생성
- [ ] git status 확인 (현재 main, clean)
- [ ] 프로젝트 구조 파악

## 참고 자료
- **디자인 가이드:** `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/codemon/Projects/브랜드페이지/nextra_brand_site_guide.md`
- **참고 사이트:** React Flow, SWR, Panda CSS 홈페이지

## 구현 체크리스트

### Phase 1: 기반 작업
- [ ] CLAUDE.md 생성 (프로젝트 컨벤션 정리)
- [ ] _meta.js에서 index 페이지 `layout: 'raw'` 설정
- [ ] Tailwind CSS 브랜드 컬러 정의

### Phase 2: 컴포넌트 개발
- [ ] Hero 컴포넌트 (그라데이션 배경, CTA 버튼)
- [ ] Features 컴포넌트 (3개 핵심 기능 카드)
- [ ] Stats 컴포넌트 (GitHub Stars 등 - 선택)

### Phase 3: 페이지 조립
- [ ] index.mdx에서 컴포넌트 import & 배치
- [ ] 반응형 확인 (모바일/데스크톱)
- [ ] 다크모드 지원 확인

### Phase 4: 마무리
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 로컬 확인 (`npm run dev`)
- [ ] 커밋 & 푸시

## 디자인 방향
- **스타일:** 미니멀 + 그라데이션 (SWR 참고)
- **히어로:** 큰 타이틀 + 한 줄 설명 + CTA 2개 (Get Started, GitHub)
- **색상:** Blue 계열 그라데이션 (기존 Nextra 테마와 조화)

## 완료 조건
- 홈페이지가 브랜드 랜딩 스타일로 변경됨
- 문서 페이지(/docs)는 기존 스타일 유지
- 빌드 에러 없음

---

*작성: 로디몬 🦊*
*날짜: 2026-01-31*
