const BOT_TOKEN = process.env.TELEGRAM_CHAT_BOT_TOKEN
const NOTIFY_ID = process.env.TELEGRAM_CHAT_NOTIFY_ID

export async function sendTelegram(text: string): Promise<void> {
  if (!BOT_TOKEN || !NOTIFY_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: NOTIFY_ID, text }),
    })
  } catch {}
}

export async function sendTelegramWithButtons(
  text: string,
  inlineKeyboard: Array<Array<{ text: string; callback_data: string }>>
): Promise<void> {
  if (!BOT_TOKEN || !NOTIFY_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: NOTIFY_ID,
        text,
        reply_markup: { inline_keyboard: inlineKeyboard },
      }),
    })
  } catch {}
}
