'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import postsData from '../../data/posts.json'
import { CATEGORIES, type Post } from '../../lib/content/schema'
import { NewsletterSignup } from '../NewsletterSignup'

const { posts } = postsData as unknown as { posts: Post[] }   // 최신순

/** 순서 고정: 다음 글 1 → 관련 4 → 뉴스레터 → 강의 CTA (실습 블록은 IA 변경으로 제외) */
export function PostFooter() {
  const { asPath } = useRouter()
  const slug = asPath.split(/[?#]/)[0].replace(/^\/blog\//, '').replace(/\/$/, '')
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx < 0) return null
  const me = posts[idx]
  const next = posts[idx - 1] ?? posts[idx + 1]   // 더 새 글 우선, 없으면 바로 이전 글
  const related = posts.filter((p) => p.category === me.category && p.slug !== slug && p.slug !== next?.slug).slice(0, 4)

  return (
    <aside className="mt-16 not-prose" data-post-footer>
      {next && (
        <section className="border-t-2 border-ink pt-5">
          <div className="text-xs font-bold text-ink-2">다음 글</div>
          <Link href={`/blog/${next.slug}`} className="mt-1 block text-xl font-bold leading-snug hover:underline underline-offset-4">{next.title}</Link>
        </section>
      )}
      {related.length > 0 && (
        <section className="mt-10 border-t border-ink/20 pt-5">
          <div className="text-xs font-bold text-ink-2">같이 읽기 · {CATEGORIES[me.category]}</div>
          <ul className="mt-2 divide-y divide-ink/10">
            {related.map((p) => (
              <li key={p.slug} className="py-2.5">
                <Link href={`/blog/${p.slug}`} className="font-bold hover:underline underline-offset-4">{p.title}</Link>
                <span className="ml-2 text-xs text-ink/60 tabular-nums">{p.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="mt-10 bg-[#003566] text-white p-6">
        <h3 className="text-xl font-black tracking-tight">이런 글, 주 1회 다이제스트로.</h3>
        <p className="mt-2 text-sm text-[#C8D0DC]">에이전트·모델·인프라에서 실제 업무에 쓸 만한 것만.</p>
        <div className="mt-4 max-w-md"><NewsletterSignup variant="band" source="post-footer" /></div>
      </section>
      <section className="mt-10 border-2 border-ink p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight">팀에 직접 가르쳐 드립니다.</h3>
          <p className="mt-1 text-sm text-ink-2">기업 맞춤 강의·워크숍. 실무자가 당장 쓰는 수준까지.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/lectures" className="border-2 border-ink px-5 py-2.5 font-bold text-sm">강의 보기</Link>
          <Link href="/contact?type=lecture" className="bg-signal text-on-signal px-5 py-2.5 font-bold text-sm">강의 문의</Link>
        </div>
      </section>
    </aside>
  )
}
