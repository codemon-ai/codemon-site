'use client'

import { motion } from 'framer-motion'
import { Search, PenTool, Hammer, RefreshCw } from 'lucide-react'

const steps = [
  {
    number: '01',
    label: '문제 파악',
    icon: Search,
    description: '무엇을 자동화할지, 어디서 병목이 생기는지 파악합니다.',
  },
  {
    number: '02',
    label: '설계',
    icon: PenTool,
    description: 'AI 에이전트 구성과 워크플로우를 설계합니다.',
  },
  {
    number: '03',
    label: '구축',
    icon: Hammer,
    description: '동작하는 프로토타입을 빠르게 만들고 검증합니다.',
  },
  {
    number: '04',
    label: '운영',
    icon: RefreshCw,
    description: '배포하고, 모니터링하고, 개선을 반복합니다.',
  },
]

export function WorkProcess() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            일하는 방식
          </h2>
          <p className="text-foreground/50 mt-3 text-lg">
            반복 가능한 프로세스로 일합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 h-full">
                  <span className="text-xs font-mono text-foreground/30">
                    {step.number}
                  </span>

                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mt-3 mb-3">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>

                  <h3 className="font-semibold text-foreground text-base">
                    {step.label}
                  </h3>
                  <p className="text-sm text-foreground/50 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-foreground/20">
                    →
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
