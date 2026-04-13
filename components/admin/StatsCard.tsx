import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: number | string
  icon: LucideIcon
}

export default function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
        <Icon size={18} className="text-zinc-600" />
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
