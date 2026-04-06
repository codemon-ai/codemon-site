'use client'

import { useState, useCallback } from 'react'
import { openReportViewer } from './ReportViewer'
import { openDemoExplain } from './DemoExplain'
import salesDetail from '../../data/demo/sales-detail.json'

type Status = 'idle' | 'generating' | 'done' | 'error'

const orders = salesDetail.orders

// Pre-compute summary for display and prompt
function computeSummary() {
  const totalRevenue = orders.reduce((s, o) => s + o.revenue, 0)
  const totalCogs = orders.reduce((s, o) => s + o.cogs, 0)
  const totalGrossProfit = orders.reduce((s, o) => s + o.grossProfit, 0)
  const totalFees = orders.reduce((s, o) => s + o.channelFee, 0)
  const totalNetProfit = orders.reduce((s, o) => s + o.netProfit, 0)

  const byChannel: Record<string, { revenue: number; orders: number; profit: number }> = {}
  const byProduct: Record<string, { revenue: number; units: number; profit: number; margin: number }> = {}
  const byDate: Record<string, number> = {}
  const byRegion: Record<string, number> = {}
  const byCustomer: Record<string, number> = {}

  for (const o of orders) {
    if (!byChannel[o.channel]) byChannel[o.channel] = { revenue: 0, orders: 0, profit: 0 }
    byChannel[o.channel].revenue += o.revenue
    byChannel[o.channel].orders += 1
    byChannel[o.channel].profit += o.netProfit

    if (!byProduct[o.product]) byProduct[o.product] = { revenue: 0, units: 0, profit: 0, margin: 0 }
    byProduct[o.product].revenue += o.revenue
    byProduct[o.product].units += o.quantity
    byProduct[o.product].profit += o.netProfit

    byDate[o.date] = (byDate[o.date] || 0) + o.revenue
    byRegion[o.region] = (byRegion[o.region] || 0) + o.revenue
    byCustomer[o.customerType] = (byCustomer[o.customerType] || 0) + o.revenue
  }

  for (const p of Object.values(byProduct)) {
    p.margin = p.revenue > 0 ? (p.profit / p.revenue) * 100 : 0
  }

  return { totalRevenue, totalCogs, totalGrossProfit, totalFees, totalNetProfit, byChannel, byProduct, byDate, byRegion, byCustomer }
}

const summary = computeSummary()

function fmtWon(n: number) {
  if (n >= 1e8) return `₩${(n / 1e8).toFixed(1)}억`
  if (n >= 1e6) return `₩${(n / 1e6).toFixed(1)}M`
  return `₩${n.toLocaleString()}`
}

function buildPrompt() {
  return `다음은 보들(BO:DL) K-뷰티 브랜드의 2026년 3월 매출 데이터 요약입니다 (총 ${orders.length}건 주문).

## 전체 요약
- 총 매출: ${fmtWon(summary.totalRevenue)}
- 매출원가(COGS): ${fmtWon(summary.totalCogs)}
- 매출총이익: ${fmtWon(summary.totalGrossProfit)} (마진율 ${(summary.totalGrossProfit / summary.totalRevenue * 100).toFixed(1)}%)
- 채널 수수료: ${fmtWon(summary.totalFees)}
- 순이익: ${fmtWon(summary.totalNetProfit)} (순이익률 ${(summary.totalNetProfit / summary.totalRevenue * 100).toFixed(1)}%)

## 채널별 매출
${Object.entries(summary.byChannel).map(([ch, v]) => `- ${ch}: 매출 ${fmtWon(v.revenue)} (${v.orders}건, 순이익 ${fmtWon(v.profit)})`).join('\n')}

## 제품별 매출
${Object.entries(summary.byProduct).sort(([,a],[,b]) => b.revenue - a.revenue).map(([p, v]) => `- ${p}: 매출 ${fmtWon(v.revenue)} (${v.units}개, 마진율 ${v.margin.toFixed(1)}%)`).join('\n')}

## 일별 매출 (최근 7일)
${Object.entries(summary.byDate).sort(([a],[b]) => b.localeCompare(a)).slice(0, 7).reverse().map(([d, v]) => `- ${d}: ${fmtWon(v)}`).join('\n')}

## 지역별 매출
${Object.entries(summary.byRegion).sort(([,a],[,b]) => b - a).map(([r, v]) => `- ${r}: ${fmtWon(v)}`).join('\n')}

## 고객 유형
${Object.entries(summary.byCustomer).map(([t, v]) => `- ${t}: ${fmtWon(v)} (${(v / summary.totalRevenue * 100).toFixed(1)}%)`).join('\n')}

위 데이터를 바탕으로 경영진용 월간 매출 리포트를 작성해주세요.

요구사항:
1. 핵심 인사이트 3개 (가장 중요한 발견부터)
2. 채널별 분석 — 어느 채널이 성장/하락? 수수료 대비 수익성은?
3. 제품별 분석 — 마진율 기준 베스트/워스트, 재고 전략 제안
4. 지역별 분석 — 집중 투자 지역 추천
5. 신규 vs 재구매 분석 — 충성 고객 확보 전략
6. 다음 달 액션 아이템 5개
7. 마크다운 형식, 표 포함`
}

