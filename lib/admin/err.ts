/** API 응답용 에러 메시지 — Supabase/PostgREST 에러 객체(message·details·hint) 포함 */
export function errMsg(err: unknown): string {
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object') { const e = err as Record<string, unknown>; return [e.message, e.details, e.hint].filter(Boolean).join(' · ') || JSON.stringify(err) }
  return String(err)
}
