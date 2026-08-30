'use client'

import { useEffect, type RefObject } from 'react'
import { clamp, SCRUB_SMOOTHING } from '@/lib/scrollScrub'

export interface ScrollScrubFrame {
  /** Progression lissée courante, dans [0, 1]. */
  progress: number
  /** Delta de temps depuis la frame précédente, en secondes (borné à 0.5s). */
  delta: number
}

export interface UseScrollScrubOptions {
  /** Élément dont la hauteur détermine la plage de scroll totale de l'expérience. */
  rootRef: RefObject<HTMLElement | null>
  /** Élément recevant `data-chapter`, utilisé par le CSS pour afficher/masquer les décors. */
  stageRef: RefObject<HTMLElement | null>
  /** Nom de la classe ajoutée sur `<body>` pendant que l'expérience est montée. */
  activeBodyClass: string
  /** Classe additionnelle ajoutée sur `<body>` quand `prefers-reduced-motion: reduce`. */
  reducedBodyClass: string
  /** Calcule le numéro de chapitre (>= 1) à partir de la progression courante. */
  getChapter: (progress: number) => number
  /** Couleur de header (`--immersive-header-color`) à appliquer pour un chapitre donné. */
  getHeaderColor: (chapter: number) => string
  /** Appelé à chaque frame utile avec la progression lissée courante. */
  onRender: (frame: ScrollScrubFrame) => void
  /** Appelé une fois lorsque le numéro de chapitre change (après mise à jour du DOM). */
  onChapterChange?: (chapter: number) => void
  /** Facteur de lissage exponentiel (par défaut la valeur unifiée du design system). */
  smoothing?: number
}

/**
 * Moteur de scroll-scrub partagé par les expériences immersives Lusion (Home, About,
 * Réalisations, Services, Contact). Factorisé au Lot 2a du chantier UX Lusion depuis la
 * logique dupliquée à l'identique dans les 3 premières expériences : mesure de la position
 * de scroll, lissage exponentiel indépendant du framerate, calcul du chapitre courant,
 * synchronisation de la couleur de header, et fallback `prefers-reduced-motion`.
 *
 * Le rendu visuel propre à chaque page (opacité/transform par couche) reste dans le
 * composant appelant via `onRender` — ce hook ne connaît aucun détail de mise en page.
 */
export function useScrollScrub({
  rootRef,
  stageRef,
  activeBodyClass,
  reducedBodyClass,
  getChapter,
  getHeaderColor,
  onRender,
  onChapterChange,
  smoothing = SCRUB_SMOOTHING,
}: UseScrollScrubOptions): void {
  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return

    document.body.classList.add(activeBodyClass)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      document.body.classList.add(reducedBodyClass)
      return () => document.body.classList.remove(activeBodyClass, reducedBodyClass)
    }

    let target = 0
    let current = 0
    let frame = 0
    let lastChapter = -1
    let previousFrameTime = performance.now()

    const measure = () => {
      const travel = Math.max(1, root.offsetHeight - window.innerHeight)
      target = clamp(-root.getBoundingClientRect().top / travel)
    }

    const requestRender = () => {
      measure()
      if (frame) return
      previousFrameTime = performance.now()
      frame = requestAnimationFrame(render)
    }

    const render = (now: number) => {
      frame = 0
      const delta = Math.min(0.5, Math.max(0.001, (now - previousFrameTime) / 1000))
      previousFrameTime = now
      current += (target - current) * (1 - Math.exp(-smoothing * delta))
      if (Math.abs(target - current) < 0.00005) current = target

      onRender({ progress: current, delta })

      const chapter = getChapter(current)
      if (chapter !== lastChapter) {
        lastChapter = chapter
        stage.dataset.chapter = String(chapter)
        document.body.style.setProperty('--immersive-header-color', getHeaderColor(chapter))
        onChapterChange?.(chapter)
      }

      if (Math.abs(target - current) >= 0.00005) frame = requestAnimationFrame(render)
    }

    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    measure()
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      cancelAnimationFrame(frame)
      document.body.classList.remove(activeBodyClass)
      document.body.style.removeProperty('--immersive-header-color')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
