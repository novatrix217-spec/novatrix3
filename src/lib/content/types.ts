// Types partagés pour la couche de contenu local (Phase 1).
//
// Ces formes sont volontairement proches de ce que seraient des schémas Sanity
// (documents plats, champs typés, slugs) afin de faciliter une migration vers
// un vrai CMS headless en phase ultérieure sans réécrire les composants qui
// consomment ces données. Voir README.md > "Décisions techniques" > Sanity.

export type Stat = {
  id: string
  label: string
  value: string
  /** Provenance vérifiable de la donnée (fichier, page, date d'extraction). */
  source: string
}

export type Service = {
  slug: string
  title: string
  description: string
  /** Lien interne uniquement — jamais de lien externe vers une marketplace tierce (cf. brief). */
  href: string
  source: string
}

export type ProjectPreviewItem = {
  slug: string
  title: string
  previewTitle?: string
  category: string
  image: string
  imageAlt: string
  href?: string
}

export type ProjectCaseStudy = ProjectPreviewItem & {
  client?: string
  problem: string
  solution: string
  /** Résultat factuel. Peut contenir plusieurs puces. Ne jamais inventer un chiffre absent des sources. */
  results: string[]
  tools?: string[]
  externalUrl?: string
  source: string
}

export type Testimonial = {
  id: string
  name: string
  role?: string
  quote: string
  source: string
}

export type TeamMember = {
  id: string
  name: string | null
  role: string | null
  bio: string | null
  /** true tant qu'aucune donnée vérifiée n'a été trouvée dans les sources autorisées. */
  placeholder: boolean
}
