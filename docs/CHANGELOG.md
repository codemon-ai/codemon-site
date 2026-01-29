# 변경 이력

## 2024-01-29

### 프로젝트 초기 셋업

- Nextra 3 + Next.js 14 프로젝트 생성
- 기본 페이지 구조 설정
  - `/` - 홈 (프로 바이브 코더 & Cracked Engineer)
  - `/about` - 소개
  - `/projects` - 프로젝트 목록
  - `/blog` - 블로그
  - `/docs` - 기술 문서
- 프로젝트 페이지 추가
  - 타로몬, 달러시그널, 그림하루
- 블로그 샘플 글 추가
  - Hello World
  - AI 개발 워크플로우
- theme.config.tsx 설정
- 프로덕션 빌드 테스트 성공

### 버그 수정

- `_meta.json` → `_meta.ts` 변환 (Nextra 3 요구사항)
- `footer.text` → `footer.content` 변경 (Nextra 3 API 변경)
- `pages/_app.tsx` 추가 (Nextra 3 필수)

### 알려진 이슈

- [ ] 홈페이지 레이아웃/스타일 깨짐 (조사 필요)
- [ ] `layout: 'raw'` 설정 문제 가능성
