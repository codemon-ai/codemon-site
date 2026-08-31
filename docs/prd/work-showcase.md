# PRD — 외주 쇼케이스 `/work` (숨김·비번보호)

> 상태: 설계 확정 대기 (2026-08-31) · 분류: architectural (신규 하위 시스템)
> 배경 브레인스토밍: superpowers:brainstorming. 구현은 스펙 승인 + writing-plans 이후.

## 1. 목적 (WHY)
코드몬이 **기획·구축한 서비스**(외주 클라이언트 작업 + 자체 서비스 중 보여줄 수 있는 것)를 영업 대상에게 보여줄 포트폴리오 메뉴.
기존 `/showcase`(자체 서비스 공개 소개)는 **그대로 두고**, 비번보호 **분리된 숨김 메뉴**를 신설한다.
※ 초기엔 외주 중심이나, 자체 서비스(타로몬 등)도 포함하므로 인덱스 카피는 "코드몬이 만든 서비스" 톤으로.

## 2. 핵심 결정 (확정)
| 항목 | 결정 |
|------|------|
| 라우트 | `/work` (숨김 — nav 미노출, `/partner`와 동일 `display:'hidden'`) |
| 접근 통제 | **비밀번호 보호** (`/admin`과 유사하나 **분리된 게이트** — 클라이언트에 admin 권한 안 줌) |
| 실명 표기 | **전 프로젝트 실명 OK (동의됨, 2026-08-31)**. 단 `realName` 플래그로 프로젝트별 제어 가능하게 유지 |
| 구현 접근 | **하이브리드 단계형(C)** — 1단계 카드 그리드로 전 프로젝트 공개 → 2단계 대표 2~3건 상세 케이스 |
| 제외 | 포들(podl) 제외 |

## 3. 범위 — 포함 프로젝트
| # | 프로젝트 | 성격 | 소스 | 실명 |
|---|----------|------|------|------|
| 1 | 디어유 (bubble HOUSE) | Shopify 등급·혜택 연동 | `dearu`, `dearu-shopify-apps` | ✅ |
| 2 | 브릿지세븐 / b7 | Shopify 리뷰 앱 등 미들웨어 | `bridge7`, `b7-shopify-apps` | ✅ |
| 3 | 블루망고 (BlueMango) | 태국 여행 예약 플랫폼 | `bluemango-v2` | ✅ |
| 4 | 에어프레미아 | 항공 이벤트/AX | `airpremia` | ✅ |
| 5 | 닥터리본 (Dr. Reborn) | 의료·에스테틱 플랫폼 | `team-bluemango/dr-reborn(-fe/-app/-admin-fe)` | ✅ |
| 6 | etude — nodestar | 각각 별도 카드 | `etude-platform` · `etude-nodestar.vercel.app` | ✅ |
| 7 | etude — selecten (셀렉텀) | 각각 별도 카드 | `etude-platform` · `etude-selectum.vercel.app` | ✅ |
| 8 | etude — 에튜드 LMS(본 서비스) | 각각 별도 카드 | `etude-platform` · `etude-lms-web.vercel.app` | ✅ |
| 9 | etude — 도서관(library) | 각각 별도 카드 | `etude-platform` · `etude-library.vercel.app` | ✅ |
| 10 | 어스오브제 (usobjet) | 클라이언트 웹 (Vercel) | `usobjet-renew` · 라이브 URL 확인 필요 | ✅ |
| 11 | 타로몬 (TarotMon) | **코드몬 자체 서비스** — AI 타로 리딩 | `tarot.codemon.ai` (기존 `/showcase`에도 존재) | ✅ |

> etude 4개 서비스 확정(2026-08-31): **nodestar / selecten(셀렉텀) / 에튜드 LMS / 도서관**.
> URL은 현재 `*.vercel.app` 스테이징 — 프로덕션 도메인/공개 캡처 가능 여부는 채울 때 확인.
> ⚠️ 비번보호라도 클라이언트 작업 공개는 계약상 사전 동의 전제 — 전 프로젝트 실명·화면 노출 동의됨 기준(2026-08-31).

## 4. 설계 (HOW)

