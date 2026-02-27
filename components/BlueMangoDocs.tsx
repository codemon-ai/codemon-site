'use client'

import { ReactNode } from 'react'

/* ──────────────────────────────────────────────
 * BlueMango Docs — Dark Theme Component Set
 * 프라이빗 페이지 전용 다크 테마 컴포넌트
 *
 * Design tokens:
 *   bg:      bg-[#0a0f1a], bg-slate-900/30
 *   accent:  sky-400, emerald-400, amber-400, violet-400
 *   border:  white/10, sky-500/30
 *   hover:   hover:bg-white/[0.02]
 * ────────────────────────────────────────────── */

/* ── DocSection ────────────────────────────── */
export function DocSection({
  title,
  children,
  accent = 'sky',
}: {
  title?: string
  children: ReactNode
  accent?: 'sky' | 'emerald' | 'amber' | 'violet'
}) {
  const colors = {
    sky: 'border-sky-500/30 text-sky-400',
    emerald: 'border-emerald-500/30 text-emerald-400',
    amber: 'border-amber-500/30 text-amber-400',
    violet: 'border-violet-500/30 text-violet-400',
  }
  return (
    <section className="my-8 rounded-xl bg-[#0a0f1a] border border-white/10 p-6 md:p-8">
      {title && (
        <h2
          className={`mb-5 pb-3 border-b text-lg font-semibold ${colors[accent]}`}
        >
          {title}
        </h2>
      )}
      <div className="text-white/80 text-sm leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  )
}

/* ── ComparisonTable ──────────────────────── */
export function ComparisonTable({
  headers = ['AS-IS (현재)', 'TO-BE (변경 후)'],
  rows,
}: {
  headers?: [string, string]
  rows: { label: string; before: string; after: string }[]
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900/60">
            <th className="px-4 py-3 text-left text-white/50 font-medium">항목</th>
            <th className="px-4 py-3 text-left text-red-400/80 font-medium">
              {headers[0]}
            </th>
            <th className="px-4 py-3 text-left text-emerald-400/80 font-medium">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-4 py-3 text-white/70 font-medium">{row.label}</td>
              <td className="px-4 py-3 text-white/50">{row.before}</td>
              <td className="px-4 py-3 text-white/80">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── StatusFlow ────────────────────────────── */
export function StatusFlow({
  steps,
}: {
  steps: { label: string; color?: 'sky' | 'emerald' | 'amber' | 'violet' | 'red' }[]
}) {
  const bg: Record<string, string> = {
    sky: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    red: 'bg-red-500/20 text-red-300 border-red-500/40',
  }
  return (
    <div className="my-6 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span
            className={`inline-block px-3 py-1.5 rounded-lg border text-xs font-medium ${bg[step.color ?? 'sky']}`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <span className="text-white/25 text-xs">→</span>
          )}
        </span>
      ))}
    </div>
  )
}

/* ── FeatureGrid ──────────────────────────── */
type FeatureStatus = 'done' | 'wip' | 'todo'

