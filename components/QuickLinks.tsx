'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FolderOpen, BookOpen, FileText } from 'lucide-react'

const links = [
  {
    title: 'Projects',
    description: '혼자 만들고 운영 중인 서비스들',
    href: '/projects',
    icon: FolderOpen,
    gradient: 'from-accent-purple to-accent-pink',
  },
  {
    title: 'Blog',
    description: '만들면서 배운 것들. 기술, AI, 자동화.',
    href: '/blog',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Docs',
    description: '기술 가이드와 문서',
    href: '/docs',
    icon: FileText,
    gradient: 'from-orange-500 to-red-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
}

export function QuickLinks() {
  return (
    <section className="py-20 px-6 bg-background border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div key={i} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="group flex items-start gap-4 p-5 rounded-xl glass hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent-purple transition-colors flex items-center gap-1">
                      {link.title}
                      <span className="text-foreground/40 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {link.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
