'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import postsData from '../data/posts.json'
import { startHere } from '../data/start-here'
import { CATEGORIES, CATEGORY_IDS, type Category, type Post } from '../lib/content/schema'

const PAGE_SIZE = 12
const { posts } = postsData as unknown as { posts: Post[] }

function Row({ p }: { p: Post }) {
  return (
    <article className="py-5 border-b border-ink/15 group">
      <Link href={`/blog/${p.slug}`} className="block">
        <div className="text-xs font-bold text-ink-2">{CATEGORIES[p.category]}</div>
        <h2 className="mt-1 text-lg font-bold leading-snug group-hover:underline underline-offset-4">{p.title}</h2>
        <p className="mt-1 text-xs text-ink/60 tabular-nums">{p.date} · {p.readingMinutes}분{p.series ? ` · 연재 ${p.series}` : ''}</p>
        <p className="mt-1.5 text-[15px] text-ink-2 leading-relaxed">{p.description}</p>
      </Link>
    </article>
  )
}

export default function BlogIndex({ category }: { category?: Category }) {
  const router = useRouter()
  const path = router.asPath.split(/[?#]/)[0]
  const page = Math.max(1, parseInt(String(router.query.page ?? '1'), 10) || 1)
  const list = category ? posts.filter((p) => p.category === category) : posts
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const slice = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const starters = !category && page === 1 ? startHere.map((s) => posts.find((p) => p.slug === s)).filter(Boolean) as Post[] : []
  const tab = (on: boolean) => `px-3 py-1.5 text-sm font-bold whitespace-nowrap ${on ? 'bg-ink text-paper' : 'border border-ink/30 text-ink hover:border-ink'}`

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">{category ? CATEGORIES[category] : '인사이트'}</h1>
      <p className="mt-2 text-ink-2">에이전트·코딩 에이전트 운용·모델·인프라·회고. 현장에서 쓰는 것만 씁니다.</p>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="카테고리">
        <Link href="/blog" className={tab(!category)}>전체 {posts.length}</Link>
        {CATEGORY_IDS.map((id) => (
          <Link key={id} href={`/insights/${id}`} className={tab(category === id)}>{CATEGORIES[id]} {posts.filter((p) => p.category === id).length}</Link>
        ))}
      </nav>

      {starters.length > 0 && (
        <section className="mt-8 border-2 border-ink p-5">
          <div className="text-xs font-bold text-ink-2">여기부터 읽으세요</div>
          <ol className="mt-2 space-y-2">
            {starters.map((p, i) => (
              <li key={p.slug} className="flex gap-3">
                <span className="font-black tabular-nums">{i + 1}</span>
                <Link href={`/blog/${p.slug}`} className="font-bold hover:underline underline-offset-4">{p.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mt-4">{slice.map((p) => <Row key={p.slug} p={p} />)}</div>
      {slice.length === 0 && <p className="py-12 text-center text-ink/60">아직 글이 없습니다.</p>}

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2 tabular-nums" aria-label="페이지">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={n === 1 ? path : `${path}?page=${n}`} className={tab(n === page)} aria-current={n === page ? 'page' : undefined}>{n}</Link>
          ))}
        </nav>
      )}
    </div>
  )
}
