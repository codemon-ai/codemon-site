'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Clock, FolderGit2, Bot, Repeat } from 'lucide-react'

const stats = [
  {
    label: '경력',
    value: 20,
    suffix: '년+',
    icon: Clock,
  },
  {
    label: '런칭한 서비스',
    value: 10,
    suffix: '+',
    icon: FolderGit2,
  },
  {
    label: 'AI 에이전트 팀',
    value: null,
    displayText: 'n+',
    icon: Bot,
  },
  {
    label: '자동화한 업무',
    value: 100,
    suffix: '+',
    icon: Repeat,
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
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
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
                <div className="text-center p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/30 transition-all duration-300">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value !== null ? (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix!} />
                    ) : (
                      <span className="font-mono text-purple-400">{stat.displayText}</span>
                    )}
                  </div>

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
