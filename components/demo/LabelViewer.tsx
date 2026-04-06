'use client'

type Spec = {
  id: string
  country: string
  flag: string
  authority: string
  required: string[]
  prohibited: string[]
  language: string
  fontMin: string
  hint: string
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

function escapeForTemplate(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

export function openLabelViewer(
  contents: Record<string, string>,
  specs: Spec[],
  productName: string,
) {
  const activeSpecs = specs.filter(s => contents[s.id])
  if (activeSpecs.length === 0) return

  // Regulation summary cards
  const regCards = activeSpecs.map(s => `
      <div class="reg-card">
        <div class="reg-flag">${s.flag}</div>
        <div class="reg-info">
          <div class="reg-country">${s.country}</div>
          <div class="reg-authority">${s.authority}</div>
          <div class="reg-meta">
            <span>필수 ${s.required.length}항목</span>
            <span>금지 ${s.prohibited.length}항목</span>
          </div>
          <div class="reg-lang">${s.language}</div>
        </div>
      </div>`
  ).join('')

  // Label content cards
  const labelCards = activeSpecs.map(s => {
    const mdHtml = markdownToHtml(contents[s.id])
    return `
      <div class="label-card">
        <div class="label-header">
          <span class="label-flag">${s.flag}</span>
          <div class="label-title">
            <span class="label-country">${s.country}</span>
            <span class="label-authority">${s.authority}</span>
          </div>
          <button class="card-copy-btn" onclick="copyOne('${s.id}')">복사</button>
        </div>
        <div class="label-body">${mdHtml}</div>
      </div>`
  }).join('')

  // Build copy text
  const allText = activeSpecs
    .map(s => `${s.flag} ${s.country} (${s.authority})\n${'='.repeat(40)}\n${contents[s.id]}`)
    .join('\n\n')

  const escapedAll = escapeForTemplate(allText)
  const contentsScript = activeSpecs
    .map(s => `'${s.id}': \`${escapeForTemplate(contents[s.id])}\``)
    .join(',\n  ')

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>보들(BO:DL) 패키지 라벨 — ${productName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
  .header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1a1a2e; border-bottom: 1px solid #2a2a4a; z-index: 10; }
  .header h1 { font-size: 16px; font-weight: 700; }
  .header-sub { font-size: 11px; color: #888; margin-top: 2px; }
  .copy-all-btn { padding: 8px 16px; border-radius: 6px; border: none; background: #a855f7; color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .copy-all-btn:hover { background: #9333ea; }
  .copy-all-btn.copied { background: #10b981; }

  .reg-section { padding: 24px; }
  .reg-section-title { font-size: 12px; color: #a855f7; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
  .reg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
  .reg-card { background: #1e1e3a; border-radius: 8px; border: 1px solid #2a2a4a; padding: 14px; display: flex; gap: 12px; align-items: flex-start; }
  .reg-flag { font-size: 24px; }
  .reg-info { flex: 1; }
  .reg-country { font-size: 14px; font-weight: 600; color: #fff; }
  .reg-authority { font-size: 11px; color: #888; margin-top: 2px; }
  .reg-meta { display: flex; gap: 8px; margin-top: 6px; }
  .reg-meta span { font-size: 11px; color: #a855f7; background: #a855f720; padding: 2px 8px; border-radius: 4px; }
  .reg-lang { font-size: 11px; color: #666; margin-top: 4px; }

  .label-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 24px 24px; }
  @media (max-width: 700px) { .label-grid { grid-template-columns: 1fr; } }

  .label-card { background: #1e1e3a; border-radius: 8px; border: 1px solid #2a2a4a; overflow: hidden; }
  .label-header { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid #2a2a4a; background: #161630; }
  .label-flag { font-size: 18px; }
  .label-title { flex: 1; }
  .label-country { font-size: 14px; font-weight: 600; display: block; }
  .label-authority { font-size: 11px; color: #888; }
  .card-copy-btn { padding: 4px 12px; border-radius: 4px; border: 1px solid #2a2a4a; background: transparent; color: #888; font-size: 11px; cursor: pointer; transition: all 0.2s; }
  .card-copy-btn:hover { border-color: #a855f7; color: #a855f7; }
  .card-copy-btn.copied { border-color: #10b981; color: #10b981; }

  .label-body { padding: 16px; line-height: 1.8; font-size: 13px; }
  .label-body h1 { font-size: 20px; margin: 20px 0 10px; color: #fff; }
  .label-body h2 { font-size: 16px; margin: 18px 0 8px; color: #a855f7; }
  .label-body h3 { font-size: 14px; margin: 14px 0 6px; color: #e0e0e0; }
  .label-body p { margin: 6px 0; color: #ccc; }
  .label-body strong { color: #a855f7; }
  .label-body em { color: #f472b6; }
  .label-body code { background: #2a2a4a; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
  .label-body ul { padding-left: 20px; margin: 6px 0; }
  .label-body li { margin: 3px 0; color: #ccc; }
  .label-body hr { border: none; border-top: 1px solid #2a2a4a; margin: 12px 0; }
  .label-body table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  .label-body thead { background: #161630; }
  .label-body th { text-align: left; padding: 6px 10px; font-size: 12px; color: #a855f7; border-bottom: 2px solid #2a2a4a; }
  .label-body td { padding: 6px 10px; font-size: 12px; color: #ccc; border-bottom: 1px solid #1e1e3a; }

  .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.3s; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>보들(BO:DL) 패키지 라벨 — ${productName}</h1>
    <div class="header-sub">${activeSpecs.length}개국 규제 라벨</div>
  </div>
  <button class="copy-all-btn" onclick="copyAll()">전체 복사</button>
</div>

<div class="reg-section">
  <div class="reg-section-title">규제 요약</div>
  <div class="reg-grid">
    ${regCards}
  </div>
</div>

<div class="label-grid">
  ${labelCards}
</div>

<div class="toast" id="toast">복사됨</div>
<script>
const allText = \`${escapedAll}\`;
const perCountry = {
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
  const text = perCountry[id];
  if (!text) return;
  await navigator.clipboard.writeText(text);
  const cards = document.querySelectorAll('.label-card');
  const keys = Object.keys(perCountry);
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
