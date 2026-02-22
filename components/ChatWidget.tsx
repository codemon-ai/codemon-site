import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface ChatWidgetProps {
  page?: string
}

export function ChatWidget({ page = 'showcase' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'sent'>('form')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === 'dark'

  useEffect(() => {
    if (isOpen && step === 'form' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, step])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), contact: contact.trim(), message: message.trim(), page }),
      })

      if (res.ok) {
        setStep('sent')
      } else {
        const data = await res.json()
        setError(data.error || '전송 실패')
      }
    } catch {
      setError('네트워크 오류. 잠시 후 다시 시도해주세요.')
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setStep('form')
    setMessage('')
    setError('')
  }

  // Theme-aware colors
  const colors = {
    panelBg: dark ? '#1a1a1a' : '#ffffff',
    panelBorder: dark ? '#333' : '#e5e7eb',
    panelShadow: dark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.12)',
    headerBg: dark ? '#000' : '#111827',
    label: dark ? '#d1d5db' : '#374151',
    inputBg: dark ? '#2a2a2a' : '#fff',
    inputBorder: dark ? '#444' : '#d1d5db',
    inputText: dark ? '#f3f4f6' : '#111827',
    placeholder: dark ? '#6b7280' : '#9ca3af',
    btnBg: dark ? '#fff' : '#111827',
    btnText: dark ? '#000' : '#fff',
    btnDisabled: dark ? '#555' : '#9ca3af',
    bodyText: dark ? '#9ca3af' : '#6b7280',
    sentTitle: dark ? '#f3f4f6' : '#111827',
    resetBorder: dark ? '#444' : '#e5e7eb',
    resetBg: dark ? '#2a2a2a' : '#fff',
    resetText: dark ? '#d1d5db' : '#374151',
    floatBg: dark ? '#fff' : '#111827',
    floatColor: dark ? '#000' : '#fff',
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="문의하기"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: colors.floatBg,
          color: colors.floatColor,
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            width: '360px',
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: '480px',
            borderRadius: '16px',
            background: colors.panelBg,
            border: `1px solid ${colors.panelBorder}`,
            boxShadow: colors.panelShadow,
            zIndex: 9998,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: colors.headerBg,
              color: '#fff',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '15px' }}>codemon.ai</div>
            <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
              AI 기반 외주 개발 문의
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            {step === 'form' ? (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ ...labelBase, color: colors.label }}>이름 *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    required
                    style={{ ...inputBase, background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, color: colors.inputText }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ ...labelBase, color: colors.label }}>연락처 (선택)</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="이메일 또는 전화번호"
                    style={{ ...inputBase, background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, color: colors.inputText }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ ...labelBase, color: colors.label }}>문의 내용 *</label>
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 사이트를 만들고 싶으신가요?"
                    required
                    rows={4}
                    style={{ ...inputBase, background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, color: colors.inputText, resize: 'vertical', minHeight: '80px' }}
                  />
                </div>
                {error && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={sending || !name.trim() || !message.trim()}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: sending ? colors.btnDisabled : colors.btnBg,
                    color: sending ? '#fff' : colors.btnText,
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {sending ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: colors.sentTitle }}>
                  문의가 전송되었습니다!
                </div>
                <div style={{ color: colors.bodyText, fontSize: '14px', lineHeight: 1.5 }}>
                  빠른 시간 내에 답변드리겠습니다.
                  <br />
                  감사합니다 🙏
                </div>
                <button
                  onClick={handleReset}
                  style={{
                    marginTop: '20px',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.resetBorder}`,
                    background: colors.resetBg,
                    color: colors.resetText,
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  추가 문의하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  marginBottom: '4px',
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}
