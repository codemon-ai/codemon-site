#!/usr/bin/env node
/**
 * 콘텐츠 자동 발행 파이프라인 (ADR-010, 로드맵 P6)
 *   draft   --n 5                 Codex: 주제 발굴 + 초안 배치 → data/content-queue/batches/<id>/drafts.json
 *   judge   <batch>               Fable 5.1: 사실검증(WebSearch) + 채택/반려 → judgments/<slug>.json
 *   images  <batch>               채택본 이미지 3~5 생성 (OpenAI Images, 프롬프트는 Codex 초안) → public/images/blog/<slug>/NN.png
 *   enqueue <batch>               채택 + 이미지 OK + 스키마/MDX 검증 → queue.json(status: queued)
 *   run     --n 5                 draft → judge → images → enqueue
 *   status
 * 발행(큐 pop → pages/blog)은 scripts/content-schedule.mjs. 최종 승인은 로디몬(PR).
 */
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const Q = path.join(ROOT, 'data', 'content-queue')
const CATEGORIES = { 'agents-build': '에이전트 직접 만들기', 'agents-ops': 'AI 코딩 에이전트 운용', models: '모델 전쟁 — 출시·가격·벤치마크', infra: '혼자 만드는 인프라·빌드로그', retrospective: '엔지니어링 회고' }
const args = process.argv.slice(2)
const cmd = args[0]
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const JUDGE_MODEL = process.env.CONTENT_JUDGE_MODEL || 'claude-fable-5-1'
const IMAGE_MODEL = process.env.CONTENT_IMAGE_MODEL || 'gpt-image-2'
const IMAGE_SIZE = process.env.CONTENT_IMAGE_SIZE || '1536x1024'
const log = (...a) => console.log('[pipeline]', ...a)
const readJ = (p, d) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : d)
const writeJ = (p, v) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(v, null, 2)) }
const tpl = (file, vars) => Object.entries(vars).reduce((s, [k, v]) => s.split(`{{${k}}}`).join(v), fs.readFileSync(path.join(ROOT, 'scripts', 'content-prompts', file), 'utf8'))
const catList = () => Object.entries(CATEGORIES).map(([k, v]) => `- ${k}: ${v}`).join('\n')
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function existingTitles() {
  const posts = readJ(path.join(ROOT, 'data', 'posts.json'), { posts: [] }).posts
  const queued = readJ(path.join(Q, 'queue.json'), [])
  return [...posts.map((p) => `${p.slug} — ${p.title}`), ...queued.map((q) => `${q.slug} — ${q.title} (큐)`)].join('\n')
}

// ── draft ──
const DRAFT_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['drafts'],
  properties: { drafts: { type: 'array', items: { type: 'object', additionalProperties: false,
    required: ['slug', 'title', 'description', 'category', 'tags', 'body', 'images', 'verifiableClaims'],
    properties: {
      slug: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' },
      category: { type: 'string', enum: Object.keys(CATEGORIES) }, tags: { type: 'array', items: { type: 'string' } },
      body: { type: 'string' },
      images: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['file', 'alt', 'prompt'], properties: { file: { type: 'string' }, alt: { type: 'string' }, prompt: { type: 'string' } } } },
      verifiableClaims: { type: 'array', items: { type: 'string' } },
    } } } },
}
function draft() {
  const n = Number(opt('--n', 5))
  const id = opt('--batch', new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '').slice(0, 12))
  const dir = path.join(Q, 'batches', id); fs.mkdirSync(dir, { recursive: true })
  const schemaPath = path.join(dir, 'draft.schema.json'); writeJ(schemaPath, DRAFT_SCHEMA)
  const prompt = tpl('draft.md', { N: String(n), CATEGORIES: catList(), EXISTING: existingTitles() })
  fs.writeFileSync(path.join(dir, 'draft.prompt.md'), prompt)
  const out = path.join(dir, 'drafts.json')
  log(`draft: codex exec n=${n} batch=${id}`)
  const r = spawnSync('codex', ['exec', '--skip-git-repo-check', '--ephemeral', '-s', 'read-only', '-C', ROOT, '-c', `model_reasoning_effort="${process.env.CONTENT_DRAFT_EFFORT || 'high'}"`, '--output-schema', schemaPath, '-o', out, '-'], { input: prompt, encoding: 'utf8', maxBuffer: 64e6 })
  fs.writeFileSync(path.join(dir, 'draft.log.txt'), (r.stdout || '') + (r.stderr || ''))
  if (r.status !== 0 || !fs.existsSync(out)) { console.error('draft failed', r.status, (r.stderr || '').slice(-500)); process.exit(1) }
  const drafts = readJ(out, { drafts: [] }).drafts.filter((d) => slugRe.test(d.slug))
  writeJ(out, { drafts })
  log(`draft: ${drafts.length}편 → ${path.relative(ROOT, out)}`); drafts.forEach((d) => log(`  - [${d.category}] ${d.slug} — ${d.title} (img ${d.images.length})`))
  return id
}

