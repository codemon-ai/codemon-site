import Link from 'next/link'

export const INQUIRY_FIELDS = ['대상(직무·직급)', '인원', '시간(총 교육 시간)', '온라인 / 오프라인', '희망 시기', '사내 도구(MS365 / Google / 기타)']

/** corporate 강의 하단 고정 블록 — 문의 시 보낼 항목 → /contact?type=lecture 프리필 */
export function InquiryBlock({ lectureSlug }: { lectureSlug?: string }) {
  const href = `/contact?type=lecture${lectureSlug ? `&lecture=${lectureSlug}` : ''}`
  return (
    <section className="border-2 border-ink p-6 md:p-8">
      <h2 className="text-xl font-black tracking-tight">출강 문의 시 보내주실 항목</h2>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {INQUIRY_FIELDS.map((f, i) => (
          <li key={f} className="flex gap-3 text-[15px]"><span className="font-black tabular-nums">{i + 1}</span><span>{f}</span></li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-ink-2">시간·비용·실습 범위·교육 후 지원은 협의 후 확정합니다. 가격은 별도로 표기하지 않습니다.</p>
      <Link href={href} className="mt-5 inline-block bg-signal text-on-signal px-6 py-3 font-bold">강의 문의하기</Link>
    </section>
  )
}