const SYSTEM_PROMPT = '당신은 보들(BO:DL) K-뷰티 브랜드의 CFO 겸 데이터 분석가입니다. 매출/원가/이익 데이터를 기반으로 경영진이 의사결정에 활용할 수 있는 인사이트 중심 리포트를 작성합니다.'

const EXPLAIN_CONFIG = {
  demoNumber: 2,
  title: '매출 데이터 일일 리포트',
  subtitle: 'MD팀 · 정우진 팀장 / 회계팀 · 윤서아 팀장',
  steps: [
    { icon: '📊', label: 'KPI 확인', desc: '1,000건 주문의 매출/원가/이익 요약' },
    { icon: '🤖', label: '리포트 생성', desc: 'Claude가 데이터를 분석하여 인사이트 도출' },
    { icon: '📄', label: '차트 리포트', desc: '5종 SVG 차트 포함 리포트를 새창에서 확인' },
  ],
  beforeAfter: { before: '3채널 데이터 취합 2시간 + 분석 1시간', after: '버튼 1번 → 리포트 2분', savings: '3시간 → 2분' },
  dataFlow: { input: '1,000건 주문 데이터', ai: '매출 분석 + 인사이트', output: '경영진 리포트 + 차트' },
  keyPoint: '쿠팡/자사몰/올리브영 3채널 데이터를 하나의 리포트로 자동 통합',
}

export function ReportDemo() {
  const [status, setStatus] = useState<Status>('idle')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async () => {
    setStatus('generating')
    setContent('')
    setError(null)

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt(), systemPrompt: SYSTEM_PROMPT }),
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
            const data = JSON.parse(line.slice(6))
            if (data.type === 'text') {
              accumulated += data.text
              setContent(accumulated)
            } else if (data.type === 'error') throw new Error(data.error)
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
  }, [])

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 2</div>
          <h2 className="text-xl font-bold dark:text-white">매출 데이터 일일 리포트</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            기간: {salesDetail.period} | <strong>{salesDetail.totalOrders.toLocaleString()}건</strong> 주문 데이터
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openDemoExplain(EXPLAIN_CONFIG)}
            className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
          >
            📖 설명
          </button>
          <a href="/partner/lecture-podl-ai/demo/dashboard" className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors">
            📊 대시보드
          </a>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <KpiBox label="총 매출" value={fmtWon(summary.totalRevenue)} />
        <KpiBox label="매출원가" value={fmtWon(summary.totalCogs)} />
        <KpiBox label="매출총이익" value={fmtWon(summary.totalGrossProfit)} sub={`마진율 ${(summary.totalGrossProfit / summary.totalRevenue * 100).toFixed(1)}%`} />
        <KpiBox label="순이익" value={fmtWon(summary.totalNetProfit)} sub={`순이익률 ${(summary.totalNetProfit / summary.totalRevenue * 100).toFixed(1)}%`} />
      </div>

      {/* Data preview */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">📋 주문 데이터 미리보기 (상위 20건 / {orders.length}건)</div>
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-x-auto mb-4" style={{ maxHeight: 300 }}>
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-white dark:bg-gray-900">
            <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
              {['ID', '날짜', '채널', '제품', '수량', '매출', '원가', '총이익', '수수료', '순이익', '지역', '고객'].map(h => (
                <th key={h} className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 20).map(o => (
              <tr key={o.id} className="border-b border-black/[0.03] dark:border-white/[0.03]">
                <td className="py-1.5 px-2 text-gray-500 font-mono">{o.id.slice(-8)}</td>
                <td className="py-1.5 px-2">{o.date.slice(5)}</td>
                <td className="py-1.5 px-2">{o.channel}</td>
                <td className="py-1.5 px-2 whitespace-nowrap">{o.product.length > 10 ? o.product.slice(0, 10) + '…' : o.product}</td>
                <td className="py-1.5 px-2 text-right">{o.quantity}</td>
                <td className="py-1.5 px-2 text-right text-emerald-600 dark:text-emerald-400">{fmtWon(o.revenue)}</td>
                <td className="py-1.5 px-2 text-right text-red-500">{fmtWon(o.cogs)}</td>
                <td className="py-1.5 px-2 text-right">{fmtWon(o.grossProfit)}</td>
                <td className="py-1.5 px-2 text-right text-orange-500">{fmtWon(o.channelFee)}</td>
                <td className="py-1.5 px-2 text-right font-medium text-purple-600 dark:text-purple-400">{fmtWon(o.netProfit)}</td>
                <td className="py-1.5 px-2">{o.region}</td>
                <td className="py-1.5 px-2">{o.customerType}</td>
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
          {status === 'generating' ? '⏳ 리포트 생성중...' : '▶ 리포트 생성'}
        </button>

        {status === 'done' && (
          <button
            onClick={() => openReportViewer(content, orders)}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            📄 리포트 새창 열기
          </button>
        )}

        {status === 'generating' && <span className="text-xs text-amber-500 animate-pulse">⏳ Claude가 분석중...</span>}
        {status === 'done' && <span className="text-xs text-emerald-500">✅ 리포트 완료</span>}
        {error && <span className="text-xs text-red-500">❌ {error}</span>}
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
