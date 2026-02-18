import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'codemon'
  const tags = searchParams.get('tags') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          padding: '60px 80px',
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {tags
            ? tags.split(',').map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '20px',
                    color: '#888888',
                    backgroundColor: '#1a1a1a',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    border: '1px solid #333333',
                  }}
                >
                  {tag.trim()}
                </span>
              ))
            : null}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? '52px' : '64px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            codemon.ai
          </span>
          <span
            style={{
              fontSize: '20px',
              color: '#666666',
            }}
          >
            Pro Vibe Coder &amp; Cracked Engineer
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
