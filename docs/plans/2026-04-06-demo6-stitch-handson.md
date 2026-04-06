# Demo 6 핸즈온 시연 가이드: Stitch 2.0 + Claude Code

## 이게 뭔가?

**Google Stitch 2.0**은 AI 디자인 캔버스(stitch.withgoogle.com)다.
**Claude Code**에서 **Stitch MCP**(Model Context Protocol)로 연결하면, 코드 에디터 안에서 자연어 프롬프트만으로 디자인을 생성할 수 있다.

### 우리가 한 것
Claude Code 터미널에서 프롬프팅 → Stitch 클라우드에 패키지 라벨 디자인 자동 생성:
- 보들 브랜드 디자인 시스템(색상/폰트/톤) 등록
- 제품별 한국어 라벨 생성 (밤투폼, TGG 마스크팩, 콜라겐 앰플)
- **같은 제품을 4개국 규제에 맞춰 다국어 변환** (한국/미국 FDA/아랍어 할랄/EU CPNP)
- 모든 결과가 stitch.withgoogle.com 에서 바로 확인 가능

### 핵심 가치
> "같은 밤투폼, 4개국 라벨 — 기존 1주 → 15분"

---

## 기술 구성

```
Claude Code ──MCP──→ Stitch API ──→ stitch.withgoogle.com (디자인 캔버스)
     │                                        │
     ├─ products.json (제품 데이터)            └─ 라벨 디자인 실시간 반영
     ├─ label-specs.json (국가별 규격)
     └─ DESIGN.md (브랜드 가이드라인)
```

### Stitch MCP 도구 (사용한 것)
| 도구 | 용도 |
|------|------|
| `create_project` | Stitch 프로젝트 생성 |
| `create_design_system` | 브랜드 색상/폰트/DESIGN.md 등록 |
| `generate_screen_from_text` | 프롬프트 → 디자인 스크린 생성 |
| `apply_design_system` | 디자인 시스템 일괄 적용 |
| `edit_screens` | 기존 스크린 텍스트 수정 |
| `list_screens` | 스크린 목록 조회 |

### 설정 파일
- `.mcp.json` — Stitch MCP 서버 설정 + API 키 (gitignore 됨)
- `data/demo/DESIGN.md` — 보들 브랜드 디자인 시스템 (Stitch designMd로 전달)
- `data/demo/label-specs.json` — 4개국 화장품 라벨 규격 데이터
- `data/demo/products.json` — 5개 제품 정보

---

## 실제 생성 결과

### Stitch 프로젝트
- **프로젝트명**: BO:DL Package Labels
- **프로젝트 ID**: `2165309038794788418`
- **디자인 시스템 ID**: `16356478382704351221`
- **URL**: stitch.withgoogle.com → "BO:DL Package Labels"

### 생성된 스크린 (7개)

| # | 스크린 | 언어 | 제품 | Screen ID |
|---|--------|------|------|-----------|
| 1 | 정면 라벨 | 🇰🇷 한국어 | 밤투폼 | `eeca016d…` |
| 2 | 후면 라벨 | 🇰🇷 한국어 | 밤투폼 | `8de524ea…` |
| 3 | 정면 라벨 | 🇰🇷 한국어 | TGG 마스크팩 | `1f2cf597…` |
| 4 | 정면 라벨 | 🇰🇷 한국어 | 콜라겐 앰플 | `8c544a17…` |
| 5 | US FDA | 🇺🇸 영어 | 밤투폼 | `9931023f…` |
| 6 | MENA 할랄 | 🇸🇦 아랍어+영어 | 밤투폼 | `1d84aa14…` |
| 7 | EU CPNP | 🇪🇺 프랑스어+영어 | 밤투폼 | `ab0ceaf5…` |

---

## 사전 준비 (이미 완료)

### 1. Stitch MCP 설치 + 인증
```bash
npx @_davideast/stitch-mcp init    # OAuth + 프로젝트 설정
npx @_davideast/stitch-mcp doctor  # 연결 확인 → All checks passed
```

### 2. API 활성화
```bash
gcloud services enable stitch.googleapis.com --project=gen-lang-client-0482896339
gcloud beta services mcp enable stitch.googleapis.com --project=gen-lang-client-0482896339
```

### 3. `.mcp.json` 설정
```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"],
      "env": { "STITCH_API_KEY": "<API_KEY>" }
    }
  }
}
```
API 키: stitch.withgoogle.com → 프로필 → Settings → API Keys에서 발급

---

## 시연 워크플로우 (실제 실행한 순서)

### Step 1: 프로젝트 생성 (~1분)
> "보들 패키지 라벨 프로젝트를 Stitch에 만들어줘"

### Step 2: 디자인 시스템 등록 (~2분)
> "data/demo/DESIGN.md를 참고해서 보들 브랜드 디자인 시스템 설정해줘"

### Step 3: 한국어 라벨 생성 (~3분)
> "밤투폼 한국 시장용 패키지 라벨 디자인해줘. 정면+후면. 식약처 규격 반영."

### Step 4: 제품 라인업 확장 (~4분)
> "TGG 마스크팩이랑 콜라겐 앰플도 정면 라벨 만들어줘"

### Step 5: 다국어 변환 — 핵심 데모 (~6분)
> "밤투폼을 미국 FDA, 아랍어 할랄, EU 프랑스어 버전으로 각각 만들어줘"

**청중에게 Stitch 브라우저를 보여주면서**: "지금 3개국 라벨이 동시에 생성되고 있습니다"

---

## 시연 포인트 (청중에게 강조)

1. **규제 자동 반영** — 국가별 화장품 규제(FDA, CPNP, 할랄)를 AI가 이해
2. **디자인↔코드 실시간** — Claude Code 터미널에서 프롬프트 → Stitch 캔버스에 즉시 반영
3. **브랜드 일관성** — DESIGN.md 하나로 모든 라벨에 보들 톤 자동 적용
4. **속도** — 4개국 라벨 세트: 기존 1주 → 15분
5. **비용** — Stitch 무료(350회/월) + Claude Code 구독만

---

## 대체 시나리오

| 상황 | 대응 |
|------|------|
| Stitch API 장애 | 웹 데모 전환: codemon.ai/partner/lecture-podl-ai/demo/label |
| 생성 느림 | 미리 만든 7개 스크린 보여주기 |
| 인터넷 끊김 | 스크린샷으로 결과 설명 |

---

## 관련 파일

| 파일 | 용도 |
|------|------|
| `.mcp.json` | Stitch MCP 설정 (API 키, gitignore 됨) |
| `data/demo/DESIGN.md` | 보들 브랜드 디자인 시스템 |
| `data/demo/label-specs.json` | 4개국 라벨 규격 데이터 |
| `data/demo/products.json` | 5개 제품 정보 |
| `components/demo/LabelDemo.tsx` | 웹 데모 컴포넌트 (대체 시나리오) |
| `docs/plans/2026-04-06-stitch-demo-prompts.md` | 전체 프롬프트 모음 |
