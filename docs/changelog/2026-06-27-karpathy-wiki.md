# 2026-06-27 — 1번 강의에 카파시 LLM Wiki 아이디어 보강

## 배경
- 1번 강의(`lecture-claude-build`)의 STEP 1 "LLM 위키"가 안드레아 카파시 [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)의 **표면(Obsidian 볼트+백링크+LLM 정리)** 만 차용하고, 핵심 엔진(스키마 계층·운영루프·RAG 대비 논지)은 빠져 있다고 진단.

## 변경 (핵심 3종 보강)
1. **RAG vs 영속 위키 개념박스** — STEP 1 상단에 "왜 LLM 위키인가" 콜아웃 추가(한 번 컴파일→계속 최신, 복리). 카파시 gist 출처 링크.
2. **STEP 1 섹션 D 신설 — 스키마·인덱스·운영**
   - ① 볼트 루트 `CLAUDE.md` 스키마(raw/pages/index.md/log.md 규칙 + Ingest 절차) 예시
   - ② `index.md`(목차) + `log.md`(시간순, grep 가능) 컨벤션
   - ③ Ingest · Query · Lint 3대 작업 예시 프롬프트 + "Query 결과 되저장=복리" 팁
3. **개요 MDX 1교시 커리큘럼 재구성** — (개념)RAG 대비 / (실습)볼트+MCP / (운영)CLAUDE.md+index/log+Ingest·Query·Lint. 산출물을 "스스로 유지되는 LLM 위키"로 갱신.

## 수정 파일
- `pages/partner/lecture-claude-build/index.mdx` (codemon-site)
- `public/slides/lecture-claude-build.html` (codemon-site 배포본)
- `high-techer/codemon-class-claude-build-trading/guide-claude-build.html` (가이드 원본 — 별도 레포, 동기화)
- CSS `.concept` 클래스 추가(가이드 HTML)

## 검증
- 두 HTML(원본↔배포본) `diff` 결과 byte-identical (동기화 유지 확인)
- section 태그 5/5 균형, 새 마커(`.concept`, 섹션 D, Ingest/Query/Lint) 삽입 확인

## 후속 정정 — 강의 2종 운영 구조 재정리

### 변경
- `docs/plans/2026-06-27-partner-handson-revision-plan.html` 추가 — Claude Build / Trading Bot 수정 계획과 진행 상태를 HTML 계획서로 관리.
- `lecture-claude-build` 개요와 HTML 가이드 정리:
  - "자료는 추후 추가" 문구 제거, `/partner` 목록에 전체 자료 링크 추가.
  - Core / Fallback / Optional 운영 방식 추가.
  - 준비물을 필수·권장·선택으로 재분류.
  - Node.js 역할을 Desktop Extensions와 Claude Code/npm/로컬 빌드 용도로 분리.
  - Skill / MCP / Cowork 용어 설명 순서 정리.
  - Vercel 배포 성공 기준을 최소 / 표준 / 확장으로 분리.
- `lecture-trading-bot` 개요와 HTML 가이드 정리:
  - 페이퍼 전용·비투자조언·비실거래 전환 고지 강화.
  - `curl` 시뮬레이션을 Core 경로로 두고 TradingView 웹훅은 Optional로 낮춤.
  - TradingView 플랜 표기는 "웹훅 지원 유료 플랜 + 2FA, 수업일 가격표 재확인"으로 완화. 현재 가격표 확인상 Basic은 미지원, Essential 이상은 지원되는 것으로 보여 "Plus 이상" 단정은 반영하지 않음.
  - ngrok은 "재시작마다 URL 변경" 단정 대신 터미널의 Forwarding URL 확인/갱신 방식으로 보완.
  - starter 보안(passphrase + `paper=True`)과 운영 보안(IP allowlist, 환경변수, rate limit, 주문 수량 제한)을 분리.
  - Streamlit 대시보드는 선택 확장으로 분리.

### 추가 수정 파일
- `docs/plans/2026-06-27-partner-handson-revision-plan.html`
- `pages/partner/index.mdx`
- `pages/partner/lecture-claude-build/index.mdx`
- `pages/partner/lecture-trading-bot/index.mdx`
- `public/slides/lecture-claude-build.html`
- `public/slides/lecture-trading-bot.html`

### 보류
- 커스텀 Skill 업로드 위치는 공식 Agent Skills 문서에 `Settings > Features` 계열로 남아 있어, `Customize > Skills`로 단정 변경하지 않음. 대신 UI 명칭이 바뀔 수 있으므로 수업일 화면에서 재확인하도록 가이드 문구를 완화.
