/** IP당 5분 3회. 인스턴스 메모리 기반 — Fluid Compute에서 인스턴스가 재사용되는 동안 유효(완전한 글로벌 제한은 아님) */
const WINDOW_MS = 5 * 60 * 1000
const LIMIT = 3
const hits = new Map<string, number[]>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (arr.length >= LIMIT) { hits.set(ip, arr); return true }
  arr.push(now); hits.set(ip, arr)
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  return false
}
