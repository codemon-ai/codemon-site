import type { NextApiRequest, NextApiResponse } from 'next'
import { createSession, addMessage } from '../../../lib/chat'
import crypto from 'crypto'

const BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const NOTIFY_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, contact, phone, message, page, sessionId } = req.body

  // Existing session — add message
  if (sessionId && message) {
    const session = await addMessage(sessionId, 'user', message)
    if (!session) return res.status(404).json({ error: 'Session not found' })

    // Notify telegram
    if (BOT_TOKEN && NOTIFY_ID) {
      const text = `💬 *추가 메시지* \\[#${sessionId.slice(0, 8)}\\]\n\n${escapeMarkdown(message)}`
      await sendTelegram(text)
    }

    return res.status(200).json({ ok: true, session })
  }

  // New session
  if (!name?.trim() || !contact?.trim() || !message?.trim()) {
    return res.status(400).json({ error: '필수 항목을 입력해주세요' })
  }

  const id = crypto.randomBytes(8).toString('hex')

  const session = await createSession({
    id,
    name: name.trim(),
    email: contact.trim(),
    page: page || 'unknown',
    message: message.trim(),
  })

  // Notify telegram with session ID for reply matching
  if (BOT_TOKEN && NOTIFY_ID) {
    const text = [
      `📩 *새 문의* \\[#${id.slice(0, 8)}\\]`,
      ``,
      `*이름:* ${escapeMarkdown(name.trim())}`,
      `*이메일:* ${escapeMarkdown(contact.trim())}`,
      phone ? `*전화:* ${escapeMarkdown(phone.trim())}` : '',
      `*페이지:* ${escapeMarkdown(page || 'unknown')}`,
      ``,
      `*내용:*`,
      escapeMarkdown(message.trim()),
      ``,
      `💡 답장하려면: \`/reply ${id.slice(0, 8)} 메시지\``,
    ].join('\n')

    await sendTelegram(text)
  }

  return res.status(200).json({ ok: true, sessionId: id, session })
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1')
}

async function sendTelegram(text: string) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: NOTIFY_ID,
        text,
        parse_mode: 'MarkdownV2',
      }),
    })
    if (!res.ok) {
      // Fallback to plain text
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: NOTIFY_ID, text: text.replace(/\\([_*\[\]()~`>#+\-=|{}.!\\])/g, '$1') }),
      })
    }
  } catch (e) {
    console.error('Telegram send failed:', e)
  }
}
