'use client'

import { motion } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'AI가 일한다',
    description: 'AI 에이전트로 구성된 자동화 팀.',
  },
  {
    number: '02',
    title: '생각하면 만든다',
    description: '아이디어가 생기면 바로 만들고, 바로 배포한다.',
  },
  {
    number: '03',
    title: '경계가 없다',
    description: '프론트, 백엔드, 인프라, 봇, 자동화. 필요한 건 직접 만든다.',
  },
  {
    number: '04',
    title: '오래 살아남았다',
    description: '대기업에서 시스템을 배웠고, 밖에서 속도를 배웠다.',
  },
]

export function Features() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group p-8 rounded-2xl border border-black/[0.08] dark:border-white/[0.06] hover:border-black/[0.15] dark:hover:border-white/[0.12] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-sm font-mono text-black/20 dark:text-white/25">{feature.number}</span>
              <h3 className="mt-3 text-2xl font-semibold text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-black/50 dark:text-white/45 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
