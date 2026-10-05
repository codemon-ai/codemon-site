/** 주간 다이제스트 (스펙 §5.2). 확정본은 data/digest/YYYY-WW.json, 요약 인덱스는 data/digest/index.json */
export interface DigestItem {
  id: number
  url: string
  title: string
  source: string
  summaryKo: string
  keywords: string[]
  category: 'fde' | 'aipm' | 'aimkt' | 'general'
  label: 'primary' | 'news' | 'analysis' | 'vendor'
  comment?: string            // 코드몬 한 줄
}
export interface Digest {
  week: string                // "2026-W39"
  title: string
  publishedAt: string
  intro: string
  items: DigestItem[]
}
export interface DigestIndexEntry { week: string; title: string; items: string[]; url: string; publishedAt: string }

/** research-saas export 행 → DigestItem */
export interface ExportRow {
  id: number; url: string; title: string | null; author: string | null; published_at: string | null; lang: string | null
  category: string | null; keywords: string[]; summary_ko: string | null; label: string | null; axis: Record<string, unknown>; source: string | null
}
export function fromExport(r: ExportRow): DigestItem {
  const cat = (['fde', 'aipm', 'aimkt'].includes(r.category ?? '') ? r.category : 'general') as DigestItem['category']
  const label = (['primary', 'news', 'analysis', 'vendor'].includes(r.label ?? '') ? r.label : 'news') as DigestItem['label']
  return { id: r.id, url: r.url, title: r.title ?? r.url, source: r.source ?? new URL(r.url).hostname, summaryKo: r.summary_ko ?? '', keywords: r.keywords ?? [], category: cat, label }
}
/** ISO 주차 "YYYY-Www" */
export function isoWeek(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const y = t.getUTCFullYear()
  const w = Math.ceil(((t.getTime() - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7)
  return `${y}-W${String(w).padStart(2, '0')}`
}
