# 외주 쇼케이스 `/work` — 구현 계획 (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development(권장) 또는 executing-plans로 태스크 단위 구현. 스텝은 `- [ ]` 체크박스.

**Goal:** 클라이언트 외주 작업을 보여주는 비밀번호 보호 숨김 메뉴 `/work`를, 디어유 1건이 실제로 뜨는 상태까지 end-to-end로 만든다.

**Architecture:** `/admin` 인증 패턴을 그대로 미러링한 **분리 게이트**(쿠키 `work_session`, env `WORK_PASSWORD`). `middleware.ts`가 `/work/*`를 포맷 검증으로 막고, 로그인 API가 HMAC 토큰을 발급. 콘텐츠는 `data/work/projects.ts` 데이터 + `WorkCard/Grid` 컴포넌트 + `pages/work/index.mdx`.

**Tech Stack:** Next.js 14 Pages Router, Nextra 3.3, TypeScript, Tailwind, Framer Motion, lucide-react, Node crypto(HMAC). Vercel 프리빌트 배포.

**Spec:** `docs/prd/work-showcase.md`

## Global Constraints (스펙에서 그대로)
- 라우트 `/work` — 숨김(`display:'hidden'`), nav 미노출. 기존 `/showcase`는 손대지 않는다.
- 접근은 **비밀번호 보호**, admin과 **분리된 쿠키·시크릿**(`work_session` / `WORK_PASSWORD`). 클라이언트에 admin 권한 노출 금지.
- 실명 표기는 `realName` 플래그로 프로젝트별 제어(현재 전 프로젝트 실명 OK).
- 디자인 톤: 포인트 보라 `#a855f7`, Framer stagger, **`dark:` variant 필수**.
- ⚠️ `public/partner/`처럼 라우트에 가려지는 위치에 HTML 두지 말 것. 스크린샷은 `public/images/work/<slug>/`.
- **테스트 러너 없음.** 검증은 `npm run build` + `./scripts/check-routes.sh` + `playwright-cli`(게이트 동작). 이게 이 레포의 확립된 검증 방식.
- 배포는 프리빌트 전용. 배포 트리는 반드시 최신 `origin/main` 기준.

---

## 파일 구조 (Phase 1)

| 파일 | 책임 |
|------|------|
| `lib/work/auth.ts` (create) | 비번검증·HMAC 토큰·쿠키 (admin/auth.ts 미러, `work_session`/`WORK_PASSWORD`) |
| `pages/api/work/login.ts` (create) | POST 비번 → 쿠키 발급 |
| `pages/api/work/logout.ts` (create) | 쿠키 삭제 |
| `pages/work/login.tsx` (create) | 비번 입력 폼 |
| `middleware.ts` (modify) | matcher에 `/work/:path*` 추가 + 게이트 |
| `pages/_meta.ts` (modify) | `work` 숨김 폴더 등록 |
| `data/work/projects.ts` (create) | `WorkProject` 타입 + 배열(디어유) |
| `components/work/WorkCard.tsx` (create) | `WorkCard` + `WorkGrid` |
| `pages/work/index.mdx` (create) | `/work` 인덱스 — WorkGrid 렌더 |
| `public/images/work/dearu/cover.png` (asset) | 디어유 대표 스크린샷 |
| `.env.example` (modify) | `WORK_PASSWORD` 추가 |
| `docs/wiki/route-inventory.md` (modify) | `/work*` 반영 |
| `docs/changelog/2026-08-31.md` (modify/append) | 기록 |

---

### Task 1: work 인증 라이브러리 + 로그인/로그아웃 API

**Files:**
- Create: `lib/work/auth.ts`
- Create: `pages/api/work/login.ts`, `pages/api/work/logout.ts`
- Modify: `.env.example`

**Interfaces:**
- Produces: `lib/work/auth.ts` → `verifyPassword(input:string):boolean`, `createSessionToken():string`, `verifySessionToken(token:string):boolean`, `setSessionCookie(res,token)`, `clearSessionCookie(res)`. 쿠키명 `work_session`, 시크릿 `process.env.WORK_PASSWORD`.

- [ ] **Step 1: `lib/work/auth.ts` 작성** — `lib/admin/auth.ts`를 복제하되 `COOKIE_NAME='work_session'`, 시크릿을 `process.env.WORK_PASSWORD`로. (admin 파일을 import하지 말 것 — 독립 게이트.)

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const COOKIE_NAME = 'work_session'

function getSecret(): string {
  const secret = process.env.WORK_PASSWORD
  if (!secret) throw new Error('WORK_PASSWORD env var is not set')
  return secret
}

export function verifyPassword(input: string): boolean {
  const password = getSecret()
  if (input.length !== password.length) return false
  return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(password))
}

