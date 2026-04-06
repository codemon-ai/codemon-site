'use client'

type ExplainConfig = {
  demoNumber: number
  title: string
  subtitle: string
  steps: { icon: string; label: string; desc: string }[]
  beforeAfter: { before: string; after: string; savings: string }
  dataFlow: { input: string; ai: string; output: string }
  keyPoint: string
}

export function openDemoExplain(config: ExplainConfig) {
  const stepCircles = ['\u2460', '\u2461', '\u2462', '\u2463']

  const stepsHtml = config.steps
    .map(
      (step, i) => `
    <div style="display:flex;gap:16px;align-items:flex-start;position:relative;">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:36px;">
        <div style="width:36px;height:36px;border-radius:50%;background:#a855f7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;">${stepCircles[i] || i + 1}</div>
        ${i < config.steps.length - 1 ? '<div style="width:2px;flex:1;min-height:32px;background:linear-gradient(to bottom,#a855f7,#a855f740);margin-top:4px;"></div>' : ''}
      </div>
      <div style="padding-bottom:${i < config.steps.length - 1 ? '24px' : '0'};">
        <div style="font-size:15px;font-weight:600;color:#e0e0e0;margin-bottom:4px;">
          <span style="margin-right:6px;">${step.icon}</span>${step.label}
        </div>
        <div style="font-size:13px;color:#9ca3af;line-height:1.5;">${step.desc}</div>
      </div>
    </div>`,
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Demo ${config.demoNumber}. ${config.title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0f0f1a;color:#e0e0e0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif;line-height:1.6;}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:#1e1e3a;}
::-webkit-scrollbar-thumb{background:#a855f7;border-radius:3px;}
</style>
</head>
<body>
<!-- Sticky Header -->
<div style="position:sticky;top:0;z-index:100;background:#0f0f1a;border-bottom:1px solid #2a2a4a;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;">
  <div>
    <div style="font-size:18px;font-weight:700;color:#e0e0e0;">
      <span style="margin-right:6px;">&#x1F4D6;</span>Demo ${config.demoNumber}. ${config.title}
    </div>
    <div style="font-size:13px;color:#9ca3af;margin-top:2px;">${config.subtitle}</div>
  </div>
  <button onclick="window.close()" style="background:#2a2a4a;border:1px solid #3a3a5a;color:#e0e0e0;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px;transition:background 0.2s;" onmouseover="this.style.background='#3a3a5a'" onmouseout="this.style.background='#2a2a4a'">
    &#x2715; 닫기
  </button>
</div>

<div style="padding:24px;max-width:660px;margin:0 auto;">

  <!-- Data Flow Diagram (SVG) -->
  <div style="margin-bottom:28px;">
    <div style="font-size:14px;font-weight:600;color:#a855f7;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;">Data Flow</div>
    <div style="background:#1e1e3a;border:1px solid #2a2a4a;border-radius:12px;padding:24px 16px;overflow-x:auto;">
      <svg viewBox="0 0 620 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        <defs>
          <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#a855f7"/>
          </marker>
        </defs>
        <!-- Input box -->
        <rect x="10" y="10" width="180" height="80" rx="12" fill="#60a5fa18" stroke="#60a5fa" stroke-width="1.5"/>
        <text x="100" y="42" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="600">INPUT</text>
        <text x="100" y="62" text-anchor="middle" fill="#e0e0e0" font-size="11">${config.dataFlow.input}</text>
        <!-- Arrow 1 -->
        <line x1="194" y1="50" x2="216" y2="50" stroke="#a855f7" stroke-width="2" marker-end="url(#ah)"/>
        <!-- AI box -->
        <rect x="220" y="10" width="180" height="80" rx="12" fill="#a855f718" stroke="#a855f7" stroke-width="1.5"/>
        <text x="310" y="42" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="600">AI &#xBD84;&#xC11D; (Claude)</text>
        <text x="310" y="62" text-anchor="middle" fill="#e0e0e0" font-size="11">${config.dataFlow.ai}</text>
        <!-- Arrow 2 -->
        <line x1="404" y1="50" x2="426" y2="50" stroke="#a855f7" stroke-width="2" marker-end="url(#ah)"/>
        <!-- Output box -->
        <rect x="430" y="10" width="180" height="80" rx="12" fill="#10b98118" stroke="#10b981" stroke-width="1.5"/>
        <text x="520" y="42" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">OUTPUT</text>
        <text x="520" y="62" text-anchor="middle" fill="#e0e0e0" font-size="11">${config.dataFlow.output}</text>
      </svg>
    </div>
  </div>

  <!-- Before / After -->
  <div style="margin-bottom:28px;">
    <div style="font-size:14px;font-weight:600;color:#a855f7;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;">Before / After</div>
    <div style="display:flex;gap:12px;align-items:stretch;position:relative;">
      <!-- Before -->
      <div style="flex:1;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:16px;">
        <div style="font-size:12px;font-weight:700;color:#ef4444;text-transform:uppercase;margin-bottom:8px;">&#x274C; &#xAE30;&#xC874; &#xBC29;&#xC2DD;</div>
        <div style="font-size:13px;color:#e0e0e0;line-height:1.6;">${config.beforeAfter.before}</div>
      </div>
      <!-- After -->
      <div style="flex:1;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;">
        <div style="font-size:12px;font-weight:700;color:#10b981;text-transform:uppercase;margin-bottom:8px;">&#x2705; AI &#xD65C;&#xC6A9; &#xD6C4;</div>
        <div style="font-size:13px;color:#e0e0e0;line-height:1.6;">${config.beforeAfter.after}</div>
      </div>
    </div>
    <!-- Savings badge -->
    <div style="display:flex;justify-content:center;margin-top:12px;">
      <div style="background:#a855f7;color:#fff;padding:6px 20px;border-radius:20px;font-size:13px;font-weight:600;">
        &#x23F1; ${config.beforeAfter.savings}
      </div>
    </div>
  </div>

  <!-- Steps Timeline -->
  <div style="margin-bottom:28px;">
    <div style="font-size:14px;font-weight:600;color:#a855f7;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;">Steps</div>
    <div style="background:#1e1e3a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;">
      ${stepsHtml}
    </div>
  </div>

  <!-- Key Point Footer -->
  <div style="display:flex;gap:12px;align-items:center;background:#1e1e3a;border:1px solid #2a2a4a;border-radius:12px;padding:16px 20px;border-left:4px solid #a855f7;">
    <div style="font-size:14px;color:#e0e0e0;line-height:1.6;">
      <span style="margin-right:4px;">&#x1F4A1;</span>
      <strong style="color:#a855f7;">&#xD575;&#xC2EC; &#xD3EC;&#xC778;&#xD2B8;:</strong>
      ${config.keyPoint}
    </div>
  </div>

</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const w = window.open(url, `demo-explain-${config.demoNumber}`, 'width=700,height=800')
  if (w) w.onload = () => URL.revokeObjectURL(url)
}
