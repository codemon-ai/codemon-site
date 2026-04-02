'use client'

import { useState, useRef, useCallback } from 'react'
import { openMarkdownViewer } from './MarkdownViewer'
import influencers from '../../data/demo/influencers.json'
import products from '../../data/demo/products.json'

const product = products[0] // 밤투폼

type Status = 'idle' | 'generating' | 'done' | 'error'
type InfluencerState = { status: Status; content: string; error?: string }

const TONE_PRESETS = [
  { id: 'friendly-casual', label: '친근 캐주얼', desc: '반말 섞인 친근한 톤, 이모지 활용, 인플루언서를 팬처럼 대하기' },
  { id: 'professional', label: '비즈니스 포멀', desc: '존댓말, 체계적 구조, 브랜드 신뢰도 강조, 수치/데이터 포함' },
  { id: 'warm-personal', label: '따뜻한 개인적', desc: '인플루언서의 콘텐츠를 구체적으로 언급, 진심 어린 감성' },
  { id: 'trendy-gen-z', label: 'MZ 트렌디', desc: '짧고 임팩트 있는 문장, 트렌드 키워드, 숏폼/릴스 콜라보 강조' },
  { id: 'expert-collab', label: '전문가 협업', desc: '성분/효능 중심, 공동 연구/리뷰 제안, 전문성 인정' },
  { id: 'storytelling', label: '스토리텔링', desc: '브랜드 탄생 스토리로 시작, 감성적 서사, 함께 만들어가는 느낌' },
  { id: 'data-driven', label: '데이터 중심', desc: '매출/조회수/성장률 등 숫자로 어필, ROI 기대치 제시' },
  { id: 'exclusive-vip', label: 'VIP 독점', desc: '한정 시딩, 선공개 혜택 강조, 특별함/희소성 어필' },
  { id: 'fun-creative', label: '재밌고 크리에이티브', desc: '유머 섞기, 독특한 콜라보 아이디어 제안, 차별화된 콘텐츠 기획' },
  { id: 'global-kbeauty', label: '글로벌 K-뷰티', desc: '해외 트렌드 언급, K-뷰티 글로벌 인기, 크로스보더 협업 제안' },
] as const satisfies readonly { id: string; label: string; desc: string }[]

type TonePreset = typeof TONE_PRESETS[number]

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

function buildPrompt(inf: typeof influencers[0], tonePreset: TonePreset) {
  return `다음 인플루언서에게 보들(BO:DL)의 "${product.name}" 시딩 이메일을 작성해주세요.

인플루언서 정보:
- 이름: ${inf.name}
- 팔로워: ${inf.followers.toLocaleString()}명
- 채널: ${inf.channel}
- 카테고리: ${inf.category}

제품 정보:
- ${product.name} (${product.category}, ${product.price.toLocaleString()}원)
- USP: ${product.usp}
- 성분: ${product.ingredients.join(', ')}
- 타겟: ${product.target}

톤 & 스타일: **${tonePreset.label}**
${tonePreset.desc}

요구사항:
- 위 톤/스타일을 충실히 반영
- 인플루언서의 채널과 카테고리에 맞춰 개인화
- 구조: 인사 → 브랜드 소개 → 제품 소개 → 협업 제안 → 마무리
- 마크다운 형식으로 작성 (## 제목, **강조**, 불릿 등)
- 이메일 제목(Subject)도 포함`
}

const SYSTEM_PROMPT = '당신은 K-뷰티 브랜드 보들(BO:DL)의 인플루언서 마케팅 담당자입니다. 각 인플루언서의 특성에 맞춰 톤과 내용을 개인화한 시딩 이메일을 작성합니다.'

