import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  /** Fond légèrement distinct (surface) pour alterner les sections, comme sur le site actuel. */
  surface?: boolean
}

export function Section({ children, className = '', id, surface = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`section-pad ${surface ? 'bg-surface border-y border-border-subtle' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
