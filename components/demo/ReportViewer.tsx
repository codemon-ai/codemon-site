'use client'

type Order = {
  date: string; channel: string; product: string; category: string
  quantity: number; revenue: number; cogs: number; grossProfit: number
  channelFee: number; netProfit: number; region: string; customerType: string
}

function markdownToHtml(md: string): string {
  let result = md.replace(
    /^(\|.+\|)\n(\|[-: |]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_m, header: string, _s: string, body: string) => {
      const ths = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('')
      const rows = body.trim().split('\n').map((r: string) => {
        const tds = r.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('')
        return `<tr>${tds}</tr>`
      }).join('')
      return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`
    }
  )
  return result
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hulo]|<li|<hr|<t)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}

function fmtWon(n: number) {
  if (n >= 1e8) return `₩${(n / 1e8).toFixed(1)}억`
  if (n >= 1e6) return `₩${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `₩${(n / 1e3).toFixed(0)}K`
  return `₩${n.toLocaleString()}`
}

function buildCharts(orders: Order[]): string {
  // Aggregate data
  const byDate: Record<string, Record<string, number>> = {}
  const byChannel: Record<string, number> = {}
  const byProduct: Record<string, { revenue: number; profit: number }> = {}
  const byRegion: Record<string, number> = {}
  const byCustomer: Record<string, number> = { '신규': 0, '재구매': 0 }

  for (const o of orders) {
    if (!byDate[o.date]) byDate[o.date] = {}
    byDate[o.date][o.channel] = (byDate[o.date][o.channel] || 0) + o.revenue
    byChannel[o.channel] = (byChannel[o.channel] || 0) + o.revenue
    if (!byProduct[o.product]) byProduct[o.product] = { revenue: 0, profit: 0 }
    byProduct[o.product].revenue += o.revenue
    byProduct[o.product].profit += o.netProfit
    byRegion[o.region] = (byRegion[o.region] || 0) + o.revenue
    byCustomer[o.customerType] = (byCustomer[o.customerType] || 0) + o.revenue
  }

  const dates = Object.keys(byDate).sort()
  const channels = ['쿠팡', '자사몰', '올리브영']
  const chColors = { '쿠팡': '#facc15', '자사몰': '#4ade80', '올리브영': '#60a5fa' }
  const totalRevenue = Object.values(byChannel).reduce((a, b) => a + b, 0)

  // 1. Daily bar chart
  const maxDaily = Math.max(...dates.map(d => channels.reduce((s, c) => s + (byDate[d][c] || 0), 0)))
  const barW = Math.floor(700 / dates.length) - 2
  const dailyBars = dates.map((d, i) => {
    let y = 180
    return channels.map(ch => {
      const val = byDate[d][ch] || 0
      const h = Math.round((val / maxDaily) * 160)
      y -= h
      return `<rect x="${i * (barW + 2)}" y="${y}" width="${barW}" height="${h}" fill="${chColors[ch as keyof typeof chColors]}" opacity="0.8"><title>${d.slice(5)} ${ch}: ${fmtWon(val)}</title></rect>`
    }).join('')
  }).join('')
  const dailyLabels = dates.filter((_, i) => i % 3 === 0).map((d, i) =>
    `<text x="${(dates.indexOf(d)) * (barW + 2) + barW / 2}" y="196" text-anchor="middle" fill="#888" font-size="10">${d.slice(5)}</text>`
  ).join('')
  const dailyChart = `<svg width="100%" viewBox="0 0 720 200" style="margin:8px 0">${dailyBars}${dailyLabels}</svg>`

  // 2. Channel donut
  const donutData = channels.map(ch => ({ label: ch, value: byChannel[ch] || 0, color: chColors[ch as keyof typeof chColors] }))
  let angle = 0
  const donutPaths = donutData.map(d => {
    const pct = d.value / totalRevenue
    const startAngle = angle
    angle += pct * 360
    const endAngle = angle
    const r = 60, cx = 80, cy = 80
    const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180)
    const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180)
    const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180)
    const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180)
    const large = pct > 0.5 ? 1 : 0
    return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z" fill="${d.color}" opacity="0.85"><title>${d.label}: ${fmtWon(d.value)} (${(pct * 100).toFixed(1)}%)</title></path>`
  }).join('')
  const donutLegend = donutData.map((d, i) =>
    `<text x="170" y="${30 + i * 22}" fill="${d.color}" font-size="12"><tspan font-weight="600">${d.label}</tspan> ${fmtWon(d.value)} (${(d.value / totalRevenue * 100).toFixed(1)}%)</text>`
  ).join('')
  const donutChart = `<svg width="100%" viewBox="0 0 360 160">${donutPaths}<circle cx="80" cy="80" r="35" fill="#0f0f1a"/>${donutLegend}</svg>`

  // 3. Product bar chart
  const prodEntries = Object.entries(byProduct).sort((a, b) => b[1].revenue - a[1].revenue)
  const maxProdRev = Math.max(...prodEntries.map(([, v]) => v.revenue))
  const prodBars = prodEntries.map(([name, v], i) => {
    const revW = (v.revenue / maxProdRev * 400)
    const margin = (v.profit / v.revenue * 100).toFixed(1)
    return `<g transform="translate(0,${i * 34})">
      <text x="0" y="14" fill="#ccc" font-size="11">${name}</text>
      <rect x="180" y="2" width="${revW}" height="14" fill="#a855f7" rx="2" opacity="0.7"/>
      <text x="${182 + revW}" y="14" fill="#888" font-size="10"> ${fmtWon(v.revenue)} (마진 ${margin}%)</text>
    </g>`
  }).join('')
  const prodChart = `<svg width="100%" viewBox="0 0 720 ${prodEntries.length * 34}">${prodBars}</svg>`

  // 4. Region bar
  const regionEntries = Object.entries(byRegion).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxRegRev = Math.max(...regionEntries.map(([, v]) => v))
  const regionBars = regionEntries.map(([name, v], i) =>
    `<g transform="translate(0,${i * 28})">
      <text x="0" y="14" fill="#ccc" font-size="11">${name}</text>
      <rect x="50" y="2" width="${v / maxRegRev * 400}" height="14" fill="#60a5fa" rx="2" opacity="0.7"/>
      <text x="${54 + v / maxRegRev * 400}" y="14" fill="#888" font-size="10"> ${fmtWon(v)}</text>
    </g>`
  ).join('')
  const regionChart = `<svg width="100%" viewBox="0 0 600 ${regionEntries.length * 28}">${regionBars}</svg>`

  // 5. Customer pie
  const newPct = byCustomer['신규'] / totalRevenue
  const rePct = byCustomer['재구매'] / totalRevenue
  const newAngle = newPct * 360
  const r = 50, cx = 60, cy = 60
  const nx = cx + r * Math.cos((newAngle - 90) * Math.PI / 180)
  const ny = cy + r * Math.sin((newAngle - 90) * Math.PI / 180)
  const custChart = `<svg width="100%" viewBox="0 0 300 130">
    <path d="M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${newPct > 0.5 ? 1 : 0},1 ${nx},${ny} Z" fill="#f472b6" opacity="0.85"/>
    <path d="M${cx},${cy} L${nx},${ny} A${r},${r} 0 ${rePct > 0.5 ? 1 : 0},1 ${cx},${cy - r} Z" fill="#a78bfa" opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="25" fill="#0f0f1a"/>
    <text x="140" y="40" fill="#f472b6" font-size="12"><tspan font-weight="600">신규</tspan> ${fmtWon(byCustomer['신규'])} (${(newPct * 100).toFixed(1)}%)</text>
    <text x="140" y="64" fill="#a78bfa" font-size="12"><tspan font-weight="600">재구매</tspan> ${fmtWon(byCustomer['재구매'])} (${(rePct * 100).toFixed(1)}%)</text>
  </svg>`

  return `
  <div style="margin-bottom:24px;">
    <h2 style="color:#a855f7;margin-bottom:16px;">📊 매출 대시보드</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">일별 매출 추이</h3>
        ${dailyChart}
        <div style="display:flex;gap:12px;margin-top:4px;">${channels.map(c => `<span style="font-size:10px;color:${chColors[c as keyof typeof chColors]}">■ ${c}</span>`).join('')}</div>
      </div>
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">채널별 매출 비중</h3>
        ${donutChart}
      </div>
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">제품별 매출 & 마진율</h3>
        ${prodChart}
      </div>
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">지역별 매출</h3>
        ${regionChart}
        <h3 style="color:#fff;font-size:14px;margin:12px 0 8px;">신규 vs 재구매</h3>
        ${custChart}
      </div>
    </div>
  </div>
  <hr style="border:none;border-top:1px solid #2a2a4a;margin:24px 0;"/>
  <h2 style="color:#a855f7;margin-bottom:12px;">🤖 AI 분석 리포트</h2>`
}

