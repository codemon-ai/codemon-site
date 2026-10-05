import type { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber } from '../../../lib/newsletter'

const SOURCE_RE = /^[a-z0-9_-]{1,40}$/i

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, source } = req.body

  if (!email || !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(String(email).trim())) {
    return res.status(400).json({ error: '올바른 이메일을 입력해주세요' })
  }
  const src = typeof source === 'string' && SOURCE_RE.test(source) ? source : 'subscribe-page'

  try {
    const result = await addSubscriber(String(email).trim().toLowerCase(), src)
    return res.status(200).json(result)
  } catch (err) {
    console.error('[newsletter/subscribe]', err)
    return res.status(500).json({ error: '처리 중 오류가 발생했습니다' })
  }
}
