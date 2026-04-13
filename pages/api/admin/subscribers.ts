import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../lib/admin/auth'
import { listSubscribers, deleteSubscriber } from '../../../lib/admin/subscribers'

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { search, source, page, limit } = req.query
      const result = await listSubscribers({
        search: search as string,
        source: source as string,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      })
      return res.json(result)
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'id is required' })
      }
      await deleteSubscriber(id)
      return res.json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
