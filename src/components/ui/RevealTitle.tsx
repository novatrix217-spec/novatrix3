import { Fragment } from 'react'
import { revealStyle, staggerDelay } from '@/lib/reveal'

/**
 * Titre de page (h1, hors accueil) révélé mot par mot au scroll — brief Phase 2, livrable 2.
 * Découpage côté serveur (`text.split(' ')`), zéro JavaScript client : ce composant n'a pas
 * de directive `"use client"`, c'est un Server Component ordinaire. Le texte complet reste
 * un vrai texte sélectionnable/indexable dans le HTML brut (chaque mot est un `<span>`
 * séparé par un vrai espace texte, jamais recomposé par du JS). Stagger +50ms par mot,
 * plafonné aux 6 premiers mots (les mots suivants réutilisent le délai du 6e).
 */
export function RevealTitle({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-word" style={revealStyle(staggerDelay(index, 50, 5), 14)}>
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}
