import { cases, type CaseKind } from '../../data/cases'
import { CaseCard, kindLabel } from './CaseCard'

const ORDER: CaseKind[] = ['ax', 'client', 'product', 'lab']
const LEDE: Record<CaseKind, string> = {
  ax: '기업 업무에 AI를 붙인 프로젝트.',
  client: '기획부터 배포까지 맡은 외주 개발.',
  product: '직접 만들어 운영하는 서비스.',
  lab: '만들어 보는 중인 것들.',
}

export function CaseGrid() {
  const visible = cases.filter((c) => c.visibility !== 'private')
  const hidden = cases.length - visible.length
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">사례</h1>
      <p className="mt-2 text-ink-2 max-w-2xl">AX 구축·외주 개발·자체 서비스·실험 {visible.length}건{hidden ? ` (비공개 ${hidden}건 별도)` : ''}. 결과로 말합니다.</p>
      {ORDER.map((k) => {
        const items = visible.filter((c) => c.kind === k)
        if (!items.length) return null
        return (
          <section key={k} className="mt-12">
            <div className="border-t-2 border-ink pt-3 flex items-baseline gap-3">
              <h2 className="text-xl font-black tracking-tight">{kindLabel[k]}</h2>
              <span className="text-sm text-ink-2">{LEDE[k]}</span>
              <span className="ml-auto text-sm text-ink/60 tabular-nums">{items.length}</span>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">{items.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
          </section>
        )
      })}
    </div>
  )
}
