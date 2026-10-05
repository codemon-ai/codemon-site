import type { ReactNode } from 'react'

/** 홈 섹션 공통: 2px 룰 + 좌 타이틀/우 콘텐츠 그리드 (Swiss Signal) */
export function Section({ title, lede, children, id }: { title: string; lede?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 md:px-6">
      <hr className="border-0 border-t-2 border-ink" />
      <div className="grid gap-6 md:gap-10 md:grid-cols-[1fr_3fr] pt-8 pb-14 md:pt-9 md:pb-16">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          {lede && <p className="mt-2 text-sm text-ink-2 leading-relaxed">{lede}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
