'use client'

import { useState } from 'react'
import Link from 'next/link'
import postsData from '../data/posts.json'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

const { posts, allTags } = postsData as { posts: Post[], allTags: string[] }

export default function BlogIndex() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        개발, AI, 자동화에 관한 이야기를 나눕니다.
      </p>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTag === null
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          전체 ({posts.length})
        </button>
        {allTags.map(tag => {
          const count = posts.filter(p => p.tags.includes(tag)).length
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              #{tag} ({count})
            </button>
          )
        })}
      </div>

      {/* Post list */}
      <div className="space-y-6">
        {filtered.map(post => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-lg font-semibold group-hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {post.date} · {post.tags.map(t => `#${t}`).join(' ')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                {post.description}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          해당 태그의 글이 없습니다.
        </p>
      )}
    </div>
  )
}