export function createSessionToken(): string {
  const payload = String(Date.now())
  const hmac = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${hmac}`
}

export function verifySessionToken(token: string): boolean {
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return false
    const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch { return false }
}

export function setSessionCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
}
```
> 주의: admin 원본의 `verifyPassword`는 길이가 다르면 `timingSafeEqual`이 throw → 상위에서 catch. 여기선 길이 선검사를 넣어 방어.

- [ ] **Step 2: `pages/api/work/login.ts` 작성**

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyPassword, createSessionToken, setSessionCookie } from '../../../lib/work/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { password } = req.body
  if (!password || typeof password !== 'string') return res.status(400).json({ error: 'Password is required' })
  try {
    if (!verifyPassword(password)) return res.status(401).json({ error: 'Invalid password' })
  } catch { return res.status(401).json({ error: 'Invalid password' }) }
  setSessionCookie(res, createSessionToken())
  return res.status(200).json({ ok: true })
}
```

- [ ] **Step 3: `pages/api/work/logout.ts` 작성**

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { clearSessionCookie } from '../../../lib/work/auth'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  clearSessionCookie(res)
  return res.status(200).json({ ok: true })
}
```

- [ ] **Step 4: `.env.example`에 `WORK_PASSWORD=` 한 줄 추가**

- [ ] **Step 5: 빌드 검증** — Run: `env -i HOME=/Users/codemon PATH=/Users/codemon/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin /bin/bash -c 'npm run build'` · Expected: Compiled successfully

- [ ] **Step 6: 커밋** — `git add lib/work pages/api/work .env.example && git commit -m "feat(work): 비번 게이트 인증 lib + login/logout API (work_session)"`

---

### Task 2: 미들웨어 게이트 + 로그인 페이지 + 메뉴 등록

**Files:**
- Modify: `middleware.ts`
- Create: `pages/work/login.tsx`
- Modify: `pages/_meta.ts`

**Interfaces:**
- Consumes: 없음(미들웨어는 쿠키 포맷만 검사 — Edge에서 crypto HMAC 검증은 하지 않는 것이 admin의 확립 패턴).
- Produces: `/work/*` 접근 시 `work_session` 쿠키(포맷 `payload.sig`) 없으면 `/work/login` 리다이렉트.

- [ ] **Step 1: `middleware.ts` 수정** — admin 블록 아래에 work 블록 추가, matcher에 `/work/:path*` 추가.

```ts
// (기존 admin 블록 뒤)
if (
  pathname.startsWith('/work') &&
  pathname !== '/work/login' &&
  !pathname.startsWith('/api/work/login')
) {
  const token = request.cookies.get('work_session')?.value
  if (!token || !token.includes('.') || token.split('.').length !== 2) {
    return NextResponse.redirect(new URL('/work/login', request.url))
  }
}
```
그리고 `config.matcher`를 `['/admin/:path*', '/work/:path*']`로.

- [ ] **Step 2: `pages/work/login.tsx` 작성** — `pages/admin/login.tsx` 미러. POST 대상 `/api/work/login`, 성공 시 `router.push('/work')`. `<meta name="robots" content="noindex, nofollow" />` 포함. 보라 포인트·`dark:` 유지.

```tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock } from 'lucide-react'

export default function WorkLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/work/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) router.push('/work')
      else setError('비밀번호가 올바르지 않습니다.')
    } catch { setError('로그인 중 오류가 발생했습니다.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <Head><title>Work — codemon</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 rounded-xl border border-zinc-800 bg-zinc-950 p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Lock className="text-purple-400" size={24} />
            </div>
            <h1 className="mt-4 text-lg font-semibold text-zinc-100">외주 포트폴리오</h1>
            <p className="mt-1 text-sm text-zinc-400">비밀번호를 입력하세요.</p>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-zinc-100 outline-none focus:border-purple-500" placeholder="비밀번호" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-2 font-medium text-white hover:bg-purple-500 disabled:opacity-50">
            {loading ? '확인 중…' : '입장'}
          </button>
        </form>
      </div>
    </>
  )
}
```
> `pages/work/login.tsx`는 `.tsx`라 Nextra 레이아웃이 아닌 순수 페이지. `_meta.ts`에서 login은 자동 hidden 처리(폴더가 hidden).

- [ ] **Step 3: `pages/_meta.ts`에 work 폴더 등록** — `partner` 항목 근처에 추가:

```ts
work: {
  type: 'folder',
  display: 'hidden',
  theme: { sidebar: false },
},
```

- [ ] **Step 4: 빌드 검증** — `npm run build` (위 CLEAN 명령) · Expected: Compiled successfully, `/work/login` 라우트 생성.

