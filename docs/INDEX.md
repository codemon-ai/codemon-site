# codemon-site 개발 문서

## 문서 목록

| 문서 | 설명 |
|------|------|
| [SETUP.md](./SETUP.md) | 프로젝트 셋업 과정 |
| [CHANGELOG.md](./CHANGELOG.md) | 변경 이력 |
| [ISSUES.md](./ISSUES.md) | 알려진 이슈 및 해결 방법 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 배포 가이드 |

## 기술 스택

- **프레임워크**: Nextra 3.3.1 + Next.js 14.2.35
- **스타일링**: Nextra Docs Theme
- **콘텐츠**: MDX (마크다운)
- **배포**: Vercel (예정)

## 프로젝트 구조

```
codemon-site/
├── docs/                   # 개발 문서
├── pages/                  # 페이지 (MDX)
│   ├── index.mdx          # 홈
│   ├── about.mdx          # 소개
│   ├── projects/          # 프로젝트
│   ├── blog/              # 블로그
│   └── docs/              # 기술 문서 (사이트 내)
├── public/                # 정적 파일
├── theme.config.tsx       # Nextra 테마 설정
├── next.config.mjs        # Next.js 설정
└── package.json
```
