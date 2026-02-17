'use client'

import { motion } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'AI-First',
    description: 'AI 에이전트 7명이 일하는 외주 플랫폼. PM이 기획하고, Dev가 코딩하고, QA가 테스트한다.',
  },
  {
    number: '02',
    title: 'Ship Fast',
    description: '아이디어에서 배포까지 48시간. 20개 이상의 프로젝트를 혼자 만들고 운영 중.',
  },
  {
    number: '03',
    title: 'Full Stack',
    description: '프론트엔드, 백엔드, 인프라, 자동화. 필요하면 뭐든 만든다.',
  },
  {
    number: '04',
    title: '15+ Years',
    description: '삼성전자 → SK텔레콤 → 인디 빌더. 엔터프라이즈 설계와 스타트업 속도를 동시에.',
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
