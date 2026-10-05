import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { SiteShell } from '../../components/shell/SiteShell'
import { CTA } from '../../components/home/CTA'
import { kindLabel, statusLabel } from '../../components/cases/CaseCard'
import { cases, type Case } from '../../data/cases'

export const getStaticPaths: GetStaticPaths = async () => ({ paths: cases.map((c) => ({ params: { slug: c.slug } })), fallback: false })
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const c = cases.find((x) => x.slug === params?.slug)
  if (!c) return { notFound: true }
  if (c.visibility === 'private') return { redirect: { destination: `/work/${c.slug}`, permanent: false } }   // 비번 게이트로
  return { props: { c } }
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <section className="mt-8 border-t border-ink/20 pt-4">
      <h2 className="text-xs font-bold text-ink-2">{title}</h2>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed">{items.map((i) => <li key={i} className="pl-3 border-l-2 border-signal">{i}</li>)}</ul>
    </section>
  )
}

export default function CasePage({ c }: { c: Case }) {
  const gallery = c.gallery?.length ? c.gallery : c.screenshots
  const client = c.visibility === 'anonymous' ? (c.clientLabel ?? '비공개') : c.client
  return (
    <SiteShell title={c.name} description={c.summary}>
      <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
        <Link href="/cases" className="text-sm text-ink/60 hover:text-ink">사례</Link>
        <div className="mt-3 text-xs font-bold text-ink-2">{kindLabel[c.kind]} · {statusLabel[c.status]}</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-black tracking-[-0.02em] leading-tight">{c.name}</h1>
        <p className="mt-2 text-sm text-ink/60">{client} · {c.industry} · {c.period}</p>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">{c.summary}</p>
        {gallery[0] && (
          <div className="mt-8 border border-ink/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[0]} alt={c.name} className="w-full" />
          </div>
        )}
        {c.problem && <section className="mt-8 border-t border-ink/20 pt-4"><h2 className="text-xs font-bold text-ink-2">문제</h2><p className="mt-2 text-[15px] leading-relaxed">{c.problem}</p></section>}
        <List title="한 일" items={c.approach ?? c.highlights} />
        <List title="결과" items={c.results} />
        <section className="mt-8 border-t border-ink/20 pt-4">
          <h2 className="text-xs font-bold text-ink-2">역할 · 스택</h2>
          <p className="mt-2 text-[15px]">{c.role}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{c.stack.map((s) => <span key={s} className="text-[11px] px-2 py-0.5 border border-ink/15 text-ink/70">{s}</span>)}</div>
        </section>
        {gallery.length > 1 && <section className="mt-8 grid gap-4">{gallery.slice(1).map((g) => (<div key={g} className="border border-ink/15">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={g} alt={c.name} className="w-full" /></div>))}</section>}
        {c.liveUrl && <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block border-2 border-ink px-6 py-3 font-bold">라이브 보기</a>}
      </div>
      <CTA heading="비슷한 업무를 바꾸고 싶다면" />
    </SiteShell>
  )
}
