'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { lectures } from '../../data/lectures'

type Type = 'project' | 'lecture'
const FIELDS: Record<Type, { key: string; label: string; options?: string[] }[]> = {
  project: [
    { key: '업무', label: '바꾸고 싶은 업무' },
    { key: '희망 시기', label: '희망 시기' },
    { key: '예산 범위', label: '예산 범위 (선택)', options: ['미정', '~1,000만', '1,000~3,000만', '3,000만~', '협의'] },
  ],
  lecture: [
    { key: '대상', label: '대상 (직무·직급)' },
    { key: '인원', label: '인원' },
    { key: '시간', label: '시간 (총 교육 시간)' },
    { key: '희망 일정', label: '희망 일정' },
    { key: '온/오프라인', label: '온/오프라인', options: ['오프라인', '온라인', '혼합'] },
    { key: '사내 도구', label: '사내 도구', options: ['MS365', 'Google Workspace', '기타'] },
  ],
}
const inp = 'w-full px-3 py-2.5 text-[15px] bg-paper text-ink border border-ink/30 focus:border-ink outline-none'

export function ContactForm() {
  const router = useRouter()
  const [type, setType] = useState<Type>('project')
  const [meta, setMeta] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ org: '', name: '', contact: '', body: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error' | 'limited'>('idle')

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.type === 'lecture') setType('lecture')
    const l = typeof router.query.lecture === 'string' ? lectures.find((x) => x.slug === router.query.lecture) : undefined
    if (l) setMeta((m) => ({ ...m, 강의: l.title }))
  }, [router.isReady, router.query.type, router.query.lecture])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...form, meta }) })
      setStatus(res.ok ? 'done' : res.status === 429 ? 'limited' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'done') return (
    <div className="border-2 border-ink p-6"><div className="text-xl font-black">접수됐습니다.</div><p className="mt-2 text-ink-2">1~2 영업일 안에 남겨주신 연락처로 답드립니다.</p></div>
  )
  const tab = (on: boolean) => `px-4 py-2 text-sm font-bold ${on ? 'bg-ink text-paper' : 'border border-ink/30'}`
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex gap-2" role="tablist">
        <button type="button" role="tab" aria-selected={type === 'project'} className={tab(type === 'project')} onClick={() => setType('project')}>프로젝트 문의</button>
        <button type="button" role="tab" aria-selected={type === 'lecture'} className={tab(type === 'lecture')} onClick={() => setType('lecture')}>강의 문의</button>
      </div>
      {type === 'lecture' && meta['강의'] && <div className="text-sm"><span className="text-ink-2">문의 강의</span> <b>{meta['강의']}</b></div>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold">{type === 'project' ? '회사' : '기관'}<input className={`${inp} mt-1 font-normal`} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} /></label>
        <label className="block text-sm font-bold">담당자 *<input required className={`${inp} mt-1 font-normal`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="block text-sm font-bold sm:col-span-2">연락처 (이메일 또는 전화) *<input required className={`${inp} mt-1 font-normal`} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
        {FIELDS[type].map((f) => (
          <label key={f.key} className="block text-sm font-bold">{f.label}
            {f.options
              ? <select className={`${inp} mt-1 font-normal`} value={meta[f.key] ?? ''} onChange={(e) => setMeta({ ...meta, [f.key]: e.target.value })}><option value="">선택</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
              : <input className={`${inp} mt-1 font-normal`} value={meta[f.key] ?? ''} onChange={(e) => setMeta({ ...meta, [f.key]: e.target.value })} />}
          </label>
        ))}
      </div>
      <label className="block text-sm font-bold">내용 *<textarea required rows={6} className={`${inp} mt-1 font-normal`} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder={type === 'project' ? '지금 어떻게 하고 있고, 무엇이 느린지 적어주세요.' : '교육 목표와 현재 팀의 AI 사용 수준을 적어주세요.'} /></label>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" aria-hidden="true" />
      {status === 'error' && <p className="text-sm text-red-600">전송에 실패했습니다. 다시 시도해주세요.</p>}
      {status === 'limited' && <p className="text-sm text-red-600">요청이 많습니다. 잠시 후 다시 시도해주세요.</p>}
      <button type="submit" disabled={status === 'sending'} className="bg-signal text-on-signal px-6 py-3 font-bold disabled:opacity-50">{status === 'sending' ? '보내는 중…' : '보내기'}</button>
    </form>
  )
}
