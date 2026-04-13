import type { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../../../lib/admin/auth'
import { exportSurveysCSV } from '../../../../lib/admin/surveys'

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lectureId } = req.query
    const csv = await exportSurveysCSV(lectureId as string)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename=surveys-${new Date().toISOString().slice(0, 10)}.csv`)
    return res.send(csv)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
})
