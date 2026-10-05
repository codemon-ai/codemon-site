import { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import type { Digest, DigestItem } from '../../lib/content/digest'

type Row = DigestItem & { on: boolean }
const inp = 'w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white outline-none'

export default function DigestAdminPage() {
  const [weeks, setWeeks] = useState<string[]>([])
  const [status, setStatus] = useState<Record<string, string>>({})
  const [week, setWeek] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [title, setTitle] = useState('')
  const [intro, setIntro] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [testTo, setTestTo] = useState('')

  useEffect(() => { fetch('/api/admin/digest/list').then((r) => r.json()).then((d) => { setWeeks(d.weeks ?? []); setStatus(d.status ?? {}); if (d.weeks?.[0]) setWeek(d.weeks[0]) }).catch(() => {}) }, [])

  const load = useCallback(async (w: string) => {
    if (!w) return
    const d = await fetch(`/api/admin/digest/list?week=${w}`).then((r) => r.json())
    const inbox: DigestItem[] = d.inbox ?? []
    const saved: Digest | undefined = d.saved?.data
    if (saved) {
      const chosen = new Map(saved.items.map((i) => [i.id, i]))
      const rest = inbox.filter((i) => !chosen.has(i.id)).map((i) => ({ ...i, on: false }))
      setRows([...saved.items.map((i) => ({ ...i, on: true })), ...rest]); setTitle(saved.title); setIntro(saved.intro)
    } else { setRows(inbox.map((i) => ({ ...i, on: false }))); setTitle(''); setIntro('') }
    setMsg(saved ? `저장본 로드 (${d.saved.status})` : `inbox ${inbox.length}건`)
  }, [])
  useEffect(() => { load(week) }, [week, load])

  const selected = rows.filter((r) => r.on)
  const move = (i: number, dir: -1 | 1) => setRows((rs) => { const a = [...rs]; const j = i + dir; if (j < 0 || j >= a.length) return rs; [a[i], a[j]] = [a[j], a[i]]; return a })
  const digest = (): Digest => ({ week, title, intro, publishedAt: '', items: selected.map(({ on: _on, ...i }) => i) })

  async function save() {
    setBusy(true); const r = await fetch('/api/admin/digest/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(digest()) }); const d = await r.json()
    setMsg(r.ok ? `저장됨 · ${selected.length}건` : `저장 실패: ${d.error}`); setBusy(false)
  }
  async function publish(send: boolean) {
    if (!confirm(send ? `${week} 확정 + 전체 구독자 발송. 진행할까요?` : `${week} 확정(발행)만 할까요? 다음 빌드부터 공개됩니다.`)) return
    setBusy(true); await save()
    const r = await fetch('/api/admin/digest/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ week, send }) }); const d = await r.json()
    setMsg(r.ok ? `확정됨${send ? ` · 발송 ${d.sent}/${d.sent + d.failed}` : ''} — 공개는 다음 배포(generate-digests) 후` : `실패: ${d.error}`); setBusy(false)
  }
  async function sendTest() {
    if (!testTo) return; setBusy(true); await save()
    const r = await fetch('/api/admin/digest/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ week, testTo }) }); const d = await r.json()
    setMsg(r.ok ? `테스트 발송 → ${testTo}` : `테스트 실패: ${d.error}`); setBusy(false)
  }

  return (
    <AdminLayout title="다이제스트 리터칭">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={week} onChange={(e) => setWeek(e.target.value)} className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 px-3 text-sm text-white">
          {weeks.length === 0 && <option value="">inbox 비어 있음 — scripts/digest-pull.sh</option>}
          {weeks.map((w) => <option key={w} value={w}>{w}{status[w] ? ` (${status[w]})` : ''}</option>)}
        </select>
        <span className="text-sm text-zinc-500">선택 {selected.length} / {rows.length}</span>
        <span className="text-sm text-zinc-400">{msg}</span>
        <div className="ml-auto flex gap-2">
          <button disabled={busy || !week} onClick={save} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white disabled:opacity-50">저장</button>
          <button disabled={busy || !week} onClick={() => publish(false)} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white disabled:opacity-50">확정</button>
          <button disabled={busy || !week} onClick={() => publish(true)} className="rounded-lg bg-[#FFC300] px-3 py-1.5 text-sm font-bold text-[#001D3D] disabled:opacity-50">확정 + 발송</button>
        </div>
      </div>
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_2fr]">
        <input className={inp} placeholder="호 제목 (예: 이번 주, FDE가 챙겨야 할 7가지)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={inp} placeholder="인트로 한두 문장" value={intro} onChange={(e) => setIntro(e.target.value)} />
      </div>
      <div className="mb-4 flex items-center gap-2 text-sm">
        <input className={`${inp} max-w-xs`} placeholder="테스트 수신 이메일" value={testTo} onChange={(e) => setTestTo(e.target.value)} />
        <button disabled={busy || !testTo} onClick={sendTest} className="rounded-lg border border-zinc-700 px-3 py-1 text-white disabled:opacity-50">테스트 발송</button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-left text-zinc-400"><tr><th className="px-2 py-2 w-8"></th><th className="px-2 py-2 w-16">순서</th><th className="px-2 py-2">항목</th><th className="px-2 py-2 w-24">라벨</th><th className="px-2 py-2 w-72">코멘트</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className={`border-t border-zinc-800 align-top ${r.on ? '' : 'opacity-60'}`}>
                <td className="px-2 py-2"><input type="checkbox" checked={r.on} onChange={() => setRows((rs) => rs.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))} /></td>
                <td className="px-2 py-2 whitespace-nowrap"><button onClick={() => move(i, -1)} className="px-1 text-zinc-400 hover:text-white">↑</button><button onClick={() => move(i, 1)} className="px-1 text-zinc-400 hover:text-white">↓</button></td>
                <td className="px-2 py-2"><a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-white hover:underline">{r.title}</a><div className="text-xs text-zinc-500">{r.source} · {r.category} · {r.keywords.join(', ')}</div><div className="mt-1 text-zinc-300">{r.summaryKo}</div></td>
                <td className="px-2 py-2 text-zinc-400">{r.label}</td>
                <td className="px-2 py-2"><input className={inp} value={r.comment ?? ''} placeholder="한 줄" onChange={(e) => setRows((rs) => rs.map((x, j) => (j === i ? { ...x, comment: e.target.value } : x)))} /></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-3 py-8 text-center text-zinc-500">항목 없음</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
