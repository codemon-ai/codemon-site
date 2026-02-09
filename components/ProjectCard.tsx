import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  emoji: string
  title: string
  description: string
  features?: string[]
  links?: { label: string; href: string }[]
  color: string
}

export function ProjectCardGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}

export function ProjectCard({
  emoji,
  title,
  description,
  features,
  links,
  color
}: ProjectCardProps) {
  return (
    <div className={styles.card} style={{ '--card-color': color } as React.CSSProperties}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {features && features.length > 0 && (
        <ul className={styles.features}>
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      )}
      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={i === 0 ? styles.link : styles.linkSecondary}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
