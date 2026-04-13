import { Text, Link, Button } from '@react-email/components'
import EmailWrapper from './components/EmailWrapper'

interface LectureUpdateProps {
  lectureName: string
  summary: string
  slideUrl?: string
  surveyUrl?: string
}

export default function LectureUpdate({
  lectureName,
  summary,
  slideUrl,
  surveyUrl,
}: LectureUpdateProps) {
  return (
    <EmailWrapper preview={`[codemon.ai] 강의 업데이트: ${lectureName}`}>
      <Text style={heading}>{lectureName}</Text>
      <Text style={paragraph}>{summary}</Text>
      {slideUrl && (
        <Button href={slideUrl} style={button}>
          슬라이드 보기
        </Button>
      )}
      {surveyUrl && (
        <Link href={surveyUrl} style={link}>
          설문 참여하기 →
        </Link>
      )}
    </EmailWrapper>
  )
}

const heading = {
  color: '#fafafa',
  fontSize: '22px',
  fontWeight: '600' as const,
  margin: '0 0 12px',
}

const paragraph = {
  color: '#a1a1aa',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
}

const button = {
  backgroundColor: '#a855f7',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block' as const,
  fontSize: '14px',
  fontWeight: '600' as const,
  padding: '12px 24px',
  textDecoration: 'none',
}

const link = {
  color: '#a855f7',
  display: 'block' as const,
  fontSize: '14px',
  marginTop: '16px',
  textDecoration: 'none',
}
