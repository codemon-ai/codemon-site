'use client'

import type { Post } from './TrackingDemo'

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

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

function buildCharts(posts: Post[]): string {
  // Aggregate by platform
  const byPlatform: Record<string, number> = {}
  for (const p of posts) {
    byPlatform[p.platform] = (byPlatform[p.platform] || 0) + p.views
  }

  // Aggregate by type
  const byType: Record<string, number> = {}
  for (const p of posts) {
    byType[p.type] = (byType[p.type] || 0) + p.views
  }

  const platformColors: Record<string, string> = { '인스타그램': '#f472b6', '틱톡': '#60a5fa' }
  const typeColor = '#a855f7'

  // Platform horizontal bar chart
  const platformEntries = Object.entries(byPlatform).sort((a, b) => b[1] - a[1])
  const maxPlatformViews = Math.max(...platformEntries.map(([, v]) => v))
  const platformBars = platformEntries.map(([name, v], i) => {
    const barW = maxPlatformViews > 0 ? (v / maxPlatformViews) * 380 : 0
    const color = platformColors[name] || '#888'
    return `<g transform="translate(0,${i * 40})">
      <text x="0" y="16" fill="#ccc" font-size="12" font-weight="600">${name}</text>
      <rect x="80" y="2" width="${barW}" height="20" fill="${color}" rx="3" opacity="0.85">
        <title>${name}: ${formatNumber(v)}</title>
      </rect>
      <text x="${84 + barW}" y="16" fill="#888" font-size="11"> ${formatNumber(v)}</text>
    </g>`
  }).join('')
  const platformChart = `<svg width="100%" viewBox="0 0 560 ${platformEntries.length * 40}" style="margin:8px 0">${platformBars}</svg>`

  // Content type horizontal bar chart
  const typeEntries = Object.entries(byType).sort((a, b) => b[1] - a[1])
  const maxTypeViews = Math.max(...typeEntries.map(([, v]) => v))
  const typeBars = typeEntries.map(([name, v], i) => {
    const barW = maxTypeViews > 0 ? (v / maxTypeViews) * 380 : 0
    return `<g transform="translate(0,${i * 40})">
      <text x="0" y="16" fill="#ccc" font-size="12" font-weight="600">${name}</text>
      <rect x="80" y="2" width="${barW}" height="20" fill="${typeColor}" rx="3" opacity="0.75">
        <title>${name}: ${formatNumber(v)}</title>
      </rect>
      <text x="${84 + barW}" y="16" fill="#888" font-size="11"> ${formatNumber(v)}</text>
    </g>`
  }).join('')
  const typeChart = `<svg width="100%" viewBox="0 0 560 ${typeEntries.length * 40}" style="margin:8px 0">${typeBars}</svg>`

  const totalViews = posts.reduce((s, p) => s + p.views, 0)
  const totalEngagement = posts.reduce((s, p) => s + p.likes + p.comments + p.shares, 0)
  const hitCount = posts.filter(p => p.views >= 100_000).length

  return `
  <div style="margin-bottom:24px;">
    <h2 style="color:#a855f7;margin-bottom:16px;">📊 SNS 성과 대시보드</h2>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <div style="background:#1e1e3a;padding:12px 16px;border-radius:8px;flex:1;min-width:140px;">
        <div style="font-size:11px;color:#888;">총 조회수</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px;">${formatNumber(totalViews)}</div>
      </div>
      <div style="background:#1e1e3a;padding:12px 16px;border-radius:8px;flex:1;min-width:140px;">
        <div style="font-size:11px;color:#888;">총 인게이지먼트</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px;">${formatNumber(totalEngagement)}</div>
      </div>
      <div style="background:#1e1e3a;padding:12px 16px;border-radius:8px;flex:1;min-width:140px;">
        <div style="font-size:11px;color:#888;">히트 콘텐츠</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px;">${hitCount}건</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">채널별 총 조회수</h3>
        ${platformChart}
      </div>
      <div style="background:#1e1e3a;padding:16px;border-radius:8px;">
        <h3 style="color:#fff;font-size:14px;margin-bottom:8px;">콘텐츠 형식별 총 조회수</h3>
        ${typeChart}
      </div>
    </div>
  </div>
  <hr style="border:none;border-top:1px solid #2a2a4a;margin:24px 0;"/>
  <h2 style="color:#a855f7;margin-bottom:12px;">🤖 AI 분석 리포트</h2>`
}

export function openTrackingViewer(markdown: string, posts: Post[]) {
  const charts = buildCharts(posts)
  const mdHtml = markdownToHtml(markdown)
  const escaped = markdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

  const totalViews = posts.reduce((s, p) => s + p.views, 0)
  const hitCount = posts.filter(p => p.views >= 100_000).length

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>보들(BO:DL) SNS 성과 분석</title>
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
    <h1>보들(BO:DL) SNS 성과 분석</h1>
    <div class="header-sub">총 조회수 ${formatNumber(totalViews)} | 히트 콘텐츠 ${hitCount}건 | ${posts.length}개 게시물</div>
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
