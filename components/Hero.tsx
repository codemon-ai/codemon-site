'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle: string
  description?: string
}

export function Hero({ title, subtitle, description }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden bg-white dark:bg-black">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
            Vibe Coder
            <br />
            <span className="text-black/30 dark:text-white/40">&</span>
            <br />
            Craft Engineer
          </h1>
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-black/50 dark:text-white/50 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          혼자서 팀을 대체합니다
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/blog"
            className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-all duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-black/20 dark:border-white/20 text-black/70 dark:text-white/70 rounded-lg font-medium hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-all duration-200"
          >
            About
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
