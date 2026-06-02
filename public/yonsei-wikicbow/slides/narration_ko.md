# Narration Script — WikiCBOW (한국어 발표 / 영어 슬라이드)

**총 8분 (480초)** · 슬라이드당 시간 표시 · 강의실 PC, PDF 미리 로드.

> Tip — 발표 5분 전 도착해서 `slides/wikicbow.pdf` 를 USB or 클라우드에서 강의실 PC에 띄워두기. fullscreen 단축키 ⌘+L (preview) 또는 F5 (Adobe).

---

## Slide 1 — Title (15초)

"안녕하세요, 융합인문공학 박상용입니다. 오늘 발표할 기말 프로젝트는 **WikiCBOW** — 개인 위키 노트로 학습한 다중 신호 CBOW 임베딩입니다."

---

## Slide 2 — Problem & Approach (45초)

"문제는 단순합니다. ChatGPT 같은 일반 LLM은 제 약어와 개인 도메인 어휘를 모릅니다. 그래서 **제 옵시디언 vault** 로 직접 학습한 작은 임베딩 모델로 제 노트를 검색합니다.

방법은 HW2의 CBOW를 확장하는 것입니다. 표준 CBOW는 노트 안의 슬라이딩 윈도우만 보지만, 저는 vault의 구조에서 나오는 **두 가지 그래프 신호** — 위키링크와 카테고리 — 를 추가했습니다. 손실은 negative sampling 하나로 통합하고, 검색 함수는 별도 모듈로 분리했습니다. 20개 평가 query 위에서 **7개 baseline** 과 비교했습니다."

---

## Slide 3 — Three Sources of Co-occurrence (50초)

"세 가지 동시출현 신호입니다.

첫째 **intra-note** — 한 노트 안의 슬라이딩 윈도우. 표준 CBOW와 같습니다.

둘째 **wikilink** — 두 노트가 위키링크로 연결됐을 때, 각 노트에서 단어 하나씩 샘플링한 페어입니다. 노트 A에서 단어 $w_a$, 노트 B에서 $w_b$ 를 뽑아 페어 만들어요.

셋째 **category** — 같은 폴더 또는 같은 태그를 공유하는 노트 사이에서 동일하게 단어 페어를 만듭니다.

가정은 *링크되거나 같은 카테고리에 있는 노트는 임베딩 공간에서 가까워야 한다* 는 거고, 세 신호를 하나의 손실 안에 섞습니다."

---

## Slide 4 — Pair Generation Formalized (75초)

"세 데이터셋을 수식으로 정의했습니다.

$\mathcal{D}_\text{intra}$ 는 각 노트 안에서 윈도우 크기 2의 컨텍스트-타겟 페어. 표준 CBOW 그대로입니다.

$\mathcal{D}_\text{wiki}$ 는 위키링크 엣지 하나당 단어 페어 5개씩 샘플. 컨텍스트는 단어 1개짜리 묶음으로 모델에 넘기면 같은 CBOW forward path 가 그대로 동작합니다 — *새 레이어 추가 없음*.

$\mathcal{D}_\text{cat}$ 도 같은 방식이지만 카테고리 엣지 당 페어 3개로 줄였습니다. 카테고리 그래프는 폴더와 태그 공유로 만들어져서 엣지가 훨씬 많거든요.

이 세 페어를 같은 모델 하나로 학습하기 때문에 통합이 깔끔합니다."

---

## Slide 5 — Loss: NS + λ Mixing (55초)

"손실은 Mikolov 2013의 Negative Sampling 입니다. positive 페어 하나에 노이즈 분포 — 단어 빈도의 0.75 제곱 — 에서 뽑은 negative 5개를 비교합니다. softmax 전체 어휘 정규화 비용을 피하면서 학습이 가능하죠.

세 페어 데이터셋은 람다 비율로 stratified 미니배치를 구성합니다. epoch 마다 정해진 비율로 섞어요. negative 샘플링은 alias method 로 O(1) 입니다."

---

## Slide 6 — Query↔Note Mapping (50초)

"검색 함수는 **학습과 분리된 별도 모듈** 입니다. 학습된 입력 임베딩 $W_1$ 위에 두 가지 풀링을 비교했습니다.

**Mean pooling** — 노트 안 단어 임베딩의 단순 평균.

**TF-IDF weighted pooling** — 노트 안 흔한 단어는 가중치 낮추고 희귀한 단어는 가중치 높임. 정보 검색의 고전 기법을 분산 표현 위에 얹은 것입니다.

검색은 쿼리 임베딩과 노트 임베딩의 코사인 유사도 top-k. 노트 임베딩은 한 번만 계산해 두면 됩니다."

---

## Slide 7 — Baselines & Corpus (40초)

"비교 baseline 7개. B0 은 sklearn TF-IDF 단독, 임베딩 학습 안 함. B1 은 plain CBOW. B2 는 plain CBOW 위에 TF-IDF 풀링. B3 는 위키링크만, B4 는 카테고리만, B5 는 세 신호 다, B6 는 세 신호 + TF-IDF 풀링.

데이터는 제 옵시디언 vault 의 1-Projects 와 3-Resources 만 — **459 노트**, 어휘 17,024, 토큰 23만 3천 개. 세 페어는 intra 23만, wiki 180개, cat 9만 7천 개. Mac M-시리즈 MPS 에서 모델당 **약 6초** 만에 학습됩니다."

