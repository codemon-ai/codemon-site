# Stitch + Claude Code 핸즈온 데모 프롬프트 모음

> 프로젝트: BO:DL Package Labels
> 프로젝트 ID: `2165309038794788418`
> 디자인 시스템 Asset ID: `16356478382704351221`

## 생성된 스크린 목록

| # | 스크린 | ID | 언어 | 제품 |
|---|--------|-----|------|------|
| 1 | Front Label - 밤투폼 (KR) | `eeca016d261d4a36b387a8ffc6ad2852` | 한국어 | 밤투폼 |
| 2 | Back Label - 밤투폼 (KR) | `8de524eaf2d44a9b94f5472e0cda6bfc` | 한국어 | 밤투폼 |
| 3 | Front Label - TGG 마스크팩 (KR) | `1f2cf597a6d54a7dad3c1d0993f90ab1` | 한국어 | TGG 마스크팩 |
| 4 | Front Label - 콜라겐 앰플 (KR) | `8c544a176be847c093d5eae6d55dbe14` | 한국어 | 콜라겐 버블앰플 |
| 5 | US FDA Label - 밤투폼 (EN) | `9931023f8ee24f3ea6005ea371321ccc` | 영어 | 밤투폼 |
| 6 | MENA Halal Label - 밤투폼 (AR) | `1d84aa14f27b4a3e8aa21acf1d080963` | 아랍어+영어 | 밤투폼 |
| 7 | EU CPNP Label - 밤투폼 (FR) | `ab0ceaf56da9436d8df5d33456901a19` | 프랑스어+영어 | 밤투폼 |

---

## Step 1: 프로젝트 생성

**프롬프트:**
> 보들 패키지 라벨 디자인 프로젝트를 Stitch에 만들어줘. 제목은 'BO:DL Package Labels'

**도구:** `create_project`

---

## Step 2: 디자인 시스템 등록

