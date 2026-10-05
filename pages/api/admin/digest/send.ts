import type { NextApiRequest, NextApiResponse } from 'next'
import { errMsg } from '../../../../lib/admin/err'
import { createElement } from 'react'
import { withAuth } from '../../../../lib/admin/auth'
import { publishDigest, getDigest } from '../../../../lib/admin/digest'
import { listSubscribers } from '../../../../lib/admin/subscribers'
import { createCampaign, updateCampaignStatus, addEmailLog } from '../../../../lib/admin/campaigns'
import { sendEmail } from '../../../../lib/email'
import DigestEmail from '../../../../emails/Digest'

/** 확정(publish) + 선택적으로 발송. body: { week, send?: boolean, testTo?: string } */
export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { week, send, testTo } = req.body ?? {}
  if (typeof week !== 'string' || !/^\d{4}-W\d{2}$/.test(week)) return res.status(400).json({ error: 'week required' })
  try {
    const digest = testTo ? (await getDigest(week))?.data : await publishDigest(week)
    if (!digest) return res.status(404).json({ error: 'draft not found' })
    const subject = `[codemon 다이제스트 ${digest.week}] ${digest.title}`
    const react = createElement(DigestEmail, { digest })
    if (testTo) { const r = await sendEmail({ to: testTo, subject, react }); return res.json({ ok: 'id' in r, test: true, ...r }) }
    if (!send) return res.json({ ok: true, published: true })
    const { subscribers } = await listSubscribers({ limit: 10000 })
    const campaign = await createCampaign({ type: 'newsletter', subject, body_html: `digest:${week}`, total_recipients: subscribers.length })
    let sent = 0, failed = 0
    for (const sub of subscribers) {
      const r = await sendEmail({ to: sub.email, subject, react })
      if ('id' in r) { sent++; await addEmailLog({ campaign_id: campaign.id, email: sub.email, status: 'sent', resend_id: r.id, error: null }) }
      else { failed++; await addEmailLog({ campaign_id: campaign.id, email: sub.email, status: 'failed', resend_id: null, error: r.error }) }
    }
    await updateCampaignStatus(campaign.id, failed === subscribers.length ? 'failed' : 'sent', { sent_count: sent, failed_count: failed })
    return res.json({ ok: true, published: true, sent, failed })
  } catch (err) { return res.status(500).json({ error: errMsg(err) }) }
})
