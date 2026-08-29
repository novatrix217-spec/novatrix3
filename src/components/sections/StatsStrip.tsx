import { keyStats } from '@/lib/content/stats'
import { StatCard } from '@/components/ui/StatCard'
import { Container } from '@/components/ui/Container'

/** Correction du bug "chiffres clés à 0" — voir src/lib/content/stats.ts pour les sources. */
export function StatsStrip() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {keyStats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </Container>
  )
}
