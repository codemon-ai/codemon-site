// Generate 1000 mock order records for sales-detail.json
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const products = [
  { id: 'balm-to-foam', name: '2X 프레시 밤투폼', category: '클렌징', price: 24000, cost: 8400 },
  { id: 'tgg-mask', name: 'TGG 하이드로겔 마스크팩', category: '마스크팩', price: 3500, cost: 1225 },
  { id: 'rice-pdrn-serum', name: '라이스 PDRN 워터리 선세럼', category: '에센스', price: 32000, cost: 11200 },
  { id: 'collagen-ampoule', name: '콜라겐 버블앰플', category: '앰플', price: 28000, cost: 9800 },
  { id: 'sleeping-pack', name: '보들 수면팩', category: '수면팩', price: 22000, cost: 7700 },
]

const productWeights = [0.35, 0.25, 0.20, 0.12, 0.08]
const channels = ['쿠팡', '자사몰', '올리브영']
const channelWeights = [0.45, 0.30, 0.25]
const channelFees = { '쿠팡': 0.10, '자사몰': 0.03, '올리브영': 0.15 }
const regions = ['서울', '경기', '부산', '대구', '인천', '광주', '대전', '울산', '제주']
const regionWeights = [0.40, 0.20, 0.10, 0.05, 0.06, 0.04, 0.04, 0.03, 0.08]
const customerTypes = ['신규', '재구매']
const customerWeights = [0.60, 0.40]

function weightedRandom(items, weights) {
  const r = Math.random()
  let sum = 0
  for (let i = 0; i < items.length; i++) {
    sum += weights[i]
    if (r <= sum) return items[i]
  }
  return items[items.length - 1]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const orders = []
const startDate = new Date('2026-03-01')
const endDate = new Date('2026-03-31')

// Distribute 1000 orders across 31 days (weighted: weekends get 1.5x)
const dayWeights = []
for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const dow = d.getDay()
  dayWeights.push(dow === 0 || dow === 6 ? 1.5 : 1.0)
}
const totalWeight = dayWeights.reduce((a, b) => a + b, 0)
const ordersPerDay = dayWeights.map(w => Math.round(1000 * w / totalWeight))

// Adjust to exactly 1000
let total = ordersPerDay.reduce((a, b) => a + b, 0)
while (total !== 1000) {
  const idx = randomInt(0, ordersPerDay.length - 1)
  if (total < 1000) { ordersPerDay[idx]++; total++ }
  else if (ordersPerDay[idx] > 1) { ordersPerDay[idx]--; total-- }
}

let orderNum = 1
for (let dayIdx = 0; dayIdx < 31; dayIdx++) {
  const date = new Date(startDate)
  date.setDate(date.getDate() + dayIdx)
  const dateStr = date.toISOString().slice(0, 10)

  for (let i = 0; i < ordersPerDay[dayIdx]; i++) {
    const product = weightedRandom(products, productWeights)
    const channel = weightedRandom(channels, channelWeights)
    const region = weightedRandom(regions, regionWeights)
    const customerType = weightedRandom(customerTypes, customerWeights)
    const quantity = product.id === 'tgg-mask' ? randomInt(1, 5) : randomInt(1, 3)

    const revenue = quantity * product.price
    const cogs = quantity * product.cost
    const grossProfit = revenue - cogs
    const channelFee = Math.round(revenue * channelFees[channel])
    const netProfit = grossProfit - channelFee

    orders.push({
      id: `ORD-${dateStr.replace(/-/g, '')}-${String(orderNum).padStart(4, '0')}`,
      date: dateStr,
      channel,
      product: product.name,
      category: product.category,
      quantity,
      unitPrice: product.price,
      costPrice: product.cost,
      revenue,
      cogs,
      grossProfit,
      channelFee,
      netProfit,
      region,
      customerType,
    })
    orderNum++
  }
}

const output = { period: '2026-03-01 ~ 2026-03-31', currency: 'KRW', totalOrders: orders.length, orders }
writeFileSync(join(__dirname, '../data/demo/sales-detail.json'), JSON.stringify(output, null, 2))
console.log(`✅ Generated ${orders.length} orders`)
