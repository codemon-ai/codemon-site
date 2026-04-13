import { Text } from '@react-email/components'
import EmailWrapper from './components/EmailWrapper'

interface ManualProps {
  subject: string
  bodyHtml: string
}

export default function Manual({ subject, bodyHtml }: ManualProps) {
  return (
    <EmailWrapper preview={subject}>
      <Text style={heading}>{subject}</Text>
      <div
        style={bodyStyle}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </EmailWrapper>
  )
}

const heading = {
  color: '#fafafa',
  fontSize: '22px',
  fontWeight: '600' as const,
  margin: '0 0 16px',
}

const bodyStyle = {
  color: '#d4d4d8',
  fontSize: '15px',
  lineHeight: '1.6',
}
