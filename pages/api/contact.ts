import type { NextApiRequest, NextApiResponse } from 'next'
import { isRateLimited } from '../../lib/contact/ratelimit'
import { saveInquiry, type InquiryInput } from '../../lib/contact/store'
import { notifyInquiry } from '../../lib/contact/notify'

const META_KEYS: Record<InquiryInput['type'], string[]> = {
  project: ['업무', '희망 시기', '예산 범위'],
  lecture: ['강의', '대상', '인원', '시간', '희망 일정', '온/오프라인', '사내 도구'],
}
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const b = req.body ?? {}

  // honeypot: 봇이 채우면 200으로 응답하되 저장하지 않는다
  if (str(b.website, 200)) return res.status(200).json({ ok: true })

  const ip = (String(req.headers['x-forwarded-for'] ?? '').split(',')[0] || req.socket.remoteAddress || 'unknown').trim()
  if (isRateLimited(ip)) return res.status(429).json({ error: '잠시 후 다시 시도해주세요.' })

  const type = b.type === 'lecture' ? 'lecture' : b.type === 'project' ? 'project' : null
  const name = str(b.name, 80), contact = str(b.contact, 160), body = str(b.body, 4000), org = str(b.org, 120)
  if (!type || !name || !contact || !body) return res.status(400).json({ error: '필수 항목을 입력해주세요.' })

  const meta: Record<string, string> = {}
  for (const k of META_KEYS[type]) { const v = str(b.meta?.[k], 200); if (v) meta[k] = v }
  const input: InquiryInput = { type, org: org || undefined, name, contact, body, meta }

  try {
    const id = await saveInquiry(input)
    await notifyInquiry(input, id)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/contact]', err)
    return res.status(500).json({ error: '처리 중 오류가 발생했습니다.' })
  }
}
