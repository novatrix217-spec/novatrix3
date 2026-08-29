import { testimonials } from '@/lib/content/testimonials'

/**
 * Témoignages enrichis (brief section 3 : "plus de variété") — corrige le problème
 * identifié dans le diagnostic (2 avis quasi identiques, même auteur). Voir
 * src/lib/content/testimonials.ts pour la provenance de chaque avis.
 */
export function Testimonials({ limit }: { limit?: number }) {
  const shown = limit ? testimonials.slice(0, limit) : testimonials
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((item) => (
        <figure key={item.id} className="flex h-full flex-col rounded-lg border border-border-subtle bg-elevated p-6 shadow-[var(--elev-1)]">
          <blockquote className="text-body flex-1 leading-6 text-text-primary">&laquo; {item.quote} &raquo;</blockquote>
          <figcaption className="mt-5 border-t border-border-subtle pt-4">
            <span className="block text-small font-bold text-text-primary">{item.name}</span>
            {item.role && <span className="text-small block text-text-secondary">{item.role}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
