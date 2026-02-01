'use client'

import { motion } from 'framer-motion'
import {
  SiTypescript,
  SiPython,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiOpenai,
  SiPytorch,
  SiAmazon,
  SiGooglecloud,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
} from 'react-icons/si'
import { Bot, Sparkles } from 'lucide-react'

const techCategories = [
  {
    name: 'Languages & Frameworks',
    items: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'Go', icon: SiGo, color: '#00add8' },
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    ],
  },
  {
    name: 'AI & ML',
    items: [
      { name: 'OpenAI', icon: SiOpenai, color: '#00a67e' },
      { name: 'Claude API', icon: Bot, color: '#d4a574' },
      { name: 'LangChain', icon: Sparkles, color: '#22c55e' },
      { name: 'Hugging Face', icon: Sparkles, color: '#ffd21e' },
      { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
    ],
  },
  {
    name: 'Infrastructure',
    items: [
      { name: 'AWS', icon: SiAmazon, color: '#ff9900' },
      { name: 'GCP', icon: SiGooglecloud, color: '#4285f4' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326ce5' },
      { name: 'Terraform', icon: SiTerraform, color: '#844fba' },
    ],
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'Redis', icon: SiRedis, color: '#dc382d' },
      { name: 'Supabase', icon: SiSupabase, color: '#3fcf8e' },
      { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
}

export function TechStack() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-background opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text inline-block">
            Tech Stack
          </h2>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto text-lg">
            다양한 기술 스택으로 최적의 솔루션을 구현합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-accent-purple uppercase tracking-wider mb-6">
                {category.name}
              </h3>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={itemIndex}
                      variants={itemVariants}
                      className="group relative"
                    >
                      <div
                        className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all duration-300 cursor-default"
                        style={{
                          '--hover-color': item.color,
                        } as React.CSSProperties}
                      >
                        <Icon
                          className="w-4 h-4 transition-colors duration-300"
                          style={{ color: item.color }}
                        />
                        <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                          {item.name}
                        </span>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.name}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
