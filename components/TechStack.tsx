const techCategories = [
  {
    name: 'Languages & Frameworks',
    items: ['TypeScript', 'Python', 'Go', 'React', 'Next.js', 'Node.js', 'FastAPI'],
  },
  {
    name: 'AI & ML',
    items: ['OpenAI', 'Claude API', 'LangChain', 'Hugging Face', 'PyTorch'],
  },
  {
    name: 'Infrastructure',
    items: ['AWS', 'GCP', 'Vercel', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'],
  },
]

export function TechStack() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
