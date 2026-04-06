'use client'

import { useState, useCallback, useMemo } from 'react'
import { openTrackingViewer } from './TrackingViewer'
import snsPosts from '../../data/demo/sns-posts.json'

export type Post = {
  id: number
  platform: string
  type: string
  title: string
  date: string
  views: number
  likes: number
  comments: number
  shares: number
  product: string | null
}

type Status = 'idle' | 'generating' | 'done' | 'error'
type SortKey = 'title' | 'platform' | 'type' | 'views' | 'likes' | 'engagementRate'
type SortDir = 'asc' | 'desc'

const posts: Post[] = snsPosts as Post[]

const PLATFORMS = ['전체', '인스타그램', '틱톡'] as const
const TYPES = ['전체', '릴스', '숏폼', '캐러셀', '피드'] as const
const HIT_THRESHOLD = 100_000

const SYSTEM_PROMPT = '당신은 보들(BO:DL) K-뷰티 브랜드의 콘텐츠 마케팅 분석가입니다. SNS 데이터를 분석하여 히트 패턴을 찾고, 실행 가능한 전략을 제안합니다.'

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

function engagementRate(p: Post): number {
  if (p.views === 0) return 0
  return ((p.likes + p.comments + p.shares) / p.views) * 100
}

function computeKpis(filtered: Post[]) {
  const totalViews = filtered.reduce((s, p) => s + p.views, 0)
  const totalEngagement = filtered.reduce((s, p) => s + p.likes + p.comments + p.shares, 0)
  const avgRate = filtered.length > 0 ? filtered.reduce((s, p) => s + engagementRate(p), 0) / filtered.length : 0
  const hitCount = filtered.filter(p => p.views >= HIT_THRESHOLD).length
  return { totalViews, totalEngagement, avgRate, hitCount }
}

function buildPrompt(filtered: Post[]) {
  const kpi = computeKpis(filtered)

  // Aggregate by platform
  const byPlatform: Record<string, { views: number; engagement: number; count: number }> = {}
  for (const p of filtered) {
    if (!byPlatform[p.platform]) byPlatform[p.platform] = { views: 0, engagement: 0, count: 0 }
    byPlatform[p.platform].views += p.views
    byPlatform[p.platform].engagement += p.likes + p.comments + p.shares
    byPlatform[p.platform].count += 1
  }

  // Aggregate by type
  const byType: Record<string, { views: number; engagement: number; count: number }> = {}
  for (const p of filtered) {
    if (!byType[p.type]) byType[p.type] = { views: 0, engagement: 0, count: 0 }
    byType[p.type].views += p.views
    byType[p.type].engagement += p.likes + p.comments + p.shares
    byType[p.type].count += 1
  }

  const hitPosts = filtered.filter(p => p.views >= HIT_THRESHOLD).sort((a, b) => b.views - a.views)

  return `다음은 보들(BO:DL) K-뷰티 브랜드의 최근 SNS 게시물 성과 데이터입니다 (총 ${filtered.length}건).

## 전체 요약
- 총 조회수: ${formatNumber(kpi.totalViews)}
- 총 인게이지먼트: ${formatNumber(kpi.totalEngagement)} (좋아요+댓글+공유)
- 평균 참여율: ${kpi.avgRate.toFixed(2)}%
- 히트 콘텐츠 (10만+ 조회): ${kpi.hitCount}건

## 채널별 성과
${Object.entries(byPlatform).map(([ch, v]) => `- ${ch}: 조회 ${formatNumber(v.views)} (${v.count}건, 인게이지먼트 ${formatNumber(v.engagement)}, 참여율 ${v.views > 0 ? ((v.engagement / v.views) * 100).toFixed(2) : 0}%)`).join('\n')}

## 콘텐츠 형식별 성과
${Object.entries(byType).map(([t, v]) => `- ${t}: 조회 ${formatNumber(v.views)} (${v.count}건, 인게이지먼트 ${formatNumber(v.engagement)}, 참여율 ${v.views > 0 ? ((v.engagement / v.views) * 100).toFixed(2) : 0}%)`).join('\n')}

## 히트 콘텐츠 목록 (10만+ 조회)
${hitPosts.map(p => `- "${p.title}" (${p.platform}/${p.type}) — 조회 ${formatNumber(p.views)}, 참여율 ${engagementRate(p).toFixed(2)}%${p.product ? `, 제품: ${p.product}` : ''}`).join('\n')}

## 전체 데이터
${JSON.stringify(filtered, null, 2)}

위 데이터를 바탕으로 분석해주세요:

1. **히트 콘텐츠 분석** (조회수 10만 이상)
   - 어떤 콘텐츠가 잘 됐는지, 왜 잘 됐는지 분석
   - 공통 패턴 도출

2. **채널별 성과 비교**
   - 인스타그램 vs 틱톡 성과 차이
   - 각 채널의 강점과 최적 콘텐츠 형식

3. **콘텐츠 형식별 효과 비교**
   - 릴스/숏폼/캐러셀/피드 중 어느 형식이 가장 효과적인지
   - 형식별 참여율 차이 원인 분석

4. **슬랙 알림 메시지** (조회수 10만 이상 히트 콘텐츠)
   - 형식 예시: "🔥 [콘텐츠명] X만뷰 돌파!"
   - 모든 히트 콘텐츠에 대해 작성

5. **다음 콘텐츠 전략 제안 3개**
   - 데이터 기반의 구체적이고 실행 가능한 전략
   - 채널, 형식, 주제, 타이밍 포함

마크다운 형식으로 작성해주세요.`
}

