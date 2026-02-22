import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/chat'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { sessionId, after } = req.query
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId required' })
  }

  const session = await getSession(sessionId)
  if (!session) return res.status(404).json({ error: 'Session not found' })

  const afterTs = after ? parseInt(after as string, 10) : 0
  const messages = afterTs
    ? session.messages.filter((m) => m.timestamp > afterTs)
    : session.messages

  return res.status(200).json({ messages, session: { name: session.name, email: session.email } })
}
