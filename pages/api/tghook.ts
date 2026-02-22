import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}
import { addMessage } from '../../lib/chat'
import { list } from '@vercel/blob'

const BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const NOTIFY_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID

// Quick reply templates
const TEMPLATES: Record<string, string> = {
  greet: '안녕하세요! 문의해 주셔서 감사합니다. 😊\n확인 후 빠르게 답변드리겠습니다.',
  quote: '안녕하세요! 문의 내용 확인했습니다.\n좀 더 자세한 요구사항을 알려주시면 정확한 견적을 안내해 드릴 수 있습니다.\n\n1) 원하시는 사이트 유형\n2) 주요 기능\n3) 희망 일정\n\n편하게 말씀해 주세요!',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, debug: `method=${req.method}` })
  }

  // Manual body parsing (bodyParser disabled to avoid Vercel WAF issues)
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  const rawBody = Buffer.concat(chunks).toString('utf-8')
  let update: any
  try {
    update = JSON.parse(rawBody)
  } catch {
    return res.status(200).json({ ok: true })
  }

  // Handle callback query (inline button press)
  if (update?.callback_query) {
    const cb = update.callback_query
    const data = cb.data as string // e.g., "greet_344f48f4" or "custom_344f48f4"
    const [action, prefix] = data.split('_')

    if (action === 'custom') {
      // Answer callback and ask for input
      await answerCallback(cb.id, '💬 답변을 입력해주세요')
      await sendTelegram(`✍️ 직접 답변 모드 [#${prefix}]\n\n아래처럼 입력하세요:\n/r ${prefix} 답변내용`)
      return res.status(200).json({ ok: true })
    }

    // Template reply
    const template = TEMPLATES[action]
    if (template && prefix) {
      const sessionId = await findSessionByPrefix(prefix)
      if (sessionId) {
        const session = await addMessage(sessionId, 'admin', template)
        await answerCallback(cb.id, '✅ 답변 전송됨!')
        if (session) {
          await sendTelegram(`✅ #${prefix} ${session.name}님에게 답변 전송됨`)
        }
      } else {
        await answerCallback(cb.id, '❌ 세션을 찾을 수 없습니다')
      }
    }
    return res.status(200).json({ ok: true })
  }

  // Handle text message (/r prefix message)
  const msg = update?.message
  if (!msg?.text) return res.status(200).json({ ok: true })

  const text = msg.text.trim()
  const replyMatch = text.match(/^\/r(?:eply)?\s+([a-f0-9]+)\s+(.+)/i)
  if (!replyMatch) return res.status(200).json({ ok: true })

  const prefix = replyMatch[1].toLowerCase()
  const replyText = replyMatch[2].trim()

  const sessionId = await findSessionByPrefix(prefix)
  if (!sessionId) {
    await sendTelegram(`❌ 세션 #${prefix}를 찾을 수 없습니다.`)
    return res.status(200).json({ ok: true })
  }

  const session = await addMessage(sessionId, 'admin', replyText)
  if (session) {
    await sendTelegram(`✅ #${prefix} ${session.name}님에게 답변 전송됨`)
  } else {
    await sendTelegram(`❌ 메시지 저장 실패`)
  }

  return res.status(200).json({ ok: true })
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
