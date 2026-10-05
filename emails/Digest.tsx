import { Text } from '@react-email/components'
import EmailWrapper from './components/EmailWrapper'

export interface DigestItem { title: string; summary: string; url?: string }
interface DigestProps { week: string; subject: string; intro?: string; items: DigestItem[] }

/** 주간 다이제스트 템플릿 — P5에서 data/digest/*.json → 이 템플릿으로 발송 */
export default function Digest({ week, subject, intro, items }: DigestProps) {
  return (
    <EmailWrapper preview={subject}>
      <Text style={label}>codemon 다이제스트 · {week}</Text>
      <Text style={heading}>{subject}</Text>
      {intro && <Text style={body}>{intro}</Text>}
      {items.map((it, i) => (
        <div key={i} style={item}>
          <Text style={itemTitle}>{it.url ? <a href={it.url} style={link}>{it.title}</a> : it.title}</Text>
          <Text style={body}>{it.summary}</Text>
        </div>
      ))}
    </EmailWrapper>
  )
}

const label = { color: '#C8D0DC', fontSize: '12px', fontWeight: '700' as const, margin: '0 0 8px' }
const heading = { color: '#fafafa', fontSize: '22px', fontWeight: '700' as const, margin: '0 0 16px' }
const body = { color: '#d4d4d8', fontSize: '15px', lineHeight: '1.6', margin: '0 0 8px' }
const item = { borderTop: '1px solid #27272a', paddingTop: '12px', marginTop: '12px' }
const itemTitle = { color: '#fafafa', fontSize: '16px', fontWeight: '700' as const, margin: '0 0 4px' }
const link = { color: '#FFC300', textDecoration: 'underline' }
