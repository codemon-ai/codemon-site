# codemon-site

브랜드 랜딩 + 기술 문서 사이트

## Tech Stack

- **Framework:** Nextra 3.3.x (nextra-theme-docs)
- **Runtime:** Next.js 14.x (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Nextra theme

## Project Structure

```
codemon-site/
├── pages/              # Pages Router
│   ├── _app.tsx        # App wrapper
│   ├── _meta.ts        # Top-level navigation
│   ├── index.mdx       # Brand landing page (layout: raw)
│   ├── about.mdx       # About page
│   ├── projects/       # Projects section
│   ├── blog/           # Blog section
│   └── docs/           # Documentation section
├── components/         # React components
│   ├── Hero.tsx        # Landing hero section
│   └── Features.tsx    # Features cards
├── theme.config.tsx    # Nextra theme config
├── next.config.mjs     # Next.js config
└── tailwind.config.js  # Tailwind config
```

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run start   # Start production server
```

## Conventions

### Page Layout
- `index` page: `layout: 'raw'` (no sidebar/TOC)
- Other pages: Standard Nextra docs layout

### Components
- React functional components with TypeScript
- Tailwind CSS for styling
- Support dark mode with `dark:` variants

### Colors
- Primary: Blue gradient (#3b82f6 → #8b5cf6)
- Background: Light (#ffffff) / Dark (#0a0a0a)

## Related
- Nextra 3.x: https://nextra.site
- SWR Site (reference): https://swr.vercel.app
