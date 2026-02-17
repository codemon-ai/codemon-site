'use client'

import { motion } from 'framer-motion'
import { Building2, Smartphone, Rocket } from 'lucide-react'

const timeline = [
  {
    company: 'Samsung Electronics',
    role: 'Software Engineer',
    period: '삼성전자',
    icon: Building2,
    gradient: 'from-blue-500 to-blue-700',
    description: '모바일 플랫폼 개발',
  },
  {
    company: 'SK Telecom',
    role: 'Senior Engineer',
    period: 'SK텔레콤',
    icon: Smartphone,
    gradient: 'from-red-500 to-red-700',
    description: 'AI/클라우드 서비스',
  },
  {
    company: 'Indie Builder',
    role: 'Building Everything',
    period: '현재',
    icon: Rocket,
    gradient: 'from-accent-purple to-accent-pink',
    description: '10+ 서비스 운영 중',
  },
]

export function Career() {
  return (
    <section className="py-16 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          {timeline.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-3"
              >
                {/* Connector arrow (not on first) */}
                {i > 0 && (
                  <span className="hidden md:block text-foreground/30 text-xl mr-2">→</span>
                )}

                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {item.company}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {item.period} · {item.description}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
