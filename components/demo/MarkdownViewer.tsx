'use client'

type ToneOption = { id: string; label: string; desc: string }

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

function buildViewerHTML(
  title: string,
  markdown: string,
  tones: ToneOption[],
  currentToneId: string,
  hasRegenerate: boolean,
): string {
  const html = markdownToHtml(markdown)
  const escaped = markdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

  const toneOptions = tones.map(t =>
    `<option value="${t.id}" ${t.id === currentToneId ? 'selected' : ''}>${t.label}</option>`
  ).join('')

  const regenerateUI = hasRegenerate ? `
    <div class="regen-bar">
      <select id="tone-select" class="tone-select">${toneOptions}</select>
      <button class="regen-btn" onclick="regenerate()">🔄 재생성</button>
    </div>` : ''

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title} — 시딩 이메일</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
  .header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1a1a2e; border-bottom: 1px solid #2a2a4a; z-index: 10; gap: 12px; flex-wrap: wrap; }
  .header h1 { font-size: 16px; font-weight: 700; }
  .header-actions { display: flex; gap: 8px; align-items: center; }
  .copy-btn, .regen-btn { padding: 8px 16px; border-radius: 6px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .copy-btn { background: #a855f7; color: white; }
  .copy-btn:hover { background: #9333ea; }
  .copy-btn.copied { background: #10b981; }
  .regen-bar { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: #151528; border-bottom: 1px solid #2a2a4a; }
  .tone-select { padding: 6px 12px; border-radius: 6px; border: 1px solid #2a2a4a; background: #1e1e3a; color: #e0e0e0; font-size: 13px; cursor: pointer; }
  .tone-select:focus { outline: none; border-color: #a855f7; }
  .regen-btn { background: #374151; color: #e0e0e0; }
  .regen-btn:hover { background: #4b5563; }
  .regen-btn.loading { opacity: 0.5; cursor: not-allowed; }
  .content { padding: 24px; max-width: 700px; margin: 0 auto; line-height: 1.8; }
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
  <h1>${title} — 시딩 이메일</h1>
  <div class="header-actions">
    <button class="copy-btn" onclick="copyMarkdown()">📋 복사</button>
  </div>
</div>
${regenerateUI}
<div class="content" id="content">${html}</div>
<div class="toast" id="toast">복사됨</div>
<script>
let raw = \`${escaped}\`;

async function copyMarkdown() {
  await navigator.clipboard.writeText(raw);
  const btn = document.querySelector('.copy-btn');
  btn.textContent = '✅ 복사됨';
  btn.classList.add('copied');
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => { btn.textContent = '📋 복사'; btn.classList.remove('copied'); toast.classList.remove('show'); }, 2000);
}

${hasRegenerate ? `
function regenerate() {
  const toneId = document.getElementById('tone-select').value;
  const btn = document.querySelector('.regen-btn');
  btn.textContent = '⏳ 생성중...';
  btn.classList.add('loading');
  btn.disabled = true;

  // Notify parent window
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'regenerate', name: '${title}', toneId }, '*');
  }
}

window.addEventListener('message', (e) => {
  if (e.data.type === 'update-content') {
    raw = e.data.markdown;
    document.getElementById('content').innerHTML = e.data.html;
    const btn = document.querySelector('.regen-btn');
    if (btn) { btn.textContent = '🔄 재생성'; btn.classList.remove('loading'); btn.disabled = false; }
  }
});
` : ''}
</script>
</body>
</html>`
}

export function openMarkdownViewer(
  title: string,
  markdown: string,
  tones?: ToneOption[],
  currentToneId?: string,
  onRegenerate?: (toneId: string) => void,
) {
  const hasRegen = !!(tones && onRegenerate)
  const html = buildViewerHTML(title, markdown, tones || [], currentToneId || '', hasRegen)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, `viewer-${title}`, 'width=700,height=800')

  if (hasRegen && win) {
    // Listen for regenerate messages from the viewer window
    const handler = async (e: MessageEvent) => {
      if (e.data.type === 'regenerate' && e.data.name === title) {
        onRegenerate!(e.data.toneId)

        // Poll for content updates and send to viewer
        const checkInterval = setInterval(() => {
          // Content will be updated via the parent component's state
          // We rely on the parent calling openMarkdownViewer again or
          // the viewer being updated via postMessage
        }, 500)

        // Clean up after 60 seconds max
        setTimeout(() => clearInterval(checkInterval), 60000)
      }
    }
    window.addEventListener('message', handler)

    // Clean up on viewer close
    const closeCheck = setInterval(() => {
      if (win.closed) {
        window.removeEventListener('message', handler)
        clearInterval(closeCheck)
      }
    }, 1000)
  }
}

// Helper to send updated content to an already-open viewer window
export function updateViewerContent(title: string, markdown: string) {
  // Find the viewer window by name
  const win = window.open('', `viewer-${title}`)
  if (win && !win.closed && win.location.href !== 'about:blank') {
    const html = markdownToHtml(markdown)
    win.postMessage({ type: 'update-content', markdown, html }, '*')
  }
}
