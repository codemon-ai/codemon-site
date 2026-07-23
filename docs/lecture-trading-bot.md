# 파트너 강의 — 신호가 오면 자동 주문하는 나만의 투자 봇 (페이퍼 전용)

> codemon.ai/partner 라이브 강의 ②. 이 문서는 **codemon-site에서 이어서 관리하기 위한 인수인계 기록**이다.
> ⚠️ **모의(페이퍼) 투자 전용 · 교육/프로토타입용 · 투자 조언 아님.** 모든 코드 `paper=True`(가짜 돈).

## 한 줄 요약
코딩 입문자 2시간 핸즈온 — TradingView 신호 → 웹훅(Flask) → Alpaca 페이퍼 주문 → 텔레그램 알림 + Streamlit 대시보드. 신호를 받으면 스스로 모의 주문을 넣고 폰으로 알려주는 봇 1개.

## 위치 (어디에 뭐가 있나)
| 종류 | 경로 / URL |
|------|-----------|
| 개요 페이지 (MDX) | `pages/partner/lecture-trading-bot/index.mdx` |
| 라이브 개요 | https://codemon.ai/partner/lecture-trading-bot |
| 단계별 핸즈온 가이드 (HTML) | `public/slides/lecture-trading-bot.html` → https://codemon.ai/slides/lecture-trading-bot.html |
| **가이드 소스 원본** | `high-techer` 레포 `codemon-class-claude-build-trading/guide-trading-bot.html` (+ `trading-bot.html`) |
| 강의 메타 | `pages/partner/lecture-trading-bot/_meta.ts`, `pages/partner/_meta.ts` |

## 개요
| 항목 | 내용 |
|------|------|
| 형식 | 핸즈온 (2시간 / 120분) · 입문 |
| 대상 | 코딩 입문자 + 자동매매 원리가 궁금한 분 |
| 구조 | TradingView 알림 → 웹훅(Flask) → Alpaca 페이퍼 주문 → 텔레그램 알림 + Streamlit 대시보드 |
| 전제 | 모의(페이퍼) 전용, 실제 돈 사용 안 함 |
| 준비물 | Alpaca 페이퍼(무료), Python, (TradingView/curl), 텔레그램 봇 토큰 |

## 커리큘럼 (가이드 기준 7단계 · STEP 0~6)
- **STEP 0** — 환경/계정 세팅 (Alpaca 페이퍼 계정·API 키, Python)
- **STEP 1** — Alpaca 페이퍼 주문 첫 호출 (코드로 모의 주문)
- **STEP 2** — 웹훅 서버(Flask)로 신호 수신
- **STEP 3 ★** — 신호 → 자동 주문 + 텔레그램 알림 연결 (핵심 회차)
- **STEP 4** — TradingView(또는 `curl`) 신호 연동
- **STEP 5** — Streamlit 대시보드
- **STEP 6** — 운영·안전(페이퍼 고정)·마무리
> 각 STEP의 코드·명령어·확인 방법 전체는 `guide-trading-bot.html` 참조.

## 빌드 출처 (원 작업 기록)
- **세션 ID** `4242773d-771a-4687-9e91-68b36d5bea61` (cwd `/Users/codemon/workspace/codemon/codemon-connectalive`, bear, 2026-06-24~26)
- 이어가기: `cd /Users/codemon/workspace/codemon/codemon-connectalive && claude --resume 4242773d-771a-4687-9e91-68b36d5bea61`
- transcript: `~/.claude/projects/-Users-codemon-workspace-codemon-codemon-connectalive/4242773d-771a-4687-9e91-68b36d5bea61.jsonl`
- git 이력: PR #22(c9aa18e "자동 투자 봇(페이퍼) 강의 추가"), PR #23(27cbbc8 "핸즈온 가이드 교체") — main 머지 완료

## 이어서 할 일 (TODO)
- [ ] 개요 MDX 보강(슬라이드·실습 자료)
- [ ] 페이퍼 전용·면책(투자 조언 아님) 문구 유지 확인 — 실거래 코드/안내 절대 추가 금지
- [ ] Alpaca/TradingView/텔레그램 API 변경 여부 주기 점검 (외부 서비스 의존)
- [ ] 가이드 원본(high-techer) ↔ codemon-site `public/slides/` 배포본 동기화 주의
