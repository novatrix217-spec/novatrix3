import type { Stat } from './types'

// Correction du bug "chiffres clés à 0" (cf. NOVATRIX_BRIEF.md section 2).
//
// Provenance : archives/projects/novatrix-data-enrichment-main/src/components/StatsSection.tsx
// — composant explicitement désigné dans le brief comme la "probable source du bug" et donc
// comme référence de ce qui devait être affiché avant la régression. Les 4 libellés y
// correspondent mot pour mot à ceux cités dans le diagnostic du brief.
//
// Recoupement partiel : le nombre de services (24) est confirmé indépendamment par
// novatrix/comeup_extraction_finale.json ("statistics.totalServices": 24, "profile.serviceCount": 24),
// ce qui corrobore la fiabilité de ce composant comme source de données réelles plutôt
// qu'un simple gabarit avec valeurs d'exemple.
//
// Réserve documentée (voir PROGRESS.md) : l'extrait ComeUp brut ne liste que 36 réalisations
// et ~22 avis avec texte au moment de l'extraction (22/12/2025) — un sous-ensemble, puisque
// le Manuel équipe interne (section 8) précise que l'historique de preuves de NovatrixAI est
// réparti "sur plusieurs plateformes, notamment ComeUp et Google", donc plus large que le seul
// export ComeUp disponible ici. Les valeurs ci-dessous ne sont donc pas contredites par cet
// extrait partiel, mais restent à faire reconfirmer par le client lors d'une prochaine revue.
export const keyStats: Stat[] = [
  {
    id: 'projects',
    label: 'Projets réalisés',
    value: '100+',
    source: 'archives/projects/novatrix-data-enrichment-main/src/components/StatsSection.tsx',
  },
  {
    id: 'services',
    label: 'Services proposés',
    value: '24',
    source:
      'archives/.../StatsSection.tsx, recoupé avec novatrix/comeup_extraction_finale.json (serviceCount: 24)',
  },
  {
    id: 'clients',
    label: 'Clients satisfaits',
    value: '150+',
    source: 'archives/projects/novatrix-data-enrichment-main/src/components/StatsSection.tsx',
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction client',
    value: '98%',
    source: 'archives/projects/novatrix-data-enrichment-main/src/components/StatsSection.tsx',
  },
]
