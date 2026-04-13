import type { NextApiRequest, NextApiResponse } from 'next'
import { createElement } from 'react'
import { withAuth } from '../../../../lib/admin/auth'
import { sendEmail } from '../../../../lib/email'
import { listSubscribers } from '../../../../lib/admin/subscribers'
import {
  createCampaign,
  updateCampaignStatus,
  addEmailLog,
} from '../../../../lib/admin/campaigns'
import LectureUpdate from '../../../../emails/LectureUpdate'
import Newsletter from '../../../../emails/Newsletter'
import Manual from '../../../../emails/Manual'

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, subject, bodyHtml, lectureName, summary, slideUrl, surveyUrl } = req.body

  if (!type || !subject) {
    return res.status(400).json({ error: 'type and subject are required' })
  }

  try {
    // Get all active subscribers
    const { subscribers } = await listSubscribers({ limit: 10000 })
    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'No subscribers to send to' })
    }

    // Create campaign record
    const campaign = await createCampaign({
      type,
      subject,
      body_html: bodyHtml ?? '',
      total_recipients: subscribers.length,
    })

    // Build email template based on campaign type
    const react =
      type === 'lecture_update'
        ? createElement(LectureUpdate, { lectureName, summary, slideUrl, surveyUrl })
        : type === 'newsletter'
          ? createElement(Newsletter, { subject, bodyHtml })
          : createElement(Manual, { subject, bodyHtml })

    // Send emails in sequence (respect rate limits)
    let sent = 0
    let failed = 0

    for (const sub of subscribers) {
      const result = await sendEmail({ to: sub.email, subject, react })

      if ('id' in result) {
        sent++
        await addEmailLog({
          campaign_id: campaign.id,
          email: sub.email,
          status: 'sent',
          resend_id: result.id,
          error: null,
        })
      } else {
        failed++
        await addEmailLog({
          campaign_id: campaign.id,
          email: sub.email,
          status: 'failed',
          resend_id: null,
          error: result.error,
        })
      }
    }

    await updateCampaignStatus(campaign.id, 'sent', {
      sent_count: sent,
      failed_count: failed,
    })

    return res.json({ ok: true, campaignId: campaign.id, sent, failed })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
