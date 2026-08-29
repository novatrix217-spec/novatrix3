# PROGRESS — novatrix-web

## Jalon : Phase 1 — Fondations (terminée)

Date : 2026-08-29.

### Ce qui est fait

1. **Scaffolding** Next.js 16.3.3 (App Router) + Tailwind CSS v4 + TypeScript + ESLint dans
   `novatrix-web/`, dépôt git local initialisé (`git init`, commits locaux atomiques, aucun
   remote ajouté).
2. **Design tokens** du brief intégrés dans `src/app/globals.css` (`:root` clair par défaut,
   `.dark` prêt pour une phase ultérieure, palette hero violet/magenta strictement réservée à
   la section `<Hero>` de l'accueil), polices Bricolage Grotesque / DM Sans / JetBrains Mono
   via `next/font/google` dans `src/app/layout.tsx`.
3. **5 pages réelles en SSG** : Accueil (`/`), Services (`/services`), Réalisations
   (`/realisations`), À propos (`/a-propos`), Contact (`/contact`). Confirmé par
   `npm run build` : les 5 routes + `/sitemap.xml` + `/robots.txt` sont toutes marquées
   `○ (Static)` dans la sortie du build.
4. **Bug des chiffres clés à 0 corrigé** : 100+ projets réalisés / 24 services proposés / 150+
   clients satisfaits / 98 % satisfaction client, affichés en dur (pas de bug de chargement
   possible) sur la page d'accueil. Voir `src/lib/content/stats.ts` pour la provenance exacte
   et la réserve documentée ci-dessous.
5. **Liens ComeUp retirés** des cartes de services : les 6 services pointent désormais vers
   des ancres internes (`/services#slug`) ou vers `/contact`. Vérifié par recherche du motif
   `comeup.com/fr/service` sur le HTML brut des 5 pages : 0 occurrence.
6. **Formulaire de contact réel** ajouté (`src/components/forms/ContactForm.tsx`) : nom,
   email, message, consentement RGPD (checkbox obligatoire), champ honeypot anti-bot,
   validation HTML5 côté client + revalidation côté serveur (`src/app/contact/actions.ts`).
   Le CTA WhatsApp existant est conservé partout en option secondaire (header non concerné,
   hero, page contact, footer, bande CTA d'accueil), jamais supprimé.
7. **Section équipe** présente sur `/a-propos#equipe`, avec état "à compléter" explicite —
   aucune identité inventée (voir `src/lib/content/team.ts`).
8. **Portfolio storytelling** : 3 cas d'usage connus (relance SMS paniers abandonnés
   Shopify+Twilio, Jeefox, WingoAI) structurés en HTML problème → solution → résultat sur
   `/realisations`, sans animation (reveal au scroll prévu Phase 3).
9. **README.md** et **PROGRESS.md** rédigés à la racine de `novatrix-web/`.

### Provenance des données réelles utilisées

| Donnée | Source | Fichier de contenu |
|---|---|---|
| Chiffres clés (100+/24/150+/98%) | `archives/projects/novatrix-data-enrichment-main/src/components/StatsSection.tsx`, recoupé avec `novatrix/comeup_extraction_finale.json` (serviceCount: 24) | `src/lib/content/stats.ts` |
| 6 services + descriptions | `archives/.../ServicesSection.tsx`, recoupé avec `novatrix/comeup_extraction_finale.json` | `src/lib/content/services.ts` |
| 3 cas portfolio (problème/solution/résultat) | `novatrix/rendu.json` (descriptions détaillées ComeUp), `archives/.../PortfolioSection.tsx` | `src/lib/content/projects.ts` |
| 5 témoignages (noms, rôles, citations) | `novatrix/comeup_extraction_finale.json` (avis ComeUp, extraction 22/12/2025), recoupé avec `novatrix/shared/demo.ts` | `src/lib/content/testimonials.ts` |
| Bio / description entreprise, expertises | `novatrix/comeup_extraction_finale.json` > `profile.bio` | `src/app/a-propos/page.tsx` |
| Email, WhatsApp, localisation | `archives/.../ContactSection.tsx` + `Footer.tsx`, `novatrix/components/SiteFooter.vue`, `novatrix/pages/a-propos.vue` | `src/lib/content/site.ts` |
| Texte du hero | `archives/.../HeroSection.tsx` + `novatrix/comeup_extraction_finale.json` > `profile.bio` (2e phrase) | `src/components/sections/Hero.tsx` |
| Logo | `../logo3copie (5).PNG` (fichier fourni à la racine du projet) | `public/brand/novatrix-mark.png` |

### Réserve documentée sur les chiffres clés

Les valeurs 100+ / 24 / 150+ / 98 % proviennent du composant React archivé explicitement
désigné par le brief comme "probable source du bug — utile pour comprendre ce qu'il fallait
afficher". Le nombre de services (24) est corroboré indépendamment par l'export ComeUp brut
(`serviceCount: 24`). En revanche, ce même export ne liste que **36 réalisations** et **~22
avis avec texte** au 22/12/2025 (`comeup_extraction_finale.json`), un sous-ensemble plus
restreint que "100+ projets" / "150+ clients". Ce n'est pas nécessairement une contradiction :
le Manuel équipe interne (section 8) précise que les preuves NovatrixAI sont réparties "sur
plusieurs plateformes, notamment ComeUp et Google", donc l'export ComeUp seul ne couvre pas
l'ensemble de l'activité. **À faire reconfirmer par le client avant publication définitive** :
ces 4 chiffres n'ont pas de source unique et datée à 100 % certaine, seulement une source
sanctionnée par le brief lui-même et un recoupement partiel.

### Placeholders "à compléter" restants

- **Équipe/fondateurs** (`/a-propos#equipe`) : aucun nom, photo ou bio trouvé dans les
  sources fournies. État "à compléter" affiché explicitement dans l'UI (pas de nom inventé,
  pas de photo générique faisant passer pour une vraie personne).
