import { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import { Download, Plus } from 'lucide-react'

const DEFAULT_PAGES = [
  { label: '뉴스레터 구독', path: '/subscribe' },
  { label: '설문 — AI 업무 자동화', path: '/survey/lecture-agency-ai' },
  { label: '설문 — 스타트업 AI', path: '/survey/lecture-startup-ai' },
  { label: '설문 — 포들 AI', path: '/survey/lecture-podl-ai' },
  { label: '강의 자료', path: '/partner' },
]

const BASE_URL = 'https://codemon.ai'

function QRCard({ label, url }: { label: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null)

  function handleDownload() {
    if (!ref.current) return
    const svg = ref.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      canvas.width = 512
      canvas.height = 512
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 512, 512)
      ctx.drawImage(img, 0, 0, 512, 512)
      const a = document.createElement('a')
      a.download = `qr-${label.replace(/\s+/g, '-')}.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-300">{label}</p>
      <div ref={ref} className="flex justify-center rounded-lg bg-white p-4">
        <QRCode value={url} size={160} />
      </div>
      <p className="mt-2 truncate text-center font-mono text-xs text-zinc-500">{url}</p>
      <button
        onClick={handleDownload}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
      >
        <Download size={12} />
        PNG 다운로드
      </button>
    </div>
  )
}

export default function QRManager() {
  const [customPath, setCustomPath] = useState('')
  const [customPages, setCustomPages] = useState<{ label: string; path: string }[]>([])

  function handleAdd() {
    if (!customPath.trim()) return
    const path = customPath.startsWith('/') ? customPath : `/${customPath}`
    setCustomPages((prev) => [...prev, { label: path, path }])
    setCustomPath('')
  }

  const allPages = [...DEFAULT_PAGES, ...customPages]

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={customPath}
          onChange={(e) => setCustomPath(e.target.value)}
          placeholder="/custom-path"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          <Plus size={14} />
          추가
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allPages.map(({ label, path }) => (
          <QRCard key={path} label={label} url={`${BASE_URL}${path}`} />
        ))}
      </div>
    </div>
  )
}
