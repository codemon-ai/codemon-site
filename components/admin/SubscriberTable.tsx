import type { Subscriber } from '../../lib/admin/types'
import { Trash2 } from 'lucide-react'

interface SubscriberTableProps {
  subscribers: Subscriber[]
  onDelete: (id: string) => void
}

export default function SubscriberTable({ subscribers, onDelete }: SubscriberTableProps) {
  if (subscribers.length === 0) {
    return <p className="py-8 text-center text-sm text-zinc-500">구독자가 없습니다.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">이메일</th>
            <th className="px-4 py-3 font-medium">소스</th>
            <th className="px-4 py-3 font-medium">구독일</th>
            <th className="px-4 py-3 font-medium w-16"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {subscribers.map((sub) => (
            <tr key={sub.id} className="text-zinc-300 hover:bg-zinc-800/50">
              <td className="px-4 py-3 font-mono text-xs">{sub.email}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                  {sub.source}
                </span>
              </td>
              <td className="px-4 py-3 text-zinc-500">
                {new Date(sub.subscribed_at).toLocaleDateString('ko-KR')}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDelete(sub.id)}
                  className="rounded p-1 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  title="구독 해제"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
