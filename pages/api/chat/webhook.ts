import type { NextRequest } from 'next/server'
import { list, put, head } from '@vercel/blob'

export const config = {
  runtime: 'edge',
}

const BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const NOTIFY_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID

const TEMPLATES: Record<string, string> = {
  greet: '안녕하세요! 문의해 주셔서 감사합니다. 😊\n확인 후 빠르게 답변드리겠습니다.',
  quote: '안녕하세요! 문의 내용 확인했습니다.\n좀 더 자세한 요구사항을 알려주시면 정확한 견적을 안내해 드릴 수 있습니다.\n\n1) 원하시는 사이트 유형\n2) 주요 기능\n3) 희망 일정\n\n편하게 말씀해 주세요!',
}

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }

  let update: any
  try {
    update = await req.json()
  } catch {
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }

  // Handle callback query (inline button press)
  if (update?.callback_query) {
    const cb = update.callback_query
    const data = cb.data as string
    const [action, prefix] = data.split('_')

    if (action === 'custom') {
      await answerCallback(cb.id, '💬 답변을 입력해주세요')
      await sendTelegram(`✍️ 직접 답변 모드 [#${prefix}]\n\n아래처럼 입력하세요:\n/r ${prefix} 답변내용`)
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    const template = TEMPLATES[action]
    if (template && prefix) {
      const sessionId = await findSessionByPrefix(prefix)
      if (sessionId) {
        await addMessageToBlob(sessionId, 'admin', template)
        await answerCallback(cb.id, '✅ 답변 전송됨!')
        await sendTelegram(`✅ #${prefix} 답변 전송됨`)
      } else {
        await answerCallback(cb.id, '❌ 세션을 찾을 수 없습니다')
      }
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }

  // Handle text message (/r prefix message)
  const msg = update?.message
  if (!msg?.text) return new Response(JSON.stringify({ ok: true }), { status: 200 })

  const text = msg.text.trim()
  const replyMatch = text.match(/^\/r(?:eply)?\s+([a-f0-9]+)\s+([\s\S]+)/i)
  if (!replyMatch) return new Response(JSON.stringify({ ok: true }), { status: 200 })

  const prefix = replyMatch[1].toLowerCase()
  const replyText = replyMatch[2].trim()

  const sessionId = await findSessionByPrefix(prefix)
  if (!sessionId) {
    await sendTelegram(`❌ 세션 #${prefix}를 찾을 수 없습니다.`)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }

  await addMessageToBlob(sessionId, 'admin', replyText)
  await sendTelegram(`✅ #${prefix} 답변 전송됨`)

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}

async function findSessionByPrefix(prefix: string): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: `chat/sessions/${prefix}` })
    if (blobs.length > 0) {
      const match = blobs[0].pathname.match(/chat\/sessions\/([^.]+)\.json/)
      return match ? match[1] : null
    }
    return null
  } catch {
    return null
  }
}

async function addMessageToBlob(sessionId: string, role: string, text: string) {
  try {
    const path = `chat/sessions/${sessionId}.json`
    const { blobs } = await list({ prefix: path })
    if (blobs.length === 0) return null

    const res = await fetch(blobs[0].url)
    const session = await res.json()

    session.messages.push({
      role,
      text,
      timestamp: Date.now(),
    })
    session.updatedAt = Date.now()

    await put(path, JSON.stringify(session), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    return session
  } catch {
    return null
  }
}

async function answerCallback(callbackId: string, text: string) {
  if (!BOT_TOKEN) return
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: callbackId, text }),
    })
  } catch {}
}

async function sendTelegram(text: string) {
  if (!BOT_TOKEN || !NOTIFY_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: NOTIFY_ID, text }),
    })
  } catch {}
}
