import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import type { ReactNode } from 'react'

interface EmailWrapperProps {
  preview: string
  children: ReactNode
}

export default function EmailWrapper({ preview, children }: EmailWrapperProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>
              codemon<span style={{ color: '#a855f7' }}>.ai</span>
            </Text>
          </Section>
          <Hr style={divider} />
          <Section style={content}>{children}</Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              codemon.ai — AI/AX 엔지니어 CodeMon
            </Text>
            <Link href="https://codemon.ai" style={footerLink}>
              codemon.ai
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: '0',
  padding: '0',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px',
}

const header = {
  padding: '0 0 20px',
}

const logoText = {
  color: '#fafafa',
  fontSize: '20px',
  fontWeight: '700' as const,
  margin: '0',
}

const divider = {
  borderColor: '#27272a',
  margin: '0',
}

const content = {
  padding: '24px 0',
}

const footer = {
  padding: '20px 0 0',
}

const footerText = {
  color: '#71717a',
  fontSize: '12px',
  margin: '0 0 4px',
}

const footerLink = {
  color: '#a855f7',
  fontSize: '12px',
  textDecoration: 'none',
}
