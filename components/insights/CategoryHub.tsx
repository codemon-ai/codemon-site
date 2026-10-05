import Link from 'next/link'
import postsData from '../../data/posts.json'
import { CATEGORIES, CATEGORY_IDS, type Post } from '../../lib/content/schema'

const { posts } = postsData as unknown as { posts: Post[] }
const DESC: Record<string, string> = {
  'agents-build': '멀티 에이전트·스킬·하네스를 직접 짜본 기록.',
  'agents-ops': 'Claude Code·OpenClaw 같은 코딩 에이전트를 실무에서 굴리는 법.',
  models: '출시·가격·벤치마크. 실코드로 비교한 것만.',
  infra: '맥미니 한 대로 돌리는 인프라와 빌드로그.',
  retrospective: '시스템 분리, API 이해 같은 엔지니어링 회고.',
}

export function CategoryHub() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">인사이트</h1>
      <p className="mt-2 text-ink-2">카테고리 5개. 전체 목록은 <Link href="/blog" className="font-bold underline underline-offset-4">인사이트 전체</Link>에서.</p>
      <div className="mt-8">
        {CATEGORY_IDS.map((id) => {
          const n = posts.filter((p) => p.category === id).length
          return (
            <Link key={id} href={`/insights/${id}`} className="grid gap-1 md:grid-cols-[1fr_2fr] md:gap-6 py-5 border-b border-ink/15 group">
              <div className="text-lg font-bold group-hover:underline underline-offset-4">{CATEGORIES[id]} <span className="text-sm text-ink/60 tabular-nums">{n}</span></div>
              <div className="text-[15px] text-ink-2">{DESC[id]}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
