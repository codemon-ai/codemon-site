import type { NextApiRequest, NextApiResponse } from 'next'
import { createSession, addMessage } from '../../../lib/chat'
import { sendTelegramWithButtons } from '../../../lib/telegram'
import crypto from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, contact, phone, message, page, sessionId } = req.body

  // Existing session — add message
  if (sessionId && message) {
    const session = await addMessage(sessionId, 'user', message)
    if (!session) return res.status(404).json({ error: 'Session not found' })

    const text = `💬 추가 메시지 [#${sessionId.slice(0, 8)}]\n${session.name}: ${message}`
    await sendTelegramWithButtons(text, [
      [
        { text: '👋 인사 답변', callback_data: `greet_${sessionId.slice(0, 8)}` },
        { text: '📝 견적 문의', callback_data: `quote_${sessionId.slice(0, 8)}` },
      ],
      [
        { text: '✍️ 직접 답변', callback_data: `custom_${sessionId.slice(0, 8)}` },
      ],
    ])

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

  const lines = [
    `📩 새 문의 [#${id.slice(0, 8)}]`,
    ``,
    `이름: ${name.trim()}`,
    `이메일: ${contact.trim()}`,
    phone ? `전화: ${phone.trim()}` : '',
    `페이지: ${page || 'unknown'}`,
    ``,
    `내용:`,
    message.trim(),
  ].filter(Boolean).join('\n')

  await sendTelegramWithButtons(lines, [
    [
      { text: '👋 인사 답변', callback_data: `greet_${id.slice(0, 8)}` },
      { text: '📝 견적 문의', callback_data: `quote_${id.slice(0, 8)}` },
    ],
    [
      { text: '✍️ 직접 답변', callback_data: `custom_${id.slice(0, 8)}` },
    ],
  ])

  return res.status(200).json({ ok: true, sessionId: id, session })
}
