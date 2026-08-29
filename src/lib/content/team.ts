import type { TeamMember } from './types'

// Section équipe/fondateurs (brief, livrable Phase 1, point 6).
//
// Recherche effectuée dans : les 2 PDF (Manuel équipe interne, Catalogue des
// accompagnements), NOVATRIX_BRIEF.md, novatrix/pages/**, novatrix/components/**,
// novatrix/comeup_extraction_finale.json, novatrix/rendu.json, archives/**.
//
// Résultat : aucun nom, photo ou bio de fondateur/membre d'équipe n'a été trouvé.
// Le Manuel équipe interne (section 10 "Organisation de l'équipe") décrit des rôles
// génériques (Launch Lead, stagiaires Growth/Copy/Funnel, Creative, Automation/Tech,
// Commercial) pour le programme "Novatrix Launch" spécifiquement — pas des identités
// réelles, et pas nécessairement l'organisation de l'agence dans son ensemble. Un
// témoignage client mentionne un prénom ("Merci à Dane pour son professionnalisme",
// voir testimonials.ts) mais sans rôle, photo ni confirmation — insuffisant pour
// construire une fiche membre sans extrapoler.
//
// Conformément à la règle T3 du brief, aucune identité n'est inventée : le tableau
// ci-dessous reste vide et l'UI (TeamSection) affiche un état "à compléter" explicite.
export const teamMembers: TeamMember[] = []

export const teamPlaceholderNote =
  "Aucune fiche fondateur/équipe nominative n'a été trouvée dans les sources fournies (PDF internes, contenu du site actuel, archives). À compléter avec de vraies photos, noms et rôles côté client avant mise en ligne."
