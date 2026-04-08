'use client'

import QRCode from 'react-qr-code'
import { useTheme } from 'next-themes'
import { QrCode } from 'lucide-react'

interface QRCodeDisplayProps {
  url: string
  size?: number
  title?: string
}

export function QRCodeDisplay({ url, size = 120, title }: QRCodeDisplayProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <QrCode size={20} className="text-accent-purple" />
        <h3 className="text-lg font-semibold text-black dark:text-white">{title || 'QR 코드'}</h3>
      </div>
      <p className="text-sm text-black/50 dark:text-white/45 mb-4">
        {title ? `${title} 페이지로 이동합니다.` : '이 페이지를 공유하세요.'}
      </p>
      <div className="inline-block p-3 rounded-lg bg-white dark:bg-white">
        <QRCode
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor={isDark ? '#1a1a1a' : '#000000'}
        />
      </div>
    </div>
  )
}
