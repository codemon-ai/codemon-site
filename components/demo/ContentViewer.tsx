'use client'

const CONTENT_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  'detail-page': { label: '상세페이지 카피', icon: '📄' },
  'carousel': { label: '인스타 캐러셀', icon: '🖼️' },
  'hashtags': { label: '해시태그', icon: '#️⃣' },
  'tiktok': { label: '틱톡 스크립트', icon: '🎬' },
}

function markdownToHtml(md: string): string {
  let result = md.replace(
    /^(\|.+\|)\n(\|[-: |]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_match, header: string, _sep: string, body: string) => {
      const headers = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('')
      const rows = body.trim().split('\n').map((row: string) => {
        const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('')
        return `<tr>${cells}</tr>`
      }).join('')
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
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

export function openContentViewer(contents: Record<string, string>, productName: string) {
  const typeIds = Object.keys(contents).filter(id => contents[id])
  if (typeIds.length === 0) return

  // Build tab buttons
  const tabButtons = typeIds.map((id, i) => {
    const meta = CONTENT_TYPE_LABELS[id] || { label: id, icon: '' }
    return `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${id}" onclick="switchTab('${id}')">${meta.icon} ${meta.label}</button>`
  }).join('\n      ')

  // Build tab content sections
  const tabContents = typeIds.map((id, i) => {
    const html = markdownToHtml(contents[id])
    return `<div class="tab-content ${i === 0 ? 'active' : ''}" id="tab-${id}">${html}</div>`
  }).join('\n    ')

  // Escape all raw markdown for copy
  const allRaw: Record<string, string> = {}
  for (const id of typeIds) {
    allRaw[id] = contents[id]
  }
  const rawJson = JSON.stringify(allRaw).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>보들(BO:DL) 콘텐츠 — ${productName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
  .header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1a1a2e; border-bottom: 1px solid #2a2a4a; z-index: 10; }
  .header h1 { font-size: 16px; font-weight: 700; }
  .header-sub { font-size: 11px; color: #888; margin-top: 2px; }
  .copy-btn { padding: 8px 16px; border-radius: 6px; border: none; background: #a855f7; color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .copy-btn:hover { background: #9333ea; }
  .copy-btn.copied { background: #10b981; }
  .tab-bar { display: flex; gap: 4px; padding: 12px 24px; background: #151528; border-bottom: 1px solid #2a2a4a; overflow-x: auto; }
  .tab-btn { padding: 8px 16px; border-radius: 6px; border: 1px solid #2a2a4a; background: transparent; color: #888; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
  .tab-btn:hover { border-color: #a855f7; color: #ccc; }
  .tab-btn.active { background: #a855f7; border-color: #a855f7; color: white; }
  .content { padding: 24px; max-width: 700px; margin: 0 auto; line-height: 1.8; }
  .tab-content { display: none; }
  .tab-content.active { display: block; }
  h1 { font-size: 22px; margin: 24px 0 12px; color: #fff; }
  h2 { font-size: 18px; margin: 20px 0 10px; color: #a855f7; }
  h3 { font-size: 15px; margin: 16px 0 8px; color: #e0e0e0; }
  p { margin: 8px 0; color: #ccc; }
  strong { color: #a855f7; }
  em { color: #f472b6; }
  code { background: #2a2a4a; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  ul { padding-left: 20px; margin: 8px 0; }
  li { margin: 4px 0; color: #ccc; }
  hr { border: none; border-top: 1px solid #2a2a4a; margin: 16px 0; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  thead { background: #1a1a2e; }
  th { text-align: left; padding: 8px 12px; font-size: 13px; color: #a855f7; border-bottom: 2px solid #2a2a4a; }
  td { padding: 8px 12px; font-size: 13px; color: #ccc; border-bottom: 1px solid #1e1e3a; }
  tr:hover td { background: #1e1e3a; }
  .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.3s; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>보들(BO:DL) 콘텐츠 — ${productName}</h1>
    <div class="header-sub">${typeIds.length}종 콘텐츠</div>
  </div>
  <button class="copy-btn" onclick="copyMd()">📋 복사</button>
</div>
<div class="tab-bar">
  ${tabButtons}
</div>
<div class="content">
  ${tabContents}
</div>
<div class="toast" id="toast">복사됨</div>
<script>
const rawData = JSON.parse(\`${rawJson}\`);
let activeTab = '${typeIds[0]}';

function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(function(el) {
    el.classList.toggle('active', el.id === 'tab-' + tabId);
  });
}

async function copyMd() {
  var text = rawData[activeTab] || '';
  await navigator.clipboard.writeText(text);
  var btn = document.querySelector('.copy-btn');
  btn.textContent = '✅ 복사됨';
  btn.classList.add('copied');
  var toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(function() {
    btn.textContent = '📋 복사';
    btn.classList.remove('copied');
    toast.classList.remove('show');
  }, 2000);
}
</script>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  window.open(URL.createObjectURL(blob), '_blank', 'width=800,height=900')
}