export function TrackingDemo() {
  const [status, setStatus] = useState<Status>('idle')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<string>('전체')
  const [typeFilter, setTypeFilter] = useState<string>('전체')
  const [sortKey, setSortKey] = useState<SortKey>('views')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    return posts.filter(p => {
      if (platformFilter !== '전체' && p.platform !== platformFilter) return false
      if (typeFilter !== '전체' && p.type !== typeFilter) return false
      return true
    })
  }, [platformFilter, typeFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av: number | string
      let bv: number | string
      if (sortKey === 'engagementRate') {
        av = engagementRate(a)
        bv = engagementRate(b)
      } else {
        av = a[sortKey]
        bv = b[sortKey]
      }
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
  }, [filtered])

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 3</div>
          <h2 className="text-xl font-bold dark:text-white">SNS 소재 성과 트래킹</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            히트 콘텐츠 패턴을 분석하고 다음 전략을 제안합니다 | <strong>{filtered.length}건</strong> 게시물
          </p>
        </div>
        <a
          href="/partner/lecture-podl-ai/demo/dashboard"
          className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
        >
          📊 대시보드
        </a>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <KpiBox label="총 조회수" value={formatNumber(kpi.totalViews)} />
        <KpiBox label="총 인게이지먼트" value={formatNumber(kpi.totalEngagement)} sub="좋아요+댓글+공유" />
        <KpiBox label="평균 참여율" value={`${kpi.avgRate.toFixed(2)}%`} sub="(인게이지먼트/조회수)" />
        <KpiBox label="히트 콘텐츠" value={`${kpi.hitCount}건`} sub="조회수 10만 이상" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">채널</span>
          {PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                platformFilter === p
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">형식</span>
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                typeFilter === t
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        📋 게시물 데이터 ({filtered.length}건)
      </div>
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-x-auto mb-4" style={{ maxHeight: 400 }}>
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
              {([
                ['title', '제목'],
                ['platform', '채널'],
                ['type', '형식'],
                ['views', '조회수'],
                ['likes', '좋아요'],
                ['engagementRate', '참여율'],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap cursor-pointer hover:text-purple-500 dark:hover:text-purple-400 select-none transition-colors"
                >
                  {label}{sortArrow(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => {
              const isHit = p.views >= HIT_THRESHOLD
              return (
                <tr
                  key={p.id}
                  className={`border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-black/[0.01] dark:hover:bg-white/[0.01] ${
                    isHit ? 'border-l-2 border-l-amber-400' : ''
                  }`}
                >
                  <td className="py-1.5 px-2 dark:text-white whitespace-nowrap">
                    {p.title.length > 20 ? p.title.slice(0, 20) + '...' : p.title}
                    {isHit && <span className="ml-1 text-amber-500" title="히트 콘텐츠">🔥</span>}
                  </td>
                  <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">
                    <span className={p.platform === '인스타그램' ? 'text-pink-500' : 'text-blue-400'}>
                      {p.platform}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">{p.type}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-emerald-600 dark:text-emerald-400">{formatNumber(p.views)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-gray-600 dark:text-gray-300">{formatNumber(p.likes)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-purple-600 dark:text-purple-400">{engagementRate(p).toFixed(2)}%</td>
                </tr>
              )
            })}
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
          {status === 'generating' ? '⏳ 분석중...' : '▶ 분석 실행'}
        </button>

        {status === 'done' && (
          <button
            onClick={() => openTrackingViewer(content, filtered)}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            📄 분석 새창 열기
          </button>
        )}

        {status === 'generating' && <span className="text-xs text-amber-500 animate-pulse">⏳ Claude가 분석중...</span>}
        {status === 'done' && <span className="text-xs text-emerald-500">✅ 분석 완료</span>}
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
