import { createAdminClient } from '../supabase'

export interface Inquiry { id: string; type: 'project' | 'lecture'; org: string | null; name: string; contact: string; body: string; meta: Record<string, string>; created_at: string }

export async function listInquiries(opts: { search?: string; type?: string; page?: number; limit?: number } = {}) {
  const { search, type, page = 1, limit = 50 } = opts
  const supabase = createAdminClient()
  let q = supabase.from('inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range((page - 1) * limit, page * limit - 1)
  if (search) q = q.or(`name.ilike.%${search}%,org.ilike.%${search}%,contact.ilike.%${search}%,body.ilike.%${search}%`)
  if (type === 'project' || type === 'lecture') q = q.eq('type', type)
  const { data, count, error } = await q
  if (error) throw error
  return { inquiries: (data ?? []) as Inquiry[], total: count ?? 0 }
}

export async function exportInquiriesCSV(): Promise<string> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
  if (error) throw error
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = (data ?? []).map((r) => [r.created_at, r.type, r.org, r.name, r.contact, r.body, JSON.stringify(r.meta)].map(esc).join(','))
  return ['created_at,type,org,name,contact,body,meta', ...rows].join('\n')
}
