import Link from 'next/link'
import { lectures, type Lecture } from '../../data/lectures'

function Row({ l }: { l: Lecture }) {
  return (
    <div className="grid gap-2 py-5 border-b border-ink/15 md:grid-cols-[2fr_1fr_auto] md:gap-6 md:items-baseline">
      <div>
        <Link href={`/lectures/${l.slug}`} className="text-lg font-bold leading-snug hover:underline underline-offset-4">{l.title}</Link>
        <p className="mt-1 text-sm text-ink-2">{l.summary}</p>
      </div>
      <div className="text-sm text-ink-2 whitespace-nowrap">{l.audience} · {l.hours}시간</div>
      {l.kind === 'corporate'
        ? <Link href={`/contact?type=lecture&lecture=${l.slug}`} className="text-sm font-bold underline underline-offset-4 whitespace-nowrap">출강 문의</Link>
        : <Link href={l.refs[0] ?? '/webinar'} className="text-sm font-bold underline underline-offset-4 whitespace-nowrap">바로 시작</Link>}
    </div>
  )
}

export function LectureCatalog() {
  const self = lectures.filter((l) => l.kind === 'self')
  const corp = lectures.filter((l) => l.kind === 'corporate')
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight">강의</h1>
      <p className="mt-2 text-ink-2 max-w-2xl">무료 셀프 코스 하나, 기업 출강 {corp.length}종. 실무자가 당장 쓰는 수준까지, 강의보다 실습이 깁니다.</p>
      <h2 className="mt-10 text-xs font-bold text-ink-2 border-t-2 border-ink pt-3">무료 셀프 코스</h2>
      {self.map((l) => <Row key={l.slug} l={l} />)}
      <h2 className="mt-10 text-xs font-bold text-ink-2 border-t-2 border-ink pt-3">기업 출강</h2>
      {corp.map((l) => <Row key={l.slug} l={l} />)}
      <div className="mt-10 bg-signal text-on-signal p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div><div className="font-black text-lg">우리 팀에 맞는 강의가 없나요?</div><div className="text-sm text-on-signal/80">대상·시간·도구에 맞춰 새로 설계합니다.</div></div>
        <Link href="/contact?type=lecture" className="border-2 border-on-signal px-5 py-2.5 font-bold text-sm text-center">강의 문의</Link>
      </div>
    </div>
  )
}
