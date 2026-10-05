import Link from 'next/link'
import { Section } from './Section'
import { cases, getPublicCases } from '../../data/cases'

const FEATURED = ['dearu', 'airpremia', 'bluemango']

export function Cases() {
  const items = FEATURED.map((s) => cases.find((c) => c.slug === s)).filter(Boolean) as typeof cases
  const total = getPublicCases().length
  return (
    <Section title="대표 사례" lede={`AX 구축·외주·자체 서비스 ${total}건 중 셋.`}>
      <div>
        {items.map((c, i) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className={`grid gap-2 md:grid-cols-2 md:gap-8 py-5 ${i < items.length - 1 ? 'border-b border-ink/20' : ''} group`}>
            <div className="text-lg font-bold leading-snug group-hover:underline underline-offset-4">{c.results?.[0] ?? c.summary}</div>
            <div className="text-sm text-ink-2 leading-relaxed">
              <span className="font-bold text-ink">{c.client} · {c.industry}</span><br />{c.summary}
            </div>
          </Link>
        ))}
        <Link href="/cases" className="mt-5 inline-block text-sm font-bold underline underline-offset-4">사례 전체 보기</Link>
      </div>
    </Section>
  )
}
