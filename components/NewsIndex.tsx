'use client'

import { useState } from 'react'
import Link from 'next/link'
import newsData from '../data/news.json'

interface NewsItem {
  id: string
  title: string
  summary: string | string[]
  url: string
  source: string
  tags: string[]
  date: string
  blogLink: string | null
}

const items: NewsItem[] = newsData.items as NewsItem[]

const allTags = Array.from(
  new Set(items.flatMap(item => item.tags))
).sort()

const sourceIcon: Record<string, string> = {
  YouTube: '▶',
  Reddit: '💬',
  GitHub: '🔗',
  Blog: '📝',
  X: '𝕏',
}

export default function NewsIndex() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? items.filter(item => item.tags.includes(activeTag))
    : items

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">News</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        AI · 개발 · 자동화 — 매일 큐레이션하는 기술 뉴스
      </p>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTag === null
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          전체 ({items.length})
        </button>
        {allTags.map(tag => {
          const count = items.filter(item => item.tags.includes(tag)).length
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              #{tag} ({count})
            </button>
          )
        })}
      </div>

      {/* News cards */}
      <div className="space-y-4">
        {filtered.map(item => (
          <article
            key={item.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
          >
            {/* Top: tags + date */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                {item.date}
              </span>
            </div>

            {/* Title + summary */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h2 className="text-base font-semibold group-hover:text-purple-500 transition-colors">
                {item.title}
              </h2>
            </a>
            {Array.isArray(item.summary) && item.summary.length > 1 ? (
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside space-y-0.5">
                {item.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {Array.isArray(item.summary) ? item.summary[0] : item.summary}
              </p>
            )}

            {/* Bottom: source + blog link */}
            <div className="flex items-center gap-3 mt-3 text-sm">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
              >
                {sourceIcon[item.source] || '🔗'} {item.source} ↗
              </a>
              {item.blogLink && (
                <Link
                  href={item.blogLink}
                  className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
                >
                  자세히 보기 →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          해당 태그의 뉴스가 없습니다.
        </p>
      )}
    </div>
  )
}
