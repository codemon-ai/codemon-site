# 라우트 인벤토리 (살아있는 화면 목록)

> **NOW 문서.** codemon.ai에 실제로 존재해야 하는 화면의 기준선(baseline).
> 화면이 "사라졌다"는 의심이 들면 이 문서와 `scripts/check-routes.sh` 결과를 비교한다.
>
> **마지막 전수 점검: 2026-07-21** — 공개 209개 + 정적 자산 15개 전부 정상.

---

## 요약 (2026-07-21 기준)

| 구분 | 개수 | 상태 |
|------|------|------|
| 공개 페이지 (`pages/**`, `/p/` 제외) | 129 | ✅ 121×200 + 8×3xx(의도된 리다이렉트) |
| 비공개 페이지 (`/p/`, `/en/p/`) | 65 | ✅ 전부 200 |
| 정적 자산 (`public/**/*.html|pdf`) | 15 | ✅ 전부 200 |
| **합계** | **209** | ✅ 유실 0건 |

의도된 3xx (실패 아님):
- `307` — `/admin`, `/admin/{mailing,qr,subscribers,surveys}` → 미인증 시 로그인 리다이렉트
- `308` — `/partner/survey/lecture-*` → `/survey/{lectureId}` 정규 경로로 리다이렉트

---

## 섹션별 구성

| 섹션 | 개수 | 내용 | 소유 |
|------|------|------|------|
| `/blog/*` | 40 | 기술 블로그 (+ 인덱스) | 로디몬(콘텐츠) |
| `/partner/*` | 29 | 유료/파트너 강의 5종 + 데모 8종 + 설문 3종 | 코드몬/Claude Code |
| `/yonsei/*` | 20 | 연세대 수업 발표·시험 자료 3과목 | 코드몬 |
| `/en/*` | 19 | 영문 i18n (블로그 8, 프로젝트 7, about/docs/index) | 로디몬 |
| `/projects/*` | 7 | 프로젝트 소개 (arbimon, cryptomon, farmingmon, grimharu, moneymon, realestate-crawler) | 코드몬 |
| `/admin/*` | 6 | 어드민 (구독자·설문·메일링·QR) — 인증 필요 | Claude Code |
| 루트 단일 | 8 | `/`, `/about`, `/docs`, `/news`, `/showcase`, `/subscribe`, `/privacy`, `/terms` | 코드몬 |
| `/p/*`, `/en/p/*` | 65 | 비공개 링크 전용 페이지(해시 slug) | 로디몬 |

### `/partner` 상세 (가장 자주 깨지는 구역)

| 강의 | 개요 | 슬라이드/자료 | 데모 |
|------|------|---------------|------|
| lecture-agency-ai | `/partner/lecture-agency-ai` (+ 01~05) | `/partner/lecture` | — |
| lecture-startup-ai | `/partner/lecture-startup-ai` | `/partner/lecture-startup-ai/slides` | — |
| lecture-podl-ai | `/partner/lecture-podl-ai` | `/partner/lecture-podl-ai/slides` (+a,b) | `/demo` + 7종 + dashboard |
| lecture-claude-build | `/partner/lecture-claude-build` | `/slides/lecture-claude-build.html` | — |
| lecture-trading-bot | `/partner/lecture-trading-bot` | `/slides/lecture-trading-bot.html` | — |
| lecture-ai-masterclass | `/partner/lecture-ai-masterclass` | — | — |

### 정적 HTML/PDF (라우트가 아니라 `public/`)

```
/slides/lecture-claude-build.html      /slides/lecture-trading-bot.html
/slides/lecture-startup-ai.html        /slides/lecture-podl-ai-v1.html
/slides/podl-ai-bold.html              /slides/podl-ai-swiss.html
/slides/yonsei-abyss.html              /slides/yonsei-east-asian-quiz.html
/slides/yonsei-founding-myself.html
/yonsei-wikicbow/narration-mobile.html
/yonsei-wikicbow/slides/wikicbow.html  /yonsei-wikicbow/slides/wikicbow-study.html
/yonsei-wikicbow/slides/wikicbow.pdf
/files/yonsei-east-asian-history-cheatsheet.pdf
/googledeb69e9624612868.html           (Google 소유권 확인)
```

> ⚠️ **`public/partner/` 에 HTML을 두지 말 것.** `pages/partner/` 라우트에 가려 404가 된다
> (2026-06-23 실제 사고 → `/slides/`로 이전. PR #21 참고).

---

## 점검 방법

```bash
./scripts/check-routes.sh            # 공개 라우트만 (빠름, 배포 직후 필수)
./scripts/check-routes.sh --all      # /p/ 비공개 + 정적 자산까지 (전수)
BASE=https://<preview>.vercel.app ./scripts/check-routes.sh   # 프리뷰 검증
```

200/3xx 이외가 나오면 `FAIL <code> <route>`로 출력되고 종료 코드 1.

## 갱신 규칙

- 페이지를 **추가/삭제/이동**했으면 이 문서의 개수 표와 섹션 표를 같이 고친다.
- 전수 점검을 돌렸으면 상단 "마지막 전수 점검" 날짜를 갱신한다.
- 관련: [브랜치·PR 원장](./branches.md), [배포](./deployment.md)
