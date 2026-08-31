import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { workProjects, type WorkProject } from '../../data/work/projects'

const statusLabel: Record<WorkProject['status'], string> = {
  live: '운영 중',
  building: '개발 중',
  done: '완료',
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: workProjects.filter((p) => p.detail).map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = workProjects.find((p) => p.slug === params?.slug && p.detail)
  if (!project) return { notFound: true }
  return { props: { project } }
}

export default function WorkDetailPage({ project }: { project: WorkProject }) {
  const gallery = project.gallery?.length ? project.gallery : project.screenshots
  return (
    <>
      <Head>
        <title>{project.name} — Work · codemon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft size={16} /> 외주 프로젝트
          </Link>

          <div className="mt-6 flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
              {statusLabel[project.status]}
            </span>
          </div>
          <p className="mt-2 text-sm font-mono text-foreground/40">
            {project.client} · {project.industry} · {project.period}
          </p>
          <p className="mt-4 text-lg text-foreground/80 leading-relaxed">{project.summary}</p>

          {gallery[0] && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[0]} alt={project.name} className="w-full" />
            </div>
          )}

          {project.problem && (
            <section className="mt-10">
              <h2 className="text-sm font-mono uppercase tracking-widest text-purple-400">Problem</h2>
              <p className="mt-2 text-foreground/75 leading-relaxed">{project.problem}</p>
            </section>
          )}

          {project.approach?.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-purple-400">Approach</h2>
              <ul className="mt-2 space-y-2">
                {project.approach.map((a) => (
                  <li key={a} className="flex gap-2 text-foreground/75 leading-relaxed">
                    <span className="text-purple-400">·</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.results?.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-mono uppercase tracking-widest text-purple-400">Result</h2>
              <ul className="mt-2 space-y-2">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2 text-foreground/75 leading-relaxed">
                    <span className="text-purple-400">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-8">
            <h2 className="text-sm font-mono uppercase tracking-widest text-purple-400">Role · Stack</h2>
            <p className="mt-2 text-foreground/75">{project.role}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-foreground/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {gallery.length > 1 && (
            <section className="mt-10 grid gap-4">
              {gallery.slice(1).map((g) => (
                <div key={g} className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt={project.name} className="w-full" />
                </div>
              ))}
            </section>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-xl bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-500 transition-colors"
            >
              라이브 보기 →
            </a>
          )}
        </div>
      </main>
    </>
  )
}
