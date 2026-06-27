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

## 미반영 (별도 작업 필요)
- 동일 세션의 deep-research 사실검증 결과 정정 2건(투자봇 강의): TradingView 웹훅 최소 플랜 "Essential 이상"→"Plus 이상", ngrok 무료 URL 단정 보완. 강의1 정정 1건: 커스텀 스킬 업로드 위치 "Settings>Features"→"Customize>Skills".