- **Résultat chiffré du cas Jeefox** : les sources ne donnent aucune métrique de résultat
  (contrairement aux 2 autres cas) — la section "Résultat" du cas Jeefox reste volontairement
  qualitative plutôt que d'inventer un chiffre.
- **Persistance et notification du formulaire de contact** : `src/app/contact/actions.ts` est
  un stub documenté (validation + log serveur uniquement). Aucun envoi d'email ni écriture en
  base tant que Sanity/API n'est pas branché — explicitement commenté dans le code avec un
  `TODO(Phase 2+)`.
- **Sanity CMS** : non initialisé (voir README.md > Décisions techniques #1). Contenu
  actuellement dans `src/lib/content/*.ts`.

### Ce qui reste (Phases 2 à 5, cf. NOVATRIX_BRIEF.md section 7)

- **Phase 2** : reveals au scroll en CSS natif (`animation-timeline`/`view()`), bento grid des
  services, typographie animée (SplitText/GSAP) sur les titres, bascule dark mode réelle.
- **Phase 3** : refonte du storytelling portfolio avec reveal progressif au scroll (la
  structure HTML problème/solution/résultat livrée en Phase 1 est le socle de cette étape).
- **Phase 4** : effet signature WebGL/shader sur le hero (OGL ou Three.js/R3F selon
  complexité retenue), en couche additive au-dessus du HTML déjà complet.
- **Phase 5** : `prefers-reduced-motion` appliqué aux animations ajoutées en phases 2-4 (la
  media query globale existe déjà dans `globals.css`, il restera à vérifier chaque nouvelle
  animation individuellement), transitions de page fluides, tests Lighthouse/device réel.
- Brancher Sanity (ou confirmer Payload CMS comme alternative) une fois un compte/organisation
  fourni par le client.
- Brancher la persistance + notification réelle du formulaire de contact.
- Reconfirmer les 4 chiffres clés et les 3 cas portfolio avec le client (cf. réserve
  ci-dessus).
- Décider si le bilinguisme FR/EN du site Nuxt actuel doit être repris.

### Test T1 — SEO / crawlabilité (HTML brut avant hydratation)

Méthode : `npm run build` (SSG) puis `npm run start -p 3100`, puis `curl` brut (sans
exécution JS) sur les 5 pages.

Résultats :
- `npm run build` : les 5 routes + `sitemap.xml` + `robots.txt` sont **toutes `○ (Static)`**
  (prérendues au build, donc présentes dans le HTML de la réponse initiale, y compris pour un
  crawler qui n'exécute pas le JS).
- Accueil (`curl http://localhost:3100/`) : présence confirmée dans le HTML brut de —
  le `<h1>` réel, l'accroche "Innover. Automatiser. Performer.", les 4 chiffres clés
  (`100+`, `24`, `150+`, `98%`, **aucune occurrence de `0` ou `0%`**), les CTA "Réserver un
  audit gratuit" et "Discuter sur WhatsApp", et les 5 liens de navigation
  (`/`, `/services`, `/realisations`, `/a-propos`, `/contact`).
- Services : titres réels des 6 services présents (`Chatbot IA de génération de leads`,
  `Agent IA administratif`, `Création de site WordPress`, etc.).
- Réalisations : structure `Problème` / `Solution` / `Résultat` présente pour les 3 cas
  (`Jeefox`, `WingoAI`, `Twilio`, `90 %` tous retrouvés dans le HTML brut).
- À propos : `Cotonou` et l'état `à compléter` (section équipe) présents dans le HTML brut.
- Contact : les 4 champs du formulaire (`name`, `email`, `message`, `consent`) présents comme
  vrais attributs `name=""` HTML natifs (le formulaire fonctionne même sans JS grâce aux
  Server Actions de Next.js — dégradation progressive).
- Recherche globale de `comeup.com/fr/service` sur les 5 pages : **0 occurrence**.

Conclusion T1 : le contenu de vente réel, les titres, les liens de navigation et les CTA sont
bien présents dans le HTML brut de chaque page avant toute hydratation JS, conformément à la
contrainte non-négociable A du brief (section 6).

Non testé à ce stade (documenté comme non exécuté, pas de faux positif) : rendu effectif par
un crawler IA tiers (GPTBot/ClaudeBot/PerplexityBot) en conditions réelles sur un domaine
public — non applicable en Phase 1 (le site n'est pas déployé).

### Contrôles exécutés

- `npm run lint` : 0 erreur, 0 avertissement.
- `npm run build` : succès, TypeScript strict compilé sans erreur, 5 pages + sitemap +
  robots générés en statique.
- `npm run start` + `curl` sur les 5 routes : 200 OK, contenu vérifié manuellement (voir T1
  ci-dessus).
- État de `../novatrix/` vérifié avant et après (voir README.md) : `git status` →
  `working tree clean`, aucun fichier modifié.

### Contrôles non exécutés (et pourquoi)

- **Tests automatisés (unitaires/E2E)** : aucune infrastructure de test n'existe encore dans
  ce nouveau projet (pas de Vitest/Playwright installé). Ajouter une suite de tests est un
  candidat pour la Phase 2 une fois l'interactivité (animations, formulaire branché) en place ;
  écrire des tests contre du HTML statique sans logique complexe aurait eu peu de valeur en
  Phase 1.
- **Lighthouse / Core Web Vitals** : mentionné dans le brief comme contrainte pour les phases
  à fort contenu JS/WebGL (3-4). Non exécuté en Phase 1 (HTML-first, pas d'animation), mais à
  faire dès l'ajout des premières animations en Phase 2.
- **Test réel sur device mobile physique** : nécessite un appareil et n'est pas exécutable
  dans cet environnement ; pertinent surtout à partir de la Phase 4 (WebGL).
- **Déploiement** : aucun déploiement Vercel effectué (hors périmètre, action externe non
  demandée).
