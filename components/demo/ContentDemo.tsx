'use client'

import { useState, useRef, useCallback } from 'react'
import { openContentViewer } from './ContentViewer'
import { openDemoExplain } from './DemoExplain'
import products from '../../data/demo/products.json'

type Status = 'idle' | 'generating' | 'done' | 'error'
type ContentState = { status: Status; content: string; error?: string }

const CONTENT_TYPES = [
  { id: 'detail-page', label: '상세페이지 카피', icon: '📄' },
  { id: 'carousel', label: '인스타 캐러셀', icon: '🖼️' },
  { id: 'hashtags', label: '해시태그', icon: '#️⃣' },
  { id: 'tiktok', label: '틱톡 스크립트', icon: '🎬' },
] as const

type ContentTypeId = typeof CONTENT_TYPES[number]['id']

const SYSTEM_PROMPT = '당신은 보들(BO:DL) K-뷰티 브랜드의 콘텐츠 크리에이터입니다. 보들의 브랜드 톤(부드럽고 신뢰감 있는)을 일관되게 유지하세요.'

function productInfo(p: typeof products[0]) {
  return `제품명: ${p.name}
카테고리: ${p.category}
가격: ${p.price.toLocaleString()}원
성분: ${p.ingredients.join(', ')}
USP: ${p.usp}
타겟: ${p.target}
설명: ${p.description}`
}

function buildPrompt(typeId: ContentTypeId, product: typeof products[0]): string {
  const info = productInfo(product)

  switch (typeId) {
    case 'detail-page':
      return `다음 제품의 상세페이지 카피를 작성해주세요. 히어로 카피 + 제품 특징 3가지 + CTA. 500자 내외.

${info}`
    case 'carousel':
      return `다음 제품의 인스타그램 캐러셀 문구 5종을 작성해주세요. 각 슬라이드 제목 + 본문. 스와이프 유도 포함.

${info}`
    case 'hashtags':
      return `다음 제품 관련 해시태그 20개를 생성해주세요. 브랜드, 제품, 성분, 타겟, 트렌드 포함.

${info}`
    case 'tiktok':
      return `다음 제품의 틱톡 숏폼 스크립트(15초)를 작성해주세요. 후킹 → 제품소개 → CTA 구조.

${info}`
  }
}

function fmtPrice(n: number) {
  return `${n.toLocaleString()}원`
}

const EXPLAIN_CONFIG = {
  demoNumber: 4,
  title: '상품 콘텐츠 자동 생성',
  subtitle: '콘텐츠팀 · 이하은 팀장',
  steps: [
    { icon: '🛍️', label: '제품 선택', desc: '5개 제품 중 콘텐츠 생성 대상 선택' },
    { icon: '🎯', label: '유형 선택', desc: '상세페이지/캐러셀/해시태그/틱톡 중 선택' },
    { icon: '⚡', label: '병렬 생성', desc: '선택한 유형별로 동시에 콘텐츠 생성' },
    { icon: '👀', label: '탭별 확인', desc: '탭 뷰어에서 유형별 결과 확인 및 복사' },
  ],
  beforeAfter: { before: '상세페이지+SNS+해시태그+틱톡 = 4시간', after: '4종 동시 생성 3분', savings: '4시간 → 3분' },
  dataFlow: { input: '제품 정보 1개', ai: '4종 콘텐츠 동시 생성', output: '상세페이지 + SNS + 해시태그 + 틱톡' },
  keyPoint: '하나의 제품 정보로 4가지 채널용 콘텐츠를 한번에 생성',
}

