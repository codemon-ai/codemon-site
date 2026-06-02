# Ablation Results (n=20 labelled queries)

| ID | Model | Pooling | P@1 | P@3 | P@5 | R@5 | MRR |
|---|---|---|---|---|---|---|---|
| B0 | TF-IDF only (sklearn) | — | 0.400 | 0.267 | 0.170 | 0.425 | 0.527 |
| B1 | Plain CBOW (intra) | mean | 0.450 | 0.250 | 0.240 | 0.600 | 0.591 |
| B2 | Plain CBOW + TFIDF pool | tfidf | 0.500 | 0.367 | 0.250 | 0.625 | 0.660 |
| B3 | WikiCBOW (intra+wiki) | mean | 0.450 | 0.217 | 0.180 | 0.450 | 0.544 |
| B4 | WikiCBOW (intra+cat) | mean | 0.500 | 0.350 | 0.230 | 0.575 | 0.639 |
| B5 | WikiCBOW full (3 sources) | mean | 0.850 | 0.567 | 0.360 | 0.900 | 0.904 |
| B6 | WikiCBOW full + TFIDF pool | tfidf | 1.000 | 0.667 | 0.400 | 1.000 | 1.000 |
