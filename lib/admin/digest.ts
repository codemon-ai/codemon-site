import fs from 'fs'
import path from 'path'
import { createAdminClient } from '../supabase'
import { fromExport, type Digest, type DigestItem, type ExportRow } from '../content/digest'

const INBOX = path.join(process.cwd(), 'data', 'digest', 'inbox')

/** inbox 파일 목록 (research-saas export). Vercel 런타임 포함은 next.config outputFileTracingIncludes */
export function listInboxWeeks(): string[] {
  if (!fs.existsSync(INBOX)) return []
  return fs.readdirSync(INBOX).filter((f) => /^\d{4}-W\d{2}\.json$/.test(f)).map((f) => f.replace('.json', '')).sort().reverse()
}
export function readInbox(week: string): DigestItem[] {
  const p = path.join(INBOX, `${week}.json`)
  if (!/^\d{4}-W\d{2}$/.test(week) || !fs.existsSync(p)) return []
  const rows = JSON.parse(fs.readFileSync(p, 'utf8')) as ExportRow[]
  return rows.map(fromExport)
}

export async function getDigest(week: string): Promise<{ status: 'draft' | 'published'; data: Digest } | null> {
  const { data, error } = await createAdminClient().from('digests').select('status,data').eq('week', week).maybeSingle()
  if (error) throw error
  return data ? { status: data.status, data: data.data as Digest } : null
}
export async function saveDigest(d: Digest): Promise<void> {
  const { error } = await createAdminClient().from('digests').upsert({ week: d.week, data: d, updated_at: new Date().toISOString() }, { onConflict: 'week' })
  if (error) throw error
}
export async function publishDigest(week: string): Promise<Digest> {
  const cur = await getDigest(week)
  if (!cur) throw new Error('draft not found')
  const data: Digest = { ...cur.data, publishedAt: new Date().toISOString().slice(0, 10) }
  const { error } = await createAdminClient().from('digests').update({ status: 'published', data, published_at: new Date().toISOString() }).eq('week', week)
  if (error) throw error
  return data
}
export async function listDigestStatus(): Promise<Record<string, 'draft' | 'published'>> {
  const { data, error } = await createAdminClient().from('digests').select('week,status')
  if (error) throw error
  return Object.fromEntries((data ?? []).map((r) => [r.week, r.status]))
}
