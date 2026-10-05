#!/usr/bin/env node
/**
 * high-techer 제공자료 HTML(.pbox+copy, .callout.warn/.trouble, .checklist) → MDX + CopyBox/TroubleCard/Checklist
 *   node scripts/convert-resource.mjs <in.html> <out.mdx>
 * ⚠️ 제공자료는 B등급 — G1 확인 전에는 결과물을 커밋하지 않는다 (스크립트 검증용으로만 실행).
 */
import fs from 'fs'
import * as hp from 'htmlparser2'
import { stripBrand, residuals } from './strip-brand.mjs'
const { DomUtils } = hp
const [input, output] = process.argv.slice(2)
const doc = hp.parseDocument(fs.readFileSync(input, 'utf8'))
const has = (el, cls) => (el.attribs?.class ?? '').split(/\s+/).includes(cls)
const find = (pred, root) => DomUtils.findAll((el) => el.type === 'tag' && pred(el), root.children ?? [root])
const text = (el) => DomUtils.textContent(el).replace(/\s+/g, ' ').trim()
const raw = (el) => DomUtils.textContent(el).replace(/^\n+|\s+$/g, '')
const esc = (s) => s.replace(/[{}]/g, (m) => `\\${m}`)
function inline(n) {
  if (n.type === 'text') return n.data.replace(/\s+/g, ' ')
  if (n.type !== 'tag') return ''
  const k = () => (n.children ?? []).map(inline).join('')
  if (n.name === 'strong' || n.name === 'b') return `**${k().trim()}**`
  if (n.name === 'code') return '`' + text(n) + '`'
  if (n.name === 'a' && n.attribs?.href) return `[${k().trim()}](${n.attribs.href})`
  if (n.name === 'button' || has(n, 'num') || has(n, 'sym')) return ''
  return k()
}
const para = (el) => inline(el).replace(/[ \t]+/g, ' ').trim()
const out = []
function walk(el) {
  if (el.type !== 'tag') return
  if (['header', 'footer', 'script', 'style', 'nav'].includes(el.name) || has(el, 'topbar') || has(el, 'chips')) return
  if (has(el, 'section-label')) return out.push(`## ${text(el)}`)
  if (has(el, 'pbox')) { const h = find((e) => has(e, 'phead'), el)[0]; const pre = find((e) => e.name === 'pre', el)[0]; if (pre) out.push(`<CopyBox title=${JSON.stringify(h ? text(h) : '프롬프트')}>{${JSON.stringify(raw(pre))}}</CopyBox>`); return }
  if ((has(el, 'callout') && has(el, 'warn')) || has(el, 'trouble')) { const lb = find((e) => has(e, 'label') || e.name === 'h4', el)[0]; const body = para({ ...el, children: (el.children ?? []).filter((c) => c !== lb) }); out.push(`<TroubleCard${lb ? ` title=${JSON.stringify(text(lb))}` : ''}>${esc(body)}</TroubleCard>`); return }
  if (has(el, 'checklist')) { const items = find((e) => e.name === 'li', el).map(text); out.push(`<Checklist items={${JSON.stringify(items)}} />`); return }
  if (has(el, 'fig')) { const img = find((e) => e.name === 'img', el)[0]; const cap = find((e) => has(e, 'cap'), el)[0]; if (img?.attribs?.src) out.push(`![${cap ? text(cap) : ''}](${img.attribs.src.replace(/^\.\.\/assets\//, '/files/practice/assets/')})`); return }
  if (has(el, 'slide')) { for (const k of el.children ?? []) { if (k.type !== 'tag') continue; if (k.name === 'h2') out.push(`### ${para(k)}`); else walk(k) } return }
  if (has(el, 'sub')) return out.push(`*${para(el)}*`)
  if (has(el, 'srcs')) return out.push(`**출처** ${para(el)}`)
  if (el.name === 'ul' || el.name === 'ol') return out.push(find((e) => e.name === 'li', el).map((li, i) => `${el.name === 'ol' ? i + 1 + '.' : '-'} ${para(li)}`).join('\n'))
  if (el.name === 'pre') return out.push('```\n' + raw(el) + '\n```')
  if (/^h[1-4]$/.test(el.name)) return out.push(`${'#'.repeat(Number(el.name[1]) + 1)} ${para(el)}`)
  if (el.name === 'p') { const t = para(el); if (t) out.push(t); return }
  for (const k of el.children ?? []) walk(k)
}
const h1 = find((e) => e.name === 'h1', doc)[0]
walk(find((e) => e.name === 'main', doc)[0] ?? find((e) => e.name === 'body', doc)[0] ?? doc)
const title = stripBrand(h1 ? para(h1).replace(/\*\*/g, '') : input)
const body = stripBrand(out.join('\n\n').replace(/\n{3,}/g, '\n\n'))
fs.writeFileSync(output, `---\ntitle: ${JSON.stringify(title)}\ndescription: ""\nsource: ${JSON.stringify(input.replace(/^.*\/codemon\//, ''))}\n---\n\nimport { CopyBox } from '../../components/content/CopyBox'\nimport { TroubleCard } from '../../components/content/TroubleCard'\nimport { Checklist } from '../../components/content/Checklist'\n\n# ${title}\n\n${body}\n`)
const r = residuals(fs.readFileSync(output, 'utf8'))
console.log(`${r.length ? '✗' : '✓'} ${output} (${body.length} chars) CopyBox=${(body.match(/<CopyBox/g) ?? []).length} Trouble=${(body.match(/<TroubleCard/g) ?? []).length} Checklist=${(body.match(/<Checklist/g) ?? []).length}${r.length ? ' residual: ' + r.join(',') : ''}`)
