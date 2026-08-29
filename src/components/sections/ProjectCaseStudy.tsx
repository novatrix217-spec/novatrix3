import type { ProjectCaseStudy } from '@/lib/content/types'
import { revealStyle, staggerDelay } from '@/lib/reveal'

/**
 * Structure HTML storytelling problème → solution → résultat (brief, livrable Phase 1
 * point 7). Phase 2 : reveal CSS natif ajouté au grain "carte" (une seule translation pour
 * toute la carte). Phase 3 (storytelling) : le grain descend au niveau de chaque étape
 * narrative — accroche (kicker/titre/client), problème, solution, résultat — chaque bloc
 * porte désormais son propre `.reveal` (délai + distance via les mêmes custom properties
 * `--reveal-delay`/`--reveal-y`, même `animation-timeline: view()` posée sur `.reveal` dans
 * globals.css), ce qui crée une cascade *à l'intérieur* d'une même carte plutôt qu'un seul
 * fondu global. Le délai combine deux stagger déjà établis, sans nouvelle primitive :
 * `staggerDelay(index, 80, 2)` pour l'écart carte à carte (inchangé depuis la Phase 2), puis
 * `staggerDelay(step, 100, 3)` pour l'écart étape à étape au sein d'une carte (4 blocs :
 * 0=accroche, 1=problème, 2=solution, 3=résultat). Le conteneur `<article>` reste statique
 * (bordure/fond immédiatement visibles) : ce sont les blocs de contenu qui construisent la
 * carte progressivement à l'écran, translateY(12px) → 0 comme en Phase 2.
 */
export function ProjectCaseStudyBlock({ project, index = 0 }: { project: ProjectCaseStudy; index?: number }) {
  const cardDelay = staggerDelay(index, 80, 2)
  const stepDelay = (step: number) => cardDelay + staggerDelay(step, 100, 3)

  return (
    <article className="rounded-xl border border-border-subtle bg-elevated p-8 shadow-[var(--elev-2)]">
      <div className="reveal" style={revealStyle(stepDelay(0), 12)}>
        <p className="kicker text-accent">{project.category}</p>
        <h3 className="text-h2 font-display mt-3 font-bold text-text-primary">{project.title}</h3>
        {project.client && <p className="text-small mt-1 text-text-secondary">Client : {project.client}</p>}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="reveal" style={revealStyle(stepDelay(1), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Problème
          </h4>
          <p className="text-body mt-2 text-text-primary">{project.problem}</p>
        </div>
        <div className="reveal" style={revealStyle(stepDelay(2), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Solution
          </h4>
          <p className="text-body mt-2 text-text-primary">{project.solution}</p>
        </div>
        <div className="reveal" style={revealStyle(stepDelay(3), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Résultat
          </h4>
          <ul className="text-body mt-2 space-y-1.5 text-text-primary">
            {project.results.map((result) => (
              <li key={result} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">•</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(project.tools?.length || project.externalUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
          {project.tools?.map((tool) => (
            <span key={tool} className="text-small rounded-full border border-border-subtle px-3 py-1 text-text-secondary">
              {tool}
            </span>
          ))}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small ml-auto font-semibold text-accent hover:text-accent-hover"
            >
              Visiter le site →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
