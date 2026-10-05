/**
 * 블로그 frontmatter → data/posts.json + data/categories.json (ADR-007)
 * 빌드 전(prebuild) 실행. 스키마 위반이 1건이라도 있으면 exit 1 → 빌드 실패.
 * 카테고리 상수는 lib/content/schema.ts 와 동기.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CHECK_DIR = process.argv.includes('--check') ? process.argv[process.argv.indexOf('--check') + 1] : null
const BLOG_DIR = path.resolve(CHECK_DIR ?? 'pages/blog')
const OUT_POSTS = path.resolve('data/posts.json')
const OUT_CATS  = path.resolve('data/categories.json')
const CATEGORIES = {
  'agents-build':  '에이전트 직접 만들기',
  'agents-ops':    'AI 코딩 에이전트 운용',
  'models':        '모델 전쟁 — 출시·가격·벤치마크',
  'infra':         '혼자 만드는 인프라·빌드로그',
  'retrospective': '엔지니어링 회고',
}
const EXCLUDE = ['_meta.ts', '_meta.en.ts', 'index.mdx', 'index.ko.mdx', 'index.en.mdx']
const TAG_RE = /^[a-z0-9가-힣][a-z0-9가-힣.\-]*$/

function toDateStr(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  return typeof v === 'string' ? v.trim() : ''
}
function validate(data, slug) {
  const errs = []
  if (!data.title || typeof data.title !== 'string') errs.push('title 누락')
  if (!data.description || typeof data.description !== 'string') errs.push('description 누락 (SEO)')
  const date = toDateStr(data.date)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errs.push(`date 누락/형식 오류 (YYYY-MM-DD): ${JSON.stringify(data.date)}`)
  if (!data.category || !CATEGORIES[data.category]) errs.push(`category 누락/불일치 (${Object.keys(CATEGORIES).join('|')}): ${JSON.stringify(data.category)}`)
  if (!Array.isArray(data.tags)) errs.push('tags 배열 필요')
  else for (const t of data.tags) if (typeof t !== 'string' || !TAG_RE.test(t)) errs.push(`tag 형식 오류(소문자·하이픈): ${JSON.stringify(t)}`)
  if (data.series !== undefined && typeof data.series !== 'string') errs.push('series 는 문자열')
  if (data.lang !== undefined && !['ko', 'en'].includes(data.lang)) errs.push('lang 은 ko|en')
  return errs
}

function run() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') && !EXCLUDE.includes(f) && !f.endsWith('.en.mdx'))
  const failures = []
  const posts = files.map(file => {
    const slug = file.replace('.mdx', '')
    const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'))
    const errs = validate(data, slug)
    if (errs.length) failures.push({ slug, errs })
    const chars = content.replace(/\s+/g, '').length
    return {
      slug,
      title: data.title,
      description: data.description || '',
      date: toDateStr(data.date),
      category: data.category,
      tags: Array.isArray(data.tags) ? [...new Set(data.tags)] : [],
      ...(data.series ? { series: data.series } : {}),
      lang: data.lang || 'ko',
      readingMinutes: Math.max(1, Math.round(chars / 600)),
    }
  })
  if (failures.length) {
    console.error(`\n❌ frontmatter 스키마 위반 ${failures.length}편 — 빌드 중단`)
    for (const f of failures) console.error(`  - ${f.slug}: ${f.errs.join(' / ')}`)
    process.exit(1)
  }
  if (CHECK_DIR) { console.log(`✅ ${posts.length}편 스키마 통과 (${CHECK_DIR}, 출력 없음)`); return }
  posts.sort((a, b) => b.date.localeCompare(a.date))
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()
  const categories = Object.entries(CATEGORIES).map(([id, label]) => ({ id, label, count: posts.filter(p => p.category === id).length }))
  fs.mkdirSync(path.dirname(OUT_POSTS), { recursive: true })
  fs.writeFileSync(OUT_POSTS, JSON.stringify({ posts, allTags, categories, generatedAt: new Date().toISOString() }, null, 2))
  fs.writeFileSync(OUT_CATS, JSON.stringify(categories, null, 2))
  console.log(`✅ ${posts.length}편 검증 통과 · 카테고리 ${categories.map(c => `${c.id}:${c.count}`).join(' ')} → data/posts.json, data/categories.json`)
}
run()
