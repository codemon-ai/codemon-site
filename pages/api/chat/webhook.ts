import type { NextApiRequest, NextApiResponse } from 'next'
import { addMessage } from '../../../lib/chat'
import { list } from '@vercel/blob'

const BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const ADMIN_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const update = req.body
  const msg = update?.message
  
  // Debug: log what we receive
  const debugInfo: string[] = []
  debugInfo.push(`from_id=${msg?.from?.id}, admin_id=${ADMIN_ID}`)
  debugInfo.push(`text=${msg?.text?.slice(0, 50)}`)
  debugInfo.push(`match=${String(msg?.from?.id) === ADMIN_ID}`)

  if (!msg?.text || String(msg.from?.id) !== ADMIN_ID) {
    // Send debug info to telegram
    await sendTelegram(`🔍 Debug: rejected\n${debugInfo.join('\n')}`)
    return res.status(200).json({ ok: true })
  }

  const text = msg.text.trim()

  // /reply <session_prefix> <message>
  const replyMatch = text.match(/^\/reply\s+([a-f0-9]+)\s+(.+)/i)
  if (!replyMatch) {
    return res.status(200).json({ ok: true })
  }

  const prefix = replyMatch[1].toLowerCase()
  const replyText = replyMatch[2].trim()

  // Find session by prefix
  const sessionId = await findSessionByPrefix(prefix)
  if (!sessionId) {
    await sendTelegram(`❌ 세션 #${prefix}를 찾을 수 없습니다.\nprefix search failed`)
    return res.status(200).json({ ok: true })
  }

  const session = await addMessage(sessionId, 'admin', replyText)
  if (!session) {
    await sendTelegram(`❌ 메시지 저장 실패 (sessionId: ${sessionId})`)
    return res.status(200).json({ ok: true })
  }

  await sendTelegram(`✅ #${prefix} ${session.name}님에게 답변 전송됨`)

  return res.status(200).json({ ok: true })
}

async function findSessionByPrefix(prefix: string): Promise<string | null> {
  try {
    // Direct match first (sessionId IS the prefix — 16 hex chars)
    const { blobs } = await list({ prefix: `chat/sessions/${prefix}` })
    if (blobs.length > 0) {
      const pathname = blobs[0].pathname
      const match = pathname.match(/chat\/sessions\/([^.]+)\.json/)
      return match ? match[1] : null
    }
    return null
  } catch {
    return null
  }
}

async function sendTelegram(text: string) {
  if (!BOT_TOKEN || !ADMIN_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ADMIN_ID, text }),
    })
  } catch {}
}
