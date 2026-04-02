'use client'

function markdownToHtml(md: string): string {
  return md
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
    .replace(/^(?!<[hulo]|<li|<hr)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}

function buildViewerHTML(title: string, markdown: string): string {
  const html = markdownToHtml(markdown)
  const escaped = markdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title} — 시딩 이메일</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f1a; color: #e0e0e0; }
  .header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1a1a2e; border-bottom: 1px solid #2a2a4a; z-index: 10; }
  .header h1 { font-size: 16px; font-weight: 700; }
  .copy-btn { padding: 8px 16px; border-radius: 6px; border: none; background: #a855f7; color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .copy-btn:hover { background: #9333ea; }
  .copy-btn.copied { background: #10b981; }
  .content { padding: 24px; max-width: 700px; margin: 0 auto; line-height: 1.8; }
  h1 { font-size: 22px; margin: 24px 0 12px; color: #fff; }
  h2 { font-size: 18px; margin: 20px 0 10px; color: #fff; }
  h3 { font-size: 15px; margin: 16px 0 8px; color: #e0e0e0; }
  p { margin: 8px 0; color: #ccc; }
  strong { color: #a855f7; }
  em { color: #f472b6; }
  code { background: #2a2a4a; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  ul { padding-left: 20px; margin: 8px 0; }
  li { margin: 4px 0; color: #ccc; }
  hr { border: none; border-top: 1px solid #2a2a4a; margin: 16px 0; }
  .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity 0.3s; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="header">
  <h1>${title} — 시딩 이메일</h1>
  <button class="copy-btn" onclick="copyMarkdown()">📋 복사</button>
</div>
<div class="content">${html}</div>
<div class="toast" id="toast">복사됨</div>
<script>
const raw = \`${escaped}\`;
async function copyMarkdown() {
  await navigator.clipboard.writeText(raw);
  const btn = document.querySelector('.copy-btn');
  btn.textContent = '✅ 복사됨';
  btn.classList.add('copied');
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => { btn.textContent = '📋 복사'; btn.classList.remove('copied'); toast.classList.remove('show'); }, 2000);
}
</script>
</body>
</html>`
}

export function openMarkdownViewer(title: string, markdown: string) {
  const html = buildViewerHTML(title, markdown)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'width=700,height=800')
}