- [ ] **Step 5: 로컬 게이트 동작 검증** — `WORK_PASSWORD=testpw npm run dev` 후:
  - `playwright-cli open http://localhost:3000/work` → `/work/login`으로 리다이렉트 확인
  - 로그인 폼에 `testpw` 입력 → `/work` 진입 확인 (아직 인덱스는 Task 4)
  - 틀린 비번 → "비밀번호가 올바르지 않습니다." 노출

- [ ] **Step 6: 커밋** — `git add middleware.ts pages/work/login.tsx pages/_meta.ts && git commit -m "feat(work): /work 비번 게이트 미들웨어 + 로그인 페이지 + 숨김 메뉴 등록"`

---

### Task 3: 데이터 모델 + WorkCard/Grid 컴포넌트

**Files:**
- Create: `data/work/projects.ts`
- Create: `components/work/WorkCard.tsx`

**Interfaces:**
- Produces: `WorkProject` 인터페이스, `workProjects: WorkProject[]`. `<WorkGrid />`(자체적으로 데이터 import), `<WorkCard project={...} />`.

- [ ] **Step 1: `data/work/projects.ts` 작성** — 타입 + 디어유 1건. (나머지 8건은 Phase 2.)

```ts
export interface WorkProject {
  slug: string
  name: string
  realName: boolean
  client: string
  industry: string
  period: string
  status: 'live' | 'building' | 'done'
  summary: string
  role: string
  stack: string[]
  highlights: string[]
  screenshots: string[]   // /images/work/<slug>/*
  liveUrl?: string
  detail?: boolean
}

export const workProjects: WorkProject[] = [
  {
    slug: 'dearu',
    name: '디어유 · bubble HOUSE',
    realName: true,
    client: '디어유(DearU)',
    industry: '커머스 · Shopify',
    period: '2026.06 —',
    status: 'live',
    summary: 'Shopify 스토어에 고객 등급·혜택(스토어크레딧) 엔진을 붙인 미들웨어 앱.',
    role: '기획 · 백엔드 · Shopify 앱 개발',
    stack: ['Shopify', 'Next.js', 'Supabase', 'Webhooks'],
    highlights: [
      '주문/결제 웹훅 기반 스토어크레딧 자동 적립',
      '고객 등급 세그먼트 · 자동 할인 연동',
      '실검증 테스트 하네스로 회귀 검증',
    ],
    screenshots: ['/images/work/dearu/cover.png'],
    detail: false,
  },
]
```
> 문구·실명은 코드몬 확인 대상. 값이 확정 전이면 커밋 메시지/PR에 "문구 확정 필요"로 표시.

- [ ] **Step 2: `components/work/WorkCard.tsx` 작성** — `ShowcaseCard` 톤 참고, 스크린샷 상단 노출형. `WorkCard` + `WorkGrid`(내부에서 `workProjects` 매핑). 보라 포인트·`dark:`·Framer stagger.

```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { workProjects, type WorkProject } from '../../data/work/projects'

const statusLabel: Record<WorkProject['status'], string> = {
  live: '운영 중', building: '개발 중', done: '완료',
}

export function WorkCard({ project }: { project: WorkProject }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="group overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/30 transition-all">
      {project.screenshots[0] && (
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image src={project.screenshots[0]} alt={project.name} fill
            className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground">{project.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{statusLabel[project.status]}</span>
        </div>
        <p className="text-xs font-mono text-foreground/40 mb-2">{project.industry} · {project.period}</p>
        <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{project.summary}</p>
        <ul className="space-y-1 mb-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-xs text-foreground/50 leading-relaxed">· {h}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-foreground/60">{s}</span>
          ))}
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-purple-400 hover:underline">라이브 보기 →</a>
        )}
      </div>
    </motion.div>
  )
}

export function WorkGrid() {
  return (
    <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
      {workProjects.map((p) => <WorkCard key={p.slug} project={p} />)}
    </motion.div>
  )
}
```
> `next/image` 사용 시 `next.config.mjs`의 images 설정 확인. 로컬 `/images/...`는 기본 허용. 문제 시 일반 `<img>`로 대체.

- [ ] **Step 3: 빌드 검증** — `npm run build` · Expected: 타입 에러 없음, Compiled successfully.

- [ ] **Step 4: 커밋** — `git add data/work components/work && git commit -m "feat(work): WorkProject 데이터모델 + WorkCard/Grid (디어유)"`

---

### Task 4: `/work` 인덱스 페이지 + 디어유 스크린샷 (end-to-end)

**Files:**
- Create: `pages/work/index.mdx`
- Asset: `public/images/work/dearu/cover.png`

**Interfaces:**
- Consumes: `WorkGrid` from `components/work/WorkCard`.