export function ContentDemo() {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const [enabledTypes, setEnabledTypes] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const t of CONTENT_TYPES) init[t.id] = true
    return init
  })
  const [states, setStates] = useState<Record<string, ContentState>>(() => {
    const init: Record<string, ContentState> = {}
    for (const t of CONTENT_TYPES) init[t.id] = { status: 'idle', content: '' }
    return init
  })
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0]

  const updateState = useCallback((typeId: string, update: Partial<ContentState>) => {
    setStates(prev => ({ ...prev, [typeId]: { ...prev[typeId], ...update } }))
  }, [])

  const toggleType = (typeId: string) => {
    setEnabledTypes(prev => ({ ...prev, [typeId]: !prev[typeId] }))
  }

  const generate = useCallback(async (typeId: ContentTypeId) => {
    const controller = new AbortController()
    abortControllers.current.set(typeId, controller)
    updateState(typeId, { status: 'generating', content: '', error: undefined })

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: buildPrompt(typeId, selectedProduct),
          systemPrompt: SYSTEM_PROMPT,
        }),
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
              updateState(typeId, { content: accumulated })
            } else if (data.type === 'error') {
              throw new Error(data.error)
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }

      updateState(typeId, { status: 'done' })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        updateState(typeId, { status: 'idle', content: '' })
      } else {
        updateState(typeId, { status: 'error', error: (err as Error).message })
      }
    } finally {
      abortControllers.current.delete(typeId)
    }
  }, [selectedProduct, updateState])

  const generateAll = () => {
    for (const type of CONTENT_TYPES) {
      if (enabledTypes[type.id] && states[type.id].status !== 'generating') {
        generate(type.id)
      }
    }
  }

  const resetAll = () => {
    for (const [, ctrl] of abortControllers.current) ctrl.abort()
    abortControllers.current.clear()
    const init: Record<string, ContentState> = {}
    for (const t of CONTENT_TYPES) init[t.id] = { status: 'idle', content: '' }
    setStates(init)
  }

  const doneCount = Object.values(states).filter(s => s.status === 'done').length
  const genCount = Object.values(states).filter(s => s.status === 'generating').length
  const enabledCount = Object.values(enabledTypes).filter(Boolean).length

  const handleOpenViewer = () => {
    const contents: Record<string, string> = {}
    for (const type of CONTENT_TYPES) {
      if (states[type.id].status === 'done' && states[type.id].content) {
        contents[type.id] = states[type.id].content
      }
    }
    openContentViewer(contents, selectedProduct.name)
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 4</div>
          <h2 className="text-xl font-bold dark:text-white">상품 콘텐츠 자동 생성</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            제품 정보를 기반으로 4종 콘텐츠를 병렬 생성합니다
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
            📊 대시보드
          </a>
        </div>
      </div>

      {/* Product selector — horizontal scroll */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">제품 선택</div>
      <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-thin">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProductId(p.id)}
            className={`flex-shrink-0 w-48 text-left rounded-lg border-2 p-3 transition-all ${
              p.id === selectedProductId
                ? 'border-purple-500 bg-purple-500/5 dark:bg-purple-500/10'
                : 'border-black/[0.08] dark:border-white/[0.06] hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="text-sm font-semibold dark:text-white truncate">{p.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.category} · {fmtPrice(p.price)}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{p.usp}</div>
          </button>
        ))}
      </div>

      {/* Selected product detail */}
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] p-4 mb-4 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-bold dark:text-white">{selectedProduct.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500">{selectedProduct.category}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{fmtPrice(selectedProduct.price)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{selectedProduct.usp}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">타겟: {selectedProduct.target}</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.ingredients.map(ing => (
                <span key={ing} className="text-xs px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-300">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content type toggle chips */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">콘텐츠 유형</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {CONTENT_TYPES.map(type => {
          const enabled = enabledTypes[type.id]
          const s = states[type.id]
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              disabled={s.status === 'generating'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                enabled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-400 dark:hover:border-purple-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
              {s.status === 'generating' && <span className="animate-pulse">⏳</span>}
              {s.status === 'done' && <span>✅</span>}
              {s.status === 'error' && <span>❌</span>}
            </button>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={generateAll}
          disabled={genCount > 0 || enabledCount === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {genCount > 0 ? `⏳ ${genCount}건 생성중...` : `▶ 전체 생성 (${enabledCount}종)`}
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-black/[0.08] dark:border-white/[0.06] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
        >
          전체 초기화
        </button>
        {doneCount > 0 && (
          <button
            onClick={handleOpenViewer}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            📄 새창 보기
          </button>
        )}
        <span className="text-xs text-gray-400">
          {doneCount > 0 && `✅ ${doneCount}종 완료`}
          {genCount > 0 && doneCount > 0 && ' · '}
          {genCount > 0 && `⏳ ${genCount}종 생성중`}
        </span>
      </div>

      {/* Result rows */}
      <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06]">
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">콘텐츠 유형</th>
              <th className="text-center py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">상태</th>
              <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">미리보기</th>
              <th className="text-center py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">액션</th>
            </tr>
          </thead>
          <tbody>
            {CONTENT_TYPES.map(type => {
              const s = states[type.id]
              const enabled = enabledTypes[type.id]
              return (
                <tr
                  key={type.id}
                  className={`border-b border-black/[0.03] dark:border-white/[0.03] ${
                    enabled ? '' : 'opacity-40'
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span className="font-medium dark:text-white">{type.label}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-2.5 px-3">
                    {s.content ? (
                      <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {s.content.slice(0, 80)}...
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <RowAction
                      status={s.status}
                      enabled={enabled}
                      onGenerate={() => generate(type.id)}
                      onOpen={() => {
                        const contents: Record<string, string> = { [type.id]: s.content }
                        openContentViewer(contents, selectedProduct.name)
                      }}
                    />
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

function RowAction({ status, enabled, onGenerate, onOpen }: {
  status: Status; enabled: boolean; onGenerate: () => void; onOpen: () => void
}) {
  if (!enabled) return <span className="text-xs text-gray-300 dark:text-gray-600">비활성</span>
  switch (status) {
    case 'idle':
      return <button onClick={onGenerate} className="px-3 py-1 rounded text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors">생성</button>
    case 'generating':
      return <span className="px-3 py-1 rounded text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30">생성중...</span>
    case 'done':
      return <button onClick={onOpen} className="px-3 py-1 rounded text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">새창 보기</button>
    case 'error':
      return <button onClick={onGenerate} className="px-3 py-1 rounded text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">재시도</button>
  }
}
