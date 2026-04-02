'use client'

interface Column {
  key: string
  label: string
  format?: (value: unknown) => string
}

interface DataPreviewProps {
  data: Record<string, unknown>[]
  columns: Column[]
  maxRows?: number
}

export function DataPreview({ data, columns, maxRows = 10 }: DataPreviewProps) {
  const rows = data.slice(0, maxRows)
  const hasMore = data.length > maxRows

  return (
    <div className="text-xs">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
              {columns.map(col => (
                <th key={col.key} className="text-left py-1.5 px-2 font-medium text-gray-500 dark:text-gray-400">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-black/[0.03] dark:border-white/[0.03]">
                {columns.map(col => (
                  <td key={col.key} className="py-1.5 px-2 text-gray-700 dark:text-gray-300">
                    {col.format ? col.format(row[col.key]) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="text-center py-2 text-gray-400">... 외 {data.length - maxRows}건</div>
      )}
    </div>
  )
}

export function formatNumber(v: unknown): string {
  const n = Number(v)
  if (isNaN(n)) return String(v)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

export function formatWon(v: unknown): string {
  const n = Number(v)
  if (isNaN(n)) return String(v)
  if (n >= 1_000_000) return `₩${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `₩${(n / 1_000).toFixed(0)}K`
  return `₩${n.toLocaleString()}`
}
