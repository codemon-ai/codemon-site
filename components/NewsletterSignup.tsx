'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

type Variant = 'inline' | 'footer' | 'gate' | 'band'

interface Props {
  variant?: Variant
  /** Supabase subscribers.source 에 저장 — 어느 폼에서 들어왔는지 */
  source?: string
  title?: string
  description?: string
}

export function NewsletterSignup({
  variant = 'inline',
  source = 'subscribe-page',
  title = '뉴스레터 구독',
  description = '새로운 강의와 AI 활용 소식을 받아보세요.',
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'already' | 'error'>('idle')
  const compact = variant === 'footer' || variant === 'band'
  const band = variant === 'band'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); return }
      setStatus(data.alreadySubscribed ? 'already' : 'success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div data-newsletter={variant}>
      {!compact && (
        <>
          <div className="flex items-center gap-2 mb-3">
            <Mail size={18} className="text-foreground" />
            <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
          </div>
          <p className="text-sm text-black/50 dark:text-white/45 mb-4">{description}</p>
        </>
      )}

      {status === 'success' || status === 'already' ? (
        <p className={`text-sm font-medium ${band ? 'text-white' : 'text-foreground'}`}>
          {status === 'success' ? '구독 감사합니다!' : '이미 구독 중입니다.'}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
            aria-label="이메일"
            className={band
              ? 'flex-1 min-w-0 px-4 py-3 text-sm bg-white text-[#001D3D] placeholder:text-[#001D3D]/40 border-2 border-white outline-none'
              : 'flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.06] text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-ink transition-colors'}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className={band
              ? 'px-5 py-3 bg-signal text-on-signal text-sm font-bold hover:opacity-80 transition-opacity disabled:opacity-50 whitespace-nowrap'
              : 'px-5 py-2.5 rounded-lg bg-signal text-on-signal text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 whitespace-nowrap'}
          >
            {status === 'sending' ? '...' : '구독'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-2">오류가 발생했습니다. 다시 시도해주세요.</p>
      )}
    </div>
  )
}
