'use client'

import { useState, useRef, useCallback } from 'react'
import { openLocalizeViewer } from './LocalizeViewer'
import { openDemoExplain } from './DemoExplain'
import marketingCopy from '../../data/demo/marketing-copy.json'

type CopyItem = typeof marketingCopy[0]
type Status = 'idle' | 'generating' | 'done' | 'error'
type MarketState = { status: Status; content: string; error?: string }

const MARKETS = [
  { id: 'en-us', label: 'English (US)', flag: '\u{1F1FA}\u{1F1F8}', hint: 'Clean Beauty, 성분 중심, Amazon US' },
  { id: 'ar-mena', label: 'Arabic (MENA)', flag: '\u{1F1F8}\u{1F1E6}', hint: '할랄 뷰티, 자연 성분, 고급 포지셔닝' },
  { id: 'ja-jp', label: 'Japanese', flag: '\u{1F1EF}\u{1F1F5}', hint: 'J-뷰티 비교, 성분 상세, Qoo10/Amazon JP' },
  { id: 'zh-cn', label: 'Chinese (CN)', flag: '\u{1F1E8}\u{1F1F3}', hint: '성분 안전성, 샤오홍슈/티몰' },
  { id: 'fr-fr', label: 'French', flag: '\u{1F1EB}\u{1F1F7}', hint: '럭셔리 포지셔닝, 클린 뷰티' },
]

const SYSTEM_PROMPT = '당신은 글로벌 마케팅 현지화 전문가입니다. K-뷰티 브랜드의 마케팅 카피를 각 문화권에 맞게 현지화합니다. 단순 번역이 아니라 해당 시장의 뷰티 문화, 소비자 심리, 트렌드를 반영하세요.'

const MARKET_INSTRUCTIONS: Record<string, string> = {
  'en-us': `**영어 (미국 시장 - Amazon US)**
- 미국 소비자의 K-뷰티 관심사 반영
- 성분 중심 마케팅 (Clean Beauty 트렌드)
- 자연스러운 미국식 영어 (번역체 X)
- FDA 친화적 표현, "dermatologist-tested" 등 신뢰 키워드`,
  'ar-mena': `**아랍어 (중동 시장 - MENA)**
- 할랄 뷰티 / 자연 성분 강조
- 중동 소비자의 스킨케어 기대치 반영
- 고급스럽고 우아한 톤
- 아랍어 RTL(우→좌) 문화권에 맞는 표현`,
  'ja-jp': `**일본어 (일본 시장 - Amazon JP / Qoo10)**
- J-뷰티와 비교 포지셔닝 (K-뷰티 강점 어필)
- 성분 상세 설명 (일본 소비자는 성분을 꼼꼼히 확인)
- 정중하고 세련된 일본어 톤
- "敏感肌にも" 등 일본 뷰티 키워드 활용`,
  'zh-cn': `**중국어 간체 (중국 시장 - 샤오홍슈 / 티몰)**
- 성분 안전성 강조 (중국 소비자의 최대 관심사)
- 샤오홍슈 스타일 감성 카피
- 한류 / K-뷰티 프리미엄 이미지 활용
- "成分安全" "温和不刺激" 등 중국 뷰티 키워드`,
  'fr-fr': `**프랑스어 (프랑스 시장)**
- 럭셔리 포지셔닝 (프랑스 = 뷰티 종주국)
- 클린 뷰티 + 자연 유래 성분 강조
- 세련되고 문학적인 프랑스어 톤
- "soin doux" "haute efficacité" 등 프랑스 뷰티 키워드`,
}

