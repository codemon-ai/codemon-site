'use client'

import { motion } from 'framer-motion'
import { Building2, Zap, Bot, GraduationCap, Briefcase } from 'lucide-react'

// 출처: 강사프로필 정본(2026-08-11). 갱신 시 함께 맞출 것.
// 표기 원칙: 대기업(삼성·SK)·본인 창업은 실명 노출, 아직 운영 중인 타사(공유 스쿠터·OTT 등)는 업종만 표기.
const education = [
  { school: '연세대학교 공학대학원 (융합인문공학 석사)', status: '졸업' },
  { school: '명지대학교 컴퓨터공학과', status: '졸업' },
]

const timeline = [
  {
    label: '대기업 10년',
    period: '2006 — 2016',
    icon: Building2,
    description:
      '삼성전자 생산기술연구소 책임연구원으로 설비 데이터 기반 고장 예측 시스템을, SK플래닛에서 Nate Drive(현 T맵 안전운전도우미)를 개발했습니다. 대규모 시스템과 프로세스를 배웠습니다.',
  },
  {
    label: '스타트업 10년',
    period: '2016 — 2024',
    icon: Zap,
    description:
      "핸드메이드 커머스 '서커스', NFT 아이템 거래소 등 여러 번의 창업, 그리고 공유 스쿠터·OTT 서비스의 CTO·개발본부장을 거쳤습니다. 기획부터 배포까지 혼자 끝내는 법을 익혔습니다.",
  },
  {
    label: 'AI/AX Engineer',
    period: '2025 —',
    icon: Bot,
    description:
      'codemon.ai 대표로 AI 에이전트 팀과 함께 설계하고, 구축하고, 자동화합니다. 아이디어가 생기면 만듭니다.',
  },
]

// 주요 근무 이력 (최신순). 대기업·본인 창업은 실명, 운영 중인 타사는 업종만.
const workHistory = [
  { period: '2025.01 — 현재', role: 'codemon.ai · 대표 (창업)', desc: 'AI 에이전트 기반 개발 · 기업 AX 교육/컨설팅' },
  { period: '2021.11 — 2023.09', role: '개발본부 · 본부장', desc: '모바일 OTT 서비스 앱·서버 개발 총괄' },
  { period: '2020.07 — 2021.08', role: 'CTO', desc: '공유 스쿠터 업체 서비스 개발 총괄' },
  { period: '2019.09 — 2020.07', role: '공동창업 · 개발총괄', desc: 'NFT 아이템 거래소 개발' },
  { period: '2017.03 — 2019.08', role: '개발팀', desc: '세무·회계 자동화 서비스 개발' },
  { period: '2016.02 — 2017.03', role: 'CTO · 공동창업', desc: "핸드메이드 커머스 '서커스' — 입점 800개·거래액 3억" },
  { period: '2009.01 — 2016.03', role: '삼성전자 생산기술연구소 · 책임연구원', desc: '설비 데이터 기반 고장 예측 시스템 개발' },
  { period: '2006.08 — 2006.10', role: 'SK플래닛 (전 SK OCBS)', desc: 'Nate Drive(현 T맵 안전운전도우미) 개발' },
  { period: '2005.01 — 2006.01', role: '창업자', desc: '캐논 유저 커뮤니티 사이트 1인 개발·운영' },
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

            {/* 주요 근무 이력 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: timeline.length * 0.15 }}
              className="flex gap-5 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                <Briefcase className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 pb-2">
                <h4 className="font-semibold text-foreground text-base mb-3">주요 근무 이력</h4>
                <ul className="space-y-3">
                  {workHistory.map((w) => (
                    <li key={w.period} className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-0.5 max-sm:grid-cols-1">
                      <span className="text-xs font-mono text-foreground/40 pt-0.5">{w.period}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground/80 leading-snug">{w.role}</p>
                        <p className="text-xs text-foreground/50 leading-relaxed">{w.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (timeline.length + 1) * 0.15 }}
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
