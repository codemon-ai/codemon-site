import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const COOKIE_NAME = 'admin_session'

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('ADMIN_PASSWORD env var is not set')
  return secret
}

export function verifyPassword(input: string): boolean {
  const password = getSecret()
  return crypto.timingSafeEqual(
    Buffer.from(input),
    Buffer.from(password)
  )
}

export function createSessionToken(): string {
  const payload = String(Date.now())
  const hmac = crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex')
  return `${payload}.${hmac}`
}

export function verifySessionToken(token: string): boolean {
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return false
    const expected = crypto
      .createHmac('sha256', getSecret())
      .update(payload)
      .digest('hex')
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

export function setSessionCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/admin; Max-Age=${7 * 24 * 60 * 60}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  )
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/admin; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  )
}

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export function withAuth(handler: ApiHandler): ApiHandler {
  return async (req, res) => {
    const token = req.cookies[COOKIE_NAME]
    if (!token || !verifySessionToken(token)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    return handler(req, res)
  }
}
