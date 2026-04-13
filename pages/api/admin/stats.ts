import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../lib/admin/auth'
import { countSubscribers } from '../../../lib/admin/subscribers'
import { countSurveys } from '../../../lib/admin/surveys'
import { countCampaigns } from '../../../lib/admin/campaigns'

export default withAuth(async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [subscribers, surveys, campaigns] = await Promise.all([
      countSubscribers(),
      countSurveys(),
      countCampaigns(),
    ])
    return res.json({ subscribers, surveys, campaigns })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
