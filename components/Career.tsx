'use client'

import { motion } from 'framer-motion'
import { Building2, Zap, Bot, GraduationCap } from 'lucide-react'

const education = [
  { school: '연세대학교 공학대학원', status: '재학' },
  { school: '명지대학교 컴퓨터공학과', status: '졸업' },
]

const timeline = [
  {
    label: '대기업 10년',
    period: '2005 — 2015',
    icon: Building2,
    description: '삼성전자 종합기술연구소·생산기술연구소, SK텔레콤 네이트 드라이브 팀. 대규모 시스템과 프로세스를 배웠습니다.',
  },
  {
    label: '스타트업 10년',
    period: '2015 — 2025',
    icon: Zap,
    description: '빠르게 만들고, 빠르게 부수고, 빠르게 배웠습니다. 기획부터 배포까지 혼자 끝내는 법을 익혔습니다.',
  },
  {
    label: 'AI/AX Engineer',
    period: '2025 —',
    icon: Bot,
    description: 'AI 에이전트 팀과 함께 설계하고, 구축하고, 자동화합니다. 아이디어가 생기면 만듭니다.',
  },
]

export function Career() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-purple-500/20 hidden md:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-5 items-start"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-semibold text-foreground text-base">
                        {item.label}
                      </h4>
                      <span className="text-xs font-mono text-foreground/40">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: timeline.length * 0.15 }}
              className="flex gap-5 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 pb-2">
                <h4 className="font-semibold text-foreground text-base">학력</h4>
                <ul className="mt-1 space-y-1">
                  {education.map((e) => (
                    <li key={e.school} className="text-sm text-foreground/60 leading-relaxed">
                      {e.school}{' '}
                      <span className="text-xs font-mono text-foreground/40">({e.status})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
