import { useState, useRef, useEffect } from 'react'

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
          background: '#111827',
          color: '#fff',
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
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
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
              background: '#111827',
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
                  <label style={labelStyle}>이름 *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>연락처 (선택)</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="이메일 또는 전화번호"
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>문의 내용 *</label>
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 사이트를 만들고 싶으신가요?"
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
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
                    background: sending ? '#9ca3af' : '#111827',
                    color: '#fff',
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
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
                  문의가 전송되었습니다!
                </div>
                <div style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.5 }}>
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
                    border: '1px solid #e5e7eb',
                    background: '#fff',
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '4px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}