### 4.1 라우트 & 숨김
- `pages/work/` 신규 폴더 (index + 프로젝트 상세는 2단계)
- `pages/_meta.ts`에 추가:
  ```ts
  work: { type: 'folder', display: 'hidden', theme: { sidebar: false } }
  ```

### 4.2 비밀번호 게이트 (admin과 분리)
- `middleware.ts` matcher에 `/work/:path*` 추가 (`/work/login` 제외)
- 쿠키 `work_session` 없으면 `/work/login`으로 리다이렉트
- `pages/work/login.tsx` + `pages/api/work/login.ts` — `WORK_PASSWORD`(Vercel env)와 대조 후 쿠키 발급
- admin 인프라(`lib/admin/auth`)를 참고하되 **별도 쿠키·별도 시크릿**으로 독립. 클라이언트/영업 대상엔 URL + 공통 PW만 전달
- 환경변수: `WORK_PASSWORD` (Vercel Dashboard)

### 4.3 데이터 모델 — `data/work/projects.ts`
```ts
export interface WorkProject {
  slug: string
  name: string            // 실명 또는 익명 라벨
  realName: boolean       // false면 name을 익명 라벨로 취급
  client: string          // 클라이언트/발주처
  industry: string        // 업종 (커머스/여행/의료/항공/교육…)
  period: string          // 기간
  status: 'live' | 'building' | 'done'
  summary: string         // 한 줄 소개
  role: string            // 코드몬의 역할 (기획/개발/구축…)
  stack: string[]         // 기술 스택
  highlights: string[]    // 핵심 성과 3~5개
  screenshots: string[]   // /images/work/<slug>/*.png
  liveUrl?: string        // 공개 가능한 라이브 URL
  detail?: boolean        // true면 /work/<slug> 상세 페이지 존재
}
```

### 4.4 컴포넌트
- `components/work/WorkCard.tsx` + `WorkGrid` — `ShowcaseCard` 패턴 재사용(스크린샷 상단 노출형)
- 2단계: `pages/work/[slug].tsx` 상세 (문제 → 해결 → 화면 → 스택 → 성과)
- 디자인: 사이트 톤 유지 (보라 `#a855f7`, Framer stagger, `dark:` 필수)

### 4.5 스크린샷 — `public/images/work/<slug>/`
- **공개 라이브 사이트는 playwright-cli로 캡처** (디어유 bubble HOUSE, 블루망고 등 접근 가능한 것)
- 비공개/스테이징은 **코드몬 제공** — 필요 목록을 별도로 정리해 전달
- 각 프로젝트 대표 1장(그리드) + 상세용 2~4장(2단계)

## 5. 단계 (Phasing)
1. **뼈대** — `/work` 라우트 + 비번 게이트(미들웨어·로그인·API·env) + 데이터모델 + `WorkCard/Grid` + 디어유 1건 end-to-end + 빌드/배포 검증
2. **채우기** — 나머지 8건(브릿지세븐·블루망고·에어프레미아·닥터리본·etude×4) 카드 + 스크린샷
3. **상세 케이스** — 대표 2~3건(디어유·닥터리본 등) `/work/<slug>` 상세 + 폴리시

## 6. DoD / 검증
- 각 단계 `npm run build` 통과
- 배포 후 `./scripts/check-routes.sh` (`--all`은 `/work/login`까지) + `/work` 비번 게이트 동작 확인
- `docs/wiki/route-inventory.md`에 `/work*` 반영, `docs/changelog/` 기록

## 7. 미해결 (스펙 확정 시 채움)
- [x] etude 4개 서비스 명칭 확정 — nodestar/selecten/에튜드LMS/도서관 (도메인은 스테이징 확인됨)
- [ ] 각 프로젝트 프로덕션 도메인 + 공개 캡처 가능 여부(vercel.app 스테이징은 접근 제한일 수 있음)
- [ ] 비번 게이트: admin 코드 재사용 범위(쿠키 서명 방식) 상세
- [ ] 라이브 URL이 있는 프로젝트 목록(캡처 자동화 대상) vs 코드몬 제공 목록
- [ ] `/work` 인덱스 카피(소개 문구) 톤
