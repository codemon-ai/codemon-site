import Link from 'next/link'

export function CTA({ heading = '바꾸고 싶은 업무가 있나요?' }: { heading?: string }) {
  return (
    <section className="bg-[#000814] dark:bg-[#001D3D] text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">{heading}</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact?type=project" className="bg-signal text-on-signal px-6 py-3 font-bold text-center hover:opacity-80">프로젝트 문의</Link>
          <Link href="/contact?type=lecture" className="border-2 border-white text-white px-6 py-3 font-bold text-center hover:bg-white/10">강의 문의</Link>
        </div>
      </div>
    </section>
  )
}
