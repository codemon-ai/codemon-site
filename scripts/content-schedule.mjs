#!/usr/bin/env node
/**
 * 3일 간격 발행 스케줄 (로드맵 P6 Task 6.4)
 *   node scripts/content-schedule.mjs [--dry-run] [--force] [--no-git] [--base main]
 * 규칙: 마지막 발행(log.json) 후 CONTENT_INTERVAL_DAYS(기본 3)일 경과 && 큐에 queued 항목 → head pop →
 *       pages/blog/<slug>.mdx 생성 → generate-posts 검증 → 브랜치 content/<slug> 커밋·푸시 → PR(base) = 로디몬 승인 경로
 * 매일 1회 실행해도 간격은 스크립트가 지킨다(launchd 템플릿: ops/launchd/).
 */
import fs from 'fs'
import path from 'path'
import { execSync, spawnSync } from 'child_process'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const Q = path.join(ROOT, 'data', 'content-queue')
const args = process.argv.slice(2)
const has = (k) => args.includes(k)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const INTERVAL = Number(process.env.CONTENT_INTERVAL_DAYS || 3)
const BASE = opt('--base', process.env.CONTENT_BASE_BRANCH || 'main')
const readJ = (p, d) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : d)
const writeJ = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2))
const log = (...a) => console.log('[schedule]', ...a)
const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

const queue = readJ(path.join(Q, 'queue.json'), [])
const history = readJ(path.join(Q, 'log.json'), [])
const last = history.at(-1)
const days = last ? (Date.now() - new Date(last.publishedAt).getTime()) / 86400000 : Infinity
const head = queue.find((q) => q.status === 'queued')
log(`큐 대기 ${queue.filter((q) => q.status === 'queued').length} · 마지막 발행 ${last?.publishedAt?.slice(0, 10) ?? '없음'} (${isFinite(days) ? days.toFixed(1) + '일 전' : '-'}) · 간격 ${INTERVAL}일`)
if (!head) { log('발행할 항목 없음'); process.exit(0) }
if (days < INTERVAL && !has('--force')) { log(`아직 ${(INTERVAL - days).toFixed(1)}일 남음 — 종료`); process.exit(0) }

const today = new Date().toLocaleDateString('en-CA')   // 로컬 날짜 YYYY-MM-DD
const fm = ['---', `title: ${JSON.stringify(head.title)}`, `description: ${JSON.stringify(head.description)}`, `date: ${today}`, 'author: codemon', `category: ${head.category}`, `tags: [${head.tags.map((t) => JSON.stringify(t)).join(', ')}]`, `image: ${head.images[0]}`, `pipeline: ${head.batch}`, '---'].join('\n')
const mdx = `${fm}\n\n${head.body.trim()}\n`
const target = path.join(ROOT, 'pages', 'blog', `${head.slug}.mdx`)
log(`발행 후보: [${head.category}] ${head.slug} — ${head.title} (img ${head.images.length})`)
if (has('--dry-run')) { log('--dry-run: 파일 미생성'); console.log(mdx.slice(0, 600) + '\n...'); process.exit(0) }
if (fs.existsSync(target)) { log(`이미 존재: ${target}`); process.exit(1) }

fs.writeFileSync(target, mdx)
const v = spawnSync('node', ['scripts/generate-posts.mjs'], { cwd: ROOT, encoding: 'utf8' })
if (v.status !== 0) { fs.unlinkSync(target); console.error(v.stderr || v.stdout); log('스키마 검증 실패 — 롤백'); process.exit(1) }
head.status = 'published'; head.publishedAt = today
history.push({ slug: head.slug, title: head.title, category: head.category, publishedAt: today, batch: head.batch })
writeJ(path.join(Q, 'queue.json'), queue); writeJ(path.join(Q, 'log.json'), history)
log(`생성: pages/blog/${head.slug}.mdx · 이미지 ${head.images.length}`)

if (has('--no-git')) { log('--no-git: 커밋 생략'); process.exit(0) }
const branch = `content/${head.slug}`
const cur = sh('git rev-parse --abbrev-ref HEAD')
try {
  sh(`git checkout -B ${branch}`)
  sh(`git add pages/blog/${head.slug}.mdx public/images/blog/${head.slug} data/content-queue/queue.json data/content-queue/log.json data/posts.json data/categories.json 2>/dev/null || true`)
  sh(`git add pages/blog/${head.slug}.mdx public/images/blog/${head.slug} data/content-queue/queue.json data/content-queue/log.json`)
  sh(`git commit -q -m "content: ${head.slug} — ${head.title.replace(/"/g, '')} [${head.category}] (pipeline ${head.batch})"`)
  sh(`git push -q -u origin ${branch}`)
  const pr = sh(`gh pr create --base ${BASE} --head ${branch} --title "content: ${head.title.replace(/"/g, '')}" --body "자동 발행 파이프라인(큐 ${head.batch}). Fable 5.1 사실검증 통과(${head.facts} claims, ${head.verifiedAt.slice(0, 10)}). 이미지 ${head.images.length}장.\n\n검수 후 머지 = 발행 (로디몬).\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)"`)
  log(`PR: ${pr}`)
} finally { try { sh(`git checkout -q ${cur}`) } catch {} }
