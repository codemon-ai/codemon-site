import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../../lib/admin/auth'
import { exportSubscribersCSV } from '../../../../lib/admin/subscribers'

export default withAuth(async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const csv = await exportSubscribersCSV()
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename=subscribers-${new Date().toISOString().slice(0, 10)}.csv`)
    return res.send(csv)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
