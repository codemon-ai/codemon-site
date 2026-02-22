'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            만들고 싶은 게 있나요?
          </h2>
          <p className="text-lg text-black/50 dark:text-white/45 mb-8 leading-relaxed">
            AI 에이전트가 기획부터 배포까지. 빠르고, 합리적인 가격에.
            <br />
            우측 하단 💬 버튼으로 바로 문의하거나, 데모를 먼저 확인해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/showcase"
              className="inline-block px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-base hover:opacity-80 transition-opacity no-underline"
            >
              데모 사이트 보기 →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
