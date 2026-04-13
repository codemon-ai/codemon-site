import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../../lib/admin/auth'
import { listCampaigns } from '../../../../lib/admin/campaigns'

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { page, limit } = req.query
    const result = await listCampaigns(
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined
    )
    return res.json(result)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
