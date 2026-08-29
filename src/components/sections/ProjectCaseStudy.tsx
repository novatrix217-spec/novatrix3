import type { ProjectCaseStudy } from '@/lib/content/types'

/**
 * Structure HTML storytelling problème → solution → résultat (brief, livrable Phase 1
 * point 7). Le reveal animé au scroll viendra en Phase 3 — ici uniquement la structure
 * HTML/contenu, sans transition ni animation (T2 : rester HTML-first à ce stade).
 */
export function ProjectCaseStudyBlock({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="rounded-xl border border-border-subtle bg-elevated p-8 shadow-[var(--elev-2)]">
      <p className="kicker text-accent">{project.category}</p>
      <h3 className="text-h2 font-display mt-3 font-bold text-text-primary">{project.title}</h3>
      {project.client && <p className="text-small mt-1 text-text-secondary">Client : {project.client}</p>}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Problème
          </h4>
          <p className="text-body mt-2 text-text-primary">{project.problem}</p>
        </div>
        <div>
          <h4 className="text-small font-mono font-semibold uppercase tracking-[.1em] text-text-secondary">
            Solution
          </h4>
          <p className="text-body mt-2 text-text-primary">{project.solution}</p>
        </div>
        <div>
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
