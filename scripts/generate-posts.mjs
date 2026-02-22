/**
 * MDX frontmatter에서 블로그 글 목록을 자동 생성하는 스크립트
 * 빌드 전에 실행: node scripts/generate-posts.mjs
 * 출력: data/posts.json
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.resolve('pages/blog')
const OUTPUT = path.resolve('data/posts.json')

// _meta.ts, index 파일, 영문 파일 제외
const EXCLUDE = ['_meta.ts', '_meta.en.ts', 'index.mdx', 'index.ko.mdx', 'index.en.mdx']

function run() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => 
    f.endsWith('.mdx') && !EXCLUDE.includes(f) && !f.endsWith('.en.mdx')
  )

  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = file.replace('.mdx', '')

    // 태그 정규화: 소문자 변환 + 통합
    const TAG_MAP = {
      'ai-tools': 'AI',
      'ai': 'AI',
      'anthropic': 'AI',
      'claude': 'AI',
      'claude-code': 'AI',
      'gemini': 'AI',
      'glm-5': 'AI',
      'opencode': 'AI',
      'mcp': 'AI',
      'agent-skills': 'AI',
      '에이전트': 'AI',
      '멀티에이전트': 'AI',
      '스킬': 'AI',
      'tips': 'tips',
      '워크플로우': 'tips',
      '비용최적화': 'tips',
      'insight': 'insight',
      '아키텍처': 'insight',
      '시스템설계': 'insight',
      '의사결정': 'insight',
      'news': 'news',
      'project': 'project',
      '사이드프로젝트': 'project',
      '게임개발': 'project',
      '외주': 'project',
      'series': 'series',
      'hands-on': 'hands-on',
      '인프라': '인프라',
      '맥미니': '인프라',
      'docker': '인프라',
      'pm2': '인프라',
      '안정성': '인프라',
      '디버깅': '인프라',
      '자동화': 'tips',
      'react': 'project',
      'three.js': 'project',
    }

    const rawTags = data.tags || []
    const normalizedTags = [...new Set(rawTags.map(t => {
      const lower = t.toLowerCase()
      return TAG_MAP[lower] || TAG_MAP[t] || t
    }))]

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : '2026-01-01',
      tags: normalizedTags,
      description: data.description || '',
    }
  })

  // 날짜 내림차순 정렬
  posts.sort((a, b) => b.date.localeCompare(a.date))

  // 모든 태그 수집
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort()

  const output = { posts, allTags, generatedAt: new Date().toISOString() }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2))

  console.log(`✅ ${posts.length}개 글, ${allTags.length}개 태그 → data/posts.json`)
}

run()
