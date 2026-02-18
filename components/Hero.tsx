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
            Pro Vibe Coder
            <br />
            <span className="text-black/30 dark:text-white/40">&</span>
            <br />
            Cracked Engineer
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

        {/* CTA buttons removed — navigation via header */}
      </div>
    </section>
  )
}
