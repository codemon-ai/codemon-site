---
name: partner-lecture
description: codemon.ai 강의 개요(MDX) 페이지를 생성하거나 업데이트한다. "강의 개요 만들어줘", "lecture 페이지 추가", "강의 자료 작성", "partner lecture" 요청 시 사용. 새 강의를 추가하거나 기존 강의 개요를 수정하고 프리빌트 배포까지 처리한다.
---

# partner-lecture — 강의 개요 MDX 생성/업데이트

codemon.ai/partner/ 에 강의 개요 페이지를 생성하거나 업데이트한다.

## 구조

```
pages/partner/{slug}/
├── _meta.ts      # Nextra 메타 (강의 제목, slides 항목)
├── index.mdx     # 강의 개요 본문
└── slides.mdx    # 슬라이드 페이지 (partner-slide 스킬이 생성)
```

## 워크플로우

### 신규 강의 생성

1. **정보 수집**: 강의 제목, slug, 대상, 시간, 모듈 구성
2. **MDX 생성**: `pages/partner/{slug}/index.mdx` — [template.md](references/template.md) 참조
3. **메타 생성**: `pages/partner/{slug}/_meta.ts`
   ```ts
   export default {
     index: '강의 개요',
   }
   ```
4. **상위 메타 수정**: `pages/partner/_meta.ts`에 slug 항목 추가
5. **인덱스 수정**: `pages/partner/index.mdx`에 강의 카드 추가
6. **빌드 확인**: `npm run build`
7. **배포**: `vercel build --prod && vercel --prod --prebuilt`

### 기존 강의 업데이트

1. `pages/partner/{slug}/index.mdx` 읽기
2. 요청된 내용 수정
3. 빌드 확인 → 배포

### 인덱스 카드 형식

```mdx
## [강의 제목](/partner/{slug})

한 줄 설명 | N개 모듈, 총 N시간

- **대상**: 대상 청중
- **핵심**: 핵심 내용
- **목표**: 학습 목표

[강의 개요 보기 →](/partner/{slug}) | [슬라이드 보기 →](/partner/{slug}/slides)
```

## 기존 강의 목록

| slug | 제목 | 슬라이드 |
|------|------|---------|
| lecture-agency-ai | AI 에이전트로 에이전시 업무 자동화하기 | /partner/lecture#slide=0 |
| lecture-startup-ai | AI 시대, 5명이 50명을 이기는 법 | /partner/lecture-startup-ai/slides |

## 배포

```bash
vercel build --prod && vercel --prod --prebuilt
```
