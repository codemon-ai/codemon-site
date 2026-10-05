import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import ExportButton from '../../components/admin/ExportButton'
import type { Inquiry } from '../../lib/admin/inquiries'
import { Search } from 'lucide-react'

export default function InquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState<string | null>(null)
  const limit = 50

  const load = useCallback(() => {
    const p = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (search) p.set('search', search); if (type) p.set('type', type)
    fetch(`/api/admin/inquiries?${p}`).then((r) => r.json()).then((d) => { setRows(d.inquiries ?? []); setTotal(d.total ?? 0) }).catch(() => {})
  }, [search, type, page])
  useEffect(() => { load() }, [load])

  return (
    <AdminLayout title="문의함">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="이름·기관·연락처·내용 검색" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 outline-none" />
        </div>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1) }} className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 px-3 text-sm text-white">
          <option value="">전체</option><option value="project">프로젝트</option><option value="lecture">강의</option>
        </select>
        <span className="text-sm text-zinc-500">{total}건</span>
        <ExportButton href="/api/admin/inquiries?export=csv" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-left text-zinc-400"><tr><th className="px-3 py-2">일시</th><th className="px-3 py-2">유형</th><th className="px-3 py-2">기관</th><th className="px-3 py-2">담당자</th><th className="px-3 py-2">연락처</th><th className="px-3 py-2">내용</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-zinc-800 align-top hover:bg-zinc-800/50 cursor-pointer" onClick={() => setOpen(open === r.id ? null : r.id)}>
                <td className="px-3 py-2 whitespace-nowrap text-zinc-400">{r.created_at.slice(0, 16).replace('T', ' ')}</td>
                <td className="px-3 py-2">{r.type === 'project' ? '프로젝트' : '강의'}</td>
                <td className="px-3 py-2">{r.org ?? '-'}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.contact}</td>
                <td className="px-3 py-2 max-w-md">
                  <div className={open === r.id ? 'whitespace-pre-wrap' : 'truncate'}>{r.body}</div>
                  {open === r.id && Object.keys(r.meta ?? {}).length > 0 && <div className="mt-2 text-xs text-zinc-400">{Object.entries(r.meta).map(([k, v]) => `${k}: ${v}`).join(' · ')}</div>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-zinc-500">문의가 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>
      {total > limit && <div className="mt-3 flex gap-2 text-sm">{Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((n) => <button key={n} onClick={() => setPage(n)} className={`px-2 py-1 rounded ${n === page ? 'bg-zinc-700' : 'text-zinc-400'}`}>{n}</button>)}</div>}
    </AdminLayout>
  )
}
