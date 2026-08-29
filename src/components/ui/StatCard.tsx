import type { Stat } from '@/lib/content/types'
import { counterStyle, leadingInteger, revealStyle } from '@/lib/reveal'

/**
 * Chiffres clés (Phase 2, livrable 3). `{stat.value}` (ex. "100+") reste le vrai nœud
 * texte affiché — c'est LA source d'information pour les lecteurs d'écran et l'indexation,
 * inchangée depuis la Phase 1. Le `<span aria-hidden>` qui le recouvre est un overlay
 * purement décoratif : il anime un compteur CSS (`@property --count-value`, voir
 * globals.css) de 0 jusqu'à l'entier de tête de la valeur réelle, encadré par la même
 * garde `@supports (animation-timeline: view())` que les autres reveals. Sans ce support,
 * l'overlay n'existe simplement pas et seul le texte réel s'affiche. Le suffixe (+, %) est
 * un attribut `data-suffix` statique, jamais interpolé (repris via `attr()` en CSS).
 */
export function StatCard({ stat, index = 0 }: { stat: Stat; index?: number }) {
  const target = leadingInteger(stat.value)
  const suffix = stat.value.replace(/^\d+/, '')
  const delay = index * 70

  return (
    <div
      className="reveal rounded-lg border border-border-subtle bg-elevated p-6 text-center shadow-[var(--elev-1)]"
      style={revealStyle(delay, 12)}
    >
      <p className="text-h1 font-display relative inline-block font-bold text-accent">
        {stat.value}
        <span
          aria-hidden="true"
          data-suffix={suffix}
          style={counterStyle(target, delay)}
          className="stat-counter absolute inset-0 flex items-center justify-center bg-elevated"
        />
      </p>
      <p className="mt-2 text-small text-text-secondary">{stat.label}</p>
    </div>
  )
}
