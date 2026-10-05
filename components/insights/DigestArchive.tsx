import Link from 'next/link'
import digests from '../../data/digest/index.json'

interface Digest { week: string; title: string; items: string[]; url?: string }
const list = digests as Digest[]

export function DigestArchive() {
  return (
    <section id="archive" className="mt-12 border-t-2 border-ink pt-4">
      <h2 className="text-xs font-bold text-ink-2">지난 호</h2>
      {list.length === 0 ? (
        <p className="mt-3 text-[15px] text-ink-2">첫 호를 준비하고 있습니다. 지금 구독하면 첫 호부터 받습니다.</p>
      ) : (
        <ul className="mt-2 divide-y divide-ink/10">
          {list.map((d) => (
            <li key={d.week} className="py-3 flex gap-4"><span className="text-sm text-ink/60 tabular-nums whitespace-nowrap">{d.week}</span>
              <Link href={d.url ?? `/insights/digest/${d.week}`} className="font-bold underline underline-offset-4">{d.title}</Link></li>
          ))}
        </ul>
      )}
    </section>
  )
}
