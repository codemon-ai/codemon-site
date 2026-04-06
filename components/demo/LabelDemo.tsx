'use client'

import { useState, useRef, useCallback } from 'react'
import { openLabelViewer } from './LabelViewer'
import products from '../../data/demo/products.json'
import labelSpecs from '../../data/demo/label-specs.json'

type Status = 'idle' | 'generating' | 'done' | 'error'
type LabelState = { status: Status; content: string; error?: string }
type Spec = typeof labelSpecs[0]

const LABEL_TYPES = [
  { id: 'ingredients', label: '전성분 표기', icon: '🧪' },
  { id: 'usage', label: '사용방법', icon: '📋' },
  { id: 'caution', label: '주의사항', icon: '⚠️' },
  { id: 'marketing', label: '마케팅 카피', icon: '✨' },
] as const

type LabelTypeId = typeof LABEL_TYPES[number]['id']

const SYSTEM_PROMPT = '당신은 글로벌 화장품 규제 및 패키지 라벨링 전문가입니다. 각 국가의 화장품 규제(한국 식약처, 미국 FDA, EU CPNP, 중동 할랄)에 맞는 정확한 라벨 텍스트를 생성합니다. 법적 요구사항을 정확히 반영하되, 브랜드 보들(BO:DL)의 \'부드럽고 신뢰감 있는\' 톤을 유지하세요.'

function productInfo(p: typeof products[0]) {
  return `제품명: ${p.name}
카테고리: ${p.category}
가격: ${p.price.toLocaleString()}원
성분: ${p.ingredients.join(', ')}
USP: ${p.usp}
타겟: ${p.target}
설명: ${p.description}`
}

function buildPrompt(
  product: typeof products[0],
  spec: Spec,
  enabledLabelTypes: LabelTypeId[],
): string {
  const info = productInfo(product)
  const typeLabels = enabledLabelTypes
    .map(id => LABEL_TYPES.find(t => t.id === id)!)
    .map(t => `${t.icon} ${t.label}`)
    .join(', ')

  return `다음 제품의 패키지 라벨 텍스트를 ${spec.flag} ${spec.country} 규제에 맞춰 생성해주세요.

## 제품 정보
${info}

## 규제 요구사항 (${spec.authority})
- 필수 표기: ${spec.required.join(', ')}
- 금지 표현: ${spec.prohibited.join(', ')}
- 언어: ${spec.language}
- 최소 폰트: ${spec.fontMin}
- 참고: ${spec.hint}

## 생성할 라벨 항목
${typeLabels}

다음 형식으로 각 항목별 라벨 텍스트를 작성해주세요:

${enabledLabelTypes.map(id => {
  const t = LABEL_TYPES.find(lt => lt.id === id)!
  switch (id) {
    case 'ingredients':
      return `### ${t.icon} ${t.label}\n(${spec.country} 규정에 맞는 전성분 목록 — INCI 표기 포함)`
    case 'usage':
      return `### ${t.icon} ${t.label}\n(${spec.country} 언어 규정에 맞는 사용방법 텍스트)`
    case 'caution':
      return `### ${t.icon} ${t.label}\n(${spec.country} 규정 필수 주의사항 + 제품 특성별 주의사항)`
    case 'marketing':
      return `### ${t.icon} ${t.label}\n(${spec.country} 규정에 위반되지 않는 마케팅 문구 — 금지 표현 회피)`
  }
}).join('\n\n')}

