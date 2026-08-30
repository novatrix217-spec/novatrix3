import { testimonials } from '@/lib/content/testimonials'
import { revealStyle, staggerDelay } from '@/lib/reveal'

/**
 * Témoignages enrichis (brief section 3 : "plus de variété") — corrige le problème
 * identifié dans le diagnostic (2 avis quasi identiques, même auteur). Voir
 * src/lib/content/testimonials.ts pour la provenance de chaque avis.
 *
 * Phase 2 : reveal même patron que les cartes bento (translateY 10px), stagger +80ms
 * plafonné aux 3 premières cartes (les suivantes réutilisent le délai de la 3e).
 */
export function Testimonials({ limit }: { limit?: number }) {
  const shown = limit ? testimonials.slice(0, limit) : testimonials
  return (
    <div className="grid border-y border-border-subtle md:grid-cols-3">
      {shown.map((item, index) => (
        <figure
          key={item.id}
          style={revealStyle(staggerDelay(index, 80, 2), 10)}
          className="reveal flex h-full min-h-72 flex-col border-b border-border-subtle p-6 md:border-b-0 md:border-l md:first:border-l-0 lg:p-8"
        >
          <span aria-hidden="true" className="font-display text-6xl leading-none text-accent">“</span>
          <blockquote className="text-body-lg mt-5 flex-1 text-text-primary">{item.quote}</blockquote>
          <figcaption className="mt-5 border-t border-border-subtle pt-4">
            <span className="block text-small font-bold text-text-primary">{item.name}</span>
            {item.role && <span className="text-small block text-text-secondary">{item.role}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
