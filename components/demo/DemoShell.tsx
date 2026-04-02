'use client'

import { useState } from 'react'
import { StreamingOutput, useStreamingClaude } from './StreamingOutput'

interface DemoShellProps {
  title: string
  demoNumber: number
  description: string
  dataPreview: React.ReactNode
  defaultPrompt: string
  systemPrompt?: string
}

export function DemoShell({
  title,
  demoNumber,
  description,
  dataPreview,
  defaultPrompt,
  systemPrompt,
}: DemoShellProps) {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const { content, isStreaming, error, run, reset } = useStreamingClaude()

  const handleRun = () => {
    if (isStreaming) return
    run(prompt, systemPrompt)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-purple-500 font-medium mb-1">DEMO {demoNumber}</div>
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <a
          href="/partner/lecture-podl-ai/demo/dashboard"
          className="text-xs px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
        >
          📊 대시보드
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ minHeight: '500px' }}>
        {/* 좌측: 입력 */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            📋 입력 데이터
          </div>
          <div className="flex-1 overflow-y-auto rounded-lg border border-black/[0.08] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] p-3">
            {dataPreview}
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            💬 프롬프트
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 rounded-lg text-sm bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.06] focus:border-purple-500 focus:outline-none resize-none font-mono"
          />
          <div className="flex gap-2">
            <button
              onClick={handleRun}
              disabled={isStreaming}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isStreaming ? '⏳ 생성 중...' : '▶ 실행'}
            </button>
            {content && (
              <button
                onClick={reset}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-black/[0.08] dark:border-white/[0.06] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* 우측: 출력 */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            🤖 AI 출력
          </div>
          <div className="flex-1">
            <StreamingOutput content={content} isStreaming={isStreaming} />
          </div>
          {error && (
            <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
