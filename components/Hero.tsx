'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
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
            codemon.ai
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-black/70 dark:text-white/70 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI로 일하는 방식을 바꾸는 엔지니어
        </motion.p>

        <motion.p
          className="mt-4 text-lg md:text-xl text-black/50 dark:text-white/50 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI 에이전트와 함께 설계하고, 직접 만들고, 바로 배포합니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => window.dispatchEvent(new Event('open-chat'))}
            className="px-8 py-3 rounded-full bg-accent-purple text-white font-semibold text-base hover:opacity-80 transition-opacity cursor-pointer"
          >
            문의하기
          </button>
          <Link
            href="/showcase"
            className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-base hover:opacity-80 transition-opacity no-underline"
          >
            쇼케이스 보기 →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
