import Link from 'next/link'
import { services } from '@/lib/content/services'

/**
 * Grille de services (esprit bento — brief section 3). Chaque carte pointe vers une
 * ancre interne réelle de /services, plus aucun lien externe vers ComeUp (correction
 * du bug identifié dans le brief, livrable Phase 1 point 4).
 */
export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={service.href}
          className="group rounded-lg border border-border-subtle bg-elevated p-6 shadow-[var(--elev-1)] hover:border-accent/40"
        >
          <h3 className="text-h3 font-display font-bold text-text-primary group-hover:text-accent">
            {service.title}
          </h3>
          <p className="text-small mt-3 text-text-secondary">{service.description}</p>
          <span className="text-small mt-4 inline-block font-semibold text-accent">En savoir plus →</span>
        </Link>
      ))}
    </div>
  )
}
