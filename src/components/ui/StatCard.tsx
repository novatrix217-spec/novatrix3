import type { Stat } from '@/lib/content/types'

/**
 * Affichage statique des chiffres clés (Phase 1, HTML-first). La bascule vers un
 * comptage animé au scroll (cf. NOVATRIX_BRIEF.md section 3) est prévue en Phase 2,
 * avec respect de prefers-reduced-motion dès son ajout.
 */
export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-elevated p-6 text-center shadow-[var(--elev-1)]">
      <p className="text-h1 font-display font-bold text-accent">{stat.value}</p>
      <p className="mt-2 text-small text-text-secondary">{stat.label}</p>
    </div>
  )
}
