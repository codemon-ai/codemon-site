import { createAdminClient } from '../supabase'
import type { Subscriber } from './types'

interface ListOptions {
  search?: string
  source?: string
  page?: number
  limit?: number
}

export async function listSubscribers(opts: ListOptions = {}) {
  const { search, source, page = 1, limit = 50 } = opts
  const supabase = createAdminClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('subscribers')
    .select('*', { count: 'exact' })
    .is('unsubscribed_at', null)
    .order('subscribed_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike('email', `%${search}%`)
  }
  if (source) {
    query = query.eq('source', source)
  }

  const { data, count, error } = await query
  if (error) throw error
  return { subscribers: (data ?? []) as Subscriber[], total: count ?? 0 }
}

export async function countSubscribers(): Promise<number> {
  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .is('unsubscribed_at', null)

  if (error) throw error
  return count ?? 0
}

export async function deleteSubscriber(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function exportSubscribersCSV(): Promise<string> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('subscribers')
    .select('email, source, subscribed_at')
    .is('unsubscribed_at', null)
    .order('subscribed_at', { ascending: false })

  if (error) throw error

  const rows = (data ?? []) as Pick<Subscriber, 'email' | 'source' | 'subscribed_at'>[]
  const header = 'email,source,subscribed_at'
  const csv = rows.map((r) => `${r.email},${r.source},${r.subscribed_at}`).join('\n')
  return `${header}\n${csv}`
}
