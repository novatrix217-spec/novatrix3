import { teamMembers, teamPlaceholderNote } from '@/lib/content/team'
import { siteConfig } from '@/lib/content/site'
import { revealStyle, staggerDelay } from '@/lib/reveal'

/**
 * Section équipe/fondateurs (brief, livrable Phase 1 point 6). Aucune identité
 * nominative vérifiée n'a été trouvée dans les sources autorisées — voir
 * src/lib/content/team.ts. État "à compléter" affiché explicitement, jamais
 * de nom, photo ou rôle inventé (règle T3).
 */
export function TeamSection() {
  if (teamMembers.length === 0) {
    return (
      <div
        style={revealStyle(0, 10)}
        className="reveal grid min-h-72 place-content-center rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center"
      >
        <p className="text-h3 font-display font-bold text-text-primary">Portraits de l&rsquo;équipe à compléter</p>
        <p className="text-body mt-3 mx-auto max-w-xl text-text-secondary">{teamPlaceholderNote}</p>
        <p className="text-small mt-4 text-text-secondary">
          Ce que nous pouvons confirmer aujourd&rsquo;hui : NovatrixAI opère depuis {siteConfig.location}.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member, index) => (
        <div
          key={member.id}
          style={revealStyle(staggerDelay(index, 80, 3), 10)}
          className="reveal rounded-lg border border-border-subtle bg-elevated p-6 text-center"
        >
          <p className="text-h3 font-display font-bold text-text-primary">{member.name ?? 'À compléter'}</p>
          <p className="text-small mt-1 text-text-secondary">{member.role ?? 'Rôle à compléter'}</p>
          {member.bio && <p className="text-small mt-3 text-text-secondary">{member.bio}</p>}
        </div>
      ))}
    </div>
  )
}