function buildPrompt(copy: CopyItem, marketId: string) {
  const market = MARKETS.find(m => m.id === marketId)!
  const instructions = MARKET_INSTRUCTIONS[marketId]

  return `다음은 보들(BO:DL) K-뷰티 브랜드의 마케팅 카피입니다.

유형: ${copy.type}
${copy.product ? `제품: ${copy.product}` : '(브랜드 전체)'}
컨텍스트: ${copy.context}

한국어 원문:
${copy.ko}

이 카피를 다음 시장에 맞춰 현지화해주세요:

${instructions}

다음 형식으로 작성해주세요:

## ${market.flag} ${market.label} 현지화

### 현지화 카피
(해당 언어로 작성된 마케팅 카피)

### 원문과 차이점
(왜 이렇게 바꿨는지, 어떤 요소를 추가/변경/삭제했는지)

### 문화적 고려사항
(해당 시장의 뷰티 문화, 소비자 심리, 트렌드 중 반영한 점)`
}

function getPreviewLines(ko: string): string {
  const lines = ko.split('\n').filter(l => l.trim())
  return lines.slice(0, 2).join(' ')
}

const EXPLAIN_CONFIG = {
  demoNumber: 5,
  title: '글로벌 마케팅 카피 현지화',
  subtitle: '미국팀 · Sarah Kim 팀장',
  steps: [
    { icon: '📝', label: '소스 카피 선택', desc: '3개 마케팅 카피 중 현지화 대상 선택' },
    { icon: '🌍', label: '마켓 선택', desc: 'US/MENA/JP/CN/FR 중 타겟 마켓 선택' },
    { icon: '⚡', label: '병렬 현지화', desc: '선택한 마켓별로 동시에 문화 맞춤 현지화' },
    { icon: '🔄', label: '비교 확인', desc: '원문 vs 현지화 버전 나란히 비교' },
  ],
  beforeAfter: { before: '번역 외주 1건 2일 × 5개국 = 10일', after: '5개국 동시 5분', savings: '10일 → 5분' },
  dataFlow: { input: '한국어 마케팅 카피', ai: '문화권별 현지화', output: '5개국 맞춤 카피' },
  keyPoint: '단순 번역이 아닌 문화·트렌드·규제를 반영한 현지화',
}

