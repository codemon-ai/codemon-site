'use client'
import { useState } from 'react'

/** 복사 버튼 있는 프롬프트/명령 블록 (제공자료 .pbox 이식) */
export function CopyBox({ title, children }: { title?: string; children: string }) {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(children); setOk(true); setTimeout(() => setOk(false), 1500) } catch {} }
  return (
    <div className="not-prose my-4 border border-ink/20">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-ink/10 text-xs font-bold text-ink-2">
        <span>{title ?? '프롬프트'}</span>
        <button type="button" onClick={copy} className="px-2 py-0.5 border border-ink/30 hover:border-ink text-ink">{ok ? '복사됨' : '복사'}</button>
      </div>
      <pre className="m-0 p-3 text-[13px] leading-relaxed whitespace-pre-wrap bg-ink/[0.03] text-ink">{children}</pre>
    </div>
  )
}
