'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import {
  Monitor,
  Navigation,
  ShoppingBag,
  ExternalLink,
  Search,
  BarChart3,
  Palette,
  CheckCircle,
  ChevronRight,
  Mail,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0.2 })
  const isInView = useInView(ref, { once: true, margin: '-80px' })

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

const cardBase =
  'bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl'

/* ─────────────────────────────────────────────
   1. PitchHero
   ───────────────────────────────────────────── */

export function PitchHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-purple-950/20 to-[#0a0f1a]">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Branding tag */}
      <div className="absolute top-6 right-6 text-xs font-mono text-white/40 border border-white/10 rounded-full px-3 py-1">
        codemon.ai
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              dansaek.co 사이트 분석 리포트
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 text-xl md:text-2xl text-white/70 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          데이터 기반 AX(Actionable Experience) 분석
        </motion.p>

        <motion.p
          className="mt-4 text-base md:text-lg text-white/45 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Firecrawl 크롤링 + Playwright 인터랙션 분석 기반
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   2. SiteOverview
   ───────────────────────────────────────────── */

interface OverviewStat {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
}

const overviewStats: OverviewStat[] = [
  { icon: Monitor, value: 14, suffix: '+', label: '분석 페이지' },
  { icon: Navigation, value: 42, suffix: '+', label: '네비게이션 항목' },
  { icon: ShoppingBag, value: 96, suffix: '+', label: '등록 상품' },
  { icon: ExternalLink, value: 10, suffix: '+', label: '외부 연동 채널' },
]

export function SiteOverview() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className={`${cardBase} p-8`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            사이트 개요
          </h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {overviewStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-center group"
                >
                  <div className="inline-flex w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   3. PainPointCard
   ───────────────────────────────────────────── */

type Severity = 'critical' | 'high' | 'medium'

interface PainPointCardProps {
  title: string
  severity: Severity
  description: string
  impact: string
}

const severityStyles: Record<
  Severity,
  { border: string; badge: string; badgeText: string; glow: string }
> = {
  critical: {
    border: 'border-l-red-500',
    badge: 'bg-red-500/20 text-red-400',
    badgeText: 'Critical',
    glow: 'hover:shadow-[0_0_24px_rgba(239,68,68,0.15)]',
  },
  high: {
    border: 'border-l-amber-500',
    badge: 'bg-amber-500/20 text-amber-400',
    badgeText: 'High',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
  },
  medium: {
    border: 'border-l-yellow-500',
    badge: 'bg-yellow-500/20 text-yellow-400',
    badgeText: 'Medium',
    glow: 'hover:shadow-[0_0_24px_rgba(234,179,8,0.15)]',
  },
}

export function PainPointCard({
  title,
  severity,
  description,
  impact,
}: PainPointCardProps) {
  const s = severityStyles[severity]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${cardBase} border-l-4 ${s.border} ${s.glow} p-6 transition-shadow duration-300`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white leading-snug pr-4">
          {title}
        </h3>
        <span
          className={`${s.badge} px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase whitespace-nowrap shrink-0`}
        >
          {s.badgeText}
        </span>
      </div>

      <p className="text-sm text-white/60 leading-relaxed mb-4">
        {description}
      </p>

      <div className="text-sm">
        <span className="font-semibold text-purple-400">
          비즈니스 임팩트:{' '}
        </span>
        <span className="text-white/70">{impact}</span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   4. PainPointGrid
   ───────────────────────────────────────────── */

const painPoints: PainPointCardProps[] = [
  {
    severity: 'critical',
    title: '네비게이션 과부하',
    description:
      '메인 메뉴 8개 + 메가메뉴 9개 카테고리 + 33개 소분류. 사용자가 원하는 상품까지 도달하는 경로가 과도하게 많음',
    impact: '신규 사용자 이탈률 증가, 탐색 피로도 상승',
  },
  {
    severity: 'high',
    title: '체크아웃 3단계 이탈 리스크',
    description:
      '장바구니 → 주문서작성/결제 → 주문완료 3단계 구성. 각 단계 전환 시 이탈 발생 가능',
    impact: '결제 전환율 15-25% 개선 가능',
  },
  {
    severity: 'high',
    title: '결제수단 분산 인지부하',
    description:
      '무통장 입금, 신용카드(KCP), 네이버페이 3종 결제수단이 각기 다른 UX 패턴으로 제공',
    impact: '결제 포기율 감소 기대',
  },
  {
    severity: 'high',
    title: '모바일/데스크톱 UX 격차',
    description:
      'm.dansaek.co와 www.dansaek.co가 별도 운영. 반응형이 아닌 별도 모바일 사이트',
    impact: '모바일 매출 비중 확대 가능',
  },
  {
    severity: 'medium',
    title: '카테고리 필터/정렬 UX',
    description:
      '6개 정렬 옵션과 다중 서브카테고리 필터가 혼재. 생리팬티/위생팬티/주니어 각각 다른 필터 구조',
    impact: '상품 탐색 효율 개선',
  },
  {
    severity: 'medium',
    title: '리뷰 시스템 복잡도',
    description:
      '키/몸무게/사이즈별 필터, 포토/동영상 모아보기, 유용해요 반응 등 6,952건 리뷰의 다층 필터링',
    impact: '구매 결정 속도 단축',
  },
  {
    severity: 'medium',
    title: '외부 서비스 파편화',
    description:
      '카카오(선물/채널/상담) 3종, 네이버(페이/찜/톡톡) 3종, SNS 4종 등 10+개 외부 터치포인트',
    impact: '일관된 브랜드 경험 확보',
  },
]

export function PainPointGrid() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          발견된 페인포인트
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {painPoints.map((pp, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <PainPointCard {...pp} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   5. MethodologySection
   ───────────────────────────────────────────── */

interface PipelineStep {
  icon: LucideIcon
  title: string
  subtitle: string
  color: string
  borderColor: string
}

const pipelineSteps: PipelineStep[] = [
  {
    icon: Search,
    title: '데이터 수집',
    subtitle: '크롤링 + 인터랙션 분석',
    color: 'text-sky-400',
    borderColor: 'border-t-sky-400',
  },
  {
    icon: BarChart3,
    title: '패턴 분석',
    subtitle: '유저 플로우 + 페인포인트 도출',
    color: 'text-emerald-400',
    borderColor: 'border-t-emerald-400',
  },
  {
    icon: Palette,
    title: 'UX 설계',
    subtitle: '개선안 설계 + 프로토타이핑',
    color: 'text-purple-400',
    borderColor: 'border-t-purple-400',
  },
  {
    icon: CheckCircle,
    title: '검증',
    subtitle: 'A/B 테스트 + 전환율 측정',
    color: 'text-amber-400',
    borderColor: 'border-t-amber-400',
  },
]

export function MethodologySection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          분석 방법론
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {pipelineSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center"
              >
                {/* Step card */}
                <div
                  className={`${cardBase} border-t-2 ${step.borderColor} p-6 text-center flex-1`}
                >
                  <div
                    className={`inline-flex w-12 h-12 rounded-xl bg-white/5 items-center justify-center mb-3 ${step.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-base font-bold text-white mb-1">
                    {step.title}
                  </div>
                  <div className="text-xs text-white/45 leading-relaxed">
                    {step.subtitle}
                  </div>
                </div>

                {/* Arrow connector (hidden on last step and on mobile) */}
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-2 text-white/20">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   6. ConsultingCTA
   ───────────────────────────────────────────── */

export function ConsultingCTA() {
  return (
    <section className="px-6 py-24">
      <motion.div
        className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-white/10 shadow-2xl p-10 md:p-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AX 컨설팅으로 전환율을 높이세요
        </h2>

        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed mb-6">
          codemon의 데이터 기반 AX 분석으로 실질적 비즈니스 성과를 만듭니다
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-white/45 mb-8">
          <Mail className="w-4 h-4" />
          <span>help@codemon.ai</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-full bg-[#a855f7] text-white font-semibold text-base hover:bg-[#9333ea] transition-colors duration-200 cursor-pointer shadow-lg shadow-purple-500/25"
        >
          상담 문의하기
        </motion.button>
      </motion.div>
    </section>
  )
}
