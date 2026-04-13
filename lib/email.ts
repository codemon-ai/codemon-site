import { Resend } from 'resend'
import type { ReactElement } from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(opts: {
  to: string | string[]
  subject: string
  react: ReactElement
}): Promise<{ id: string } | { error: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'codemon.ai <noreply@codemon.ai>',
      to: opts.to,
      subject: opts.subject,
      react: opts.react,
    })
    if (error) return { error: error.message }
    return { id: data!.id }
  } catch (err) {
    return { error: String(err) }
  }
}

export async function sendBatch(
  emails: { to: string; subject: string; react: ReactElement }[]
): Promise<{ sent: number; failed: number }> {
  let sent = 0
  let failed = 0

  // Process in batches of 10 to respect Resend rate limits
  for (let i = 0; i < emails.length; i += 10) {
    const batch = emails.slice(i, i + 10)
    const results = await Promise.allSettled(
      batch.map((e) => sendEmail(e))
    )
    for (const r of results) {
      if (r.status === 'fulfilled' && 'id' in r.value) sent++
      else failed++
    }
  }

  return { sent, failed }
}