export function FeatureGrid({
  items,
}: {
  items: { name: string; description?: string; status: FeatureStatus; isNew?: boolean }[]
}) {
  const badge: Record<FeatureStatus, { label: string; cls: string }> = {
    done: { label: '완료', cls: 'bg-emerald-500/20 text-emerald-300' },
    wip: { label: '진행중', cls: 'bg-amber-500/20 text-amber-300' },
    todo: { label: '미착수', cls: 'bg-slate-500/20 text-slate-400' },
  }
  return (
    <div className="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item, i) => {
        const b = badge[item.status]
        return (
          <div
            key={i}
            className="rounded-lg border border-white/[0.06] bg-slate-900/30 p-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                {item.name}
                {item.isNew && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                    신규 요청
                  </span>
                )}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${b.cls}`}>
                {b.label}
              </span>
            </div>
            {item.description && (
              <p className="text-white/45 text-xs leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── MenuTree ─────────────────────────────── */
export function MenuTree({
  items,
}: {
  items: {
    group: string
    menus: string[]
    isNew?: boolean
  }[]
}) {
  return (
    <div className="my-6 rounded-lg border border-white/10 bg-[#0a0f1a] p-5 font-mono text-sm">
      {items.map((item, i) => (
        <div key={i} className="mb-3 last:mb-0">
          <div className="flex items-center gap-2">
            <span className="text-sky-400">{i === items.length - 1 ? '└──' : '├──'}</span>
            <span className="text-white/90 font-semibold">{item.group}</span>
            {item.isNew && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                NEW
              </span>
            )}
          </div>
          {item.menus.map((menu, j) => (
            <div key={j} className="ml-8 flex items-center gap-2 mt-1">
              <span className="text-white/20">
                {j === item.menus.length - 1 ? '└─' : '├─'}
              </span>
              <span className="text-white/60">{menu}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── TimelineChart ────────────────────────── */
export function TimelineChart({
  items,
}: {
  items: { phase: string; duration: string; status: 'done' | 'active' | 'pending' }[]
}) {
  const dot: Record<string, string> = {
    done: 'bg-emerald-400',
    active: 'bg-sky-400 animate-pulse',
    pending: 'bg-white/20',
  }
  const text: Record<string, string> = {
    done: 'text-emerald-400',
    active: 'text-sky-400',
    pending: 'text-white/40',
  }
  return (
    <div className="my-6 space-y-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4 group">
          {/* dot + line */}
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full mt-1 ${dot[item.status]}`} />
            {i < items.length - 1 && (
              <div className="w-px h-8 bg-white/10" />
            )}
          </div>
          {/* content */}
          <div className="pb-4">
            <span className={`text-sm font-medium ${text[item.status]}`}>
              {item.phase}
            </span>
            <span className="ml-3 text-xs text-white/30">{item.duration}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── DecisionTable ────────────────────────── */
export function DecisionTable({
  items,
}: {
  items: {
    id: string
    question: string
    recommendation?: string
  }[]
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900/60">
            <th className="px-4 py-3 text-left text-white/50 font-medium w-16">#</th>
            <th className="px-4 py-3 text-left text-white/50 font-medium">결정 사항</th>
            <th className="px-4 py-3 text-left text-violet-400/80 font-medium w-48">
              개발팀 추천
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={i}
              className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-4 py-3 text-amber-400/80 font-mono text-xs">
                {item.id}
              </td>
              <td className="px-4 py-3 text-white/70">{item.question}</td>
              <td className="px-4 py-3 text-violet-300/80 text-xs">
                {item.recommendation ?? '미정'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── DomainMap (6개 도메인 시각화) ────────── */
export function DomainMap({
  domains,
}: {
  domains: {
    name: string
    sub: string
    accent?: 'sky' | 'emerald' | 'amber' | 'violet'
  }[]
}) {
  const bg: Record<string, string> = {
    sky: 'border-sky-500/30 bg-sky-500/[0.08]',
    emerald: 'border-emerald-500/30 bg-emerald-500/[0.08]',
    amber: 'border-amber-500/30 bg-amber-500/[0.08]',
    violet: 'border-violet-500/30 bg-violet-500/[0.08]',
  }
  const txt: Record<string, string> = {
    sky: 'text-sky-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    violet: 'text-violet-300',
  }
  // split into rows of 3
  const top = domains.slice(0, 3)
  const bottom = domains.slice(3)
  const renderRow = (row: typeof domains) => (
    <div className="flex flex-wrap gap-3 justify-center">
      {row.map((d, i) => {
        const a = d.accent ?? 'sky'
        const isLast = i === row.length - 1
        return (
          <span key={i} className="flex items-center gap-3">
            <div
              className={`rounded-xl border px-6 py-4 text-center min-w-[140px] ${bg[a]}`}
            >
              <div className={`text-sm font-semibold ${txt[a]}`}>{d.name}</div>
              <div className="text-[11px] text-white/40 mt-1">{d.sub}</div>
            </div>
            {!isLast && <span className="text-white/20 text-lg">→</span>}
          </span>
        )
      })}
    </div>
  )
  return (
    <div className="my-6 rounded-xl border border-white/10 bg-[#0a0f1a] p-6">
      <div className="text-center text-white/50 text-xs tracking-widest uppercase mb-5">
        BlueMango v2 Platform
      </div>
      <div className="space-y-4">
        {renderRow(top)}
        {bottom.length > 0 && renderRow(bottom)}
      </div>
    </div>
  )
}

/* ── InfoCard (간단한 강조 박스) ─────────── */
export function InfoCard({
  label,
  value,
  accent = 'sky',
}: {
  label: string
  value: string
  accent?: 'sky' | 'emerald' | 'amber' | 'violet'
}) {
  const cls: Record<string, string> = {
    sky: 'border-sky-500/30 text-sky-400',
    emerald: 'border-emerald-500/30 text-emerald-400',
    amber: 'border-amber-500/30 text-amber-400',
    violet: 'border-violet-500/30 text-violet-400',
  }
  return (
    <div className={`inline-flex flex-col rounded-lg border bg-slate-900/30 px-5 py-3 ${cls[accent]}`}>
      <span className="text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  )
}
