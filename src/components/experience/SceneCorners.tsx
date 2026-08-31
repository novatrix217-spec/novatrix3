/**
 * Repères "+" aux quatre coins — motif graphique transversal aux 5 expériences scroll-scrub
 * (Home / About / Réalisations / Services / Contact), voir `.scene-corners` dans
 * `globals.css`. Purement décoratif (jamais interactif, jamais annoncé) : Server Component,
 * aucun state, aucune dépendance au scroll — la couleur (via `currentColor`) et le contraste
 * suivent automatiquement `--stage-fg` posé par `useScrollScrub`/`getStageBackground`.
 */
export function SceneCorners() {
  return (
    <div className="scene-corners" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  )
}
