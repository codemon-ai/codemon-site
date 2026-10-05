/**
 * 다이제스트 확정본 동기화 (prebuild)
 *  1) SUPABASE_URL+SERVICE_ROLE 있으면 digests(status=published) → data/digest/<week>.json (없거나 갱신분)
 *  2) data/digest/*.json(주차 파일) → data/digest/index.json 재생성 (홈 박스·/newsletter 아카이브)
 * 실패해도 빌드는 계속(기존 파일 사용).
 */
import fs from 'fs'
import path from 'path'
const DIR = path.resolve('data/digest')
fs.mkdirSync(DIR, { recursive: true })
async function pull() {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return 'no-env'
  try {
    const r = await fetch(`${url}/rest/v1/digests?status=eq.published&select=week,data`, { headers: { apikey: key, Authorization: `Bearer ${key}` } })
    if (!r.ok) return `http ${r.status}`
    const rows = await r.json()
    for (const row of rows) fs.writeFileSync(path.join(DIR, `${row.week}.json`), JSON.stringify(row.data, null, 2))
    return `pulled ${rows.length}`
  } catch (e) { return `error ${e.message}` }
}
const how = await pull()
const weeks = fs.readdirSync(DIR).filter((f) => /^\d{4}-W\d{2}\.json$/.test(f)).sort().reverse()
const index = weeks.map((f) => { const d = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); return { week: d.week, title: d.title, items: d.items.slice(0, 3).map((i) => i.title), url: `/insights/digest/${d.week}`, publishedAt: d.publishedAt } })
fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify(index, null, 2))
console.log(`✅ digest: ${how} · ${weeks.length}호 → data/digest/index.json`)
