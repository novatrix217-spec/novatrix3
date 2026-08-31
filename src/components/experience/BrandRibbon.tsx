import type { RefObject } from 'react'

export interface BrandRibbonProps {
  /** Identifiant unique du dégradé/filtre SVG — évite toute collision d'`id` si le ruban est
   * un jour utilisé plusieurs fois sur une même page (chaque page n'en monte qu'un ici). */
  id: string
  /** Réf posée sur le trait fin (tracé/dashoffset piloté par le scroll-scrub de la page). */
  lineRef?: RefObject<SVGPathElement | null>
  /** Réf posée sur le halo flouté sous le trait (peut être omise pour une version plus sobre). */
  glowRef?: RefObject<SVGPathElement | null>
  /** Tracé du ruban, en coordonnées du `viewBox` 1440×760 — reprend par défaut la courbe de
   * la Home (signature reconnaissable), personnalisable si une page a besoin d'une autre
   * silhouette. */
  path?: string
  /** Classe additionnelle — utilisée par les pages sur scène sombre pour passer en
   * `mix-blend-mode: screen` (voir `.immersive-brand-thread--on-dark`), `multiply` par défaut
   * ne fonctionnant que sur fond clair (Home). */
  className?: string
}

const DEFAULT_PATH = 'M-90 626 C156 92 378 838 626 348 S1032 -70 1532 528'

/**
 * Ruban/anneau lumineux signature — motif de transition recurrent des expériences Lusion
 * (halo derrière l'astronaute, autour du wordmark, traversant "Brought to Life" sur la
 * référence). Extrait de l'implémentation d'origine de la Home (`LusionHomeExperience.tsx`)
 * pour être décliné sur d'autres pages à un moment de transition clé, sans dupliquer le
 * balisage SVG. Purement décoratif : `aria-hidden`, jamais interactif. L'opacité/le tracé
 * (`stroke-dashoffset`) restent pilotés par la page appelante via les refs, exactement comme
 * sur la Home — ce composant ne fait que porter le balisage et le dégradé partagés.
 */
export function BrandRibbon({ id, lineRef, glowRef, path = DEFAULT_PATH, className = '' }: BrandRibbonProps) {
  const glowFilterId = `${id}-glow`
  const gradientId = `${id}-gradient`
  return (
    <svg className={`immersive-brand-thread ${className}`.trim()} viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={glowFilterId}><feGaussianBlur stdDeviation="11" /></filter>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c00ff" />
          <stop offset=".54" stopColor="#ee00e8" />
          <stop offset="1" stopColor="#8df8ff" />
        </linearGradient>
      </defs>
      {glowRef && (
        <path
          ref={glowRef}
          className="immersive-brand-thread-glow"
          pathLength="1"
          d={path}
          style={{ stroke: `url(#${gradientId})`, filter: `url(#${glowFilterId})` }}
        />
      )}
      <path
        ref={lineRef}
        className="immersive-brand-thread-line"
        pathLength="1"
        d={path}
        style={{ stroke: `url(#${gradientId})` }}
      />
      <path className="immersive-brand-thread-pulse" pathLength="1" d={path} style={{ stroke: `url(#${gradientId})` }} />
    </svg>
  )
}
