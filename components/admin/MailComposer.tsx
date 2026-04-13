import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

const TYPES = [
  { value: 'lecture_update', label: '강의 업데이트' },
  { value: 'newsletter', label: '뉴스레터' },
  { value: 'manual', label: '수동 발송' },
]

interface SendResult {
  ok: boolean
  sent?: number
  failed?: number
  error?: string
}

export default function MailComposer({ onSent }: { onSent: () => void }) {
  const [type, setType] = useState('manual')
  const [subject, setSubject] = useState('')
  const [bodyHtml, setBodyHtml] = useState('')
  const [lectureName, setLectureName] = useState('')
  const [summary, setSummary] = useState('')
  const [slideUrl, setSlideUrl] = useState('')
  const [surveyUrl, setSurveyUrl] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<SendResult | null>(null)

  async function handleSend() {
    if (!confirm('메일을 발송하시겠습니까? 모든 구독자에게 전송됩니다.')) return
    setSending(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/mailing/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, subject, bodyHtml, lectureName, summary, slideUrl, surveyUrl }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult({ ok: true, sent: data.sent, failed: data.failed })
        setSubject('')
        setBodyHtml('')
        setLectureName('')
        setSummary('')
        onSent()
      } else {
        setResult({ ok: false, error: data.error })
      }
    } catch (err) {
      setResult({ ok: false, error: String(err) })
    } finally {
      setSending(false)
    }
  }

  const isLectureUpdate = type === 'lecture_update'

  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex gap-2">
        {TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              type === t.value
                ? 'bg-purple-500/10 text-purple-400'
                : 'border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLectureUpdate && (
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
            placeholder="강의 이름"
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
          />
          <input
            value={slideUrl}
            onChange={(e) => setSlideUrl(e.target.value)}
            placeholder="슬라이드 URL (선택)"
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
          />
          <input
            value={surveyUrl}
            onChange={(e) => setSurveyUrl(e.target.value)}
            placeholder="설문 URL (선택)"
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="강의 요약"
            rows={2}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500 sm:col-span-2"
          />
        </div>
      )}

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="메일 제목"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
      />

      {!isLectureUpdate && (
        <textarea
          value={bodyHtml}
          onChange={(e) => setBodyHtml(e.target.value)}
          placeholder="메일 본문 (HTML)"
          rows={8}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
        />
      )}

      {result && (
        <div className={`rounded-lg px-4 py-2 text-sm ${result.ok ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {result.ok
            ? `발송 완료 — 성공: ${result.sent}, 실패: ${result.failed}`
            : `발송 실패: ${result.error}`}
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={sending || !subject}
        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:opacity-50"
      >
        {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {sending ? '발송 중...' : '메일 발송'}
      </button>
    </div>
  )
}
