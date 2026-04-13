import type { ReactNode } from 'react'
import Head from 'next/head'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  title: string
  children: ReactNode
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} — codemon admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-zinc-900 text-zinc-100">
        <AdminSidebar />
        <main className="ml-60 min-h-screen">
          <header className="sticky top-0 z-30 flex h-14 items-center border-b border-zinc-800 bg-zinc-900/80 px-6 backdrop-blur">
            <h1 className="text-lg font-semibold">{title}</h1>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </>
  )
}
