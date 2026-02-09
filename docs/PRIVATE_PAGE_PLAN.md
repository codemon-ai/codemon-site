# 비공개 페이지 기능 추가 계획

## 목표

URL만 알면 접근 가능한 비공개 페이지 시스템 구축
- 리스트/네비게이션에 노출 안 됨
- UUID 기반 URL (`/p/{uuid}`)
- 마크다운 파일 그대로 사용

---

## 현재 구조

```
codemon-site/
├── pages/
│   ├── index.mdx        ← 홈
│   ├── blog/            ← 공개 블로그
│   ├── docs/            ← 공개 문서
│   └── projects/        ← 프로젝트 소개
└── ...
```

---

## 추가할 구조

```
codemon-site/
├── pages/
│   ├── ... (기존 유지)
│   └── p/
│       └── [uuid].tsx   ← 🆕 동적 라우트
├── content/
│   └── private/         ← 🆕 비공개 MD 파일 저장
│       └── {uuid}.mdx
└── lib/
    └── private.ts       ← 🆕 유틸 함수
```

---

## 구현 상세

### 1. 동적 라우트 (`pages/p/[uuid].tsx`)

```tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PrivatePageProps {
  source: any
  frontMatter: {
    title?: string
    created?: string
  }
}

export default function PrivatePage({ source, frontMatter }: PrivatePageProps) {
  return (
    <article className="prose dark:prose-invert max-w-none p-8">
      {frontMatter.title && <h1>{frontMatter.title}</h1>}
      <MDXRemote {...source} />
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 빌드 시 모든 UUID 가져오기 (또는 빈 배열 + fallback)
  const privateDir = path.join(process.cwd(), 'content/private')
  
  if (!fs.existsSync(privateDir)) {
    return { paths: [], fallback: 'blocking' }
  }
  
  const files = fs.readdirSync(privateDir).filter(f => f.endsWith('.mdx'))
  const paths = files.map(f => ({
    params: { uuid: f.replace('.mdx', '') }
  }))
  
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uuid = params?.uuid as string
  const filePath = path.join(process.cwd(), 'content/private', `${uuid}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return { notFound: true }
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(fileContent)
  const mdxSource = await serialize(content)
  
  return {
    props: {
      source: mdxSource,
      frontMatter: data
    },
    revalidate: 60 // ISR: 60초마다 재생성
  }
}
```

### 2. 비공개 콘텐츠 폴더

```
content/private/
├── a1b2c3d4.mdx
├── e5f6g7h8.mdx
└── ...
```

**MDX 파일 형식:**
```mdx
---
title: 비공개 문서 제목
created: 2026-02-10
---

# 내용

마크다운 그대로 작성
```

### 3. 의존성 추가

```bash
npm install next-mdx-remote gray-matter
```

### 4. .gitignore 업데이트 (선택)

```
# 비공개 콘텐츠 (git에서 제외하려면)
# content/private/
```

---

## 워크플로우

```
1. 옵시디언에서 문서 작성
2. "비공개 발행해줘" 요청
3. 로디가:
   - UUID 생성 (nanoid 또는 uuid)
   - content/private/{uuid}.mdx로 복사
   - URL 알려줌: codemon.site/p/{uuid}
4. git push → Vercel 자동 배포
```

---

## 추가 고려사항

### 만료 기능 (선택)
```tsx
// frontmatter에 expires 추가
---
expires: 2026-03-01
---

// getStaticProps에서 체크
if (data.expires && new Date(data.expires) < new Date()) {
  return { notFound: true }
}
```

### 스타일링
- Nextra 테마 스타일 재사용
- 또는 별도 레이아웃 (심플하게)

### 보안
- UUID 충분히 길게 (nanoid 21자 권장)
- robots.txt에서 /p/ 제외
```
User-agent: *
Disallow: /p/
```

---

## 실행 순서

1. [ ] 의존성 설치 (`next-mdx-remote`, `gray-matter`)
2. [ ] `content/private/` 폴더 생성
3. [ ] `pages/p/[uuid].tsx` 생성
4. [ ] 테스트 MDX 파일 생성 후 확인
5. [ ] robots.txt 업데이트
6. [ ] git push → Vercel 배포 확인

---

*작성: 로디 🦊 | 2026-02-10*
