import type { NextApiRequest, NextApiResponse } from 'next'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID // codemon's chat id

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, contact, message, page } = req.body

  if (!name || !message) {
    return res.status(400).json({ error: 'name and message required' })
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram env vars missing')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const text = [
    '🆕 *새 외주 문의*',
    '',
    `👤 *${escapeMarkdown(name)}*${contact ? ` (${escapeMarkdown(contact)})` : ''}`,
    `📄 페이지: ${escapeMarkdown(page || 'showcase')}`,
    '',
    `💬 ${escapeMarkdown(message)}`,
    '',
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
  ].join('\n')

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2',
        }),
      }
    )

    if (!tgRes.ok) {
      // Retry without markdown
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `🆕 새 외주 문의\n\n👤 ${name}${contact ? ` (${contact})` : ''}\n📄 ${page || 'showcase'}\n\n💬 ${message}`,
          }),
        }
      )
    }

    return res.status(200).json({ ok: true, message: '문의가 전송되었습니다.' })
  } catch (error) {
    console.error('Telegram send error:', error)
    return res.status(500).json({ error: '전송 실패. 잠시 후 다시 시도해주세요.' })
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}
