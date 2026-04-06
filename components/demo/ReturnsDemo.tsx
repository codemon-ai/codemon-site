'use client'

import { useState, useCallback, useMemo } from 'react'
import { openReturnsViewer } from './ReturnsViewer'
import { openDemoExplain } from './DemoExplain'
import returns from '../../data/demo/returns.json'

export type Return = {
  id: string
  orderId: string
  date: string
  channel: string
  product: string
  category: string
  quantity: number
  refundAmount: number
  reason: string
  reasonCategory: string
  status: string
  customerNote: string
  region: string
}

type Status = 'idle' | 'generating' | 'done' | 'error'
type SortKey = 'product' | 'channel' | 'reason' | 'reasonCategory' | 'refundAmount' | 'date'
type SortDir = 'asc' | 'desc'

const data: Return[] = returns as Return[]

const CHANNELS = ['전체', '쿠팡', '자사몰', '올리브영'] as const
const REASON_CATEGORIES = ['전체', '품질', '배송', '기대불일치', '단순변심'] as const
const TOTAL_ORDERS = 1000

const SYSTEM_PROMPT = '당신은 보들(BO:DL) K-뷰티 브랜드의 물류/CS 분석가입니다. 반품 데이터를 분석하여 패턴을 찾고, 고객 응대 메시지를 생성하며, 반품률 개선을 위한 실행 가능한 전략을 제안합니다.'

function fmtWon(n: number) {
  if (n >= 1e8) return `\u20A9${(n / 1e8).toFixed(1)}억`
  if (n >= 1e6) return `\u20A9${(n / 1e6).toFixed(1)}M`
  return `\u20A9${n.toLocaleString()}`
}

const REASON_COLORS: Record<string, string> = {
  '품질': 'text-red-500',
  '배송': 'text-amber-500',
  '기대불일치': 'text-blue-400',
  '단순변심': 'text-gray-400',
}

function computeKpis(filtered: Return[]) {
  const totalReturns = filtered.length
  const returnRate = (totalReturns / TOTAL_ORDERS) * 100
  const totalRefund = filtered.reduce((s, r) => s + r.refundAmount, 0)

  // Most frequent reasonCategory
  const reasonCounts: Record<string, number> = {}
  for (const r of filtered) {
    reasonCounts[r.reasonCategory] = (reasonCounts[r.reasonCategory] || 0) + 1
  }
  const topReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0]
  const topReasonLabel = topReason ? `${topReason[0]} (${topReason[1]}건)` : '-'

  return { totalReturns, returnRate, totalRefund, topReasonLabel }
}

