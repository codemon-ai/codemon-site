'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'

// /en 트리에 존재하는 최상위 섹션 — 그 외 경로는 /en 루트로 (콘텐츠 보강은 로디몬, 스위처 UI만 P1)
const EN_SECTIONS = ['about', 'blog', 'projects', 'docs']

function toEn(path: string): string {
  if (path.startsWith('/en')) return path
  const seg = path.split('/').filter(Boolean)[0]
  return seg && EN_SECTIONS.includes(seg) ? `/en/${seg}` : '/en'
}
function toKo(path: string): string {
  if (!path.startsWith('/en')) return path
  const rest = path.replace(/^\/en/, '')
  return rest || '/'
}

export function LangSwitch() {
  const { asPath } = useRouter()
  const path = asPath.split(/[?#]/)[0]
  const isEn = path === '/en' || path.startsWith('/en/')
  const koHref = toKo(path)
  const enHref = toEn(path)
  const cls = 'px-1 hover:underline underline-offset-4'
  return (
    <span className="text-[13px] font-bold tracking-tight select-none" aria-label="Language">
      <Link href={koHref} className={`${cls} ${isEn ? 'text-ink/50' : 'text-ink'}`} hrefLang="ko">KO</Link>
      <span className="text-ink/30">/</span>
      <Link href={enHref} className={`${cls} ${isEn ? 'text-ink' : 'text-ink/50'}`} hrefLang="en">EN</Link>
    </span>
  )
}
