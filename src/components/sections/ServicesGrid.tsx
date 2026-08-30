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
export function ServicesGrid() {
  return (
    <div className="border-b border-border-subtle">
      {services.map((service, index) => {
        const isFlagship = service.slug === 'saas-ia'
        const delay = staggerDelay(index, 70, 3)

        return (
          <Link
            key={service.slug}
            href={service.href}
            data-flagship={isFlagship}
            style={revealStyle(delay, isFlagship ? 14 : 10)}
            className={`service-index-card reveal group grid items-start gap-6 border-t border-border-subtle px-0 py-7 sm:grid-cols-[56px_1fr_auto] sm:py-9 ${isFlagship ? 'my-6 rounded-3xl border border-white/15 p-7 sm:p-10' : ''}`}
          >
            <span className={`kicker ${isFlagship ? 'text-brand-glow' : 'text-accent'}`}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={`font-display font-bold ${isFlagship ? 'text-h2 text-white' : 'text-h3 text-text-primary group-hover:text-accent'}`}>
                {service.title}
              </h3>
              <p className={`service-card-muted text-body mt-3 max-w-2xl ${isFlagship ? 'text-white/70' : 'text-text-secondary'}`}>{service.description}</p>
            </div>
            <span aria-hidden="true" className={`text-2xl transition-transform group-hover:translate-x-1 ${isFlagship ? 'text-brand-glow' : 'text-accent'}`}>↗</span>
          </Link>
        )
      })}
    </div>
  )
}
