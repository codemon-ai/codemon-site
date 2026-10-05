import type { NextApiRequest, NextApiResponse } from 'next'
import { errMsg } from '../../../lib/admin/err'
import { withAuth } from '../../../lib/admin/auth'
import { listInquiries, exportInquiriesCSV } from '../../../lib/admin/inquiries'

export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
    if (req.query.export === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Content-Disposition', `attachment; filename="inquiries-${new Date().toISOString().slice(0, 10)}.csv"`)
      return res.send('﻿' + (await exportInquiriesCSV()))
    }
    const { search, type, page, limit } = req.query
    return res.json(await listInquiries({ search: search as string, type: type as string, page: page ? Number(page) : undefined, limit: limit ? Number(limit) : undefined }))
  } catch (err) { return res.status(500).json({ error: errMsg(err) }) }
})
