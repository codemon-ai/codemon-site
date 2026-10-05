import { Section } from './Section'

export const STEPS = [
  { n: '1', title: '작게 시작', body: '한 가지 업무, 2주. 큰 계약 전에 결과로 증명합니다.' },
  { n: '2', title: '현장에서', body: '팀의 실제 도구·데이터에 붙입니다. 데모로 끝내지 않습니다.' },
  { n: '3', title: '남기고 나옴', body: '구성원이 스스로 운영하도록 인수인계합니다. 의존이 아니라 자립.' },
]

export function Process({ title = '일하는 방식', lede = '짧게 증명하고, 남겨놓고 나옵니다.' }: { title?: string; lede?: string }) {
  return (
    <Section title={title} lede={lede}>
      <div className="grid gap-8 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <div className="w-10 h-10 bg-ink text-paper font-black flex items-center justify-center text-lg tabular-nums">{s.n}</div>
            <h4 className="mt-3 text-lg font-black tracking-tight">{s.title}</h4>
            <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
