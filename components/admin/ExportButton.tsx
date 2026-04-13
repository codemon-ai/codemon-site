import { Download } from 'lucide-react'

interface ExportButtonProps {
  href: string
  label?: string
}

export default function ExportButton({ href, label = 'CSV 내보내기' }: ExportButtonProps) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
    >
      <Download size={14} />
      {label}
    </a>
  )
}