export function openReportViewer(markdown: string, orders: Order[]) {
  const charts = buildCharts(orders)
  const mdHtml = markdownToHtml(markdown)
  const escaped = markdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

  const totalRev = orders.reduce((s, o) => s + o.revenue, 0)
  const totalProfit = orders.reduce((s, o) => s + o.netProfit, 0)

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>보들(BO:DL) 일일 매출 리포트</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#0f0f1a; color:#e0e0e0; }
  .header { position:sticky; top:0; display:flex; align-items:center; justify-content:space-between; padding:16px 24px; background:#1a1a2e; border-bottom:1px solid #2a2a4a; z-index:10; }
  .header h1 { font-size:16px; font-weight:700; }
  .header-sub { font-size:11px; color:#888; }
  .copy-btn { padding:8px 16px; border-radius:6px; border:none; background:#a855f7; color:white; font-size:13px; font-weight:600; cursor:pointer; }
  .copy-btn:hover { background:#9333ea; }
  .copy-btn.copied { background:#10b981; }
  .content { padding:24px; max-width:900px; margin:0 auto; line-height:1.8; }
  h1 { font-size:22px; margin:24px 0 12px; color:#fff; }
  h2 { font-size:18px; margin:20px 0 10px; color:#a855f7; }
  h3 { font-size:15px; margin:16px 0 8px; color:#e0e0e0; }
  p { margin:8px 0; color:#ccc; }
  strong { color:#a855f7; }
  code { background:#2a2a4a; padding:2px 6px; border-radius:3px; font-size:13px; }
  ul { padding-left:20px; margin:8px 0; }
  li { margin:4px 0; color:#ccc; }
  hr { border:none; border-top:1px solid #2a2a4a; margin:16px 0; }
  table { width:100%; border-collapse:collapse; margin:12px 0; }
  thead { background:#1a1a2e; }
  th { text-align:left; padding:8px 12px; font-size:13px; color:#a855f7; border-bottom:2px solid #2a2a4a; }
  td { padding:8px 12px; font-size:13px; color:#ccc; border-bottom:1px solid #1e1e3a; }
  .toast { position:fixed; bottom:24px; right:24px; padding:12px 20px; background:#10b981; color:white; border-radius:8px; font-size:13px; font-weight:600; opacity:0; transition:opacity 0.3s; }
  .toast.show { opacity:1; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>보들(BO:DL) 일일 매출 리포트</h1>
    <div class="header-sub">총 매출 ${fmtWon(totalRev)} | 순이익 ${fmtWon(totalProfit)} | ${orders.length}건</div>
  </div>
  <button class="copy-btn" onclick="copyMd()">📋 복사</button>
</div>
<div class="content">
  ${charts}
  ${mdHtml}
</div>
<div class="toast" id="toast">복사됨</div>
<script>
const raw = \`${escaped}\`;
async function copyMd() {
  await navigator.clipboard.writeText(raw);
  const b = document.querySelector('.copy-btn');
  b.textContent='✅ 복사됨'; b.classList.add('copied');
  document.getElementById('toast').classList.add('show');
  setTimeout(()=>{b.textContent='📋 복사';b.classList.remove('copied');document.getElementById('toast').classList.remove('show');},2000);
}
</script>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  window.open(URL.createObjectURL(blob), '_blank', 'width=960,height=900')
}