반드시 ${spec.country} 규정을 준수하고, 해당 국가의 공용어로 작성하세요.`
}

function fmtPrice(n: number) {
  return `${n.toLocaleString()}원`
}

export function LabelDemo() {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const [enabledTypes, setEnabledTypes] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const t of LABEL_TYPES) init[t.id] = t.id === 'ingredients' || t.id === 'usage'
    return init
  })
  const [enabledCountries, setEnabledCountries] = useState<Set<string>>(new Set(['kr-kfda', 'us-fda']))
  const [countryStates, setCountryStates] = useState<Record<string, LabelState>>(() => {
    const init: Record<string, LabelState> = {}
    for (const s of labelSpecs) init[s.id] = { status: 'idle', content: '' }
    return init
  })
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0]

  const enabledTypeIds = LABEL_TYPES.filter(t => enabledTypes[t.id]).map(t => t.id)
  const enabledSpecList = labelSpecs.filter(s => enabledCountries.has(s.id))

  const updateState = useCallback((countryId: string, update: Partial<LabelState>) => {
    setCountryStates(prev => ({ ...prev, [countryId]: { ...prev[countryId], ...update } }))
  }, [])

  const toggleType = (typeId: string) => {
    setEnabledTypes(prev => ({ ...prev, [typeId]: !prev[typeId] }))
  }

  const toggleCountry = (id: string) => {
    setEnabledCountries(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const generate = useCallback(async (countryId: string) => {
    const spec = labelSpecs.find(s => s.id === countryId)
    if (!spec) return
    if (enabledTypeIds.length === 0) return

    const controller = new AbortController()
    abortControllers.current.set(countryId, controller)
    updateState(countryId, { status: 'generating', content: '', error: undefined })

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: buildPrompt(selectedProduct, spec, enabledTypeIds),
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
              updateState(countryId, { content: accumulated })
            } else if (data.type === 'error') {
              throw new Error(data.error)
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }

      updateState(countryId, { status: 'done' })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        updateState(countryId, { status: 'idle', content: '' })
      } else {
        updateState(countryId, { status: 'error', error: (err as Error).message })
      }
    } finally {
      abortControllers.current.delete(countryId)
    }
  }, [selectedProduct, enabledTypeIds, updateState])

  const generateAll = () => {
    for (const spec of enabledSpecList) {
      const s = countryStates[spec.id]
      if (s.status === 'idle' || s.status === 'error') {
        generate(spec.id)
      }
    }
  }

  const resetAll = () => {
    for (const [, ctrl] of abortControllers.current) ctrl.abort()
    abortControllers.current.clear()
    const init: Record<string, LabelState> = {}
    for (const s of labelSpecs) init[s.id] = { status: 'idle', content: '' }
    setCountryStates(init)
  }

  const doneCount = enabledSpecList.filter(s => countryStates[s.id].status === 'done').length
  const genCount = enabledSpecList.filter(s => countryStates[s.id].status === 'generating').length
  const allDone = doneCount > 0 && doneCount === enabledSpecList.length

  const handleOpenViewer = () => {
    const contents: Record<string, string> = {}
    for (const spec of enabledSpecList) {
      if (countryStates[spec.id].status === 'done' && countryStates[spec.id].content) {
        contents[spec.id] = countryStates[spec.id].content
      }
    }
    openLabelViewer(contents, enabledSpecList, selectedProduct.name)
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 6</div>
          <h2 className="text-xl font-bold dark:text-white">패키지 라벨 & 규제 카피</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            제품별 x 국가별 화장품 규제에 맞는 패키지 라벨 텍스트를 자동 생성합니다
          </p>
        </div>
        <a
          href="/partner/lecture-podl-ai/demo/dashboard"
          className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
        >
          대시보드
        </a>
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

      {/* Label type toggle chips */}
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">라벨 항목</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {LABEL_TYPES.map(type => {
          const enabled = enabledTypes[type.id]
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              disabled={genCount > 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                enabled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-400 dark:hover:border-purple-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          )
        })}
      </div>

      {/* Export country toggles */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">수출국 선택</div>
        <div className="flex flex-wrap gap-2">
          {labelSpecs.map(spec => {
            const isEnabled = enabledCountries.has(spec.id)
            const state = countryStates[spec.id]
            return (
              <button
                key={spec.id}
                onClick={() => toggleCountry(spec.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isEnabled
                    ? 'bg-purple-600 text-white'
                    : 'border border-black/[0.08] dark:border-white/[0.06] text-gray-600 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <span>{spec.flag}</span>
                <span className="font-medium">{spec.country}</span>
                {isEnabled && state.status !== 'idle' && (
                  <StatusBadge status={state.status} compact />
                )}
              </button>
            )
          })}
        </div>
        {/* Country authority hints */}
        {enabledSpecList.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {enabledSpecList.map(s => (
              <span key={s.id} className="text-xs text-gray-400 dark:text-gray-500">
                {s.flag} {s.authority}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={generateAll}
          disabled={enabledSpecList.length === 0 || enabledTypeIds.length === 0 || (genCount > 0 && genCount + doneCount === enabledSpecList.length)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {genCount > 0 ? `${genCount}개국 생성중...` : `라벨 생성 (${enabledSpecList.length}개국)`}
        </button>
        {allDone && (
          <button
            onClick={handleOpenViewer}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            전체 보기
          </button>
        )}
        <button
          onClick={resetAll}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-black/[0.08] dark:border-white/[0.06] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
        >
          전체 초기화
        </button>
        <span className="text-xs text-gray-400">
          {doneCount > 0 && `${doneCount}개 완료`}
          {genCount > 0 && doneCount > 0 && ' / '}
          {genCount > 0 && `${genCount}개 생성중`}
        </span>
      </div>

      {/* Inline result cards */}
      {enabledSpecList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {enabledSpecList.map(spec => {
            const state = countryStates[spec.id]
            return (
              <div
                key={spec.id}
                className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span>{spec.flag}</span>
                    <span className="text-sm font-medium dark:text-white">{spec.country}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{spec.authority}</span>
                  </div>
                  <StatusBadge status={state.status} />
                </div>
                <div className="p-3 min-h-[120px] max-h-[300px] overflow-y-auto">
                  {state.status === 'idle' && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      &quot;라벨 생성&quot; 버튼을 눌러주세요
                    </span>
                  )}
                  {state.status === 'generating' && (
                    <div>
                      <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                        {state.content}
                      </div>
                      <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-0.5" />
                    </div>
                  )}
                  {state.status === 'done' && (
                    <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                      {state.content}
                    </div>
                  )}
                  {state.status === 'error' && (
                    <div className="text-sm text-red-500">
                      오류: {state.error}
                      <button
                        onClick={() => generate(spec.id)}
                        className="ml-2 text-xs underline hover:text-red-400"
                      >
                        재시도
                      </button>
                    </div>
                  )}
                </div>
                {state.status === 'done' && (
                  <div className="px-3 py-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <button
                      onClick={() => {
                        openLabelViewer(
                          { [spec.id]: state.content },
                          [spec],
                          selectedProduct.name,
                        )
                      }}
                      className="text-xs text-purple-500 hover:text-purple-400 font-medium"
                    >
                      전체 보기
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status, compact }: { status: Status; compact?: boolean }) {
  if (compact) {
    switch (status) {
      case 'generating': return <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
      case 'done': return <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      case 'error': return <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
      default: return null
    }
  }

  switch (status) {
    case 'idle': return <span className="text-xs text-gray-400">&mdash;</span>
    case 'generating': return <span className="text-xs text-amber-500 animate-pulse">생성중</span>
    case 'done': return <span className="text-xs text-emerald-500">완료</span>
    case 'error': return <span className="text-xs text-red-500">오류</span>
  }
}
