'use client'

import { startTransition, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Phase 5 — livrable 2 : transitions de page fluides entre les 5 pages principales, sans
 * rechargement brutal. Implémentation "HTML-first" : aucune dépendance ajoutée
 * (`package.json` inchangé), branchée directement sur l'API navigateur native
 * `document.startViewTransition` — pas le composant expérimental `<ViewTransition>` de React
 * (nécessite `react@canary`, incompatible avec React 19.2.8 stable épinglé dans ce projet,
 * cf. README.md > Décisions techniques). Ne rend rien (`return null`) : composant purement
 * comportemental, ne fait jamais partie du contenu HTML/du texte de la page.
 *
 * Principe (identique à la technique documentée par Next.js avant l'arrivée de
 * `<ViewTransition>`, et à celle utilisée en interne par la librairie `next-view-transitions`
 * que ce projet évite volontairement en tant que dépendance) :
 * 1. Un unique listener `click` en phase de capture sur `document` intercepte les clics sur
 *    les liens internes AVANT le handler interne de `next/link` (qui vérifie
 *    `event.defaultPrevented` et renonce à sa propre navigation si on a déjà annulé
 *    l'évènement — comportement documenté par Next.js, pas un contournement fragile).
 * 2. `document.startViewTransition(callback)` capture l'état "avant", exécute `callback`
 *    (qui déclenche la navigation via `router.push`, encapsulée dans `startTransition` pour
 *    rester une mise à jour React basse priorité), puis attend que la promesse renvoyée par
 *    `callback` se résolve avant de capturer l'état "après" et de lancer le crossfade.
 * 3. Cette promesse n'est résolue QUE lorsque `pathname` a effectivement changé (effet
 *    ci-dessous) — pas immédiatement après l'appel à `router.push` — sinon le navigateur
 *    capturerait l'état "après" avant que React ait fini de commiter le nouveau contenu de
 *    page, ce qui casserait le crossfade (capture d'un état intermédiaire/vide).
 *
 * Fallback propre (contrainte du brief) : si `document.startViewTransition` n'existe pas,
 * l'effet ci-dessous ne pose aucun listener — les `<Link>` de Next.js reprennent alors leur
 * navigation normale et instantanée, exactement comme aux Phases 1-4, aucune régression,
 * aucune erreur console. Vérifié le 2026-08-29 (MDN "Using the View Transition API" +
 * recherche croisée) : contrairement à `animation-timeline: view()` (Phase 2, toujours
 * derrière un flag en Firefox stable à cette date), les transitions "same-document" utilisées
 * ici sont supportées nativement par Chrome/Edge 111+, Safari 18+ **et Firefox 133+** —
 * confirmé réellement par un test Playwright/Firefox (pas une simple lecture de doc), voir
 * PROGRESS.md > Phase 5. Ce fallback reste néanmoins nécessaire et non négociable pour les
 * navigateurs plus anciens/non mis à jour.
 */
export function ViewTransitionRouter() {
  const router = useRouter()
  const pathname = usePathname()
  const resolvePendingTransition = useRef<(() => void) | null>(null)

  // Résout la transition de vue en attente une fois que la nouvelle page a réellement été
  // commitée par React (changement de pathname) — jamais avant.
  useEffect(() => {
    resolvePendingTransition.current?.()
    resolvePendingTransition.current = null
  }, [pathname])

  useEffect(() => {
    if (typeof document === 'undefined') return
    // Fallback silencieux non négociable (livrable 2) : pas de support -> pas de listener.
    if (!('startViewTransition' in document)) return

    function handleClick(event: MouseEvent) {
      // Clic modifié (nouvel onglet, etc.) ou déjà annulé par un autre handler : ignorer.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      // Vérifié à chaque clic (pas seulement au montage) : l'utilisateur peut changer ce
      // réglage OS en cours de visite, comme déjà pratiqué dans HeroBackground.tsx (Phase 4).
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const targetElement = event.target
      if (!(targetElement instanceof Element)) return
      const anchor = targetElement.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      // Liens externes (WhatsApp, mailto, ComeUp éventuel, etc.) : jamais interceptés.
      if (url.origin !== window.location.origin) return
      // Ancre sur la même page (ex. nav mobile vers /services#slug depuis /services) : laisser
      // le comportement natif de scroll, ce n'est pas une navigation entre pages.
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return
      }

      event.preventDefault()

      document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          resolvePendingTransition.current = resolve
          startTransition(() => {
            router.push(`${url.pathname}${url.search}${url.hash}`)
          })
        })
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [router])

  return null
}
