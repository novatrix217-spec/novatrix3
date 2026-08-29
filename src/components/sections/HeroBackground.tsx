'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

/**
 * Phase 4 — pont client entre le hero (Server Component, `Hero.tsx`) et le module WebGL
 * (`HeroCanvas.tsx`). Next.js interdit `next/dynamic({ ssr: false })` directement dans un
 * Server Component ("'ssr: false' is not allowed with 'next/dynamic' in Server Components") ;
 * ce composant existe uniquement pour porter cette contrainte technique dans un fichier
 * `'use client'` dédié, sans transformer `Hero.tsx` lui-même en Client Component.
 *
 * Deux contraintes non négociables du brief sont appliquées ICI, avant même le chargement du
 * chunk `HeroCanvas`/`ogl` :
 * 1. Lazy-load après le contenu critique : `dynamic(..., { ssr: false })` garantit que ce
 *    module n'est jamais dans le HTML initial ni dans le bundle JS de premier chargement de la
 *    page — il n'est importé qu'au moment où `<HeroCanvas />` est effectivement monté, donc
 *    après l'hydratation, jamais avant/pendant le rendu du hero HTML/CSS (LCP non affecté).
 * 2. `prefers-reduced-motion` : `getServerSnapshot` retourne toujours `false` (rendu serveur
 *    et premier rendu client identiques, aucun mismatch d'hydratation), donc `<HeroCanvas />`
 *    n'est jamais rendu tant que `matchMedia` n'a pas confirmé côté client que reduced-motion
 *    est inactif — le chunk n'est donc jamais importé du tout dans ce cas. Pas de version
 *    "figée" du shader : on ne charge simplement rien.
 *
 * `useSyncExternalStore` (plutôt qu'un `useState` + `useEffect(() => setState(...))`) : évite
 * un `setState` synchrone dans un effet (flaggé par `react-hooks/set-state-in-effect`, voir
 * PROGRESS.md) et a pour effet de bord positif de désactiver proprement le canvas si
 * l'utilisateur change ce réglage OS en cours de visite (écoute l'évènement `change` du
 * `MediaQueryList`), plutôt qu'une vérification figée à l'initialisation.
 */
const HeroCanvas = dynamic(() => import('./HeroCanvas').then((mod) => mod.HeroCanvas), {
  ssr: false,
})

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getSnapshot() {
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function HeroBackground() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!enabled) return null
  return <HeroCanvas />
}
