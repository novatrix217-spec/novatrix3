import Link from 'next/link'
import { services } from '@/lib/content/services'
import { revealStyle, staggerDelay } from '@/lib/reveal'

/**
 * Grille bento CSS pure (Phase 2, livrable 1) : positionnement uniquement via grid-column /
 * grid-row en fonction du slug, `grid-auto-flow` reste la valeur par défaut (jamais `dense`)
 * pour que l'ordre DOM = ordre visuel = ordre de tabulation clavier (accessibilité). Vérifié
 * à la main que le placement automatique (algorithme "sparse", sans dense) remplit
 * exactement les 4×3 = 12 cellules du desktop sans trou avec cet ordre de tuiles :
 * saas-ia(2×2) → chatbot-leads(2×1) → automatisation(2×1) → reseaux-sociaux(1×1) →
 * agent-administratif(1×1) → wordpress(2×1, complète la dernière ligne).
 *
 * Chaque carte pointe vers une ancre interne réelle de /services, plus aucun lien externe
 * vers ComeUp (correction du bug identifié dans le brief, livrable Phase 1 point 4).
 */

// Classes de placement par slug — desktop (4 colonnes) et tablette (2 colonnes, jamais de
// row-span pour rester robuste à un texte plus long). Mobile : tout col-span-1 (valeur par
// défaut de Tailwind, non répétée ci-dessous).
const gridPlacement: Record<string, string> = {
  'saas-ia': 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  'chatbot-leads': 'lg:col-span-2',
  automatisation: 'lg:col-span-2',
  'reseaux-sociaux': '',
  'agent-administratif': '',
  wordpress: 'sm:col-span-2 lg:col-span-2',
}

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        const isFlagship = service.slug === 'saas-ia'
        const delay = staggerDelay(index, 70, 3)

        return (
          <Link
            key={service.slug}
            href={service.href}
            style={revealStyle(delay, isFlagship ? 14 : 10)}
            className={`reveal group rounded-lg border bg-elevated p-6 hover:border-accent/40 ${gridPlacement[service.slug] ?? ''} ${
              isFlagship
                ? 'border-accent/40 shadow-[var(--elev-2)] sm:border-border-subtle sm:shadow-[var(--elev-1)]'
                : 'border-border-subtle shadow-[var(--elev-1)]'
            }`}
          >
            <h3
              className={`font-display font-bold text-text-primary group-hover:text-accent ${
                isFlagship ? 'text-h2 sm:text-h3' : 'text-h3'
              }`}
            >
              {service.title}
            </h3>
            <p className="text-small mt-3 text-text-secondary">{service.description}</p>
            <span className="text-small mt-4 inline-block font-semibold text-accent">En savoir plus →</span>
          </Link>
        )
      })}
    </div>
  )
}
