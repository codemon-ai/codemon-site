import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import SurveyTable from '../../components/admin/SurveyTable'
import ExportButton from '../../components/admin/ExportButton'
import type { SurveyResponse } from '../../lib/admin/types'

const LECTURES = [
  { id: '', label: '전체' },
  { id: 'lecture-agency-ai', label: 'AI 업무 자동화' },
  { id: 'lecture-startup-ai', label: '스타트업 AI' },
  { id: 'lecture-podl-ai', label: '포들 AI' },
  { id: 'airpremia-lv1', label: 'Airpremia Lv1' },
]

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<SurveyResponse[]>([])
  const [total, setTotal] = useState(0)
  const [lectureId, setLectureId] = useState('')
  const [rating, setRating] = useState<number | undefined>()
  const [page, setPage] = useState(1)
  const limit = 50

  const fetchSurveys = useCallback(() => {
    const params = new URLSearchParams()
    if (lectureId) params.set('lectureId', lectureId)
    if (rating) params.set('rating', String(rating))
    params.set('page', String(page))
    params.set('limit', String(limit))

    fetch(`/api/admin/surveys?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setSurveys(data.surveys ?? [])
        setTotal(data.total ?? 0)
      })
      .catch(() => {})
  }, [lectureId, rating, page])

  useEffect(() => { fetchSurveys() }, [fetchSurveys])

  const totalPages = Math.ceil(total / limit)
  const exportHref = `/api/admin/surveys/export${lectureId ? `?lectureId=${lectureId}` : ''}`

  return (
    <AdminLayout title="설문 관리">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {LECTURES.map((l) => (
            <button
              key={l.id}
              onClick={() => { setLectureId(l.id); setPage(1) }}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                lectureId === l.id
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={rating ?? ''}
            onChange={(e) => { setRating(e.target.value ? Number(e.target.value) : undefined); setPage(1) }}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 outline-none"
          >
            <option value="">평점 전체</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r}점</option>
            ))}
          </select>
          <span className="text-sm text-zinc-500">{total}건</span>
          <ExportButton href={exportHref} />
        </div>
      </div>

      <SurveyTable surveys={surveys} />

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-30"
          >
            이전
          </button>
          <span className="text-sm text-zinc-500">{page} / {totalPages}</span>
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
