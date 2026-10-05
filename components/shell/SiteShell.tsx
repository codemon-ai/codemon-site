import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { NAV } from './nav'
import { LangSwitch } from './LangSwitch'
import { SubscribeButton } from './SubscribeButton'

interface Props { title: string; description?: string; children: ReactNode }

/** Nextra 레이아웃 밖의 tsx 페이지(동적 라우트)용 셸 — 헤더·푸터를 Nextra 네비와 같은 모양으로 */
export function SiteShell({ title, description, children }: Props) {
  const { asPath } = useRouter()
  const path = asPath.split(/[?#]/)[0]
  return (
    <>
      <Head>
        <title>{`${title} – codemon`}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
      </Head>
      {/* Nextra(next-themes) 밖이라 저장된 테마를 직접 적용 */}
      <Script id="shell-theme" strategy="beforeInteractive">{`try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}`}</Script>
      <div className="min-h-screen bg-paper text-ink flex flex-col">
        <header className="sticky top-0 z-40 bg-paper border-b border-ink/10">
          <div className="mx-auto max-w-[90rem] px-4 md:px-6 h-16 flex items-center gap-6">
            <Link href="/" className="font-black text-[1.25rem] tracking-[-0.03em]">codemon</Link>
            <nav className="ml-auto hidden md:flex items-center gap-5 text-sm">
              {NAV.map((n) => {
                const on = (n.match ?? [n.href]).some((m) => (m === '/' ? path === '/' : path === m || path.startsWith(m + '/')))
                return <Link key={n.href} href={n.href} className={on ? 'font-bold text-ink' : 'text-ink/60 hover:text-ink'}>{n.label}</Link>
              })}
            </nav>
            <div className="flex items-center gap-3 md:ml-2 ml-auto"><LangSwitch /><SubscribeButton /></div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-ink/10">
          <div className="mx-auto max-w-[90rem] px-4 md:px-6 py-10 flex flex-col gap-3 text-sm md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-black tracking-tight text-base">codemon</div>
              <div className="text-ink/60 text-xs leading-relaxed">Codemon Inc. · Seoul, Korea<br />AI/AX Engineering · Forward Deployed Engineer</div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-ink/60">
              <a href="/projects" className="hover:text-ink">Projects</a>
              <a href="https://tools.codemon.ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Tools</a>
              <a href="/privacy" className="hover:text-ink">개인정보처리방침</a>
              <a href="/terms" className="hover:text-ink">이용약관</a>
              <span>&copy; {new Date().getFullYear()} codemon.ai</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
