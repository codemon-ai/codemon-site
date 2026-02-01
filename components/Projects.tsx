'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Sparkles, MessageSquare, Newspaper } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    title: '타로몬',
    subtitle: 'AI 타로 리딩',
    description: 'AI 기반 타로 카드 리딩 서비스. 직관적인 UI와 깊이 있는 해석을 제공합니다.',
    icon: Sparkles,
    gradient: 'from-purple-600 to-pink-600',
    thumbnail: '/projects/taromon.png',
    tags: ['AI', 'OpenAI', 'Next.js'],
    links: {
      demo: '/projects/taromon',
      github: 'https://github.com/coffeemon',
    },
  },
  {
    title: '메모몬',
    subtitle: '텔레그램 메모 봇',
    description: '텔레그램으로 빠르게 메모하고 정리하는 AI 기반 메모 관리 봇입니다.',
    icon: MessageSquare,
    gradient: 'from-blue-600 to-cyan-600',
    thumbnail: '/projects/memomon.png',
    tags: ['Telegram Bot', 'Python', 'AI'],
    links: {
      demo: '/projects/memomon',
      github: 'https://github.com/coffeemon',
    },
  },
  {
    title: '뉴스몬',
    subtitle: 'AI/Tech 뉴스 수집',
    description: 'AI와 기술 분야의 최신 뉴스를 자동으로 수집하고 요약해주는 서비스입니다.',
    icon: Newspaper,
    gradient: 'from-orange-600 to-red-600',
    thumbnail: '/projects/newsmon.png',
    tags: ['Crawling', 'AI Summary', 'FastAPI'],
    links: {
      demo: '/projects/newsmon',
      github: 'https://github.com/coffeemon',
    },
  },
]

function ProjectThumbnail({
  src,
  gradient,
  icon: Icon,
  title
}: {
  src: string
  gradient: string
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`relative w-full h-40 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <Icon className="w-12 h-12 text-white/80 relative z-10" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-white/60 text-xs font-medium">{title}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow duration-300">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setHasError(true)}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`} />
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
}

export function Projects() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text inline-block">
            Projects
          </h2>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto text-lg">
            직접 기획하고 구현한 서비스들
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl glass overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Thumbnail */}
                  <ProjectThumbnail
                    src={project.thumbnail}
                    gradient={project.gradient}
                    icon={Icon}
                    title={project.title}
                  />

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent-purple mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2 border-t border-white/10">
                      <Link
                        href={project.links.demo}
                        className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-accent-purple transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View</span>
                      </Link>
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </Link>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent-purple/30 transition-colors duration-500`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-300"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
