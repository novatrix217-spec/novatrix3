import type { CSSProperties } from 'react'

/**
 * Helpers Phase 2 pour les reveals CSS natifs (`animation-timeline: view()`, voir
 * globals.css). Aucune logique client : ces fonctions ne font que produire un objet
 * `style` inline (custom properties `--reveal-y` / `--reveal-delay` / `--count-target`)
 * consommé par des Server Components — zéro JavaScript exécuté côté navigateur pour ça.
 */

type RevealVars = CSSProperties & {
  '--reveal-y'?: string
  '--reveal-delay'?: string
}

/** Style inline pour un élément `.reveal` ou `.reveal-word` : délai (ms) + distance (px). */
export function revealStyle(delayMs: number, distancePx?: number): RevealVars {
  const style: RevealVars = { '--reveal-delay': `${delayMs}ms` }
  if (distancePx !== undefined) {
    style['--reveal-y'] = `${distancePx}px`
  }
  return style
}

/**
 * Délai en cascade pour une liste de tuiles/cartes, plafonné à `capIndex` (les éléments
 * suivants réutilisent le délai du dernier index plafonné) — motif "stagger capped" imposé
 * par le brief pour les cartes bento, stats et témoignages.
 */
export function staggerDelay(index: number, stepMs: number, capIndex: number): number {
  return Math.min(index, capIndex) * stepMs
}

type CounterVars = CSSProperties & {
  '--count-target'?: number
  '--reveal-delay'?: string
}

/** Style inline pour l'overlay décoratif `.stat-counter` (cible entière + délai). */
export function counterStyle(target: number, delayMs = 0): CounterVars {
  return { '--count-target': target, '--reveal-delay': `${delayMs}ms` }
}

/**
 * Extrait l'entier de tête d'une valeur affichée telle quelle (ex. "100+" → 100, "98%" → 98).
 * Ne modifie jamais le texte réel affiché (`{stat.value}` reste inchangé) — sert uniquement
 * à piloter la cible du compteur décoratif.
 */
export function leadingInteger(value: string): number {
  const match = /^\d+/.exec(value)
  return match ? Number.parseInt(match[0], 10) : 0
}
