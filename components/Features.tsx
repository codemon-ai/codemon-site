'use client'

import { motion } from 'framer-motion'
import { Bot, Zap, Workflow, Building2, LucideIcon } from 'lucide-react'

const features: { number: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    number: '01',
    title: 'AI 에이전트 설계',
    description: '반복 업무를 AI 팀에게 넘기는 시스템을 만듭니다.',
    icon: Bot,
  },
  {
    number: '02',
    title: '빠른 실증(PoC)',
    description: '아이디어를 동작하는 프로토타입으로 바꿉니다.',
    icon: Zap,
  },
  {
    number: '03',
    title: 'End-to-End AX',
    description: '기획부터 배포, 자동화까지 AI 팀이 함께 끝냅니다.',
    icon: Workflow,
  },
  {
    number: '04',
    title: '현장 경험',
    description: '대기업 시스템과 스타트업 속도, 양쪽을 아는 엔지니어.',
    icon: Building2,
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
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                className="group p-8 rounded-2xl border border-black/[0.08] dark:border-white/[0.06] hover:border-black/[0.15] dark:hover:border-white/[0.12] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-sm font-mono text-black/20 dark:text-white/25">{feature.number}</span>
                <div className="mt-3 w-10 h-10 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-black/50 dark:text-white/45 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
