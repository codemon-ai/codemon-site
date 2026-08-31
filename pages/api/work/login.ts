import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyPassword, createSessionToken, setSessionCookie } from '../../../lib/work/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { password } = req.body
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' })
  }
  try {
    if (!verifyPassword(password)) return res.status(401).json({ error: 'Invalid password' })
  } catch {
    return res.status(401).json({ error: 'Invalid password' })
  }
  setSessionCookie(res, createSessionToken())
  return res.status(200).json({ ok: true })
}
