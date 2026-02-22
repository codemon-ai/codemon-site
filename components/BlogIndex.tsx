'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  series?: string
}

const posts: Post[] = [
  {
    slug: 'sonnet46-opus-killer-budget',
    title: 'Sonnet 4.6 — Opus의 1/5 가격인데, 70%가 더 좋다고?',
    date: '2026-02-22',
    tags: ['news', 'insight'],
    description: '커뮤니티 팩트체크 + 2주 실사용 후기. codemon-make 에이전트 파이프라인에서 체감한 것들.'
  },
  {
    slug: 'agent-skills-ecosystem',
    title: 'AI 코딩 에이전트의 npm — Agent Skills 생태계 완전 정복',
    date: '2026-02-21',
    tags: ['AI', 'tips'],
    description: 'skills.sh, Anthropic Agent Skills 표준, 69K+ 설치. 에이전트에게 스킬을 가르치는 새로운 생태계.'
  },
  {
    slug: 'gemini-3-vs-31-pro-real-code-review',
    title: 'Gemini 3 Pro vs 3.1 Pro: 실제 코드 11만 자를 던져봤다',
    date: '2026-02-20',
    tags: ['AI', 'insight'],
    description: '같은 코드베이스(112K chars)를 두 모델에 던지고 비교. 3.1 Pro가 보안 취약점까지 찾았다.'
  },
  {
    slug: 'opus-surrounded',
    title: 'Opus가 포위됐다 — Sonnet 4.6과 Gemini 3.1 Pro, 48시간의 협공',
    date: '2026-02-20',
    tags: ['AI', 'insight'],
    description: 'Sonnet 4.6은 아래에서, Gemini 3.1 Pro는 옆에서. Opus의 존재 이유가 흔들린다.'
  },
  {
    slug: 'gemini-cli-google-mcp-handson',
    title: 'Gemini CLI + Google MCP로 풀스택 앱 클라우드 배포하기',
    date: '2026-02-19',
    tags: ['AI', 'hands-on'],
    description: 'MCP 서버 3개 연결, 자연어 4줄로 DB 생성 → 데이터 이동 → Cloud Run 배포.',
    series: 'AI 핸즈온'
  },
  {
    slug: 'blog-seo-basics-to-practice',
    title: '블로그 SEO, 기본 개념부터 실전 셋팅까지',
    date: '2026-02-19',
    tags: ['tips', '인프라'],
    description: 'sitemap부터 JSON-LD까지, 실제로 셋팅한 SEO 인프라 전체를 공개한다.'
  },
  {
    slug: 'building-multi-agent-system-part1',
    title: '로컬에서 AI 멀티 에이전트 만들기 (1) — 설계와 환경 구성',
    date: '2026-02-19',
    tags: ['AI', 'series'],
    description: 'BullMQ + Redis + Claude CLI로 3에이전트 파이프라인을 설계한다.',
    series: '멀티에이전트'
  },
  {
    slug: 'building-multi-agent-system-part2',
    title: '로컬에서 AI 멀티 에이전트 만들기 (2) — 에이전트 구현',
    date: '2026-02-19',
    tags: ['AI', 'series'],
    description: 'EventBus 47줄, Orchestrator 3줄, 그리고 3개 에이전트 구현.',
    series: '멀티에이전트'
  },
  {
    slug: 'building-multi-agent-system-part3',
    title: '로컬에서 AI 멀티 에이전트 만들기 (3) — 실전과 확장',
    date: '2026-02-19',
    tags: ['AI', 'series'],
    description: '실제 실행 결과: 2.5분 만에 React 앱 생성 + 코드 리뷰 8/10.',
    series: '멀티에이전트'
  },
  {
    slug: 'ai-file-management-system',
    title: 'AI 봇에게 파일 정리를 맡겼더니',
    date: '2026-02-19',
    tags: ['project', 'tips'],
    description: '3개 볼트에 흩어진 수백 개 파일을 PARA 구조로 통합하고, AI 봇이 자동 분류.'
  },
  {
    slug: 'claude-code-agent-teams',
    title: 'Claude Code Agent Teams — AI 팀 코드 리뷰',
    date: '2026-02-19',
    tags: ['AI', 'tips'],
    description: '여러 Claude 인스턴스가 팀을 이뤄 동시에 코드 리뷰. 4분 만에 52개 발견사항.'
  },
  {
    slug: 'llm-price-war-2026',
    title: '2026년 LLM 가격 전쟁',
    date: '2026-02-19',
    tags: ['tips', 'insight'],
    description: 'SWE-bench 리더보드와 실제 API 가격을 교차 분석. GLM-5는 Sonnet의 1/10 가격.'
  },
  {
    slug: 'ai-coding-agents-comparison',
    title: 'Claude Code vs Cursor vs Windsurf — 솔직 비교',
    date: '2026-02-18',
    tags: ['tips', 'insight'],
    description: 'Cursor는 IDE를, Windsurf는 흐름을, Claude Code는 터미널에서 시스템을 짠다.'
  },
  {
    slug: 'sonnet-46-developer-reactions',
    title: 'Sonnet 4.6 실사용 평가 — Reddit 개발자 반응',
    date: '2026-02-18',
    tags: ['AI', 'news'],
    description: '벤치마크는 인상적. 실제로 쓸 만할까? Reddit 개발자 52명의 솔직한 의견.'
  },
  {
    slug: 'sonnet-46-dropped',
    title: 'Sonnet 4.6이 떴다 — Opus급 성능을 1/5 가격에',
    date: '2026-02-18',
    tags: ['AI', 'news'],
    description: 'Opus에 근접한 벤치마크, 1M 토큰 컨텍스트, 무료 티어 기본 모델 승격.'
  },
  {
    slug: '3-dollar-ai-dev-team',
    title: '월 $3으로 AI 개발팀 운영하기',
    date: '2026-02-17',
    tags: ['AI', 'insight'],
    description: 'PM은 Opus, Dev는 GLM-5. 역할에 따라 모델을 섞어 쓰면 비용이 58배 줄어든다.'
  },
  {
    slug: 'teaching-skills-to-ai-agents',
    title: 'AI 에이전트에게 스킬을 가르치는 법',
    date: '2026-02-17',
    tags: ['AI', 'tips'],
    description: 'SKILL.md 파일 하나가 AI의 전문성을 바꾼다.'
  },
  {
    slug: 'mac-mini-startup-infra',
    title: '맥미니 하나로 AI 스타트업 인프라 구축하기',
    date: '2026-02-17',
    tags: ['인프라', 'project'],
    description: 'M1 맥미니에서 PM2 18개 서비스, Docker 12개 컨테이너. 월 비용: $0.'
  },
  {
    slug: 'free-claude-code-with-glm5',
    title: 'Claude Code를 무료로 쓰는 법 — GLM-5 + NVIDIA NIM',
    date: '2026-02-17',
    tags: ['tips'],
    description: '구독료 $200 없이 Claude Code의 에이전트 코딩 UX를 그대로 쓸 수 있다.'
  },
  {
    slug: 'ai-agent-outsourcing-company',
    title: 'AI 에이전트 7명이 일하는 외주 회사를 만들었다',
    date: '2026-02-17',
    tags: ['AI', 'project'],
    description: 'AI가 기획하고, 코딩하고, 테스트한다. 월 $13으로 운영되는 AI 외주 팀.'
  },
  {
    slug: 'forest99',
    title: 'Forest99 개발 회고',
    date: '2026-02-08',
    tags: ['project'],
    description: '9살의 기획자, 48시간의 의사결정. 아이디어를 현실화하는 과정.'
  },
  {
    slug: 'claude-code-delegation',
    title: 'Claude Code로 위임하는 법',
    date: '2026-01-31',
    tags: ['AI', 'tips'],
    description: 'Clawdbot + Claude Code로 구축한 비동기 개발 워크플로우.'
  },
  {
    slug: 'clawdbot-gateway-crash-fix',
    title: 'Clawdbot Gateway 크래시 해결',
    date: '2026-01-29',
    tags: ['인프라'],
    description: '하나의 타임스탬프와 미처리된 에러가 만든 연쇄 실패.'
  }
]

const ALL_TAGS = ['AI', 'tips', 'insight', 'news', 'project', 'series', 'hands-on', '인프라']

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
        {ALL_TAGS.map(tag => {
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
