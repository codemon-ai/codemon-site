import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../../data/demo')

function loadJSON(filename: string) {
  return JSON.parse(readFileSync(join(dataDir, filename), 'utf-8'))
}

// Load data once at startup
const config = {
  company: { name: '보들', nameEn: 'BO:DL', fullName: '보들코스메틱', industry: 'K-뷰티', slogan: 'Essential Softness — 보들보들한 피부를 위한 부드러움', employeeCount: 17, founded: '2024' },
  channels: ['쿠팡', '자사몰', '올리브영'],
  teams: ['마케팅팀', '디자인팀', '콘텐츠팀', 'MD팀', '미국팀', '물류팀', '회계팀'],
  sns: { instagram: '@bodl_official', tiktok: '@bodl_kr' },
}

const influencers: Array<{ name: string; followers: number; channel: string; category: string; tone: string; email: string }> = loadJSON('influencers.json')
const sales: { period: string; currency: string; daily: Array<Record<string, unknown>>; topProducts: Array<Record<string, unknown>> } = loadJSON('sales.json')
const snsPosts: Array<{ id: number; platform: string; type: string; title: string; date: string; views: number; likes: number; comments: number; shares: number; product: string | null }> = loadJSON('sns-posts.json')
const products: Array<{ id: string; name: string; category: string; price: number; ingredients: string[]; usp: string; target: string; description: string }> = loadJSON('products.json')
const marketingCopy: Array<{ id: string; product: string | null; type: string; ko: string; context: string }> = loadJSON('marketing-copy.json')

// Create MCP server
const server = new McpServer({
  name: 'bodl-demo',
  version: '1.0.0',
  description: '보들(BO:DL) K-뷰티 브랜드 데모 데이터 — 인플루언서, 매출, SNS, 제품, 마케팅카피',
})

// Tool 1: get_company_info
server.tool(
  'get_company_info',
  '보들(BO:DL) 회사 정보 조회 — 회사명, 업종, 채널, 팀 구성, SNS 계정',
  {},
  async () => ({
    content: [{ type: 'text' as const, text: JSON.stringify(config, null, 2) }],
  })
)

// Tool 2: search_influencers
server.tool(
  'search_influencers',
  '인플루언서 검색 — 채널, 카테고리, 팔로워 수로 필터링',
  {
    channel: z.string().optional().describe('채널 필터 (인스타그램, 유튜브, 틱톡)'),
    category: z.string().optional().describe('카테고리 필터 (스킨케어, 뷰티리뷰, GRWM 등)'),
    min_followers: z.number().optional().describe('최소 팔로워 수'),
    limit: z.number().optional().describe('반환할 최대 수 (기본: 전체)'),
  },
  async ({ channel, category, min_followers, limit }) => {
    let result = [...influencers]
    if (channel) result = result.filter(i => i.channel === channel)
    if (category) result = result.filter(i => i.category.includes(category))
    if (min_followers) result = result.filter(i => i.followers >= min_followers)
    result.sort((a, b) => b.followers - a.followers)
    if (limit) result = result.slice(0, limit)

    return {
      content: [{ type: 'text' as const, text: `인플루언서 ${result.length}명:\n${JSON.stringify(result, null, 2)}` }],
    }
  }
)

// Tool 3: get_sales_data
server.tool(
  'get_sales_data',
  '채널별 매출 데이터 조회 — 일별 매출, 제품별 매출',
  {
    date: z.string().optional().describe('특정 날짜 (YYYY-MM-DD). 없으면 전체 기간'),
    channel: z.string().optional().describe('채널 필터 (쿠팡, 자사몰, 올리브영)'),
  },
  async ({ date, channel }) => {
    let daily = sales.daily as Array<Record<string, unknown>>
    if (date) daily = daily.filter(d => d.date === date)

    let text = `기간: ${sales.period}\n통화: ${sales.currency}\n\n`
    text += `일별 매출 (${daily.length}일):\n${JSON.stringify(daily, null, 2)}\n\n`
    text += `제품별 주간 매출:\n${JSON.stringify(sales.topProducts, null, 2)}`

    if (channel) text += `\n\n필터: ${channel} 채널`

    return { content: [{ type: 'text' as const, text }] }
  }
)

// Tool 4: get_sns_posts
server.tool(
  'get_sns_posts',
  'SNS 게시물 성과 조회 — 조회수, 좋아요, 댓글, 공유 데이터',
  {
    platform: z.string().optional().describe('플랫폼 (인스타그램, 틱톡)'),
    min_views: z.number().optional().describe('최소 조회수'),
    product: z.string().optional().describe('제품명 필터'),
    limit: z.number().optional().describe('반환할 최대 수 (기본: 전체)'),
  },
  async ({ platform, min_views, product, limit }) => {
    let result = [...snsPosts]
    if (platform) result = result.filter(p => p.platform === platform)
    if (min_views) result = result.filter(p => p.views >= min_views)
    if (product) result = result.filter(p => p.product?.includes(product))
    result.sort((a, b) => b.views - a.views)
    if (limit) result = result.slice(0, limit)

    return {
      content: [{ type: 'text' as const, text: `게시물 ${result.length}건:\n${JSON.stringify(result, null, 2)}` }],
    }
  }
)

// Tool 5: get_products
server.tool(
  'get_products',
  '제품 정보 조회 — 성분, USP, 타겟, 가격',
  {
    id: z.string().optional().describe('제품 ID (balm-to-foam, tgg-mask 등)'),
    category: z.string().optional().describe('카테고리 (클렌징, 마스크팩, 에센스, 앰플, 수면팩)'),
  },
  async ({ id, category }) => {
    let result = [...products]
    if (id) result = result.filter(p => p.id === id)
    if (category) result = result.filter(p => p.category === category)

    return {
      content: [{ type: 'text' as const, text: `제품 ${result.length}개:\n${JSON.stringify(result, null, 2)}` }],
    }
  }
)

// Tool 6: get_marketing_copy
server.tool(
  'get_marketing_copy',
  '마케팅 카피 조회 — 상세페이지, SNS 광고, 브랜드 소개 카피',
  {
    product: z.string().optional().describe('제품명 필터'),
    type: z.string().optional().describe('카피 유형 (상세페이지 히어로, SNS 광고 카피, 브랜드 소개)'),
  },
  async ({ product, type }) => {
    let result = [...marketingCopy]
    if (product) result = result.filter(c => c.product?.includes(product))
    if (type) result = result.filter(c => c.type.includes(type))

    return {
      content: [{ type: 'text' as const, text: `카피 ${result.length}건:\n${JSON.stringify(result, null, 2)}` }],
    }
  }
)

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(console.error)