---

## Slide 8 — Results P@k (75초) ★ 가장 중요

"결과입니다. **n=20 hand-curated query** 기준.

B0 TF-IDF 단독은 P@1 0.40. plain CBOW B1 은 0.45. TF-IDF 풀링을 plain CBOW 에 더하면 (B2) 0.50.

**여기 주목** — 위키링크만 추가한 B3는 향상 없습니다 (0.45). 이유: 제 vault의 위키링크 중 36개만 scope 안에서 해석됐어요. wiki signal sparsity 한계가 드러난 거죠.

카테고리만 추가한 B4는 0.50으로 조금 향상. cat pair가 9만개라 풍부합니다.

**세 신호 모두 결합한 B5 는 0.85 로 점프**, TF-IDF 풀링까지 더한 B6 는 1.00. 

물론 한 가지 주의 — 라벨이 B5+TFIDF top-2 에서 부트스트랩된 거라 B6=1.00 에는 일부 tautology가 있습니다. 하지만 B0~B4 의 상대 순위는 부트스트랩과 무관하므로 그래프 신호의 기여를 보여주는 데는 유효합니다. 다음 슬라이드에서 그 부분을 정직하게 다시 짚겠습니다."

---

## Slide 9 — t-SNE (50초)

"t-SNE 2D 시각화입니다. 458개 노트 임베딩 위에 36개 해석된 위키링크 엣지를 얹은 그림.

**주황색은 3-Resources/Guides 클러스터** — 우하단에 깔끔하게 응집했습니다. 옵시디언 워크플로우 가이드, 태그 컨벤션 등 토픽적으로 일관된 노트들이 모인 거고요.

**파란색 1-Projects** 는 더 넓게 펼쳐졌지만, 그 안에서 blog-codemon, rsquare, moneymon 같은 sub-cluster들이 보입니다. 위키링크 엣지는 클러스터를 가로지르며 서로 연결된 노트들을 잇습니다.

*그래프 신호가 폴더 구조를 임베딩 공간에 복원하고 있다* 는 것이 시각적으로 확인됩니다."

---

## Slide 10 — Caveats · LLM · Future (25초)

"한계와 후속.

라벨 부트스트랩 caveat — 매뉴얼 refine 절차는 `eval/REFINE_GUIDE.md`에 문서화했고, 발표 후 피드백을 받고 진행하겠습니다.

n=1 케이스 스터디, 한국어 OOV, 위키링크 36/289 해석률 한계.

LLM 사용은 Claude Opus를 코드 스캐폴딩과 디버깅, 문서 정리에 활용했고 전체 사용 구간은 LLM_USAGE_LOG.md 에 기록했습니다.

후속 작업으로 (1) 라벨 수동 refine, (2) Heterogeneous DeepWalk 확장, (3) learnable λ, (4) Pi 4 on-device 배포가 있습니다. 감사합니다."

---

## Q&A 대비 (2분, 예상 질문)

**Q: 왜 hetero-DeepWalk 안 했어요?**
A: stretch goal 로 W-eval 주에 시도 예정. 현재 wiki signal 자체가 36개 엣지로 sparse 해서 random-walk 도 길이 잘 안 나옴. 먼저 vault scope 를 확장한 뒤 (0-Inbox·2-Areas 포함) DeepWalk 와 직접 비교 예정.

**Q: P@1 = 1.00 너무 좋은데, 진짜인가요?**
A: 라벨이 B5+TFIDF top-2 에서 부트스트랩됐기 때문입니다. tautology가 있어요. 매뉴얼 refine 후 재측정하면 B6 도 0.65~0.75 정도로 떨어질 거라 예상합니다. 다만 B0 (0.40), B1 (0.45) 와의 *상대 차이* 는 부트스트랩과 무관해서 그래프 신호의 기여는 유효합니다.

**Q: wikilink가 12.5%만 해석된 게 문제 아닌가?**
A: 네, structural limitation 입니다. 대부분의 미해석 링크는 scope 밖 (0-Inbox, 2-Areas) 노트를 가리킵니다. scope 를 PARA 1-4 전체로 넓히면 해석률 70%대로 오를 거라 예상.

**Q: HW2와 차별점?**
A: HW2는 plain CBOW. 본 프로젝트는 (1) 두 그래프 신호 추가, (2) NS 손실, (3) TF-IDF 풀링과 결합, (4) 다축 baseline 비교. HW2 코드는 골격으로 재사용하고, 세 가지 신호 통합과 retrieval head 분리가 본 프로젝트의 기여입니다.

**Q: 왜 PyTorch?**
A: 처음에는 numpy from-scratch 제약을 걸어뒀는데, 교수님께서 제약을 풀어주셔서 ablation 속도를 위해 PyTorch 사용. MPS 가속으로 모델당 6초만에 끝나서 7 baseline 을 한 시간 안에 다 돌릴 수 있었습니다. 손실 함수와 알고리즘 자체는 직접 짰습니다.

**Q: 평가셋 20개 본인이 만든 거 자기 편향 아닌가?**
A: 맞습니다. n=1 사용자 vault 의 한계가 곧 평가셋의 한계입니다. IAA (inter-annotator agreement) 가 이상적이지만 단독 진행이라 못 했어요. limitations 절에 명시했고, 정성 top-5 (figures/qualitative.md) 와 함께 봐주시면 좋겠습니다.
