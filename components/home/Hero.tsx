import Link from 'next/link'

function Lane({ who, title, body, href, cta, signal }: { who: string; title: string; body: string; href: string; cta: string; signal?: boolean }) {
  return (
    <div className={signal ? 'bg-signal text-on-signal p-6 md:p-8' : 'border-2 border-ink text-ink p-6 md:p-8'}>
      <div className={`text-xs font-bold tracking-wide ${signal ? 'text-on-signal/70' : 'text-ink-2'}`}>{who}</div>
      <h3 className="mt-2 text-2xl font-black tracking-tight">{title}</h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${signal ? 'text-on-signal/85' : 'text-ink-2'}`}>{body}</p>
      <Link href={href} className="mt-5 inline-block font-bold underline underline-offset-4 decoration-2">{cta}</Link>
    </div>
  )
}

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-14 md:pt-24 pb-14 md:pb-20">
      <h1 className="text-[40px] leading-[1.05] md:text-[72px] font-black tracking-[-0.03em] text-ink">
        당신의 업무에<br />AI를 도입하세요.
      </h1>
      <p className="mt-6 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed">
        기업의 실제 업무에 AI를 붙이고, 구성원이 직접 사용하도록 진단·적용·교육까지 함께 합니다.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Lane signal who="우리 업무에 AI를 도입하고 싶다" title="기업 · AX 도입" body="AX 진단 → 2주 PoC → 현장 투입(FDE)으로 한 가지 업무를 실제로 자동화합니다." href="/contact?type=project" cta="프로젝트 문의" />
        <Lane who="구성원에게 AI를 가르치고 싶다" title="교육 · 기업 강의" body="실무자가 당장 쓰는 수준까지. 기업 맞춤 강의와 워크숍, 실습 자료를 설계합니다." href="/lectures" cta="강의 보기" />
      </div>
    </section>
  )
}
