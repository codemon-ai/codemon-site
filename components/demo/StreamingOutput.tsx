'use client'

import { useState, useRef, useEffect } from 'react'

interface StreamingOutputProps {
  content: string
  isStreaming: boolean
  placeholder?: string
}

export function StreamingOutput({ content, isStreaming, placeholder }: StreamingOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current && isStreaming) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [content, isStreaming])

  return (
    <div
      ref={outputRef}
      className="h-full overflow-y-auto rounded-lg border border-black/[0.08] dark:border-white/[0.06] bg-white dark:bg-black/20 p-4"
    >
      {content ? (
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
          {content}
          {isStreaming && <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse ml-0.5" />}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-400 dark:text-gray-600">
          {placeholder || '▶ 실행을 누르면 AI 응답이 여기에 표시됩니다'}
        </div>
      )}
    </div>
  )
}

export function useStreamingClaude() {
  const [content, setContent] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (prompt: string, systemPrompt?: string) => {
    setContent('')
    setError(null)
    setIsStreaming(true)

    try {
      const res = await fetch('/api/demo/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt }),
      })

      if (!res.ok) throw new Error(`API error: ${res.status}`)
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

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
            if (data.type === 'text') setContent(prev => prev + data.text)
            else if (data.type === 'error') setError(data.error)
          } catch { /* skip malformed */ }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsStreaming(false)
    }
  }

  return { content, isStreaming, error, run, reset: () => { setContent(''); setError(null) } }
}
