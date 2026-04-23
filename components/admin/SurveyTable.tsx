import { useState } from 'react'
import type { SurveyResponse } from '../../lib/admin/types'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'

interface SurveyTableProps {
  surveys: SurveyResponse[]
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-700'}
        />
      ))}
    </span>
  )
}

export default function SurveyTable({ surveys }: SurveyTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (surveys.length === 0) {
    return <p className="py-8 text-center text-sm text-zinc-500">설문 응답이 없습니다.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium w-8"></th>
            <th className="px-4 py-3 font-medium">회사</th>
            <th className="px-4 py-3 font-medium">이름</th>
            <th className="px-4 py-3 font-medium">직책</th>
            <th className="px-4 py-3 font-medium">평점</th>
            <th className="px-4 py-3 font-medium">강의</th>
            <th className="px-4 py-3 font-medium">날짜</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {surveys.map((s) => (
            <>
              <tr
                key={s.id}
                className="cursor-pointer text-zinc-300 hover:bg-zinc-800/50"
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              >
                <td className="px-4 py-3 text-zinc-600">
                  {expanded === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </td>
                <td className="px-4 py-3">{s.company_name}</td>
                <td className="px-4 py-3">{s.contact_name}</td>
                <td className="px-4 py-3 text-zinc-500">{s.title}</td>
                <td className="px-4 py-3"><Stars rating={s.rating} /></td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    {s.lecture_id}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {new Date(s.submitted_at).toLocaleDateString('ko-KR')}
                </td>
              </tr>
              {expanded === s.id && (
                <tr key={`${s.id}-detail`} className="bg-zinc-900/50">
                  <td colSpan={7} className="px-8 py-4">
                    <div className="grid gap-3 text-sm md:grid-cols-2">
                      <div>
                        <p className="text-xs text-zinc-500">이메일</p>
                        <p className="text-zinc-300">{s.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">전화</p>
                        <p className="text-zinc-300">{s.phone}</p>
                      </div>
                      {s.gains && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">얻은 점</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.gains}</p>
                        </div>
                      )}
                      {s.learnings && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">배운 것</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.learnings}</p>
                        </div>
                      )}
                      {s.follow_along && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">진행도</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.follow_along}</p>
                        </div>
                      )}
                      {s.would_help && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">있으면 좋을 것</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.would_help}</p>
                        </div>
                      )}
                      {s.improvements && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">개선 요청</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.improvements}</p>
                        </div>
                      )}
                      {s.questions && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-zinc-500">궁금한 점</p>
                          <p className="whitespace-pre-wrap text-zinc-300">{s.questions}</p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
