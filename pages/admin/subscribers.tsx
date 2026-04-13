import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import SubscriberTable from '../../components/admin/SubscriberTable'
import ExportButton from '../../components/admin/ExportButton'
import type { Subscriber } from '../../lib/admin/types'
import { Search } from 'lucide-react'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 50

  const fetchSubscribers = useCallback(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    params.set('page', String(page))
    params.set('limit', String(limit))

    fetch(`/api/admin/subscribers?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data.subscribers ?? [])
        setTotal(data.total ?? 0)
      })
      .catch(() => {})
  }, [search, page])

  useEffect(() => { fetchSubscribers() }, [fetchSubscribers])

  async function handleDelete(id: string) {
    if (!confirm('이 구독자를 해제하시겠습니까?')) return
    await fetch(`/api/admin/subscribers?id=${id}`, { method: 'DELETE' })
    fetchSubscribers()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <AdminLayout title="구독자 관리">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="이메일 검색..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500">{total}명</span>
          <ExportButton href="/api/admin/subscribers/export" />
        </div>
      </div>

      <SubscriberTable subscribers={subscribers} onDelete={handleDelete} />

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-30"
          >
            이전
          </button>
          <span className="text-sm text-zinc-500">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-30"
          >
            다음
          </button>
        </div>
      )}
    </AdminLayout>
  )
}
