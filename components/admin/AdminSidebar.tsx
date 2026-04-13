import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Mail,
  QrCode,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/subscribers', label: '구독자', icon: Users },
  { href: '/admin/surveys', label: '설문', icon: ClipboardList },
  { href: '/admin/mailing', label: '메일링', icon: Mail },
  { href: '/admin/qr', label: 'QR 관리', icon: QrCode },
]

export default function AdminSidebar() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col bg-zinc-950 border-r border-zinc-800">
      <div className="flex h-14 items-center px-5 border-b border-zinc-800">
        <Link href="/admin" className="text-sm font-bold text-white tracking-wide">
          codemon <span className="text-purple-400">admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/admin'
              ? router.pathname === '/admin'
              : router.pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-zinc-800 px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
