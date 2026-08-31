import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock } from 'lucide-react'

export default function WorkLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/work/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) router.push('/work')
      else setError('비밀번호가 올바르지 않습니다.')
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Work — codemon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 rounded-xl border border-zinc-800 bg-zinc-950 p-8"
        >
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Lock className="text-purple-400" size={24} />
            </div>
            <h1 className="mt-4 text-lg font-semibold text-zinc-100">외주 포트폴리오</h1>
            <p className="mt-1 text-sm text-zinc-400">비밀번호를 입력하세요.</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-zinc-100 outline-none focus:border-purple-500"
            placeholder="비밀번호"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-2 font-medium text-white hover:bg-purple-500 disabled:opacity-50"
          >
            {loading ? '확인 중…' : '입장'}
          </button>
        </form>
      </div>
    </>
  )
}