// ── judge ──
const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['accept', 'category', 'reasons', 'facts', 'correctedBody'],
  properties: {
    accept: { type: 'boolean' }, category: { type: 'string', enum: Object.keys(CATEGORIES) },
    reasons: { type: 'array', items: { type: 'string' } },
    facts: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['claim', 'status', 'url', 'note'], properties: { claim: { type: 'string' }, status: { type: 'string', enum: ['verified', 'corrected', 'unverified', 'false'] }, url: { type: 'string' }, note: { type: 'string' } } } },
    correctedBody: { type: 'string' },
  },
}
function judge(id) {
  const dir = path.join(Q, 'batches', id)
  const { drafts } = readJ(path.join(dir, 'drafts.json'), { drafts: [] })
  const jdir = path.join(dir, 'judgments'); fs.mkdirSync(jdir, { recursive: true })
  for (const d of drafts) {
    const jp = path.join(jdir, `${d.slug}.json`)
    if (fs.existsSync(jp)) { log(`judge: skip (exists) ${d.slug}`); continue }
    const prompt = tpl('judge.md', { CATEGORIES: catList(), TITLE: d.title, CATEGORY: d.category, DESCRIPTION: d.description, BODY: d.body })
    log(`judge: ${JUDGE_MODEL} + WebSearch → ${d.slug}`)
    const r = spawnSync('claude', ['-p', '--model', JUDGE_MODEL, '--output-format', 'json', '--json-schema', JSON.stringify(JUDGE_SCHEMA), '--allowedTools', 'WebSearch,WebFetch', '--max-turns', '40', prompt], { encoding: 'utf8', maxBuffer: 64e6, env: { ...process.env, CLAUDECODE: '' } })
    let res = null
    try { const j = JSON.parse(r.stdout); res = j.structured_output ?? JSON.parse(j.result); res._cost = j.total_cost_usd; res._turns = j.num_turns } catch (e) { fs.writeFileSync(path.join(jdir, `${d.slug}.error.txt`), (r.stdout || '') + (r.stderr || '')); log(`judge: parse fail ${d.slug}`); continue }
    res.judgedAt = new Date().toISOString(); res.model = JUDGE_MODEL
    writeJ(jp, res)
    log(`  ${res.accept ? '✓ 채택' : '✗ 반려'} [${res.category}] facts ${res.facts.map((f) => f.status[0]).join('')} · ${res.reasons[0] ?? ''}`)
  }
}

// ── images ──
async function genImage(prompt, file) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY missing')
  const r = await fetch('https://api.openai.com/v1/images/generations', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: IMAGE_MODEL, prompt, size: IMAGE_SIZE, quality: process.env.CONTENT_IMAGE_QUALITY || 'medium', n: 1 }) })
  const j = await r.json()
  if (!r.ok) throw new Error(j.error?.message || `http ${r.status}`)
  const b64 = j.data?.[0]?.b64_json
  if (b64) fs.writeFileSync(file, Buffer.from(b64, 'base64'))
  else if (j.data?.[0]?.url) fs.writeFileSync(file, Buffer.from(await (await fetch(j.data[0].url)).arrayBuffer()))
  else throw new Error('no image data')
}
function optimize(pngPath) {
  // 생성 원본(≈1MB, 1536px) → 1200px. webp 지원 시 webp, 아니면 jpeg q80 (흰 배경 플랫 일러스트라 손실 무해), 둘 다 실패면 png 1200px
  for (const [fmt, ext, extra] of [['webp', '.webp', []], ['jpeg', '.jpg', ['-s', 'formatOptions', '80']]]) {
    const out = pngPath.replace(/\.png$/, ext)
    const r = spawnSync('sips', ['-Z', '1200', '-s', 'format', fmt, ...extra, pngPath, '--out', out], { encoding: 'utf8' })
    if (r.status === 0 && fs.existsSync(out) && fs.statSync(out).size > 1000) { fs.unlinkSync(pngPath); return path.basename(out) }
    if (fs.existsSync(out)) fs.unlinkSync(out)
  }
  spawnSync('sips', ['-Z', '1200', pngPath], { encoding: 'utf8' })
  return path.basename(pngPath)
}
const IMG_RE = /^\d\d\.(png|webp|jpg)$/

