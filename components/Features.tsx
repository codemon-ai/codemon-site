'use client'

import { motion } from 'framer-motion'
import { Code2, Cpu, Rocket } from 'lucide-react'

const features = [
  {
    title: 'Ship Fast, Ship Everything',
    description: '기획부터 배포까지 혼자 끝낸다. 아이디어가 있으면 일주일 안에 라이브.',
    icon: Rocket,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'AI-Native Development',
    description: 'AI 에이전트 7명이 일하는 외주 플랫폼부터, 트레이딩 봇, 콘텐츠 자동화까지.',
    icon: Cpu,
    gradient: 'from-accent-purple to-accent-pink',
  },
  {
    title: 'Enterprise × Indie',
    description: '삼성·SKT에서 배운 엔터프라이즈 설계 + 인디 빌더의 속도. 둘 다 가능.',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
}

export function Features() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text inline-block">
            What I Do
          </h2>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto text-lg">
            가진 기술로 뭐든 만든다
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl glass hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom border gradient on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
