import { Text } from '@react-email/components'
import EmailWrapper from './components/EmailWrapper'
import type { Digest } from '../lib/content/digest'

/** 주간 다이제스트 메일 — /admin/digest 확정본(Digest) 그대로 렌더 */
export default function DigestEmail({ digest }: { digest: Digest }) {
  return (
    <EmailWrapper preview={digest.title}>
      <Text style={label}>codemon 다이제스트 · {digest.week}</Text>
      <Text style={heading}>{digest.title}</Text>
      {digest.intro && <Text style={body}>{digest.intro}</Text>}
      {digest.items.map((it) => (
        <div key={it.id} style={item}>
          <Text style={itemTitle}><a href={it.url} style={link}>{it.title}</a> <span style={src}>· {it.source}</span></Text>
          {it.summaryKo && <Text style={body}>{it.summaryKo}</Text>}
          {it.comment && <Text style={comment}>— {it.comment}</Text>}
        </div>
      ))}
      <Text style={foot}>웹에서 보기: https://codemon.ai/insights/digest/{digest.week}</Text>
    </EmailWrapper>
  )
}
const label = { color: '#C8D0DC', fontSize: '12px', fontWeight: '700' as const, margin: '0 0 8px' }
const heading = { color: '#fafafa', fontSize: '22px', fontWeight: '700' as const, margin: '0 0 16px' }
const body = { color: '#d4d4d8', fontSize: '15px', lineHeight: '1.6', margin: '0 0 8px' }
const item = { borderTop: '1px solid #27272a', paddingTop: '12px', marginTop: '12px' }
const itemTitle = { color: '#fafafa', fontSize: '16px', fontWeight: '700' as const, margin: '0 0 4px' }
const src = { color: '#71717a', fontSize: '12px', fontWeight: '400' as const }
const link = { color: '#FFC300', textDecoration: 'underline' }
const comment = { color: '#FFC300', fontSize: '14px', margin: '0 0 8px' }
const foot = { color: '#71717a', fontSize: '12px', margin: '20px 0 0' }
