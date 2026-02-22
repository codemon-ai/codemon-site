import styles from './ShowcaseCard.module.css'

interface ShowcaseCardProps {
  title: string
  description: string
  color: string
  tags: string[]
  demoUrl: string
  status: 'live' | 'coming-soon'
  features: string[]
  image?: string
}

export function ShowcaseGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}

export function ShowcaseCard({
  title,
  description,
  color,
  tags,
  demoUrl,
  status,
  features,
  image,
}: ShowcaseCardProps) {
  return (
    <div className={styles.card} style={{ '--card-color': color } as React.CSSProperties}>
      {image ? (
        <a
          href={status === 'live' ? demoUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
        >
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.imageOverlay}>
              {status === 'live' && <span className={styles.imageOverlayText}>라이브 데모 보기 →</span>}
            </div>
          </div>
        </a>
      ) : (
        <div className={styles.colorBar} />
      )}

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{title}</h3>
            {status === 'live' ? (
              <span className={styles.badgeLive}>Live</span>
            ) : (
              <span className={styles.badgeSoon}>Coming Soon</span>
            )}
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          {status === 'live' ? (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.demoBtn}>
              라이브 데모 →
            </a>
          ) : (
            <span className={styles.demoBtnDisabled}>준비 중</span>
          )}
        </div>
      </div>
    </div>
  )
}