function buildPrompt(filtered: Return[]) {
  const kpi = computeKpis(filtered)

  // Aggregate by reasonCategory
  const byReason: Record<string, { count: number; refund: number }> = {}
  for (const r of filtered) {
    if (!byReason[r.reasonCategory]) byReason[r.reasonCategory] = { count: 0, refund: 0 }
    byReason[r.reasonCategory].count += 1
    byReason[r.reasonCategory].refund += r.refundAmount
  }

  // Aggregate by channel
  const byChannel: Record<string, { count: number; refund: number }> = {}
  for (const r of filtered) {
    if (!byChannel[r.channel]) byChannel[r.channel] = { count: 0, refund: 0 }
    byChannel[r.channel].count += 1
    byChannel[r.channel].refund += r.refundAmount
  }

  // Aggregate by product
  const byProduct: Record<string, { count: number; refund: number; reasons: Record<string, number> }> = {}
  for (const r of filtered) {
    if (!byProduct[r.product]) byProduct[r.product] = { count: 0, refund: 0, reasons: {} }
    byProduct[r.product].count += 1
    byProduct[r.product].refund += r.refundAmount
    byProduct[r.product].reasons[r.reasonCategory] = (byProduct[r.product].reasons[r.reasonCategory] || 0) + 1
  }

  const topProducts = Object.entries(byProduct).sort((a, b) => b[1].count - a[1].count).slice(0, 10)

  return `다음은 보들(BO:DL) K-뷰티 브랜드의 최근 반품 데이터입니다 (총 ${filtered.length}건, 전체 주문 ${TOTAL_ORDERS}건 기준).

## 전체 요약
- 총 반품: ${kpi.totalReturns}건
- 반품률: ${kpi.returnRate.toFixed(1)}%
- 총 환불액: ${fmtWon(kpi.totalRefund)}
- 최다 사유: ${kpi.topReasonLabel}

## 사유 카테고리별 현황
${Object.entries(byReason).sort((a, b) => b[1].count - a[1].count).map(([cat, v]) => `- ${cat}: ${v.count}건 (환불 ${fmtWon(v.refund)}, 비중 ${((v.count / filtered.length) * 100).toFixed(1)}%)`).join('\n')}

## 채널별 현황
${Object.entries(byChannel).sort((a, b) => b[1].count - a[1].count).map(([ch, v]) => `- ${ch}: ${v.count}건 (환불 ${fmtWon(v.refund)}, 반품률 ${((v.count / TOTAL_ORDERS) * 100).toFixed(1)}%)`).join('\n')}

## 반품 상위 제품 TOP 10
${topProducts.map(([name, v]) => `- ${name}: ${v.count}건 (환불 ${fmtWon(v.refund)}) — 사유: ${Object.entries(v.reasons).map(([r, c]) => `${r} ${c}건`).join(', ')}`).join('\n')}

## 전체 데이터
${JSON.stringify(filtered, null, 2)}

위 데이터를 바탕으로 분석해주세요:

1. **반품 사유 패턴 분석** (어떤 제품이 어떤 사유로 많이 반품되는지)
   - 제품별 반품 사유 교차 분석
   - 특이 패턴 및 이상치 탐지

2. **채널별 반품률 비교**
   - 쿠팡/자사몰/올리브영 각 채널의 반품 특성
   - 채널별 주요 반품 사유 차이

3. **고객 응대 메시지 템플릿 3종**
   - 사과 + 교환 안내
   - 환불 안내
   - 제품 개선 안내

4. **반품률 개선 액션 아이템 5개**
   - 데이터 기반의 구체적이고 실행 가능한 전략
   - 우선순위와 예상 효과 포함

5. **슬랙 알림 메시지** (반품률 급증 제품 경고)
   - 형식: 제품명, 반품 건수, 주요 사유, 권장 조치
   - 반품 상위 5개 제품에 대해 작성

마크다운 형식으로 작성해주세요.`
}

const EXPLAIN_CONFIG = {
  demoNumber: 7,
  title: '반품 분석 & 자동 대응',
  subtitle: '물류팀 · 강태호 팀장',
  steps: [
    { icon: '🔍', label: '필터 설정', desc: '채널/반품사유 카테고리별 필터' },
    { icon: '📊', label: '데이터 정렬', desc: '환불액/날짜 기준 정렬, 패턴 파악' },
    { icon: '🤖', label: 'AI 분석', desc: '반품 패턴 분석 + CS 응대 메시지 자동 생성' },
    { icon: '📄', label: '리포트 확인', desc: '사유별/채널별 차트 + CS 템플릿 리포트' },
  ],
  beforeAfter: { before: '반품 사유 집계 + CS 대응 = 반나절', after: '분석 + CS 메시지 5분', savings: '4시간 → 5분' },
  dataFlow: { input: '200건 반품 데이터', ai: '패턴 분석 + CS 생성', output: '분석 리포트 + 응대 메시지' },
  keyPoint: '반품 사유 패턴을 찾아 선제적 품질 개선 + 고객 CS 자동화',
}

