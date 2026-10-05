'use client'
import { useState } from 'react'

/** 확인 체크리스트 — 상태는 브라우저에만 (제공자료 .checklist 이식) */
export function Checklist({ items, title = '확인' }: { items: string[]; title?: string }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false))
  return (
    <div className="not-prose my-4 border-2 border-ink p-4">
      <div className="text-xs font-bold text-ink-2">{title} · {done.filter(Boolean).length}/{items.length}</div>
      <ul className="mt-2 space-y-1.5">
        {items.map((it, i) => (
          <li key={i}>
            <label className="flex gap-2 items-start cursor-pointer text-[15px]">
              <input type="checkbox" className="mt-1 accent-ink" checked={done[i]} onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} />
              <span className={done[i] ? 'line-through text-ink/50' : ''}>{it}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
