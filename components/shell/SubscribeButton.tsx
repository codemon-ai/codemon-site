import Link from 'next/link'

/** 헤더 구독 버튼 — Swiss Signal: 옐로 블록 + ink 테두리, 모서리 0 (P3에서 /newsletter) */
export function SubscribeButton() {
  return (
    <Link
      href="/subscribe"
      className="inline-flex items-center bg-signal text-on-signal border-2 border-on-signal px-3 py-1 text-sm font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
    >
      뉴스레터 구독
    </Link>
  )
}