- [ ] **Step 1: `public/images/work/dearu/cover.png` 확보** — 디어유 라이브가 공개 접근 가능하면 `playwright-cli`로 캡처, 아니면 코드몬 제공분 배치. (임시로 플레이스홀더 이미지라도 두되, PR에 "실제 스크린샷 교체 필요" 명시.)

- [ ] **Step 2: `pages/work/index.mdx` 작성**

```mdx
---
title: Work
---

import { WorkGrid } from '../../components/work/WorkCard'

# 외주 프로젝트

코드몬이 기획·구축한 클라이언트 서비스입니다.

<WorkGrid />
```

- [ ] **Step 3: 빌드 검증** — `npm run build` · Expected: `/work` 정적 페이지 생성.

- [ ] **Step 4: 로컬 end-to-end 검증** — `WORK_PASSWORD=testpw npm run dev`:
  - `playwright-cli open http://localhost:3000/work` → 로그인 리다이렉트 → 비번 입력 → **디어유 카드(스크린샷+요약+스택)** 렌더 확인
  - `playwright-cli screenshot --filename=work-verify.png`

- [ ] **Step 5: 커밋** — `git add pages/work/index.mdx public/images/work && git commit -m "feat(work): /work 인덱스 페이지 + 디어유 카드 end-to-end"`

---

### Task 5: 배포 + 라우트 검증 + 문서

**Files:**
- Modify: `docs/wiki/route-inventory.md`, `docs/changelog/2026-08-31.md`

- [ ] **Step 1: Vercel env `WORK_PASSWORD` 설정** — 코드몬이 값 지정. (CLI: 링크된 워크트리에서 `vercel env add WORK_PASSWORD production`, 또는 대시보드.) 값 없으면 프로덕션에서 `/api/work/login`이 500.

- [ ] **Step 2: PR 머지 후 최신 main에서 프리빌트 배포** — 배포 트리 확인(`pwd`·브랜치·`git status`·`git log -1`) 후:
```bash
env -i HOME=/Users/codemon PATH=/Users/codemon/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin /bin/bash -c 'vercel build --prod'
env -i HOME=/Users/codemon PATH=/Users/codemon/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin /bin/bash -c 'vercel deploy --prebuilt --prod'
```

- [ ] **Step 3: 라우트 생존 + 게이트 검증**
  - `./scripts/check-routes.sh` → fail=0 (기존 화면 유실 없음)
  - `curl -s -o /dev/null -w '%{http_code}' https://codemon.ai/work` → **307**(로그인 리다이렉트) 기대
  - `curl ... https://codemon.ai/work/login` → 200
  - `playwright-cli`로 비번 입력 → 디어유 카드 확인

- [ ] **Step 4: 문서 갱신**
  - `docs/wiki/route-inventory.md`: `/work`(307 게이트), `/work/login`(200) 항목 + 개수 표 반영
  - `docs/changelog/2026-08-31.md`: `/work` Phase 1 기록
  - `git commit -m "docs(work): /work Phase 1 배포 — 라우트 인벤토리·changelog"`

---

## Phase 2 (후속 계획 — 별도 실행) — 나머지 8건 채우기
`data/work/projects.ts`에 아래를 각각 추가(같은 `WorkProject` 형식) + `public/images/work/<slug>/cover.png`:
브릿지세븐/b7 · 블루망고 · 에어프레미아 · 닥터리본(dr-reborn) · etude-nodestar · etude-selecten(셀렉텀) · etude-lms · etude-library.
각 건: 라이브 공개 가능 여부 확인 → 공개분은 playwright 캡처, 비공개는 코드몬 제공. 실명/문구는 코드몬 확정. 태스크당 1건 추가 + 빌드 + 커밋.

## Phase 3 (후속) — 대표 상세 케이스
`pages/work/[slug].tsx` 동적 상세(문제→해결→화면 2~4장→스택→성과). `detail:true`인 프로젝트만 링크. 우선 디어유·닥터리본 2건.

---

## Self-Review 체크
- **스펙 커버리지**: 라우트/숨김(Task2·_meta), 비번게이트(Task1·2), 데이터모델(Task3), 컴포넌트(Task3), 스크린샷 경로(Task4), 배포·검증(Task5), 문서(Task5) — 스펙 §4 전부 매핑. §5 Phase1=디어유, 나머지=Phase2/3.
- **플레이스홀더**: 코드 스텝은 실제 코드 포함. 미확정은 "코드몬 확정"으로 명시(문구·실명·스크린샷·WORK_PASSWORD 값)이며 구현 공백 아님.
- **타입 일관성**: `WorkProject` 필드가 Task3 정의 ↔ Task3 컴포넌트 ↔ Task4 mdx에서 일치. 쿠키명 `work_session`·env `WORK_PASSWORD`가 Task1↔Task2 일치.
