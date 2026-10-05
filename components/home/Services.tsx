import { Section } from './Section'

export const SERVICES = [
  { no: '01', title: 'AX 진단', body: '업무 흐름을 뜯어 자동화 가능한 지점과 우선순위를 찾습니다.', meta: '산출물: 진단 리포트 · 로드맵 — 1주' },
  { no: '02', title: '2주 PoC', body: '가장 효과 큰 한 업무를 골라 실제 동작하는 프로토타입을 만듭니다.', meta: '산출물: 작동 데모 · 측정값 — 2주' },
  { no: '03', title: '현장 투입 (FDE)', body: '팀 안에 들어가 운영에 붙이고, 구성원이 스스로 돌리게 남깁니다.', meta: '산출물: 운영 파이프라인 · 인수인계 — 협의' },
]

export function ServiceCells() {
  return (
    <div className="not-prose grid gap-6 md:grid-cols-3 my-6">
      {SERVICES.map((s) => (
        <div key={s.no} className="border-t border-ink/20 pt-4">
          <div className="text-xs font-bold text-ink-2 tabular-nums">{s.no}</div>
          <h4 className="mt-2 text-lg font-black tracking-tight">{s.title}</h4>
          <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.body}</p>
          <div className="mt-3 text-xs text-ink/60">{s.meta}</div>
        </div>
      ))}
    </div>
  )
}

export function Services() {
  return (
    <Section title="하는 일" lede="진단부터 현장 투입까지, 한 가지 업무를 끝까지 책임집니다.">
      <div className="grid gap-8 md:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.no} className="border-t border-ink/20 pt-4">
            <div className="text-xs font-bold text-ink-2 tabular-nums">{s.no}</div>
            <h4 className="mt-2 text-lg font-black tracking-tight">{s.title}</h4>
            <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.body}</p>
            <div className="mt-3 text-xs text-ink/60">{s.meta}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
