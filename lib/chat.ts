import { put, list, head } from '@vercel/blob'

export interface ChatMessage {
  id: string
  role: 'user' | 'admin'
  text: string
  timestamp: number
}

export interface ChatSession {
  id: string
  name: string
  email: string
  page: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

function sessionPath(sessionId: string) {
  return `chat/sessions/${sessionId}.json`
}

export async function createSession(data: {
  id: string
  name: string
  email: string
  page: string
  message: string
}): Promise<ChatSession> {
  const now = Date.now()
  const session: ChatSession = {
    id: data.id,
    name: data.name,
    email: data.email,
    page: data.page,
    messages: [
      {
        id: `msg_${now}`,
        role: 'user',
        text: data.message,
        timestamp: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  }

  await put(sessionPath(data.id), JSON.stringify(session), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })

  return session
}

export async function getSession(sessionId: string): Promise<ChatSession | null> {
  try {
    const { blobs } = await list({ prefix: `chat/sessions/${sessionId}` })
    if (blobs.length === 0) return null

    const res = await fetch(blobs[0].url)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function addMessage(
  sessionId: string,
  role: 'user' | 'admin',
  text: string
): Promise<ChatSession | null> {
  const session = await getSession(sessionId)
  if (!session) return null

  const now = Date.now()
  session.messages.push({
    id: `msg_${now}`,
    role,
    text,
    timestamp: now,
  })
  session.updatedAt = now

  await put(sessionPath(sessionId), JSON.stringify(session), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })

  return session
}
