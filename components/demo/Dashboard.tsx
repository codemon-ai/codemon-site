'use client'

import { useState } from 'react'
import { demoConfig } from '../../data/demo/config'
import sales from '../../data/demo/sales.json'
import snsPosts from '../../data/demo/sns-posts.json'
import influencers from '../../data/demo/influencers.json'
import products from '../../data/demo/products.json'

function formatWon(n: number) {
  if (n >= 1_000_000) return `₩${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `₩${(n / 1_000).toFixed(0)}K`
  return `₩${n.toLocaleString()}`
}
function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}만`
  if (n >= 10_000) return `${(n / 10_000).toFixed(1)}만`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

const today = sales.daily[sales.daily.length - 1]
const yesterday = sales.daily[sales.daily.length - 2]
const todayTotal = today.쿠팡 + today.자사몰 + today.올리브영
const yesterdayTotal = yesterday.쿠팡 + yesterday.자사몰 + yesterday.올리브영
const growthPct = ((todayTotal - yesterdayTotal) / yesterdayTotal * 100).toFixed(1)

const hitPosts = snsPosts.filter(p => p.views >= 100_000).sort((a, b) => b.views - a.views)

const seedingStats = { sent: 48, opened: 36, replied: 17, collab: 8 }

export function Dashboard() {
  const [drilldown, setDrilldown] = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', color: '#e0e0e0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: '#1a1a2e', borderBottom: '1px solid #2a2a4a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{demoConfig.company.name}({demoConfig.company.nameEn}) AI 대시보드</span>
          <span style={{ fontSize: 11, color: '#888', background: '#2a2a4a', padding: '2px 8px', borderRadius: 4 }}>DEMO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/partner/lecture-podl-ai/demo" style={{ fontSize: 12, color: '#a78bfa', textDecoration: 'none' }}>← 데모 목록</a>
          <span style={{ fontSize: 12, color: '#888' }}>{today.date} 기준</span>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '16px 24px' }}>
        <KpiCard label="오늘 매출" value={formatWon(todayTotal)} sub={`▲ ${growthPct}% vs 어제`} subColor="#4ade80" onClick={() => setDrilldown(drilldown === 'sales' ? null : 'sales')} active={drilldown === 'sales'} />
        <KpiCard label="시딩 응답률" value={`${(seedingStats.replied / seedingStats.sent * 100).toFixed(1)}%`} sub={`${seedingStats.collab}건 협업 진행중`} subColor="#4ade80" onClick={() => setDrilldown(drilldown === 'seeding' ? null : 'seeding')} active={drilldown === 'seeding'} />
        <KpiCard label="히트 콘텐츠" value={`${hitPosts.length}건`} sub="🔥 10만뷰 이상" subColor="#f472b6" onClick={() => setDrilldown(drilldown === 'tracking' ? null : 'tracking')} active={drilldown === 'tracking'} />
        <KpiCard label="글로벌 진행률" value="67%" sub="EN 완료, AR 진행중" subColor="#888" onClick={() => setDrilldown(drilldown === 'global' ? null : 'global')} active={drilldown === 'global'} />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 24px 24px' }}>
        {/* 매출 패널 */}
        <Panel title="📊 채널별 매출" sub="최근 7일" onClick={() => setDrilldown(drilldown === 'sales' ? null : 'sales')} active={drilldown === 'sales'}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {demoConfig.channels.map((ch, i) => (
              <div key={ch} style={{ flex: 1, textAlign: 'center', padding: 8, background: '#2a2a4a', borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: '#888' }}>{ch}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: ['#facc15', '#4ade80', '#60a5fa'][i] }}>
                  {formatWon(today[ch as keyof typeof today] as number)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
            {sales.daily.map((d, i) => {
              const total = d.쿠팡 + d.자사몰 + d.올리브영
              const maxTotal = Math.max(...sales.daily.map(dd => dd.쿠팡 + dd.자사몰 + dd.올리브영))
              return <div key={i} style={{ flex: 1, background: '#a855f7', borderRadius: '3px 3px 0 0', height: `${(total / maxTotal) * 100}%`, opacity: i === sales.daily.length - 1 ? 1 : 0.5 }} />
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#666', marginTop: 4 }}>
            {sales.daily.map(d => <span key={d.date}>{d.date.slice(8)}</span>)}
          </div>
        </Panel>

        {/* 소재 트래킹 */}
        <Panel title="🔥 소재 성과 트래킹" sub={`히트 ${hitPosts.length}건`} onClick={() => setDrilldown(drilldown === 'tracking' ? null : 'tracking')} active={drilldown === 'tracking'}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hitPosts.slice(0, 3).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, background: '#2a2a4a', borderRadius: 6, borderLeft: `3px solid ${['#f472b6', '#fb923c', '#a78bfa'][i]}` }}>
                <span style={{ fontSize: 18 }}>{p.platform === '인스타그램' ? '📱' : '🎵'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#fff' }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{p.platform} · {p.date.slice(5)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: ['#f472b6', '#fb923c', '#a78bfa'][i] }}>{formatNum(p.views)}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>조회수</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* 시딩 퍼널 */}
        <Panel title="📧 인플루언서 시딩" sub="이번 주" onClick={() => setDrilldown(drilldown === 'seeding' ? null : 'seeding')} active={drilldown === 'seeding'}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: `발송 ${seedingStats.sent}건`, w: '100%', color: '#3b82f6' },
              { label: `오픈 ${seedingStats.opened}건 (${(seedingStats.opened/seedingStats.sent*100).toFixed(0)}%)`, w: `${seedingStats.opened/seedingStats.sent*100}%`, color: '#8b5cf6' },
              { label: `응답 ${seedingStats.replied}건`, w: `${seedingStats.replied/seedingStats.sent*100}%`, color: '#a855f7' },
              { label: `협업 ${seedingStats.collab}건`, w: `${seedingStats.collab/seedingStats.sent*100}%`, color: '#d946ef' },
            ].map(s => (
              <div key={s.label} style={{ width: s.w, background: s.color, borderRadius: 4, padding: '6px 12px', fontSize: 12, color: '#fff' }}>
                {s.label}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#888' }}>전환율: 발송→협업 {(seedingStats.collab/seedingStats.sent*100).toFixed(1)}%</div>
        </Panel>

        {/* 콘텐츠 + 글로벌 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Panel title="📝 콘텐츠 파이프라인" onClick={() => setDrilldown(drilldown === 'content' ? null : 'content')} active={drilldown === 'content'}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: '기획 3', color: '#3b82f6' },
                { label: 'AI초안 5', color: '#a855f7' },
                { label: '편집 2', color: '#f59e0b' },
                { label: '발행 8', color: '#10b981' },
              ].map((s, i) => (
                <span key={s.label}>
                  {i > 0 && <span style={{ color: '#555', margin: '0 2px' }}>→</span>}
                  <span style={{ padding: '4px 8px', background: s.color, borderRadius: 4, fontSize: 10, color: '#fff' }}>{s.label}</span>
                </span>
              ))}
            </div>
          </Panel>
          <Panel title="🌏 글로벌 현지화" onClick={() => setDrilldown(drilldown === 'global' ? null : 'global')} active={drilldown === 'global'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { lang: 'English (US)', pct: 100, color: '#4ade80' },
                { lang: 'العربية (AR)', pct: 67, color: '#f59e0b' },
                { lang: '日本語 (JP)', pct: 0, color: '#60a5fa', label: '대기중' },
              ].map(l => (
                <div key={l.lang}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                    <span style={{ color: '#888' }}>{l.lang}</span>
                    <span style={{ color: l.pct > 0 ? l.color : '#888' }}>{l.label || `${l.pct}%`}</span>
                  </div>
                  <div style={{ height: 6, background: '#2a2a4a', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${l.pct}%`, background: l.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Drilldown Panel */}
      {drilldown && (
        <div
          style={{ position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: '#1a1a2e', borderLeft: '1px solid #2a2a4a', overflowY: 'auto', zIndex: 100, padding: 24, boxShadow: '-4px 0 24px rgba(0,0,0,0.5)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{drilldownTitle(drilldown)}</h3>
            <button onClick={() => setDrilldown(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <DrilldownContent type={drilldown} />
          <a
            href={`/partner/lecture-podl-ai/demo/${drilldownLink(drilldown)}`}
            style={{ display: 'block', marginTop: 24, padding: '10px 16px', background: '#a855f7', color: '#fff', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}
          >
            데모 페이지에서 직접 시연 →
          </a>
        </div>
      )}
    </div>
  )
}

function KpiCard({ label, value, sub, subColor, onClick, active }: { label: string; value: string; sub: string; subColor: string; onClick: () => void; active: boolean }) {
  return (
    <div onClick={onClick} style={{ background: active ? '#2a2a4a' : '#1e1e3a', borderRadius: 8, padding: 16, border: `1px solid ${active ? '#a855f7' : '#2a2a4a'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: 11, color: subColor }}>{sub}</div>
    </div>
  )
}

function Panel({ title, sub, children, onClick, active }: { title: string; sub?: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <div onClick={onClick} style={{ background: active ? '#2a2a4a' : '#1e1e3a', borderRadius: 8, padding: 16, border: `1px solid ${active ? '#a855f7' : '#2a2a4a'}`, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 600, color: '#fff' }}>{title}</span>
        {sub && <span style={{ fontSize: 11, color: '#888' }}>{sub}</span>}
      </div>
      {children}
    </div>
  )
}

function drilldownTitle(type: string) {
  const map: Record<string, string> = { sales: '매출 상세', seeding: '시딩 파이프라인 상세', tracking: '소재 성과 상세', content: '콘텐츠 파이프라인 상세', global: '글로벌 현지화 상세' }
  return map[type] || type
}
function drilldownLink(type: string) {
  const map: Record<string, string> = { sales: 'report', seeding: 'seeding', tracking: 'tracking', content: 'content', global: 'localize' }
  return map[type] || type
}

function DrilldownContent({ type }: { type: string }) {
  if (type === 'sales') return (
    <div>
      <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
        <thead><tr style={{ borderBottom: '1px solid #2a2a4a' }}>
          <th style={{ textAlign: 'left', padding: '6px 4px', color: '#888' }}>날짜</th>
          {demoConfig.channels.map(ch => <th key={ch} style={{ textAlign: 'right', padding: '6px 4px', color: '#888' }}>{ch}</th>)}
          <th style={{ textAlign: 'right', padding: '6px 4px', color: '#888' }}>합계</th>
        </tr></thead>
        <tbody>{sales.daily.map(d => (
          <tr key={d.date} style={{ borderBottom: '1px solid #1e1e3a' }}>
            <td style={{ padding: '6px 4px', color: '#ccc' }}>{d.date.slice(5)}</td>
            <td style={{ textAlign: 'right', padding: '6px 4px', color: '#facc15' }}>{formatWon(d.쿠팡)}</td>
            <td style={{ textAlign: 'right', padding: '6px 4px', color: '#4ade80' }}>{formatWon(d.자사몰)}</td>
            <td style={{ textAlign: 'right', padding: '6px 4px', color: '#60a5fa' }}>{formatWon(d.올리브영)}</td>
            <td style={{ textAlign: 'right', padding: '6px 4px', color: '#fff', fontWeight: 600 }}>{formatWon(d.쿠팡 + d.자사몰 + d.올리브영)}</td>
          </tr>
        ))}</tbody>
      </table>
      <div style={{ marginTop: 16, fontSize: 12, color: '#888' }}>
        <strong style={{ color: '#fff' }}>주간 총 매출:</strong> {formatWon(sales.daily.reduce((s, d) => s + d.쿠팡 + d.자사몰 + d.올리브영, 0))}
      </div>
    </div>
  )

  if (type === 'tracking') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {hitPosts.map(p => (
        <div key={p.id} style={{ padding: 10, background: '#2a2a4a', borderRadius: 6, fontSize: 12 }}>
          <div style={{ color: '#fff', fontWeight: 600 }}>{p.title}</div>
          <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{p.platform} · {p.type} · {p.date}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11 }}>
            <span>👁 {formatNum(p.views)}</span>
            <span>❤️ {formatNum(p.likes)}</span>
            <span>💬 {formatNum(p.comments)}</span>
            <span>🔄 {formatNum(p.shares)}</span>
          </div>
        </div>
      ))}
    </div>
  )

  if (type === 'seeding') return (
    <div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 12 }}>인플루언서 리스트 (상위 10명)</div>
      {influencers.slice(0, 10).map(inf => (
        <div key={inf.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1e1e3a', fontSize: 12 }}>
          <span style={{ color: '#fff' }}>{inf.name}</span>
          <span style={{ color: '#888' }}>{inf.channel} · {formatNum(inf.followers)}</span>
        </div>
      ))}
    </div>
  )

  if (type === 'content') return (
    <div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 12 }}>제품 라인업</div>
      {products.map(p => (
        <div key={p.id} style={{ padding: 10, background: '#2a2a4a', borderRadius: 6, fontSize: 12, marginBottom: 8 }}>
          <div style={{ color: '#fff', fontWeight: 600 }}>{p.name}</div>
          <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{p.category} · {p.price.toLocaleString()}원</div>
          <div style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>{p.usp}</div>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <div style={{ fontSize: 12, color: '#ccc', marginBottom: 12 }}>현지화 진행 현황</div>
      <div style={{ padding: 10, background: '#2a2a4a', borderRadius: 6, fontSize: 12, marginBottom: 8 }}>
        <div style={{ color: '#4ade80', fontWeight: 600 }}>🇺🇸 English (US) — 완료</div>
        <div style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>밤투폼, 선세럼, 브랜드 소개 3건 현지화 완료</div>
      </div>
      <div style={{ padding: 10, background: '#2a2a4a', borderRadius: 6, fontSize: 12, marginBottom: 8 }}>
        <div style={{ color: '#f59e0b', fontWeight: 600 }}>🇸🇦 العربية (AR) — 67%</div>
        <div style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>밤투폼, 선세럼 완료 / 브랜드 소개 진행중</div>
      </div>
      <div style={{ padding: 10, background: '#2a2a4a', borderRadius: 6, fontSize: 12 }}>
        <div style={{ color: '#888', fontWeight: 600 }}>🇯🇵 日本語 (JP) — 대기중</div>
        <div style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>EN/AR 완료 후 진행 예정</div>
      </div>
    </div>
  )
}
