import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../lib/admin/auth'
import { listSurveys } from '../../../lib/admin/surveys'

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { lectureId, rating, page, limit } = req.query
    const result = await listSurveys({
      lectureId: lectureId as string,
      rating: rating ? Number(rating) : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    })
    return res.json(result)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