export function ReturnsDemo() {
  const [status, setStatus] = useState<Status>('idle')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [channelFilter, setChannelFilter] = useState<string>('전체')
  const [reasonFilter, setReasonFilter] = useState<string>('전체')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (channelFilter !== '전체' && r.channel !== channelFilter) return false
      if (reasonFilter !== '전체' && r.reasonCategory !== reasonFilter) return false
      return true
    })
  }, [channelFilter, reasonFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number)
    })
  }, [filtered, sortKey, sortDir])

  const kpi = useMemo(() => computeKpis(filtered), [filtered])

  const toggleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }, [sortKey])

  const generate = useCallback(async () => {
    setStatus('generating')
    setContent('')
    setError(null)

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt(filtered), systemPrompt: SYSTEM_PROMPT }),
      })

      if (!res.ok) throw new Error(`API error: ${res.status}`)
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const d = JSON.parse(line.slice(6))
            if (d.type === 'text') {
              accumulated += d.text
              setContent(accumulated)
            } else if (d.type === 'error') throw new Error(d.error)
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }
      setStatus('done')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [filtered])

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' \u2191' : ' \u2193'
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 7</div>
          <h2 className="text-xl font-bold dark:text-white">반품 분석 & 자동 대응</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            반품 사유 패턴을 분석하고 고객 응대 메시지를 자동 생성합니다 | <strong>{filtered.length}건</strong> 반품
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openDemoExplain(EXPLAIN_CONFIG)}
            className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
          >
            📖 설명
          </button>
          <a
            href="/partner/lecture-podl-ai/demo/dashboard"
            className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
          >
            대시보드
          </a>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <KpiBox label="총 반품" value={`${kpi.totalReturns}건`} sub={`전체 ${TOTAL_ORDERS}건 중`} />
        <KpiBox label="반품률" value={`${kpi.returnRate.toFixed(1)}%`} sub="(반품/전체주문)" />
        <KpiBox label="총 환불액" value={fmtWon(kpi.totalRefund)} />
        <KpiBox label="최다 사유" value={kpi.topReasonLabel} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">채널</span>
          {CHANNELS.map(ch => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                channelFilter === ch
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">사유</span>
          {REASON_CATEGORIES.map(rc => (
            <button
              key={rc}
              onClick={() => setReasonFilter(rc)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                reasonFilter === rc
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
              }`}
            >
              {rc}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        반품 데이터 ({filtered.length}건)
      </div>
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-x-auto mb-4" style={{ maxHeight: 400 }}>
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
              {([
                ['product', '제품'],
                ['channel', '채널'],
                ['reason', '사유'],
                ['reasonCategory', '사유 분류'],
                ['refundAmount', '환불액'],
                ['date', '날짜'],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap cursor-pointer hover:text-purple-500 dark:hover:text-purple-400 select-none transition-colors"
                >
                  {label}{sortArrow(key)}
                </th>
              ))}
              <th className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                고객 메모
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => (
              <tr
                key={r.id}
                className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
              >
                <td className="py-1.5 px-2 dark:text-white whitespace-nowrap">
                  {r.product.length > 20 ? r.product.slice(0, 20) + '...' : r.product}
                </td>
                <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">{r.channel}</td>
                <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">{r.reason}</td>
                <td className="py-1.5 px-2">
                  <span className={REASON_COLORS[r.reasonCategory] || 'text-gray-400'}>
                    {r.reasonCategory}
                  </span>
                </td>
                <td className="py-1.5 px-2 text-right font-mono text-emerald-600 dark:text-emerald-400">
                  {fmtWon(r.refundAmount)}
                </td>
                <td className="py-1.5 px-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.date}</td>
                <td className="py-1.5 px-2 text-gray-500 dark:text-gray-400">
                  {r.customerNote.length > 20 ? r.customerNote.slice(0, 20) + '...' : r.customerNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={generate}
          disabled={status === 'generating'}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'generating' ? '분석중...' : '분석 실행'}
        </button>

        {status === 'done' && (
          <button
            onClick={() => openReturnsViewer(content, filtered)}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            분석 새창 열기
          </button>
        )}

        {status === 'generating' && <span className="text-xs text-amber-500 animate-pulse">Claude가 분석중...</span>}
        {status === 'done' && <span className="text-xs text-emerald-500">분석 완료</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  )
}

function KpiBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] p-3 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-lg font-bold dark:text-white mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}
