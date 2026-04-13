import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import StatsCard from '../../components/admin/StatsCard'
import { Users, ClipboardList, Mail } from 'lucide-react'

interface Stats {
  subscribers: number
  surveys: number
  campaigns: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ subscribers: 0, surveys: 0, campaigns: 0 }))
  }, [])

  return (
    <AdminLayout title="대시보드">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="구독자" value={stats?.subscribers ?? '—'} icon={Users} />
        <StatsCard label="설문 응답" value={stats?.surveys ?? '—'} icon={ClipboardList} />
        <StatsCard label="발송 캠페인" value={stats?.campaigns ?? '—'} icon={Mail} />
      </div>
    </AdminLayout>
  )
}
