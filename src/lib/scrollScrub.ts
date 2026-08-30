/**
 * Primitives pures partagées par les expériences immersives Lusion (Home / About /
 * Réalisations / Services / Contact). Extraites de la logique dupliquée à l'identique
 * dans `LusionHomeExperience.tsx`, `LusionAboutExperience.tsx` et
 * `LusionProjectsExperience.tsx` (Lot 2a du chantier UX Lusion).
 *
 * Aucune dépendance au DOM ici : ces fonctions ne font que des calculs numériques,
 * elles sont testables indépendamment du hook `useScrollScrub`.
 */

/** Ramène `value` dans l'intervalle [0, 1]. */
export function clamp(value: number): number {
  return Math.max(0, Math.min(1, value))
}

/**
 * Progression lissée en "smoothstep" (`t*t*(3-2*t)`) entre `from` et `to`.
 * Retourne 0 avant `from`, 1 après `to`, une courbe douce entre les deux.
 */
export function phase(progress: number, from: number, to: number): number {
  const value = clamp((progress - from) / Math.max(0.0001, to - from))
  return value * value * (3 - 2 * value)
}

/**
 * Fenêtre d'opacité qui monte de `enterFrom`→`enterTo` puis redescend de
 * `leaveFrom`→`leaveTo`. Utilisé pour faire apparaître puis disparaître un chapitre
 * pendant une plage de progression de scroll donnée.
 */
export function windowOpacity(
  progress: number,
  enterFrom: number,
  enterTo: number,
  leaveFrom: number,
  leaveTo: number,
): number {
  return phase(progress, enterFrom, enterTo) * (1 - phase(progress, leaveFrom, leaveTo))
}

/**
 * Applique opacity + transform à une couche DOM et synchronise son état interactif
 * (`pointer-events`, `inert`, `visibility`) avec son opacité, pour qu'un chapitre masqué
 * ne soit jamais focusable/cliquable ni annoncé par un lecteur d'écran.
 *
 * `interactiveThreshold` reprend le seuil `0.55` utilisé dans les 3 implémentations
 * d'origine (un chapitre devient interactif une fois plus qu'à moitié visible).
 */
export function setLayer(
  element: HTMLElement | null,
  opacity: number,
  transform = 'translate3d(0,0,0)',
  interactiveThreshold = 0.55,
): void {
  if (!element) return
  const clamped = clamp(opacity)
  const nextOpacity = String(clamped)
  if (element.style.opacity !== nextOpacity) element.style.opacity = nextOpacity
  if (element.style.transform !== transform) element.style.transform = transform
  const interactive = clamped > interactiveThreshold
  const pointerEvents = interactive ? 'auto' : 'none'
  if (element.style.pointerEvents !== pointerEvents) element.style.pointerEvents = pointerEvents
  if (element.inert === interactive) element.inert = !interactive
  const visibility = clamped <= 0.001 ? 'hidden' : 'visible'
  if (element.style.visibility !== visibility) element.style.visibility = visibility
}

/** Facteur de lissage exponentiel unifié pour toutes les expériences scroll-scrub. */
export const SCRUB_SMOOTHING = 10.5
