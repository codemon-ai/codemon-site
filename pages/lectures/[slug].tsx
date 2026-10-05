import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { SiteShell } from '../../components/shell/SiteShell'
import { InquiryBlock } from '../../components/lectures/InquiryBlock'
import { lectures, type Lecture } from '../../data/lectures'

export const getStaticPaths: GetStaticPaths = async () => ({ paths: lectures.map((l) => ({ params: { slug: l.slug } })), fallback: false })
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lecture = lectures.find((l) => l.slug === params?.slug)
  return lecture ? { props: { lecture } } : { notFound: true }
}

export default function LecturePage({ lecture: l }: { lecture: Lecture }) {
  const total = l.outline.reduce((s, o) => s + o.minutes, 0)
  return (
    <SiteShell title={l.title} description={l.summary}>
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-14">
        <Link href="/lectures" className="text-sm text-ink/60 hover:text-ink">강의</Link>
        <div className="mt-3 text-xs font-bold text-ink-2">{l.kind === 'corporate' ? '기업 출강' : '무료 셀프 코스'} · {l.audience} · {l.hours}시간</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-black tracking-[-0.02em] leading-tight">{l.title}</h1>
        <p className="mt-4 text-lg text-ink-2 leading-relaxed max-w-2xl">{l.summary}</p>

        <section className="mt-10 border-t-2 border-ink pt-5">
          <h2 className="text-xs font-bold text-ink-2">커리큘럼{total ? ` · ${total}분` : ''}</h2>
          {l.outline.length ? (
            <ol className="mt-3 divide-y divide-ink/10">
              {l.outline.map((o, i) => (
                <li key={o.title} className="py-3 flex gap-4"><span className="font-black tabular-nums w-6">{i + 1}</span><span className="flex-1 font-bold">{o.title}</span><span className="text-sm text-ink-2 tabular-nums">{o.minutes}분</span></li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-[15px] text-ink-2">상세 커리큘럼은 아래 강의 자료 페이지에 있습니다. 대상·시간에 맞춰 재구성합니다.</p>
          )}
        </section>

        {(l.prerequisites.length > 0 || l.deliverables.length > 0) && (
          <section className="mt-10 grid gap-8 md:grid-cols-2 border-t border-ink/20 pt-5">
            {l.prerequisites.length > 0 && <div><h2 className="text-xs font-bold text-ink-2">준비물</h2><ul className="mt-2 space-y-1 text-[15px]">{l.prerequisites.map((p) => <li key={p}>{p}</li>)}</ul></div>}
            {l.deliverables.length > 0 && <div><h2 className="text-xs font-bold text-ink-2">실습 산출물</h2><ul className="mt-2 space-y-1 text-[15px]">{l.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>}
          </section>
        )}

        {l.refs.length > 0 && (
          <section className="mt-10 border-t border-ink/20 pt-5">
            <h2 className="text-xs font-bold text-ink-2">강의 자료</h2>
            <ul className="mt-2 space-y-1.5">
              {l.refs.map((r) => <li key={r}><Link href={r} className="font-bold underline underline-offset-4">{r}</Link></li>)}
            </ul>
          </section>
        )}

        <div className="mt-12">
          {l.kind === 'corporate'
            ? <InquiryBlock lectureSlug={l.slug} />
            : <Link href={l.refs[0] ?? '/webinar'} className="inline-block bg-signal text-on-signal px-6 py-3 font-bold">바로 시작하기</Link>}
        </div>
      </div>
    </SiteShell>
  )
}