export function SeedingDemo() {
  const [states, setStates] = useState<Record<string, InfluencerState>>(() => {
    const init: Record<string, InfluencerState> = {}
    for (const inf of influencers) init[inf.name] = { status: 'idle', content: '' }
    return init
  })
  const [selectedTone, setSelectedTone] = useState<TonePreset>(TONE_PRESETS[0])
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  const updateState = useCallback((name: string, update: Partial<InfluencerState>) => {
    setStates(prev => ({ ...prev, [name]: { ...prev[name], ...update } }))
  }, [])

  const generate = useCallback(async (inf: typeof influencers[0]) => {
    const name = inf.name
    const controller = new AbortController()
    abortControllers.current.set(name, controller)

    updateState(name, { status: 'generating', content: '', error: undefined })

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt(inf, selectedTone), systemPrompt: SYSTEM_PROMPT }),
        signal: controller.signal,
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
              updateState(name, { content: accumulated })
            } else if (data.type === 'error') {
              throw new Error(data.error)
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }

      updateState(name, { status: 'done' })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        updateState(name, { status: 'idle', content: '' })
      } else {
        updateState(name, { status: 'error', error: (err as Error).message })
      }
    } finally {
      abortControllers.current.delete(name)
    }
  }, [updateState, selectedTone])

  const generateAll = () => {
    for (const inf of influencers) {
      if (states[inf.name].status === 'idle' || states[inf.name].status === 'error') {
        generate(inf)
      }
    }
  }

  const resetAll = () => {
    for (const [name, ctrl] of abortControllers.current) ctrl.abort()
    abortControllers.current.clear()
    const init: Record<string, InfluencerState> = {}
    for (const inf of influencers) init[inf.name] = { status: 'idle', content: '' }
    setStates(init)
  }

  const doneCount = Object.values(states).filter(s => s.status === 'done').length
  const genCount = Object.values(states).filter(s => s.status === 'generating').length

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 1</div>
          <h2 className="text-xl font-bold dark:text-white">인플루언서 시딩 이메일 자동화</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            인플루언서별 개인화 이메일을 병렬로 생성합니다 — 제품: <strong>{product.name}</strong>
          </p>
        </div>
        <a
          href="/partner/lecture-podl-ai/demo/dashboard"
          className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
        >
          📊 대시보드
        </a>
      </div>

      {/* Tone Selector */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">🎨 톤 프리셋</div>
        <div className="flex flex-wrap gap-2">
          {TONE_PRESETS.map(tone => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone)}
              title={tone.desc}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTone.id === tone.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-black/[0.03] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]'
              }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{selectedTone.desc}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={generateAll}
          disabled={genCount > 0 && doneCount + genCount === influencers.length}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {genCount > 0 ? `⏳ ${genCount}명 생성중...` : '▶ 전체 생성'}
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-black/[0.08] dark:border-white/[0.06] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
        >
          전체 초기화
        </button>
        <span className="text-xs text-gray-400">
          {doneCount > 0 && `✅ ${doneCount}명 완료`}
          {genCount > 0 && doneCount > 0 && ' · '}
          {genCount > 0 && `⏳ ${genCount}명 생성중`}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06]">
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">이름</th>
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">팔로워</th>
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">채널</th>
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">카테고리</th>
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">톤</th>
              <th className="text-center py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">상태</th>
              <th className="text-center py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">액션</th>
            </tr>
          </thead>
          <tbody>
            {influencers.map(inf => {
              const s = states[inf.name]
              return (
                <tr key={inf.name} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                  <td className="py-2 px-3 font-medium dark:text-white">{inf.name}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{formatFollowers(inf.followers)}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{inf.channel}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{inf.category}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{inf.tone}</td>
                  <td className="py-2 px-3 text-center">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <ActionButton state={s} onGenerate={() => generate(inf)} onOpen={() => openMarkdownViewer(inf.name, s.content)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case 'idle': return <span className="text-xs text-gray-400">—</span>
    case 'generating': return <span className="text-xs text-amber-500 animate-pulse">⏳ 생성중</span>
    case 'done': return <span className="text-xs text-emerald-500">✅ 완료</span>
    case 'error': return <span className="text-xs text-red-500">❌ 오류</span>
  }
}

function ActionButton({ state, onGenerate, onOpen }: { state: InfluencerState; onGenerate: () => void; onOpen: () => void }) {
  switch (state.status) {
    case 'idle':
      return (
        <button onClick={onGenerate} className="px-3 py-1 rounded text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors">
          생성
        </button>
      )
    case 'generating':
      return (
        <span className="px-3 py-1 rounded text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30">
          생성중...
        </span>
      )
    case 'done':
      return (
        <button onClick={onOpen} className="px-3 py-1 rounded text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
          새창 열기
        </button>
      )
    case 'error':
      return (
        <button onClick={onGenerate} className="px-3 py-1 rounded text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
          재시도
        </button>
      )
  }
}
