import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import MailComposer from '../../components/admin/MailComposer'
import type { EmailCampaign } from '../../lib/admin/types'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

const STATUS_ICON = {
  draft: Clock,
  sending: Clock,
  sent: CheckCircle,
  failed: XCircle,
}

const STATUS_COLOR = {
  draft: 'text-zinc-500',
  sending: 'text-yellow-400',
  sent: 'text-green-400',
  failed: 'text-red-400',
}

const TYPE_LABEL: Record<string, string> = {
  lecture_update: '강의 업데이트',
  newsletter: '뉴스레터',
  manual: '수동',
}

export default function MailingPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])

  const fetchCampaigns = useCallback(() => {
    fetch('/api/admin/mailing/campaigns')
      .then((r) => r.json())
      .then((data) => setCampaigns(data.campaigns ?? []))
      .catch(() => {})
  }, [])

  useEffect(() => { fetchCampaigns() }, [fetchCampaigns])

  return (
    <AdminLayout title="메일링">
      <MailComposer onSent={fetchCampaigns} />

      <h2 className="mt-8 mb-4 text-sm font-semibold text-zinc-400">발송 이력</h2>

      {campaigns.length === 0 ? (
        <p className="text-sm text-zinc-500">발송 이력이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">상태</th>
                <th className="px-4 py-3 font-medium">유형</th>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">발송</th>
                <th className="px-4 py-3 font-medium">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {campaigns.map((c) => {
                const StatusIcon = STATUS_ICON[c.status]
                return (
                  <tr key={c.id} className="text-zinc-300">
                    <td className="px-4 py-3">
                      <StatusIcon size={16} className={STATUS_COLOR[c.status]} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                        {TYPE_LABEL[c.type] ?? c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">{c.subject}</td>
                    <td className="px-4 py-3 text-zinc-500">
                      {c.sent_count}/{c.total_recipients}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {new Date(c.sent_at ?? c.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
