/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Swiss Signal 토큰 — 값은 styles/globals.css의 :root/.dark rgb 변수 (ADR-006)
      colors: {
        paper:  'rgb(var(--paper) / <alpha-value>)',
        ink:    'rgb(var(--ink) / <alpha-value>)',
        'ink-2':'rgb(var(--ink-2) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',   // 블록·버튼 배경만. 흰 바탕 텍스트 색 금지
        band:   'rgb(var(--band) / <alpha-value>)',
        'on-signal': '#001D3D',                        // 시그널 블록 위 텍스트·테두리 (테마 무관 고정)
        // 별칭 — partner·yonsei·webinar·기존 컴포넌트 호환 (paper/ink와 동일 변수)
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        // LEGACY: 숨김 영역(강의 슬라이드·데모·admin)만 사용. 공개면 사용 금지. P4 데모 리스킨 후 제거 예정.
        accent: { purple: '#a855f7' },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