async function images(id) {
  const dir = path.join(Q, 'batches', id)
  const { drafts } = readJ(path.join(dir, 'drafts.json'), { drafts: [] })
  for (const d of drafts) {
    const j = readJ(path.join(dir, 'judgments', `${d.slug}.json`), null)
    if (!j?.accept) continue
    const imgDir = path.join(ROOT, 'public', 'images', 'blog', d.slug); fs.mkdirSync(imgDir, { recursive: true })
    const wanted = d.images.slice(0, 5)
    if (wanted.length < 3) { log(`images: ${d.slug} 이미지 지정 ${wanted.length}개 (<3) — 보강 필요`); }
    for (const im of wanted) {
      const base = im.file.replace(/[^0-9a-z.]/gi, '').replace(/\.(png|webp)$/, '')
      const file = path.join(imgDir, `${base}.png`)
      if (fs.existsSync(file.replace(/\.png$/, '.webp')) || (fs.existsSync(file) && fs.statSync(file).size > 1000)) { log(`images: skip ${d.slug}/${base}`); if (fs.existsSync(file)) optimize(file); continue }
      log(`images: ${IMAGE_MODEL} → ${d.slug}/${base}`)
      try { await genImage(`${im.prompt}. Style: flat vector editorial illustration, navy #001D3D, yellow #FFC300, white background, clean geometric shapes, no text, no letters, no logos.`, file); log(`images: optimized → ${optimize(file)}`) }
      catch (e) { log(`images: FAIL ${d.slug}/${base}: ${e.message}`) }
    }
    const have = fs.readdirSync(imgDir).filter((f) => IMG_RE.test(f)).length
    log(`images: ${d.slug} → ${have}장`)
  }
}

// ── enqueue ──
async function mdxOk(body) {
  try { const { compile } = await import('@mdx-js/mdx'); await compile(body, { format: 'mdx' }); return null } catch (e) { return e.message }
}
async function enqueue(id) {
  const dir = path.join(Q, 'batches', id)
  const { drafts } = readJ(path.join(dir, 'drafts.json'), { drafts: [] })
  const queue = readJ(path.join(Q, 'queue.json'), [])
  const ym = new Date().toISOString().slice(0, 7)
  let added = 0
  for (const d of drafts) {
    const j = readJ(path.join(dir, 'judgments', `${d.slug}.json`), null)
    if (!j?.accept) continue
    if (queue.some((q) => q.slug === d.slug) || fs.existsSync(path.join(ROOT, 'pages', 'blog', `${d.slug}.mdx`))) { log(`enqueue: skip dup ${d.slug}`); continue }
    const imgDir = path.join(ROOT, 'public', 'images', 'blog', d.slug)
    const files = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).filter((f) => IMG_RE.test(f)).sort() : []
    if (files.length < 3) { log(`enqueue: ${d.slug} 이미지 ${files.length}장 (<3) — 보류`); continue }
    let body = (j.correctedBody && j.correctedBody.trim()) ? j.correctedBody : d.body
    const fileOf = (n) => files.find((f) => f.startsWith(`${n}.`))
    const bad = [...body.matchAll(/\{\{img:(\d\d)\}\}/g)].map((m) => m[1]).filter((n) => !fileOf(n))
    for (const n of bad) body = body.replace(new RegExp(`\\{\\{img:${n}\\}\\}\\n?`, 'g'), '')
    const rendered = body.replace(/\{\{img:(\d\d)\}\}/g, (_, n) => { const im = d.images.find((i) => i.file.startsWith(n)); return `![${im?.alt ?? ''}](/images/blog/${d.slug}/${fileOf(n)})` })
    const err = await mdxOk(rendered)
    if (err) { log(`enqueue: ${d.slug} MDX 오류 — 보류: ${err.split('\n')[0]}`); continue }
    const tags = [...new Set(d.tags.map((t) => t.toLowerCase().replace(/\s+/g, '-')))].filter((t) => /^[a-z0-9가-힣][a-z0-9가-힣.\-]*$/.test(t))
    queue.push({ slug: d.slug, title: d.title, description: d.description, category: j.category, tags, body: `<!-- verified: ${ym} -->\n\n${rendered}`, images: files.map((f) => `/images/blog/${d.slug}/${f}`), batch: id, verifiedAt: j.judgedAt, facts: j.facts.length, status: 'queued', queuedAt: new Date().toISOString() })
    added++; log(`enqueue: + ${d.slug} [${j.category}] img ${files.length}`)
  }
  writeJ(path.join(Q, 'queue.json'), queue)
  log(`enqueue: +${added} → 큐 ${queue.filter((q) => q.status === 'queued').length}편 대기`)
}

function status() {
  const queue = readJ(path.join(Q, 'queue.json'), []), lg = readJ(path.join(Q, 'log.json'), [])
  log(`큐 대기 ${queue.filter((q) => q.status === 'queued').length} · 발행 이력 ${lg.length} · 마지막 발행 ${lg.at(-1)?.publishedAt ?? '-'}`)
  for (const q of queue.filter((q) => q.status === 'queued')) log(`  - [${q.category}] ${q.slug} — ${q.title} (img ${q.images.length}, ${q.queuedAt.slice(0, 10)})`)
}

const main = async () => {
  if (cmd === 'draft') draft()
  else if (cmd === 'judge') judge(args[1])
  else if (cmd === 'images') await images(args[1])
  else if (cmd === 'enqueue') await enqueue(args[1])
  else if (cmd === 'run') { const id = draft(); judge(id); await images(id); await enqueue(id); status() }
  else if (cmd === 'status') status()
  else { console.log('usage: content-pipeline.mjs draft --n N | judge <batch> | images <batch> | enqueue <batch> | run --n N | status'); process.exit(2) }
}
main()
