import Link from 'next/link'
import { Section } from './Section'
import { lectures } from '../../data/lectures'

const FEATURED = ['claude-masterclass', 'claude-build', 'startup-ai']

export function Lectures() {
  const items = FEATURED.map((s) => lectures.find((l) => l.slug === s)).filter(Boolean) as typeof lectures
  return (
    <Section title="강의" lede="무료 셀프 코스와 기업 출강.">
      <div>
        {items.map((l, i) => (
          <div key={l.slug} className={`flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-6 ${i < items.length - 1 ? 'border-b border-ink/20' : ''}`}>
            <Link href={`/lectures/${l.slug}`} className="flex-1 text-lg font-bold leading-snug hover:underline underline-offset-4">{l.title}</Link>
            <div className="text-sm text-ink-2 whitespace-nowrap">{l.audience} · {l.hours}시간</div>
            <Link href={`/contact?type=lecture&lecture=${l.slug}`} className="text-sm font-bold underline underline-offset-4 whitespace-nowrap">출강 문의</Link>
          </div>
        ))}
        <Link href="/lectures" className="mt-5 inline-block text-sm font-bold underline underline-offset-4">강의 전체 보기</Link>
      </div>
    </Section>
  )
}
