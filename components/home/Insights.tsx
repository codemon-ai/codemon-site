import Link from 'next/link'
import { Section } from './Section'
import postsData from '../../data/posts.json'
import digests from '../../data/digest/index.json'
import { CATEGORIES, type Category } from '../../lib/content/schema'

interface Digest { week: string; title: string; items: string[]; url: string }
const posts = (postsData as { posts: { slug: string; title: string; date: string; category: Category }[] }).posts
const latestDigest = (digests as Digest[])[0]

export function Insights() {
  const latest = posts.slice(0, 3)
  return (
    <Section title="최근 인사이트" lede="에이전트·모델·인프라 회고.">
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div>
          {latest.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={`block py-4 group ${i < latest.length - 1 ? 'border-b border-ink/20' : ''}`}>
              <div className="text-xs font-bold text-ink-2">{CATEGORIES[p.category]}</div>
              <h4 className="mt-1 text-lg font-bold leading-snug group-hover:underline underline-offset-4">{p.title}</h4>
              <div className="mt-1 text-xs text-ink/60 tabular-nums">{p.date}</div>
            </Link>
          ))}
          <Link href="/blog" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">인사이트 전체 보기</Link>
        </div>
        <div className="border-2 border-ink p-5">
          <div className="text-xs font-bold text-ink-2">주간 다이제스트{latestDigest ? ` · ${latestDigest.week}` : ''}</div>
          {latestDigest ? (
            <>
              <h4 className="mt-2 text-lg font-black tracking-tight">{latestDigest.title}</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
                {latestDigest.items.slice(0, 3).map((it) => <li key={it} className="pl-3 border-l-2 border-signal">{it}</li>)}
              </ul>
              <Link href={latestDigest.url} className="mt-4 inline-block text-sm font-bold underline underline-offset-4">이번 호 읽기</Link>
            </>
          ) : (
            <>
              <h4 className="mt-2 text-lg font-black tracking-tight">첫 호 준비 중</h4>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">에이전트·모델·인프라에서 실제 업무에 쓸 만한 것만 추려 주 1회 보냅니다. 구독하면 첫 호부터 받습니다.</p>
              <Link href="/newsletter" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">뉴스레터 보기</Link>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}
