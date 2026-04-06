'use client'

type Market = { id: string; label: string; flag: string; hint: string }
type CopyItem = { id: string; product: string | null; type: string; ko: string; context: string }

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

function escapeForTemplate(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

export function openLocalizeViewer(
  contents: Record<string, string>,
  markets: Market[],
  sourceCopy: CopyItem,
) {
  const marketCards = markets
    .filter(m => contents[m.id])
    .map(m => {
      const mdHtml = markdownToHtml(contents[m.id])
      return `
      <div class="market-card">
        <div class="market-header">
          <span class="market-flag">${m.flag}</span>
          <span class="market-label">${m.label}</span>
          <button class="card-copy-btn" onclick="copyOne('${m.id}')">복사</button>
        </div>
        <div class="market-body">${mdHtml}</div>
      </div>`
    })
    .join('')

  const allText = markets
    .filter(m => contents[m.id])
    .map(m => `${m.flag} ${m.label}\n${'='.repeat(40)}\n${contents[m.id]}`)
    .join('\n\n')

  const escapedAll = escapeForTemplate(allText)
  const escapedContents: Record<string, string> = {}
  for (const m of markets) {
    if (contents[m.id]) {
      escapedContents[m.id] = escapeForTemplate(contents[m.id])
    }
  }
  const contentsScript = markets
    .filter(m => contents[m.id])
    .map(m => `'${m.id}': \`${escapedContents[m.id]}\``)
    .join(',\n  ')

  const sourceKoEscaped = sourceCopy.ko.replace(/\n/g, '<br/>')

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>보들(BO:DL) 글로벌 현지화</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
  .header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1a1a2e; border-bottom: 1px solid #2a2a4a; z-index: 10; }
  .header h1 { font-size: 16px; font-weight: 700; }
  .header-sub { font-size: 11px; color: #888; margin-top: 2px; }
  .copy-all-btn { padding: 8px 16px; border-radius: 6px; border: none; background: #a855f7; color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .copy-all-btn:hover { background: #9333ea; }
  .copy-all-btn.copied { background: #10b981; }

  .source-panel { margin: 24px; padding: 20px; background: #1e1e3a; border-radius: 8px; border: 1px solid #2a2a4a; }
  .source-label { font-size: 11px; color: #a855f7; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 8px; }
  .source-meta { font-size: 12px; color: #888; margin-bottom: 8px; }
  .source-meta span { display: inline-block; padding: 2px 8px; background: #2a2a4a; border-radius: 4px; margin-right: 6px; }
  .source-text { font-size: 14px; line-height: 1.8; color: #ccc; white-space: pre-wrap; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 24px 24px; }
  @media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }

  .market-card { background: #1e1e3a; border-radius: 8px; border: 1px solid #2a2a4a; overflow: hidden; }
  .market-header { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid #2a2a4a; background: #161630; }
  .market-flag { font-size: 18px; }
  .market-label { font-size: 14px; font-weight: 600; flex: 1; }
  .card-copy-btn { padding: 4px 12px; border-radius: 4px; border: 1px solid #2a2a4a; background: transparent; color: #888; font-size: 11px; cursor: pointer; transition: all 0.2s; }
  .card-copy-btn:hover { border-color: #a855f7; color: #a855f7; }
  .card-copy-btn.copied { border-color: #10b981; color: #10b981; }

  .market-body { padding: 16px; line-height: 1.8; font-size: 13px; }
  .market-body h1 { font-size: 20px; margin: 20px 0 10px; color: #fff; }
  .market-body h2 { font-size: 16px; margin: 18px 0 8px; color: #a855f7; }
  .market-body h3 { font-size: 14px; margin: 14px 0 6px; color: #e0e0e0; }
  .market-body p { margin: 6px 0; color: #ccc; }
  .market-body strong { color: #a855f7; }
  .market-body em { color: #f472b6; }
  .market-body code { background: #2a2a4a; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
  .market-body ul { padding-left: 20px; margin: 6px 0; }
  .market-body li { margin: 3px 0; color: #ccc; }
  .market-body hr { border: none; border-top: 1px solid #2a2a4a; margin: 12px 0; }
  .market-body table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  .market-body thead { background: #161630; }
  .market-body th { text-align: left; padding: 6px 10px; font-size: 12px; color: #a855f7; border-bottom: 2px solid #2a2a4a; }
  .market-body td { padding: 6px 10px; font-size: 12px; color: #ccc; border-bottom: 1px solid #1e1e3a; }

  .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.3s; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>보들(BO:DL) 글로벌 현지화</h1>
    <div class="header-sub">${sourceCopy.product || '브랜드 소개'} &middot; ${sourceCopy.type} &middot; ${markets.filter(m => contents[m.id]).length}개 시장</div>
  </div>
  <button class="copy-all-btn" onclick="copyAll()">전체 복사</button>
</div>

<div class="source-panel">
  <div class="source-label">원본 (한국어)</div>
  <div class="source-meta">
    <span>${sourceCopy.type}</span>
    ${sourceCopy.product ? `<span>${sourceCopy.product}</span>` : ''}
  </div>
  <div class="source-text">${sourceKoEscaped}</div>
</div>

<div class="grid">
  ${marketCards}
</div>

<div class="toast" id="toast">복사됨</div>
<script>
const allText = \`${escapedAll}\`;
const perMarket = {
  ${contentsScript}
};

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

async function copyAll() {
  await navigator.clipboard.writeText(allText);
  const btn = document.querySelector('.copy-all-btn');
  btn.textContent = 'copied';
  btn.classList.add('copied');
  showToast();
  setTimeout(() => { btn.textContent = '전체 복사'; btn.classList.remove('copied'); }, 2000);
}

async function copyOne(id) {
  const text = perMarket[id];
  if (!text) return;
  await navigator.clipboard.writeText(text);
  const cards = document.querySelectorAll('.market-card');
  const keys = Object.keys(perMarket);
  const idx = keys.indexOf(id);
  if (idx >= 0 && cards[idx]) {
    const btn = cards[idx].querySelector('.card-copy-btn');
    if (btn) { btn.textContent = 'copied'; btn.classList.add('copied'); setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('copied'); }, 2000); }
  }
  showToast();
}
</script>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  window.open(URL.createObjectURL(blob), '_blank', 'width=1000,height=900')
}
