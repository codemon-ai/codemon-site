import type { NextApiRequest, NextApiResponse } from 'next'
import { demoConfig } from '../../../data/demo/config'
import influencers from '../../../data/demo/influencers.json'
import sales from '../../../data/demo/sales.json'
import snsPosts from '../../../data/demo/sns-posts.json'
import products from '../../../data/demo/products.json'
import marketingCopy from '../../../data/demo/marketing-copy.json'

const dataMap: Record<string, unknown> = {
  influencers,
  sales,
  'sns-posts': snsPosts,
  products,
  'marketing-copy': marketingCopy,
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { type } = req.query
  if (!type || typeof type !== 'string' || !dataMap[type]) {
    return res.status(400).json({
      error: 'Invalid type. Use: influencers, sales, sns-posts, products, marketing-copy',
    })
  }

  res.json({ data: dataMap[type], config: demoConfig })
}
