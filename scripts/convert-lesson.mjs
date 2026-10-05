#!/usr/bin/env node
/**
 * high-techer 교안/보충자료 HTML → MDX (스펙 §6.3)
 *   node scripts/convert-lesson.mjs <in.html> <out.mdx> --category <id> [--tags a,b] [--keep-script]
 * 규칙: .section-label→##, .slide h2→###, .sub→기울임, .bigstat→목록, .keylist→목록, .callout→인용,
 *       .case→소제목+본문, .srcs→## 출처, details.script(스피커노트)·.icebreak(강사용)·topbar/footer/chips 제거
 */
import fs from 'fs'
import * as hp from 'htmlparser2'
import { stripBrand, residuals } from './strip-brand.mjs'

const { DomUtils } = hp
const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const [input, output] = args.filter((a) => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') === false || args.indexOf(a) === 0 || args.indexOf(a) === 1)
const category = opt('--category', 'models')
const tags = (opt('--tags', '') || '').split(',').filter(Boolean)
const keepScript = args.includes('--keep-script')

const doc = hp.parseDocument(fs.readFileSync(input, 'utf8'))
const q = (sel, root = doc) => DomUtils.findAll((el) => el.type === 'tag' && matches(el, sel), root.children ?? [root])
const has = (el, cls) => (el.attribs?.class ?? '').split(/\s+/).includes(cls)
function matches(el, sel) { const [tag, cls] = sel.split('.'); return (!tag || el.name === tag) && (!cls || has(el, cls)) }
const text = (el) => DomUtils.textContent(el).replace(/\s+/g, ' ').trim()

function inline(node) {
  if (node.type === 'text') return node.data.replace(/\s+/g, ' ')
  if (node.type !== 'tag') return ''
  const kids = () => (node.children ?? []).map(inline).join('')
  switch (node.name) {
    case 'strong': case 'b': return `**${kids().trim()}**`
    case 'em': case 'i': return `*${kids().trim()}*`
    case 'code': return '`' + text(node) + '`'
    case 'a': return node.attribs?.href ? `[${kids().trim()}](${node.attribs.href})` : kids()
    case 'br': return '\n'
    case 'span': return has(node, 'num') || has(node, 'cue') ? '' : kids()
    default: return kids()
  }
}
const para = (el) => inline(el).replace(/[ \t]+/g, ' ').trim()

function block(el, out) {
  if (el.type !== 'tag') return
  if (!keepScript && el.name === 'details' && has(el, 'script')) return
  if (has(el, 'icebreak') || has(el, 'chips') || has(el, 'eyebrow') || has(el, 'topbar') || el.name === 'footer' || el.name === 'header') return
  if (has(el, 'section-label')) return out.push(`## ${text(el)}`)
  if (has(el, 'slide')) {
    for (const k of el.children ?? []) {
      if (k.type !== 'tag') continue
      if (k.name === 'h2') out.push(`### ${para(k)}`)
      else if (k.name === 'h3') out.push(`#### ${para(k)}`)
      else block(k, out)
    }
    return
  }
  if (el.name === 'details' && has(el, 'script')) { out.push(`<details>\n<summary>강의 스크립트</summary>\n\n${q('p', el).map(para).join('\n\n')}\n\n</details>`); return }
  if (has(el, 'sub')) return out.push(`*${para(el)}*`)
  if (has(el, 'bigstat')) return out.push(q('div.bs', el).map((b) => `- **${text(q('div.v', b)[0] ?? b)}** — ${text(q('div.k', b)[0] ?? b)}`).join('\n'))
  if (has(el, 'callout')) { const lb = q('span.label', el)[0]; const body = para({ ...el, children: (el.children ?? []).filter((c) => c !== lb) }); out.push(`> ${lb ? `**${text(lb)}** ` : ''}${body}`); return }
  if (has(el, 'case')) { const when = q('div.when', el)[0], h = q('h4', el)[0], price = q('span.price', el)[0]; out.push(`#### ${when ? text(when) + ' — ' : ''}${h ? para(h) : ''}`); q('p', el).forEach((p) => out.push(para(p))); if (price) out.push(`*${text(price)}*`); return }
  if (has(el, 'srcs')) return out.push(`## 출처\n\n${para(el).replace(/\s*·\s*/g, '\n- ').replace(/^(?!- )/, '- ')}`)
  if (el.name === 'ul' || el.name === 'ol') return out.push(q('li', el).map((li, i) => `${el.name === 'ol' ? `${i + 1}.` : '-'} ${para(li)}`).join('\n'))
  if (el.name === 'pre') return out.push('```\n' + DomUtils.textContent(el).trim() + '\n```')
  if (el.name === 'h2') return out.push(`## ${para(el)}`)
  if (el.name === 'h3') return out.push(`### ${para(el)}`)
  if (el.name === 'h4') return out.push(`#### ${para(el)}`)
  if (el.name === 'p') { const t = para(el); if (t) out.push(t); return }
  if (el.name === 'table') { const rows = q('tr', el).map((tr) => '| ' + [...q('th', tr), ...q('td', tr)].map(para).join(' | ') + ' |'); if (rows.length) { rows.splice(1, 0, '|' + ' --- |'.repeat(rows[0].split('|').length - 2)); out.push(rows.join('\n')) } return }
  for (const k of el.children ?? []) block(k, out)
}

const h1 = q('h1')[0]
const title = h1 ? para(h1).replace(/\*\*/g, '') : (q('title')[0] ? text(q('title')[0]).split(' — ')[0] : input)
const lead = q('p.lead')[0] ? para(q('p.lead')[0]).replace(/\*\*/g, '') : ''
const main = q('main')[0] ?? q('body')[0] ?? doc
const out = []
block(main, out)
let body = out.join('\n\n').replace(/\n{3,}/g, '\n\n')
body = stripBrand(body)
const description = (lead || body.replace(/[#>*`\-\n]/g, ' ').replace(/\s+/g, ' ').trim()).slice(0, 150)
const fm = [
  '---',
  `title: ${JSON.stringify(stripBrand(title))}`,
  `description: ${JSON.stringify(description)}`,
  `date: ${new Date().toISOString().slice(0, 10)}`,
  'author: codemon',
  `category: ${category}`,
  `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
  `source: ${JSON.stringify(input.replace(/^.*\/codemon\//, ''))}`,
  'migrated: true',
  'verified: "2026-07"',
  '---',
].join('\n')
const note = `{/* 이관(A등급): 원본 ${input.split('/').slice(-2).join('/')} · 사실 기준 2026-07 · 게시 전 재검증(수치·모델명) · 발행=로디몬 */}`
fs.writeFileSync(output, `${fm}\n\n${note}\n\n# ${stripBrand(title)}\n\n${lead ? stripBrand(lead) + '\n\n' : ''}${body}\n`)
const r = residuals(fs.readFileSync(output, 'utf8'))
console.log(`${r.length ? '✗' : '✓'} ${output} (${body.length} chars)${r.length ? ' residual: ' + r.join(',') : ''}`)
