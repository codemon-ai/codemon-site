import type { NextApiRequest, NextApiResponse } from 'next'
import { errMsg } from '../../../../lib/admin/err'
import { withAuth } from '../../../../lib/admin/auth'
import { saveDigest } from '../../../../lib/admin/digest'
import type { Digest } from '../../../../lib/content/digest'

export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const d = req.body as Digest
  if (!d?.week || !/^\d{4}-W\d{2}$/.test(d.week) || !Array.isArray(d.items)) return res.status(400).json({ error: 'week/items required' })
  try { await saveDigest({ week: d.week, title: d.title ?? '', publishedAt: d.publishedAt ?? '', intro: d.intro ?? '', items: d.items }); return res.json({ ok: true }) }
  catch (err) { return res.status(500).json({ error: errMsg(err) }) }
})
