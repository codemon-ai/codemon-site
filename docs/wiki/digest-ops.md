# 다이제스트 운영 (주간)

> 리뉴얼 P5(2026-10-06). research-saas 수집 → inbox → `/admin/digest` 리터칭 → `/insights/digest/YYYY-WW` + 뉴스레터 발송. 자동 발행 경로 없음(A4: 사람 리터칭 필수).

## 주간 루틴

| 요일 | 일 | 명령/화면 |
|---|---|---|
| 월 | inbox 수집 | `./scripts/digest-pull.sh` (ssh `rody` → `engine export --since <7일 전>` → `data/digest/inbox/YYYY-WW.json`, 브랜치 `digest/YYYY-WW` 커밋) → push → design-renew/main 머지 → 배포(inbox가 번들에 포함돼야 admin이 읽음) |
| 화 | 리터칭 | `/admin/digest` — 주차 선택 → 체크(권장 7~10건) · 순서 ↑↓ · 한 줄 코멘트 · 호 제목 · 인트로 → **저장**(Supabase `digests` draft) → 테스트 수신 이메일로 **테스트 발송** |
| 수 | 확정 + 발송 | **확정 + 발송** → Supabase `status=published` + 전체 구독자 Resend 발송(캠페인 type `newsletter`, body `digest:YYYY-WW`) |
| 수 | 공개 | 다음 빌드·배포 시 `scripts/generate-digests.mjs`(prebuild)가 published 행을 `data/digest/YYYY-WW.json`으로 내려받고 `index.json` 재생성 → `/insights/digest/YYYY-WW` · `/newsletter` 아카이브 · 홈 박스 |

- `/insights/digest`는 `/newsletter`(아카이브)로 307.
- 첫 호 `2026-W10`은 구 `data/news.json` 10건을 변환한 것(파일 커밋, Supabase 무관).

## 전제 (1회)
1. research-saas PR [#14](https://github.com/codemon-ai/research-saas/pull/14) `engine export` 머지 → 로디 배포(`ops/deploy.sh`).
2. Supabase `digests` 테이블 — `supabase/migrations/20261006000001_digests.sql` 적용(Dashboard SQL Editor).
3. Vercel env `SUPABASE_URL`·`SUPABASE_SERVICE_ROLE_KEY`(이미 있음) — 빌드 시 generate-digests가 사용. 없으면 기존 파일만으로 index 재생성(빌드 실패 없음).

## 장애 시
| 증상 | 조치 |
|---|---|
| `digest-pull.sh` ssh 실패 | 로디 접속/`research` 유저 권한 확인. 수동: 로디에서 export 후 파일을 `data/digest/inbox/`에 복사 |
| `/admin/digest` 주차 목록 비어 있음 | inbox 파일이 커밋·배포됐는지, `next.config.mjs` `outputFileTracingIncludes` 유지됐는지 |
| 저장/확정 500 | `digests` 테이블 미생성 또는 RLS. service role 사용이므로 정책 불필요 |
| 발송 일부 실패 | `/admin/mailing` 캠페인 로그(`email_logs`) 확인, Resend 대시보드 |
| 공개 페이지 미반영 | 확정 후 **재배포 필요**(정적 생성). prebuild 로그 `✅ digest: pulled N` 확인 |

## 연락 경로
- research-saas 운영: 로디(`rody`), 저장소 `codemon-ai/research-saas`, 비밀은 로디 `~/.config/research-saas/.env`.
- 4회 안정 후 launchd 자동화(월 06:00 pull) 검토 — 그 전까지 수동.
