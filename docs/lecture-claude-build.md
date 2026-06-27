# 파트너 강의 — 클로드로 만드는 나만의 지식노트 + 배포되는 내 사이트

> codemon.ai/partner 라이브 강의 ①. 이 문서는 **codemon-site에서 이어서 관리하기 위한 인수인계 기록**이다.
> (페이지 MDX 본문 작성/발행은 로디몬·코드몬 담당 — 본 문서는 위치·맥락·할 일 정리용.)

## 한 줄 요약
비개발 실무자 4시간 핸즈온 — Obsidian 지식노트 → Skill·MCP·Cowork → Vercel+Supabase로 **실제 배포되는 사이트**까지. 최종 산출물 2개(지식노트 볼트 + 라이브 사이트 URL).

## 위치 (어디에 뭐가 있나)
| 종류 | 경로 / URL |
|------|-----------|
| 개요 페이지 (MDX) | `pages/partner/lecture-claude-build/index.mdx` |
| 라이브 개요 | https://codemon.ai/partner/lecture-claude-build |
| 단계별 핸즈온 가이드 (HTML) | `public/slides/lecture-claude-build.html` → https://codemon.ai/slides/lecture-claude-build.html |
| **가이드 소스 원본** | `high-techer` 레포 `codemon-class-claude-build-trading/guide-claude-build.html` (+ `index.html`) |
| 강의 메타 | `pages/partner/lecture-claude-build/_meta.ts`, `pages/partner/_meta.ts` |

## 개요
| 항목 | 내용 |
|------|------|
| 형식 | 핸즈온 + 개인교습 (4시간 / 240분) |
| 대상 | 비개발 실무자 (프롬프트·코딩 경험 무관) |
| 핵심 | Obsidian 지식노트 + Skill·MCP·Cowork + Vercel·Supabase 배포 |
| 최종 산출물 | ① 클로드가 읽는 지식노트 볼트 ② 인터넷에 배포된 내 사이트 URL |
| 준비물 | 클로드 유료(Max 권장)·데스크탑 앱(Cowork), Obsidian(무료) |

## 커리큘럼 (가이드 기준 5교시 · STEP 0~4)
- **STEP 0** (20분) — 환경 세팅 (클로드 데스크탑·Cowork·Obsidian)
- **STEP 1** — 지식노트 볼트 만들기 (옵시디언 .md 볼트, 클로드가 그대로 읽음)
- **STEP 2** — Skill·MCP로 클로드가 내 볼트를 읽고 정리
- **STEP 3 ★** — Cowork로 콘텐츠 생성 + 사이트 뼈대 (핵심 회차)
- **STEP 4** — Vercel + Supabase로 실제 배포 → 라이브 URL
> 각 STEP의 클릭 경로·명령어·예시 프롬프트·MCP JSON 전체는 `guide-claude-build.html` 참조.

## 빌드 출처 (원 작업 기록)
- **세션 ID** `4242773d-771a-4687-9e91-68b36d5bea61` (cwd `/Users/codemon/workspace/codemon/codemon-connectalive`, bear 맥미니, 2026-06-24~26)
- 이어가기: `cd /Users/codemon/workspace/codemon/codemon-connectalive && claude --resume 4242773d-771a-4687-9e91-68b36d5bea61`
- transcript: `~/.claude/projects/-Users-codemon-workspace-codemon-codemon-connectalive/4242773d-771a-4687-9e91-68b36d5bea61.jsonl`
- git 이력: PR #22(`feat/partner-trading-bot-plus-fixes`, c9aa18e), PR #23(`feat/partner-handson-guides`, 27cbbc8) — main 머지 완료

## 이어서 할 일 (TODO)
- [ ] 개요 MDX에 명시된 "슬라이드·실습 자료 추후 추가" — 슬라이드/실습 자료 보강
- [ ] 가이드 HTML의 최신 사실관계 재확인 (모델 라인업·플랜·Cowork 가용성은 수개월 단위 변동 — 2026-06 기준 Fable 5 일시중단 등)
- [ ] (선택) 가이드 소스 단일화: 현재 원본은 high-techer 레포에 있고 codemon-site `public/slides/`에 배포본 사본 → 갱신 시 양쪽 동기화 주의
