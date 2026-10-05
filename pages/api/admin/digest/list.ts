import type { NextApiRequest, NextApiResponse } from 'next'
import { errMsg } from '../../../../lib/admin/err'
import { withAuth } from '../../../../lib/admin/auth'
import { listInboxWeeks, readInbox, getDigest, listDigestStatus } from '../../../../lib/admin/digest'
import { isoWeek } from '../../../../lib/content/digest'

export default withAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const week = typeof req.query.week === 'string' ? req.query.week : null
    const status = await listDigestStatus().catch(() => ({} as Record<string, string>))   // 테이블 미생성 시 빈 상태
    if (!week) return res.json({ weeks: listInboxWeeks(), status, current: isoWeek() })
    const inbox = readInbox(week)
    const saved = await getDigest(week).catch(() => null)
    return res.json({ week, inbox, saved })
  } catch (err) { return res.status(500).json({ error: errMsg(err) }) }
})