**프롬프트:**
> 이 프로젝트에 보들 브랜드 디자인 시스템을 설정해줘. data/demo/DESIGN.md를 참고해서.
> 포인트 컬러는 보라(#a855f7), 폰트는 Inter/Plus Jakarta Sans, 라운드 8px.

**도구:** `create_design_system`
- colorMode: LIGHT
- customColor: #a855f7
- headlineFont: PLUS_JAKARTA_SANS
- bodyFont: INTER
- roundness: ROUND_EIGHT
- designMd: DESIGN.md 내용 포함

---

## Step 3: 한국어 밤투폼 라벨 (정면+후면)

**프롬프트:**
> 밤투폼 제품의 한국 시장용 패키지 라벨을 디자인해줘.
> 정면: 브랜드명, 제품명, USP, 용량
> 후면: 전성분(INCI), 사용방법, 주의사항, 식약처 표기
> products.json의 balm-to-foam 데이터와 label-specs.json의 kr-kfda 규격을 참고해.

**도구:** `generate_screen_from_text`

```
Premium K-beauty cosmetics product packaging label design for BO:DL brand.

Product: 2X 프레시 밤투폼 (2X Fresh Balm-to-Foam)
Category: Cleanser | Price: ₩24,000 | Volume: 120ml

FRONT LABEL:
- Brand name "BO:DL" at top with purple accent (#a855f7)
- Product name "2X 프레시 밤투폼" centered, Korean + English
- USP tagline: "더블 클렌징 불필요 — 밤에서 폼으로, 한 번에 깨끗하게"
- Net contents: 120ml / 4.05 fl oz
- Premium minimalist design with generous white space

BACK LABEL:
- Full INCI ingredients: Shea Butter, Coconut Oil, Panthenol, Hyaluronic Acid
  (Korean: 시어버터, 코코넛 오일, 판테놀, 히알루론산)
- Usage Instructions (3 steps):
  1. 적당량을 손에 덜어
  2. 얼굴에 부드럽게 마사지
  3. 미온수로 세안
- Cautions: 눈에 들어갔을 때 즉시 씻어낼 것, 이상 시 사용 중지
- Manufacturer: (주)보들코스메틱 | 서울특별시 강남구
- Expiry: 제조일로부터 30개월
- Barcode area placeholder

Style: Clean, elegant, premium K-beauty packaging. Mostly white/cream background
with purple (#a855f7) accent only on brand name.
```

---

## Step 4: 다른 제품 라벨 (한국어)

### TGG 하이드로겔 마스크팩

```
Premium K-beauty product front label for BO:DL 'TGG 하이드로겔 마스크팩'
(TGG Hydrogel Mask Pack).
Category: Mask Pack | Price: ₩3,500 | Volume: 1 sheet (25g)

- Brand "BO:DL" top in purple (#a855f7)
- Product name "TGG 하이드로겔 마스크팩" centered, Korean + English below
- USP: "고밀착 하이드로겔 — 유효 성분 침투율 3배"
- Key ingredients icons: Niacinamide, Adenosine, Collagen, Green Tea
- Net contents: 25g / 0.88 oz
- Premium minimalist white background, same style as other BO:DL labels
```

### 콜라겐 버블앰플

```
Premium K-beauty product front label for BO:DL '콜라겐 버블앰플'
(Collagen Bubble Ampoule).
Category: Ampoule | Price: ₩28,000 | Volume: 30ml

- Brand "BO:DL" top in purple (#a855f7)
- Product name "콜라겐 버블앰플" centered, Korean + English below
- USP: "CO2 버블이 콜라겐을 피부 깊숙이 전달"
- Key ingredients: Low-molecular Collagen, CO2 Bubble, Centella, Allantoin
- Net contents: 30ml / 1.01 fl oz
- Premium minimalist white background, same BO:DL brand style
```

### 라이스 PDRN 워터리 선세럼 (미생성 — 시연 시 사용)

```
Premium K-beauty product front label for BO:DL '라이스 PDRN 워터리 선세럼'
(Rice PDRN Watery Sun Serum).
Category: Essence/Sunscreen | Price: ₩32,000 | Volume: 50ml

- Brand "BO:DL" top in purple (#a855f7)
- Product name "라이스 PDRN 워터리 선세럼" centered, Korean + English below
- USP: "자외선 차단 + 피부 재생 동시에 — SPF50+/PA++++"
- Key ingredients: Rice Extract, PDRN, Ceramide, Vitamin E
- Sun protection badges: SPF50+ PA++++
- Net contents: 50ml / 1.69 fl oz
```

### 보들 수면팩 (미생성 — 시연 시 사용)

```
Premium K-beauty product front label for BO:DL '보들 수면팩'
(BO:DL Sleeping Pack).
Category: Sleeping Pack | Price: ₩22,000 | Volume: 80ml

- Brand "BO:DL" top in purple (#a855f7)
- Product name "보들 수면팩" centered, Korean + English below
- USP: "자는 동안 완성되는 장벽 케어 — 아침 세안 불필요"
- Key ingredients: Squalane, Madecassoside, Lavender Oil, Beta-Glucan
- Night routine icon / moon symbol
- Net contents: 80ml / 2.7 fl oz
```

---

## Step 5: 다국어 변환 (밤투폼 기준)

### 🇺🇸 미국 FDA 영어 버전

```
US FDA-compliant front package label for BO:DL '2X Fresh Balm-to-Foam' cleanser.
English only. For Amazon US / US retail market.

- Brand "BO:DL" top in purple (#a855f7)
- Product name "2X Fresh Balm-to-Foam" centered, English primary
- Subtitle: "All-in-One Oil-to-Foam Cleanser"
- USP: "No Double Cleansing Needed — Balm melts into foam for one-step clean"
- Key claims: Dermatologist Tested, Fragrance Free, Cruelty Free
- INCI Declaration: Shea Butter, Coconut Oil, Panthenol, Hyaluronic Acid
- Net Wt: 4.05 fl oz (120ml)
- "Made in Korea" badge
- Clean Beauty aesthetic, premium minimalist white background
```

### 🇸🇦 아랍어 할랄 버전

```
MENA Halal-compliant front package label for BO:DL '2X Fresh Balm-to-Foam'.
Arabic + English bilingual. For Saudi Arabia / UAE / Middle East market.

- Brand "BO:DL" top in purple (#a855f7)
- Product name in Arabic "بلسم تو فوم 2X الطازج" centered, large
- English "2X Fresh Balm-to-Foam" below
- USP in Arabic: "لا حاجة للتنظيف المزدوج — من بلسم إلى رغوة في خطوة واحدة"
- Halal certification mark (crescent moon symbol)
- Key ingredients in Arabic+English
- No alcohol, no porcine derivatives badges
- Expiry: Hijri + Gregorian dual date format
- SFDA approved mark
- Right-to-left text direction for Arabic
```

### 🇪🇺 EU 프랑스어 버전

```
EU CPNP-compliant front package label for BO:DL '2X Fresh Balm-to-Foam'.
French + English bilingual. For EU market (France primary).

- Brand "BO:DL" top in purple (#a855f7)
- Product name "2X Fresh Balm-to-Foam" centered
- French: "Nettoyant Baume-en-Mousse 2X"
- USP: "Sans double nettoyage — Du baume à la mousse en une seule étape"
- PAO (Period After Opening): 12M symbol
- EU Cosmetics Regulation badges: CPNP registered, Not tested on animals
- INCI ingredients, Batch number placeholder, Responsible Person info
- Net contents: 120ml e
- "Made in Korea" / "Fabriqué en Corée" badge
```

### 🇯🇵 일본어 버전 (미생성 — 시연 시 사용)

```
Japanese market front package label for BO:DL '2X Fresh Balm-to-Foam'.
Japanese + English bilingual. For Qoo10 / Amazon JP market.

- Brand "BO:DL" top in purple (#a855f7)
- Product name "2X フレッシュ バームトゥフォーム" centered, Japanese primary
- English "2X Fresh Balm-to-Foam" below
- USP: "ダブル洗顔不要 — バームからフォームへ、ワンステップクレンジング"
- Key ingredients: シアバター、ココナッツオイル、パンテノール、ヒアルロン酸
- Japanese Cosmetics Act compliance: 化粧品
- Net contents: 120ml
- "Made in Korea" / "韓国製" badge
- J-beauty aesthetic compatibility — clean, trustworthy
```

### 🇨🇳 중국어 버전 (미생성 — 시연 시 사용)

```
Chinese market front package label for BO:DL '2X Fresh Balm-to-Foam'.
Simplified Chinese + English bilingual. For Tmall / Xiaohongshu market.

- Brand "BO:DL" top in purple (#a855f7)
- Product name "2X 清新卸妆泡沫洁面膏" centered, Chinese primary
- English "2X Fresh Balm-to-Foam" below
- USP: "无需双重清洁 — 从膏体到泡沫，一步完成"
- Key ingredients: 乳木果油、椰子油、泛醇、透明质酸
- NMPA registration number placeholder
- Net contents: 120ml
- "韩国制造" badge
- Ingredient safety emphasis (成分安全)
```

---

## Step 6: 디자인 시스템 일괄 적용

**프롬프트:**
> 프로젝트의 모든 라벨에 보들 디자인 시스템을 일괄 적용해줘

**도구:** `apply_design_system`

---

## 시연 팁

1. **Stitch 브라우저를 별도 모니터에 띄워놓기** — 생성 결과가 실시간 반영
2. **프로젝트 URL**: https://stitch.withgoogle.com/ → "BO:DL Package Labels" 프로젝트
3. **생성 시간**: 스크린당 1~2분 소요 — 대화로 시간 메우기
4. **대체 시나리오**: API 장애 시 → https://codemon.ai/partner/lecture-podl-ai/demo/label
5. **핵심 멘트**: "같은 제품, 4개국 규제, 15분이면 끝 — 기존에는 1주"
