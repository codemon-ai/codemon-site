import type { ReactNode } from 'react'

/** 막힐 때 카드 (제공자료 .callout.warn / .trouble 이식) */
export function TroubleCard({ title = '막힐 때', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="not-prose my-4 border-l-4 border-signal bg-ink/[0.03] px-4 py-3">
      <div className="text-xs font-bold text-ink-2">{title}</div>
      <div className="mt-1 text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  )
}
