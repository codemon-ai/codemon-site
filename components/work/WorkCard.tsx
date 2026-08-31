'use client'

import { motion } from 'framer-motion'
import { workProjects, type WorkProject } from '../../data/work/projects'

const statusLabel: Record<WorkProject['status'], string> = {
  live: '운영 중',
  building: '개발 중',
  done: '완료',
}

export function WorkCard({ project }: { project: WorkProject }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="group overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/30 transition-all"
    >
      {project.screenshots[0] && (
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshots[0]}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground">{project.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="text-xs font-mono text-foreground/40 mb-2">
          {project.industry} · {project.period}
        </p>
        <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{project.summary}</p>
        <ul className="space-y-1 mb-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-xs text-foreground/50 leading-relaxed">
              · {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-foreground/60"
            >
              {s}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-purple-400 hover:underline"
          >
            라이브 보기 →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function WorkGrid() {
  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 not-prose my-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {workProjects.map((p) => (
        <WorkCard key={p.slug} project={p} />
      ))}
    </motion.div>
  )
}
