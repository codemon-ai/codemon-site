'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Code2, FolderGit2, Clock, Coffee } from 'lucide-react'

const stats = [
  {
    label: '경력',
    value: 15,
    suffix: '년+',
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    label: '운영 중인 서비스',
    value: 10,
    suffix: '+',
    icon: FolderGit2,
    gradient: 'from-accent-purple to-accent-pink',
  },
  {
    label: 'AI 에이전트',
    value: 7,
    suffix: '개',
    icon: Code2,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    label: '커피',
    value: 9999,
    suffix: '+',
    icon: Coffee,
    gradient: 'from-amber-500 to-yellow-500',
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0.2 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function Stats() {
  return (
    <section className="py-16 px-6 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/5 via-transparent to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative group"
              >
                <div className="text-center p-6 rounded-2xl glass hover:bg-white/10 transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <div className="text-sm text-foreground/60">
                    {stat.label}
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
