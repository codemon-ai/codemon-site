'use client'

import { motion } from 'framer-motion'

const agents = [
  {
    emoji: '\uD83E\uDD8A',
    name: '로디',
    animal: 'Fox',
    role: 'PM & Orchestrator',
    host: 'Mac Mini M1',
  },
  {
    emoji: '\uD83D\uDC15',
    name: '누비',
    animal: 'Dog',
    role: 'QA & Debugger',
    host: 'MacBook Air M2',
  },
  {
    emoji: '\uD83D\uDC3B\u200D\u2744\uFE0F',
    name: '베어',
    animal: 'Polar Bear',
    role: 'Design & Frontend',
    host: 'MacBook Pro',
  },
  {
    emoji: '\uD83D\uDC23',
    name: '뉴비',
    animal: 'Chick',
    role: 'Research & Scout',
    host: 'MacBook Pro',
  },
  {
    emoji: '\uD83E\uDD9C',
    name: '나래',
    animal: 'Parrot',
    role: 'Content & Marketing',
    host: 'TBD',
  },
  {
    emoji: '\uD83D\uDC19',
    name: '옥토',
    animal: 'Octopus',
    role: 'Backend & Infra',
    host: 'TBD',
  },
  {
    emoji: '\uD83E\uDD89',
    name: '아울',
    animal: 'Owl',
    role: 'Data & Automation',
    host: 'TBD',
  },
]

export function AgentTeam() {
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
            AI Agent Team
          </h2>
          <p className="text-foreground/50 mt-3 text-lg max-w-xl mx-auto">
            저는 혼자 일하지 않습니다. AI 에이전트 팀과 함께합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group"
            >
              <div className="p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 text-center">
                <div className="text-3xl mb-2">{agent.emoji}</div>
                <div className="font-semibold text-foreground text-sm">
                  {agent.name}
                </div>
                <div className="text-xs text-purple-400 font-medium mt-0.5">
                  {agent.role}
                </div>
                <div className="text-xs text-foreground/30 mt-1 font-mono">
                  {agent.host}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Expanding placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: agents.length * 0.08 }}
            className="group"
          >
            <div className="p-4 rounded-xl border border-dashed border-black/[0.08] dark:border-white/[0.06] hover:border-purple-500/20 transition-all duration-300 text-center h-full flex flex-col items-center justify-center">
              <div className="text-2xl mb-2 text-foreground/20">+</div>
              <div className="text-xs text-foreground/30">
                확장 중...
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
