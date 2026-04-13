import { put, list } from '@vercel/blob'
import { createAdminClient } from './supabase'

export interface NewsletterSubscriber {
  email: string
  subscribedAt: number
  source: string
}

export interface NewsletterData {
  subscribers: NewsletterSubscriber[]
  updatedAt: number
}

const BLOB_PATH = 'newsletter/subscribers.json'

export async function getSubscribers(): Promise<NewsletterData> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATH })
    if (blobs.length === 0) return { subscribers: [], updatedAt: 0 }

    const url = new URL(blobs[0].url)
    url.searchParams.set('t', String(Date.now()))
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return { subscribers: [], updatedAt: 0 }
    return await res.json()
  } catch {
    return { subscribers: [], updatedAt: 0 }
  }
}

async function addSubscriberToSupabase(email: string, source: string): Promise<boolean> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        { email, source, subscribed_at: new Date().toISOString() },
        { onConflict: 'email', ignoreDuplicates: true }
      )
    return !error
  } catch {
    return false
  }
}

export async function addSubscriber(
  email: string,
  source: string = 'subscribe-page'
): Promise<{ ok: true; alreadySubscribed?: boolean }> {
  const data = await getSubscribers()

  const alreadyInBlob = data.subscribers.some((s) => s.email === email)

  // Dual write: Supabase first (primary)
  const supabaseOk = await addSubscriberToSupabase(email, source)

  if (alreadyInBlob) {
    return { ok: true, alreadySubscribed: true }
  }

  // Blob write (legacy, may fail locally without BLOB_READ_WRITE_TOKEN)
  try {
    data.subscribers.push({
      email,
      subscribedAt: Date.now(),
      source,
    })
    data.updatedAt = Date.now()

    await put(BLOB_PATH, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
  } catch {
    // Blob unavailable (local dev) — Supabase is the primary store
    if (!supabaseOk) throw new Error('Both Supabase and Blob writes failed')
  }

  return { ok: true }
}
