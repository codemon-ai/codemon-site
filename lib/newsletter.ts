import { createAdminClient } from './supabase'

export interface NewsletterSubscriber {
  email: string
  subscribedAt: number
  source: string
}

/**
 * 구독 추가. 중복 판정은 Supabase `subscribers` 단일 소스.
 * (구 Blob 스냅샷 조회 제거 — Blob이 비어 있으면 오판하던 문제 해결)
 */
export async function addSubscriber(
  email: string,
  source: string = 'subscribe-page'
): Promise<{ ok: true; alreadySubscribed?: boolean }> {
  const supabase = createAdminClient()

  const { data: existing, error: selErr } = await supabase
    .from('subscribers')
    .select('email')
    .eq('email', email)
    .maybeSingle()
  if (selErr) throw selErr
  if (existing) return { ok: true, alreadySubscribed: true }

  const { error } = await supabase
    .from('subscribers')
    .insert({ email, source, subscribed_at: new Date().toISOString() })
  if (error) {
    // 동시 요청으로 유니크 충돌 시에도 "이미 구독"으로 처리
    if ((error as { code?: string }).code === '23505') return { ok: true, alreadySubscribed: true }
    throw error
  }
  return { ok: true }
}
