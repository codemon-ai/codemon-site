#!/usr/bin/env node
/**
 * 브랜드 문자열 치환 + 잔여 grep 리포트 (스펙 §6.3)
 *   node scripts/strip-brand.mjs <file|dir> [--write]   (기본: 리포트만)
 */
import fs from 'fs'
import path from 'path'

export const REPLACEMENTS = [
  [/AIRPREMIA\s*[×x]\s*CODEMON\.AI/gi, 'codemon'],
  [/codemon\s*[×x]\s*HIGHTECHER/gi, 'codemon'],
  [/HIGHTECHER/g, ''], [/하이테커/g, ''],
  [/AIRPREMIA/gi, ''], [/에어프레미아/g, '항공사'],
  [/인재키움/g, ''],
  [/#E34027|#182749|#C8102E/gi, '#001D3D'],
  [/https?:\/\/airpremia\.vercel\.app[^\s)"']*/g, ''],
  [/https?:\/\/hightecher-lectures\.vercel\.app[^\s)"']*/g, ''],
  [/\[촬영전확인\][^\n]*/g, ''],
  [/CONFIDENTIAL/g, ''],
]
export const RESIDUAL = /HIGHTECHER|하이테커|AIRPREMIA|에어프레미아|인재키움|#E34027|#182749|#C8102E|airpremia\.vercel\.app|hightecher-lectures\.vercel\.app|촬영전확인|CONFIDENTIAL|🎙️/gi

export function stripBrand(text) {
  let t = text
  for (const [re, rep] of REPLACEMENTS) t = t.replace(re, rep)
  return t
}
export function residuals(text) {
  const body = text.replace(/^source:.*$/m, '')   // frontmatter source 경로(원본 레포명)는 제외
  const m = body.match(RESIDUAL) ?? []
  return [...new Set(m.map((s) => s.toLowerCase()))]
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  const [, , target, flag] = process.argv
  if (!target) { console.error('usage: strip-brand.mjs <file|dir> [--write]'); process.exit(2) }
  const files = fs.statSync(target).isDirectory()
    ? fs.readdirSync(target, { recursive: true }).map((f) => path.join(target, f)).filter((f) => /\.(mdx?|html?|tsx?)$/.test(f) && fs.statSync(f).isFile())
    : [target]
  let bad = 0
  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8')
    const out = flag === '--write' ? stripBrand(raw) : raw
    if (flag === '--write' && out !== raw) fs.writeFileSync(f, out)
    const r = residuals(out)
    if (r.length) { bad++; console.log(`✗ ${f}: ${r.join(', ')}`) }
  }
  console.log(`${files.length} files, residual=${bad}`)
  process.exit(bad ? 1 : 0)
}
