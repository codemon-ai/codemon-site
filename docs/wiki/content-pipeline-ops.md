# 콘텐츠 자동 발행 파이프라인 운영 (ADR-010 · 리뉴얼 P6)

> 목표 **3일 1편** 인사이트. Codex 초안·이미지 → Fable 5.1 사실검증·수용 판단 → 큐 → 3일 간격 PR → 로디몬 머지 = 발행.

## 흐름

```
codex exec (초안 N편, 이미지 프롬프트 3~5)        scripts/content-pipeline.mjs draft --n 5
  → claude -p --model claude-fable-5-1 + WebSearch  judge <batch>   채택/반려 + facts[] + 근거 URL
  → OpenAI Images (gpt-image-2, Codex 프롬프트)      images <batch>  public/images/blog/<slug>/01~05.png
  → 스키마·MDX 컴파일 검증                           enqueue <batch> data/content-queue/queue.json
  → 3일 간격 pop → pages/blog/<slug>.mdx → PR        scripts/content-schedule.mjs (launchd 매일 09:10)
  → 로디몬 PR 검수·머지 → 배포
```

| 명령 | 하는 일 | 산출물 |
|---|---|---|
| `node scripts/content-pipeline.mjs run --n 5` | draft→judge→images→enqueue 일괄 | `data/content-queue/batches/<id>/` (drafts.json · judgments/*.json · *.log) |
| `… draft --n N [--batch id]` | Codex가 기존 글과 안 겹치는 주제 N개 + 본문 MDX + `{{img:NN}}` + 이미지 프롬프트 + 검증 대상 주장 | `drafts.json` |
| `… judge <batch>` | 초안별 Fable 5.1 판정(WebSearch로 모델명·가격·날짜·수치 대조). `false` 1개면 반려, `corrected`면 고친 본문 채택. 카테고리 강제 | `judgments/<slug>.json` (accept, reasons, facts[{claim,status,url}]) |
| `… images <batch>` | 채택본만 이미지 생성(3~5). 실패분은 건너뜀 | `public/images/blog/<slug>/NN.png` |
| `… enqueue <batch>` | 채택 + 이미지 ≥3 + MDX 컴파일 통과 → 큐. `<!-- verified: YYYY-MM -->` 삽입, 플레이스홀더 → `![alt](경로)` | `queue.json` (status queued) |
| `node scripts/content-schedule.mjs [--dry-run\|--force\|--no-git\|--base main]` | 마지막 발행 3일 경과 시 큐 head → MDX 생성 → `generate-posts` 검증 → `content/<slug>` 브랜치 PR | `pages/blog/<slug>.mdx`, `log.json` |

## 주간 루틴
- **격주 월**: `run --n 6` (약 2주치). 판정 로그에서 반려 사유 확인 → 필요하면 프롬프트(`scripts/content-prompts/*.md`) 조정.
- **매일 09:10 launchd**(`ops/launchd/ai.codemon.content-schedule.plist`, 설치는 코드몬): 3일 경과 시 PR 1건 생성.
- **로디몬**: PR 검수(제목·이미지·사실 주석) → 머지 → 배포. 머지 전까지는 공개되지 않는다.
- 큐 바닥 경고: `status`에서 대기 < 2이면 배치 실행.

## 환경변수
| 이름 | 기본 | 용도 |
|---|---|---|
| `OPENAI_API_KEY` | (쉘) | 이미지 생성 |
| `CONTENT_IMAGE_MODEL` / `CONTENT_IMAGE_SIZE` / `CONTENT_IMAGE_QUALITY` | gpt-image-2 / 1536x1024 / medium | 이미지 |
| `CONTENT_JUDGE_MODEL` | claude-fable-5-1 | 판정 |
| `CONTENT_DRAFT_EFFORT` | high | Codex reasoning |
| `CONTENT_INTERVAL_DAYS` / `CONTENT_BASE_BRANCH` | 3 / main | 스케줄 |

## 장애·품질
| 증상 | 조치 |
|---|---|
| draft 실패 | `batches/<id>/draft.log.txt`. Codex 로그인(`codex login`)·스키마 위반 확인 |
| judge parse fail | `judgments/<slug>.error.txt`. 턴 초과면 `--max-turns`(스크립트 내 40) 조정 |
| 이미지 < 3 | enqueue 보류. `images <batch>` 재실행(있는 파일은 건너뜀) |
| MDX 오류 보류 | 본문의 `{`·`<` — 프롬프트 규칙 위반. judgments의 correctedBody 수정 후 재실행 |
| 사실 오류 발견(발행 후) | 글 수정 PR + `judgments` 보관으로 원인 추적. 프롬프트에 반례 추가 |

## 비용 감각 (1편 기준)
Codex 초안(배치 분할) + Fable 판정(WebSearch 10~30회, 약 1~3달러) + 이미지 3~5장(gpt-image-2 medium). 반려율이 높으면 `draft.md`의 "확신 없으면 빼라" 규칙을 강화한다.
