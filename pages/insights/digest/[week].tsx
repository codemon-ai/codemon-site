import type { GetStaticPaths, GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { SiteShell } from '../../../components/shell/SiteShell'
import { NewsletterSignup } from '../../../components/NewsletterSignup'
import type { Digest } from '../../../lib/content/digest'

const DIR = path.join(process.cwd(), 'data', 'digest')
const weeks = () => fs.readdirSync(DIR).filter((f) => /^\d{4}-W\d{2}\.json$/.test(f)).map((f) => f.replace('.json', '')).sort().reverse()

export const getStaticPaths: GetStaticPaths = async () => ({ paths: weeks().map((week) => ({ params: { week } })), fallback: false })
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const week = String(params?.week)
  if (!/^\d{4}-W\d{2}$/.test(week) || !fs.existsSync(path.join(DIR, `${week}.json`))) return { notFound: true }
  const digest = JSON.parse(fs.readFileSync(path.join(DIR, `${week}.json`), 'utf8')) as Digest
  const all = weeks(); const i = all.indexOf(week)
  return { props: { digest, prev: all[i + 1] ?? null, next: all[i - 1] ?? null } }
}

const LABEL: Record<string, string> = { primary: '1차 자료', news: '뉴스', analysis: '분석', vendor: '벤더' }

export default function DigestPage({ digest: d, prev, next }: { digest: Digest; prev: string | null; next: string | null }) {
  return (
    <SiteShell title={`${d.week} · ${d.title}`} description={d.intro}>
      <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
        <Link href="/newsletter" className="text-sm text-ink/60 hover:text-ink">다이제스트 아카이브</Link>
        <div className="mt-3 text-xs font-bold text-ink-2 tabular-nums">주간 다이제스트 · {d.week} · {d.publishedAt}</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-black tracking-[-0.02em] leading-tight">{d.title}</h1>
        {d.intro && <p className="mt-5 text-lg text-ink-2 leading-relaxed">{d.intro}</p>}
        <ol className="mt-10 border-t-2 border-ink">
          {d.items.map((it, i) => (
            <li key={it.id} className="py-5 border-b border-ink/15 grid gap-2 md:grid-cols-[2rem_1fr]">
              <span className="font-black tabular-nums">{i + 1}</span>
              <div>
                <a href={it.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold leading-snug underline underline-offset-4 decoration-1">{it.title}</a>
                <div className="mt-1 text-xs text-ink/60">{it.source} · {LABEL[it.label] ?? it.label}{it.keywords.length ? ` · ${it.keywords.join(', ')}` : ''}</div>
                {it.summaryKo && <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{it.summaryKo}</p>}
                {it.comment && <p className="mt-2 pl-3 border-l-2 border-signal text-[15px] font-bold">{it.comment}</p>}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex justify-between text-sm font-bold">
          <span>{prev && <Link href={`/insights/digest/${prev}`} className="underline underline-offset-4">이전 호 {prev}</Link>}</span>
          <span>{next && <Link href={`/insights/digest/${next}`} className="underline underline-offset-4">다음 호 {next}</Link>}</span>
        </div>
        <section className="mt-12 bg-[#003566] text-white p-6">
          <h2 className="text-xl font-black tracking-tight">다음 호를 메일로.</h2>
          <p className="mt-2 text-sm text-[#C8D0DC]">주 1회 다이제스트. 언제든 해지.</p>
          <div className="mt-4 max-w-md"><NewsletterSignup variant="band" source="digest" /></div>
        </section>
      </div>
    </SiteShell>
  )
}
