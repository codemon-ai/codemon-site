import { put, list } from '@vercel/blob'

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

export async function addSubscriber(
  email: string,
  source: string = 'partner-page'
): Promise<{ ok: true; alreadySubscribed?: boolean }> {
  const data = await getSubscribers()

  if (data.subscribers.some((s) => s.email === email)) {
    return { ok: true, alreadySubscribed: true }
  }

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

  return { ok: true }
}
