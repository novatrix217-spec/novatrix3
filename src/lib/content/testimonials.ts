import type { Testimonial } from './types'

// Avis clients réels, extraits du profil ComeUp de NovatrixAI (comeup.com/fr/@novatrixai,
// extraction du 22/12/2025 — voir novatrix/comeup_extraction_finale.json) et déjà
// republiés tels quels sur le site Nuxt actuel (novatrix/shared/demo.ts > demoTestimonials).
//
// Choix éditorial : 5 témoignages variés (auteurs et formulations différentes), corrigeant
// le problème identifié dans le brief ("seulement 2 témoignages, quasi identiques, même
// auteur"). Aucune note (étoiles) n'est affichée : l'extraction ComeUp n'a capturé aucune
// note pour ces avis — inventer une note serait contraire à la règle T3 du brief.
export const testimonials: Testimonial[] = [
  {
    id: 'donald-alban-petrus',
    name: 'Donald Alban Petrus',
    role: 'Président, DSAP – LDR Group',
    quote:
      'Je tiens à vous remercier sincèrement pour votre efficacité et votre réactivité face à une demande urgente. Votre travail est remarquable, réalisé avec sérieux, écoute du client et une véritable force de proposition.',
    source: 'comeup.com/fr/@novatrixai (novatrix/comeup_extraction_finale.json)',
  },
  {
    id: 'francisco-sc',
    name: 'Francisco SC',
    role: 'Client ComeUp',
    quote: 'Excellent travail et très bonne communication. Un grand merci.',
    source: 'comeup.com/fr/@novatrixai (novatrix/comeup_extraction_finale.json)',
  },
  {
    id: 'robin-drezet',
    name: 'Robin Drezet',
    role: 'Client ComeUp',
    quote: "Un travail d'une qualité exemplaire !",
    source: 'comeup.com/fr/@novatrixai (novatrix/comeup_extraction_finale.json)',
  },
  {
    id: 'wingo',
    name: 'WINGO',
    role: 'Agence WingoAI',
    quote: 'Merci à Dane pour son professionnalisme',
    source: 'comeup.com/fr/@novatrixai (novatrix/comeup_extraction_finale.json)',
  },
  {
    id: 'thierry-phitoussi',
    name: 'Thierry Phitoussi',
    role: 'Client ComeUp',
    quote: 'Très bon suivi et très bon travail. À recommander !',
    source: 'comeup.com/fr/@novatrixai (novatrix/comeup_extraction_finale.json)',
  },
]
