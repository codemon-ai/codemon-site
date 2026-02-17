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
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden bg-black">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]">
            Vibe Coder
            <br />
            <span className="text-white/40">&</span>
            <br />
            Craft Engineer
          </h1>
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-white/50 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {description}
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
            className="px-8 py-3.5 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-white/20 text-white/70 rounded-lg font-medium hover:border-white/40 hover:text-white transition-all duration-200"
          >
            About
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
