const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export async function sendSlackNotification(text: string): Promise<void> {
  if (!WEBHOOK_URL) return
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {}
}
