import type { ProjectCaseStudy } from '@/lib/content/types'
import { revealStyle, staggerDelay } from '@/lib/reveal'
import Image from 'next/image'

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
    <article className="editorial-rule grid gap-10 pt-10 lg:grid-cols-12 lg:pt-14">
      <div className="reveal lg:col-span-5" style={revealStyle(stepDelay(0), 12)}>
        <div className="case-study-media mb-8">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <span className="case-study-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <p className="kicker text-accent">{project.category}</p>
        <h2 className="text-h2 mt-4 text-text-primary">{project.title}</h2>
        {project.client && <p className="text-small mt-3 text-text-secondary">Client : {project.client}</p>}
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
        <div className="reveal grid gap-4 border-t border-border-subtle py-7 sm:grid-cols-[120px_1fr]" style={revealStyle(stepDelay(1), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Problème
          </h4>
          <p className="text-body-lg text-text-primary">{project.problem}</p>
        </div>
        <div className="reveal grid gap-4 border-t border-border-subtle py-7 sm:grid-cols-[120px_1fr]" style={revealStyle(stepDelay(2), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Solution
          </h4>
          <p className="text-body-lg text-text-primary">{project.solution}</p>
        </div>
        <div className="reveal grid gap-4 border-y border-border-subtle py-7 sm:grid-cols-[120px_1fr]" style={revealStyle(stepDelay(3), 12)}>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Résultat
          </h4>
          <ul className="text-body space-y-3 text-text-primary">
            {project.results.map((result) => (
              <li key={result} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">•</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {(project.tools?.length || project.externalUrl) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
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
                aria-label="Visiter le site agencewingo.com (nouvel onglet)"
                className="text-small ml-auto font-semibold text-accent hover:text-accent-hover"
              >
                Visiter le site ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
