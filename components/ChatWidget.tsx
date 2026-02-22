import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface ChatMessage {
  id: string
  role: 'user' | 'admin'
  text: string
  timestamp: number
}

interface ChatWidgetProps {
  page?: string
}

export function ChatWidget({ page = 'unknown' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'chat'>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === 'dark'

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chat_session')
    if (saved) {
      try {
        const { sessionId: sid, name: n, email: e } = JSON.parse(saved)
        setSessionId(sid)
        setName(n)
        setEmail(e)
        setStep('chat')
      } catch {}
    }
  }, [])

  // Poll for new messages
  const pollMessages = useCallback(async () => {
    if (!sessionId) return
    try {
      const lastTs = messages.length > 0 ? messages[messages.length - 1].timestamp : 0
      const res = await fetch(`/api/chat/messages?sessionId=${sessionId}&after=${lastTs}`)
      if (!res.ok) return
      const data = await res.json()
      if (data.messages?.length > 0) {
        setMessages((prev) => {
          const ids = new Set(prev.map((m) => m.id))
          const newMsgs = data.messages.filter((m: ChatMessage) => !ids.has(m.id))
          return newMsgs.length > 0 ? [...prev, ...newMsgs] : prev
        })
      }
    } catch {}
  }, [sessionId, messages])

  useEffect(() => {
    if (step === 'chat' && sessionId && isOpen) {
      pollMessages()
      pollRef.current = setInterval(pollMessages, 3000)
      return () => { if (pollRef.current) clearInterval(pollRef.current) }
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [step, sessionId, isOpen, pollMessages])

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && step === 'form' && inputRef.current) inputRef.current.focus()
  }, [isOpen, step])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), contact: email.trim(), message: message.trim(), page }),
      })

      if (res.ok) {
        const data = await res.json()
        setSessionId(data.sessionId)
        setMessages(data.session.messages)
        setStep('chat')
        localStorage.setItem('chat_session', JSON.stringify({
          sessionId: data.sessionId,
          name: name.trim(),
          email: email.trim(),
        }))
        setMessage('')
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

  const handleSendChat = async () => {
    if (!chatInput.trim() || !sessionId || sending) return
    const text = chatInput.trim()
    setChatInput('')
    setSending(true)

    // Optimistic add
    const optimistic: ChatMessage = { id: `opt_${Date.now()}`, role: 'user', text, timestamp: Date.now() }
    setMessages((prev) => [...prev, optimistic])

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.session.messages)
      }
    } catch {}
    setSending(false)
  }

  const handleNewChat = () => {
    localStorage.removeItem('chat_session')
    setSessionId(null)
    setMessages([])
    setName('')
    setEmail('')
    setMessage('')
    setStep('form')
  }

  const colors = {
    panelBg: dark ? '#1a1a1a' : '#ffffff',
    panelBorder: dark ? '#333' : '#e5e7eb',
    panelShadow: dark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.12)',
    headerBg: dark ? '#000' : '#111827',
    label: dark ? '#d1d5db' : '#374151',
    inputBg: dark ? '#2a2a2a' : '#fff',
    inputBorder: dark ? '#444' : '#d1d5db',
    inputText: dark ? '#f3f4f6' : '#111827',
    btnBg: dark ? '#fff' : '#111827',
    btnText: dark ? '#000' : '#fff',
    btnDisabled: dark ? '#555' : '#9ca3af',
    bodyText: dark ? '#9ca3af' : '#6b7280',
    userBubble: dark ? '#333' : '#111827',
    userText: '#fff',
    adminBubble: dark ? '#2a2a2a' : '#f3f4f6',
    adminText: dark ? '#f3f4f6' : '#111827',
    floatBg: dark ? '#fff' : '#111827',
    floatColor: dark ? '#000' : '#fff',
    chatBg: dark ? '#111' : '#fafafa',
  }

  return (
    <>
      {/* Floating Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="문의하기"
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: colors.floatBg, color: colors.floatColor,
            border: 'none', cursor: 'pointer', fontSize: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isOpen ? '✕' : '💬'}
        </button>
        {!isOpen && (
          <span style={{ fontSize: '11px', fontWeight: 600, color: dark ? '#d1d5db' : '#374151' }}>문의하기</span>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '112px', right: '24px',
          width: '380px', maxWidth: 'calc(100vw - 48px)', height: '520px', maxHeight: 'calc(100vh - 140px)',
          borderRadius: '16px', background: colors.panelBg,
          border: `1px solid ${colors.panelBorder}`, boxShadow: colors.panelShadow,
          zIndex: 9998, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 20px', background: colors.headerBg, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>codemon.ai</div>
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>AI 기반 외주 개발 문의</div>
            </div>
            {step === 'chat' && (
              <button onClick={handleNewChat} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px' }}>
                새 문의
              </button>
            )}
          </div>

          {/* Body */}
          {step === 'form' ? (
            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.label, marginBottom: '4px' }}>이름 *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.inputBorder}`, background: colors.inputBg, color: colors.inputText, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.label, marginBottom: '4px' }}>이메일 *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="답변 받으실 이메일" required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.inputBorder}`, background: colors.inputBg, color: colors.inputText, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.label, marginBottom: '4px' }}>문의 내용 *</label>
                  <textarea ref={inputRef} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="어떤 사이트를 만들고 싶으신가요?" required rows={4}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.inputBorder}`, background: colors.inputBg, color: colors.inputText, fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' }} />
                </div>
                {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
                <button type="submit" disabled={sending || !name.trim() || !email.trim() || !message.trim()}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: sending ? colors.btnDisabled : colors.btnBg, color: sending ? '#fff' : colors.btnText, fontWeight: 600, fontSize: '14px', cursor: sending ? 'not-allowed' : 'pointer' }}>
                  {sending ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: colors.chatBg, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '75%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user' ? colors.userBubble : colors.adminBubble,
                      color: msg.role === 'user' ? colors.userText : colors.adminText,
                      fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word',
                    }}>
                      {msg.role === 'admin' && <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '4px', opacity: 0.6 }}>codemon</div>}
                      {msg.text}
                    </div>
                  </div>
                ))}
                {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                  <div style={{ fontSize: '12px', color: colors.bodyText, textAlign: 'center', padding: '4px 0' }}>
                    답변 대기 중...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div style={{ padding: '12px 16px', borderTop: `1px solid ${colors.panelBorder}`, display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat() } }}
                  placeholder="메시지 입력..."
                  rows={1}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: '8px',
                    border: `1px solid ${colors.inputBorder}`, background: colors.inputBg,
                    color: colors.inputText, fontSize: '14px', outline: 'none',
                    resize: 'none', maxHeight: '80px', boxSizing: 'border-box',
                  }}
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim() || sending}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: !chatInput.trim() ? colors.btnDisabled : colors.btnBg,
                    color: !chatInput.trim() ? '#fff' : colors.btnText,
                    fontWeight: 600, fontSize: '14px', cursor: !chatInput.trim() ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  전송
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