export function LocalizeDemo() {
  const [selectedCopyId, setSelectedCopyId] = useState<string>('global-brand-intro')
  const [enabledMarkets, setEnabledMarkets] = useState<Set<string>>(new Set(['en-us', 'ar-mena']))
  const [marketStates, setMarketStates] = useState<Record<string, MarketState>>(() => {
    const init: Record<string, MarketState> = {}
    for (const m of MARKETS) init[m.id] = { status: 'idle', content: '' }
    return init
  })
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  const selectedCopy = marketingCopy.find(c => c.id === selectedCopyId) || marketingCopy[2]

  const updateState = useCallback((marketId: string, update: Partial<MarketState>) => {
    setMarketStates(prev => ({ ...prev, [marketId]: { ...prev[marketId], ...update } }))
  }, [])

  const toggleMarket = (id: string) => {
    setEnabledMarkets(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const generate = useCallback(async (marketId: string) => {
    const controller = new AbortController()
    abortControllers.current.set(marketId, controller)
    updateState(marketId, { status: 'generating', content: '', error: undefined })

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt(selectedCopy, marketId), systemPrompt: SYSTEM_PROMPT }),
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
              updateState(marketId, { content: accumulated })
            } else if (data.type === 'error') {
              throw new Error(data.error)
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue
            throw e
          }
        }
      }

      updateState(marketId, { status: 'done' })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        updateState(marketId, { status: 'idle', content: '' })
      } else {
        updateState(marketId, { status: 'error', error: (err as Error).message })
      }
    } finally {
      abortControllers.current.delete(marketId)
    }
  }, [selectedCopy, updateState])

  const generateAll = () => {
    for (const marketId of enabledMarkets) {
      const s = marketStates[marketId]
      if (s.status === 'idle' || s.status === 'error') {
        generate(marketId)
      }
    }
  }

  const resetAll = () => {
    for (const [, ctrl] of abortControllers.current) ctrl.abort()
    abortControllers.current.clear()
    const init: Record<string, MarketState> = {}
    for (const m of MARKETS) init[m.id] = { status: 'idle', content: '' }
    setMarketStates(init)
  }

  const enabledList = MARKETS.filter(m => enabledMarkets.has(m.id))
  const doneCount = enabledList.filter(m => marketStates[m.id].status === 'done').length
  const genCount = enabledList.filter(m => marketStates[m.id].status === 'generating').length
  const allDone = doneCount > 0 && doneCount === enabledList.length

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO 5</div>
          <h2 className="text-xl font-bold dark:text-white">글로벌 마케팅 카피 현지화</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            단순 번역이 아닌, 문화권별 맥락을 반영한 마케팅 카피 현지화
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

      {/* Source copy selector */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">원본 카피 선택</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {marketingCopy.map(copy => {
            const isSelected = copy.id === selectedCopyId
            return (
              <button
                key={copy.id}
                onClick={() => setSelectedCopyId(copy.id)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/10'
                    : 'border-black/[0.08] dark:border-white/[0.06] hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <div className="text-xs font-medium text-purple-500 mb-1">
                  {copy.product || '브랜드'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{copy.type}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                  {getPreviewLines(copy.ko)}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Source copy display */}
      <div className="mb-4 p-4 rounded-lg border border-black/[0.08] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 font-medium">
            {selectedCopy.type}
          </span>
          {selectedCopy.product && (
            <span className="text-xs text-gray-500 dark:text-gray-400">{selectedCopy.product}</span>
          )}
        </div>
        <div className="text-sm dark:text-gray-200 whitespace-pre-wrap leading-relaxed mb-2">
          {selectedCopy.ko}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {selectedCopy.context}
        </div>
      </div>

      {/* Target market toggles */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">타겟 시장 선택</div>
        <div className="flex flex-wrap gap-2">
          {MARKETS.map(market => {
            const isEnabled = enabledMarkets.has(market.id)
            const state = marketStates[market.id]
            return (
              <button
                key={market.id}
                onClick={() => toggleMarket(market.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isEnabled
                    ? 'bg-purple-600 text-white'
                    : 'border border-black/[0.08] dark:border-white/[0.06] text-gray-600 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <span>{market.flag}</span>
                <span className="font-medium">{market.label}</span>
                {isEnabled && state.status !== 'idle' && (
                  <StatusBadge status={state.status} compact />
                )}
              </button>
            )
          })}
        </div>
        {/* Market hints */}
        {enabledList.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {enabledList.map(m => (
              <span key={m.id} className="text-xs text-gray-400 dark:text-gray-500">
                {m.flag} {m.hint}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={generateAll}
          disabled={enabledList.length === 0 || (genCount > 0 && genCount + doneCount === enabledList.length)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {genCount > 0 ? `${genCount}개 시장 생성중...` : '현지화 실행'}
        </button>
        {allDone && (
          <button
            onClick={() => {
              const contents: Record<string, string> = {}
              for (const m of enabledList) {
                if (marketStates[m.id].status === 'done') {
                  contents[m.id] = marketStates[m.id].content
                }
              }
              openLocalizeViewer(contents, enabledList, selectedCopy)
            }}
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
      {enabledList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {enabledList.map(market => {
            const state = marketStates[market.id]
            return (
              <div
                key={market.id}
                className="rounded-lg border border-black/[0.08] dark:border-white/[0.06] overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span>{market.flag}</span>
                    <span className="text-sm font-medium dark:text-white">{market.label}</span>
                  </div>
                  <StatusBadge status={state.status} />
                </div>
                <div className="p-3 min-h-[120px] max-h-[300px] overflow-y-auto">
                  {state.status === 'idle' && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      &quot;현지화 실행&quot; 버튼을 눌러주세요
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
                        onClick={() => generate(market.id)}
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
                        openLocalizeViewer(
                          { [market.id]: state.content },
                          [market],
                          selectedCopy,
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
