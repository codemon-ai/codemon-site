# 기술 결정 기록 (ADR)

> 템플릿: `_templates/ADR.md`

---

## ADR-001: Nextra 3 선택

- **상태:** 승인
- **날짜:** 2024-01-29

### 맥락
브랜드 사이트 + 기술 블로그 + 문서를 하나의 프레임워크로 운영해야 함.

### 선택지
1. **Nextra 3** — Next.js 기반 문서 프레임워크. MDX 지원, 테마 내장, Pages Router.
2. **Docusaurus** — React 기반 문서 프레임워크. 플러그인 생태계.
3. **Astro** — 정적 사이트 빌더. 콘텐츠 중심.

### 결정
Nextra 3 선택. Next.js 14 Pages Router 위에서 돌아가므로 커스텀 컴포넌트(React) 자유도가 높고, MDX로 콘텐츠 작성이 편리함. 문서 테마가 기본 제공되어 별도 UI 작업 최소화.

### 결과
- 블로그, 문서, 랜딩 페이지를 하나의 프로젝트로 관리
- `_meta.ts`로 네비게이션 제어
- Tailwind CSS + Framer Motion 자유롭게 사용 가능

---

## ADR-002: 프리빌트 배포 방식

- **상태:** 승인
- **날짜:** 2026-02-15

### 맥락
Vercel 배포 시 빌드 시간을 줄이고 안정성을 높이기 위해 프리빌트 방식 도입.

### 선택지
1. **git push → Vercel 자동 빌드** — 간단하지만 빌드 실패 시 롤백 필요
2. **로컬 프리빌트 → Vercel deploy --prebuilt** — 빌드 검증 후 배포

### 결정
프리빌트 방식 선택. `vercel build --prod` 로컬 실행 후 `vercel deploy --prebuilt --prod`로 배포.

### 결과
- 배포 전 빌드 검증 가능
- Vercel 빌드 시간 절약
- Sentry sourcemap 업로드 등 빌드 후 작업 로컬에서 처리

---

## ADR-003: data/news.json 수동 관리

- **상태:** 승인
- **날짜:** 2026-03-11

### 맥락
News 섹션에 뉴스 데이터를 어떻게 관리할지 결정 필요.

### 선택지
1. **MDX 파일** — 블로그처럼 pages/news/ 하위에 MDX 파일
2. **JSON 파일** — data/news.json에 뉴스 메타데이터 관리
3. **CMS** — 외부 CMS 연동

### 결정
JSON 파일 방식 선택. 뉴스는 외부 링크 중심이라 별도 페이지 불필요. JSON으로 관리하면 컴포넌트에서 직접 import 가능.

### 결과
- `data/news.json`에 뉴스 항목 추가만 하면 됨
- NewsIndex 컴포넌트가 JSON 데이터를 렌더링
- 로디몬이 뉴스 발행 시 JSON 파일만 수정
