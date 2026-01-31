import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  description?: string
}

export function Hero({ title, subtitle, description }: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 -z-10" />

      {/* Decorative blur */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -z-10" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 pb-2">
          {title}
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {description && (
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/25"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/coffeemon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
