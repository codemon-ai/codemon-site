import { sendSlackNotification } from '../slack'
import type { InquiryInput } from './store'

const LABEL = { project: '프로젝트', lecture: '강의' } as const

/** Slack 알림 — 기존 SLACK_WEBHOOK_URL 재사용. 웹훅이 가리키는 채널로 감 */
export async function notifyInquiry(i: InquiryInput, id: string): Promise<void> {
  const meta = Object.entries(i.meta ?? {}).filter(([, v]) => v).map(([k, v]) => `• ${k}: ${v}`).join('\n')
  const text = [
    `📩 *${LABEL[i.type]} 문의* ${i.org ? `· ${i.org}` : ''}`,
    `• 담당자: ${i.name} (${i.contact})`,
    meta,
    `> ${i.body.slice(0, 600).replace(/\n/g, '\n> ')}`,
    `_id ${id} · /admin/inquiries_`,
  ].filter(Boolean).join('\n')
  await sendSlackNotification(text)
}
