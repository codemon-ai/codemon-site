import Link from 'next/link'
import type { Case } from '../../data/cases'

export const statusLabel: Record<Case['status'], string> = { live: '운영 중', building: '개발 중', done: '완료' }
export const kindLabel: Record<Case['kind'], string> = { ax: 'AX 구축', client: '외주 개발', product: '자체 서비스', lab: '실험' }

export function CaseCard({ c }: { c: Case }) {
  const href = c.visibility === 'private' ? `/work/${c.slug}` : `/cases/${c.slug}`
  const client = c.visibility === 'anonymous' ? (c.clientLabel ?? '비공개') : c.client
  return (
    <article className="border border-ink/15 hover:border-ink transition-colors group">
      {c.screenshots[0] && (
        <Link href={href} className="block relative aspect-[16/10] overflow-hidden bg-ink/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.screenshots[0]} alt={c.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </Link>
      )}
      <div className="p-5">
        <div className="text-xs font-bold text-ink-2">{kindLabel[c.kind]} · {statusLabel[c.status]}</div>
        <h3 className="mt-1 text-lg font-bold leading-snug"><Link href={href} className="group-hover:underline underline-offset-4">{c.name}</Link></h3>
        <p className="mt-1 text-xs text-ink/60">{client} · {c.industry} · {c.period}</p>
        <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{c.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{c.stack.map((s) => <span key={s} className="text-[11px] px-2 py-0.5 border border-ink/15 text-ink/70">{s}</span>)}</div>
      </div>
    </article>
  )
}
