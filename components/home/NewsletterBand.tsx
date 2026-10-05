import { NewsletterSignup } from '../NewsletterSignup'

export function NewsletterBand() {
  return (
    <section className="bg-[#003566] text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-16 grid gap-6 md:gap-10 md:grid-cols-[1fr_3fr]">
        <div>
          <h2 className="text-2xl font-black tracking-tight">뉴스레터</h2>
          <p className="mt-2 text-sm text-[#C8D0DC]">현장에서 쓰는 AI, 주 1회.</p>
        </div>
        <div className="max-w-xl">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">매주, 쓸 만한 것만 골라서.</h3>
          <p className="mt-3 text-[15px] text-[#C8D0DC] leading-relaxed">에이전트·모델·인프라에서 실제 업무에 바로 쓸 수 있는 것만 추려 다이제스트로 보냅니다. 강의에서 다루는 실습 레시피도 인사이트로 먼저 받아보세요.</p>
          <div className="mt-6"><NewsletterSignup variant="band" source="home" /></div>
          <div className="mt-2 text-xs text-[#C8D0DC]/80">주 1회 다이제스트. 언제든 해지.</div>
        </div>
      </div>
    </section>
  )
}
