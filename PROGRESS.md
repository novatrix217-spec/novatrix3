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

- **Phase 2** : **terminée**, voir la section dédiée ci-dessous. Bascule dark mode réelle
  reportée (hors périmètre des livrables Phase 2 explicitement listés).
- **Phase 3** : **terminée**, voir la section dédiée ci-dessous.
- **Phase 4** : **terminée**, voir la section dédiée ci-dessous.
- **Phase 5** : transitions de page fluides, tests Lighthouse/device réel. Correctif : la
  mention initiale de `prefers-reduced-motion` comme travail de Phase 5 était imprécise —
  c'est en réalité déjà couvert fonctionnellement depuis la Phase 2 (media query globale +
  neutralisation des reveals CSS dans `globals.css`, validé QA à l'époque) et à nouveau en
  Phase 4 pour le module WebGL (`HeroBackground.tsx`, double garde `useSyncExternalStore` +
  vérification dans `HeroCanvas.tsx`). Il ne reste donc à faire en Phase 5 que la vérification
  des éventuelles nouvelles animations ajoutées par cette phase elle-même (transitions de
  page), pas un chantier `prefers-reduced-motion` de zéro.
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

## Jalon : Phase 2 — Structure & animations légères (terminée)

Date : 2026-08-29.

### Ce qui est fait

1. **Bento grid Services** (`src/components/sections/ServicesGrid.tsx`,
   `src/lib/content/services.ts`) : tableau `services` réordonné (ordre uniquement, aucun
   libellé modifié) — `saas-ia`, `chatbot-leads`, `automatisation`, `reseaux-sociaux`,
   `agent-administratif`, `wordpress`. Grille CSS pure (`grid-cols-1 sm:grid-cols-2
   lg:grid-cols-4`, `grid-auto-flow` par défaut, jamais `dense`), placement uniquement par
   `col-span`/`row-span` par slug — ordre DOM = ordre visuel = ordre de tabulation clavier.
   Vérifié à la main puis dans le HTML rendu (voir tests ci-dessous) que le placement
   automatique remplit exactement les 4×3 = 12 cellules du desktop sans trou avec cet ordre.
   Tablette (2 colonnes) : `saas-ia` et `wordpress` en `col-span-2`, le reste `col-span-1`,
   jamais de `row-span`. Mobile : tout empilé en `col-span-1`, la tuile `saas-ia` se distingue
   par `shadow-[var(--elev-2)]`, une bordure `border-accent/40` permanente et un titre en
   taille `text-h2` (revert à `text-h3`/`shadow-elev-1`/bordure standard dès `sm:`) — l'élément
   HTML reste un `<h3>` dans tous les cas (aucun changement de niveau de titre selon la
   largeur d'écran, seule la taille visuelle change). `min-height`/`auto` uniquement, jamais
   de hauteur fixe. Aucun badge/texte marketing inventé.
2. **Reveals CSS natifs au scroll** (`animation-timeline: view()`, zéro JS, zéro GSAP) sur les
   5 pages : token `--dur-reveal: 600ms` ajouté dans `globals.css` (réutilise `--ease-brand`
   partout sauf le compteur de stats). Primitives génériques `.reveal` (sections de contenu,
   cartes bento, StatCard, témoignages, cartes réalisations/équipe — `animation-range: entry 0%
   entry 30%`) et `.reveal-word` (titres de page h1 hors accueil, mot par mot — `entry 0% entry
   25%`), toutes deux déclarées **exclusivement** dans un bloc `@supports (animation-timeline:
   view())` (garde non négociable T2, voir livrable 4 ci-dessous). Distance et délai pilotés
   par les custom properties `--reveal-y`/`--reveal-delay` posées en inline via
   `src/lib/reveal.ts` (`revealStyle`, `staggerDelay`) — aucune de ces valeurs n'est calculée
   côté client, tout est déterminé au rendu serveur.
   - Sections de contenu (kicker/h2 ou h1/paragraphe) : translateY 8/12/16 px, stagger 80 ms.
     Appliqué à l'intro de chacune des 5 pages, au hero de l'accueil (kicker/h1/paragraphe,
     pas de reveal mot par mot puisque c'est l'accueil), et aux en-têtes de section (Services,
     Réalisations, Témoignages, Expertise, Équipe, Localisation, Contact).
   - Cartes bento Services : translateY 10 px (standard) / 14 px (`saas-ia`, flagship), stagger
     +70 ms par tuile plafonné à l'index 3 (les tuiles 5-6 réutilisent le délai de la 4e).
   - StatCard : translateY 12 px, stagger +70 ms par stat (4 stats, pas de plafond nécessaire).
   - Témoignages : même patron que les cartes bento (translateY 10 px), stagger +80 ms
     plafonné à l'index 2 (3 cartes affichées sur l'accueil).
   - Titres de page h1 (hors accueil) : nouveau composant serveur
     `src/components/ui/RevealTitle.tsx` — découpage `text.split(' ')` **côté serveur**
     (Server Component, aucune directive `"use client"`), un `<span class="reveal-word">` par
     mot séparé par un vrai espace-texte (texte complet, sélectionnable, présent tel quel dans
     le HTML brut — vérifié, voir tests). translateY 14 px, stagger +50 ms par mot plafonné aux
     6 premiers mots. Appliqué sur `/services`, `/realisations`, `/a-propos`, `/contact`.
   - Cartes de réalisations (`ProjectCaseStudyBlock`) et cartes équipe (`TeamSection`) :
     traitées comme des variantes du patron "carte" (non explicitement nommées dans le brief
     mais couvertes par l'exigence "toutes les 5 pages") — translateY 10-12 px, stagger
     +80 ms plafonné à l'index 2-3 selon le nombre d'éléments réels.
   - `ContactForm.tsx` et `src/app/contact/actions.ts` **non modifiés** (garde-fou strict) : le
     seul reveal appliqué au formulaire est un habillage visuel externe, un `<div
     className="reveal">` posé dans `contact/page.tsx` autour de `<ContactForm />`.
3. **Comptage animé des stats** (`src/components/ui/StatCard.tsx`, livrable 3) : implémenté
   via `@property --count-value { syntax: '<integer>'; ... }` + `counter-reset:
   stat-count-display var(--count-value)` + `content: counter(stat-count-display)
   attr(data-suffix)` en pseudo-élément (`::after`), animé par `animation-timeline: view()`,
   easing `linear` (jamais `--ease-brand` — un compteur qui « hésite » serait bizarre). La
   cible entière est dérivée de la valeur réelle via `leadingInteger()`
   (`src/lib/reveal.ts` — ex. "100+" → 100) et posée en inline (`--count-target`), **jamais**
   stockée en dur une deuxième fois dans le contenu. Le suffixe (`+`, `%`) est un attribut
   `data-suffix` statique repris par `attr()`, jamais interpolé. **`{stat.value}` reste le vrai
   nœud texte affiché, inchangé depuis la Phase 1** — le `<span aria-hidden="true"
   class="stat-counter">` est un overlay purement décoratif, absolument positionné par-dessus
   (`absolute inset-0`, fond `bg-elevated` identique à la carte pour occulter proprement le
   texte réel pendant le comptage), entouré de la même garde `@supports`. Sans support
   (Firefox stable), l'overlay n'existe pas du tout : seul `{stat.value}` s'affiche, comme en
   Phase 1. Approche `@property` retenue (pas de version simplifiée nécessaire — testée et
   fonctionnelle, voir tests ci-dessous).
4. **`prefers-reduced-motion`** (livrable 4, posé avant toute autre animation dans
   `globals.css`) : le bloc existant (neutralisation `animation-duration`/
   `transition-duration`) est complété par une règle explicite qui force `animation: none
   !important` sur `.reveal`, `.reveal-word`, `.stat-counter` **et** rétablit explicitement
   `opacity: 1 !important; transform: none !important;` — sans ce rétablissement, l'état
   initial `opacity:0`/`transform` déclaré dans `.reveal`/`.reveal-word` (au sein du bloc
   `@supports`) resterait appliqué de façon statique une fois l'animation supprimée, rendant le
   contenu définitivement invisible (piège explicitement signalé par le brief). Le pseudo-
   élément `.stat-counter::after` est neutralisé via `content: none !important` (le compteur
   décoratif disparaît proprement plutôt que de rester figé sur une valeur intermédiaire
   incohérente avec le vrai texte affiché juste à côté).

### Décisions prises en autonomie

- **Étendue des reveals au-delà des 5 archétypes explicitement chiffrés** : le brief détaille
  précisément la chorégraphie de 5 types de blocs (sections de contenu, cartes bento, stats,
  témoignages, titres h1) mais demande aussi "toutes les 5 pages". Les blocs répétés non
  explicitement nommés (articles de service sur `/services`, cartes de réalisations sur
  `/realisations` et l'aperçu accueil, liste d'expertises et cartes équipe sur `/a-propos`,
  bloc coordonnées et formulaire sur `/contact`, bande CTA de l'accueil) ont reçu le même
  primitive `.reveal` avec des valeurs prises dans les fourchettes déjà validées par le brief
  (8-16 px de distance, ~80 ms de stagger, plafond capé), plutôt que d'inventer de nouvelles
  catégories de choréographie. Choix documenté ici plutôt que bloquant.
- **Titre h1 gardé comme élément `<h3>` unique en CSS pour la tuile `saas-ia` mobile** :
  la consigne "titre en taille h2 au lieu de h3" en mobile a été interprétée comme un
  changement de **taille visuelle** (`text-h2` vs `text-h3`), pas de niveau sémantique — la
  tuile reste un vrai `<h3>` à toutes les largeurs d'écran, pour ne pas faire varier la
  structure du plan de titres (h1 > h2 > h3) selon le viewport, ce qui aurait été une
  régression d'accessibilité/SEO plus grave que le bénéfice visuel recherché.
- **Compteur de stats : approche `@property` retenue sans repli simplifié** — testée
  fonctionnelle en Chromium (support natif) et correctement neutralisée par la garde
  `@supports` en Firefox (pas de support constaté, voir tests). Le repli "fade simple sans
  comptage" mentionné comme acceptable par le brief n'a donc pas été nécessaire.
- **GSAP non ajouté** : aucun cas identifié que `animation-timeline: view()` natif ne sache
  pas faire pour ce périmètre (reveals fade + translateY, stagger, compteur). Conforme à la
  consigne de priorité stricte au CSS natif.
- **`Container.tsx` étendu avec une prop `style?: CSSProperties` optionnelle** (rétrocompatible,
  tous les appels existants sans `style` sont inchangés) pour pouvoir poser un reveal sur la
  bande CTA de l'accueil qui utilise `<Container>` comme carte.

### Tests exécutés (résultats)

1. **`npm run build` puis `npm run lint`** : succès, 0 erreur TypeScript, 0 erreur/avertissement
   ESLint. Les 5 routes + `sitemap.xml` + `robots.txt` restent toutes `○ (Static)` (SSG intact,
   aucune régression de la contrainte T1 due à l'ajout des reveals — voir aussi point 2).
2. **`npm run build && npm run start -p 3100` + `curl` brut sur les 5 pages** (sans exécution
   JS) : contenu textuel complet vérifié présent dans le HTML brut, y compris après découpage
   en `<span>` —
   - Les 4 h1 découpés mot par mot (`/services`, `/realisations`, `/a-propos`, `/contact`)
     sont intégralement reconstitués et lisibles dans le HTML source (vérifié par extraction
     programmatique du texte des `<span class="reveal-word">`, espaces réels préservés entre
     les mots).
   - Les 4 valeurs de stats (`100+`, `24`, `150+`, `98%`) sont présentes comme texte littéral
     dans le HTML brut de l'accueil, en plus des `--count-target` (100/24/150/98) posés en
     style inline sur l'overlay décoratif.
   - L'ordre des 6 tuiles du bento (`saas-ia → chatbot-leads → automatisation →
     reseaux-sociaux → agent-administratif → wordpress`) est confirmé dans l'ordre du DOM
     rendu (indices croissants dans le HTML), et les classes de placement de la tuile
     `saas-ia` (`sm:col-span-2 lg:col-span-2 lg:row-span-2`, `border-accent/40
     shadow-[var(--elev-2)] sm:border-border-subtle sm:shadow-[var(--elev-1)]`, élément
     `<h3>` avec `text-h2 sm:text-h3`) sont bien celles attendues — voir aussi "Correctifs
     post-validation" ci-dessous, une régression avait fait passer cet élément en `<h2>`.
   - `comeup.com/fr/service` : 0 occurrence sur les 5 pages (non-régression Phase 1).
   - Les 4 champs du formulaire de contact (`name`, `email`, `message`, `consent`) sont
     toujours présents comme attributs HTML natifs.
3. **Test fonctionnel `prefers-reduced-motion: reduce` en navigateur réel** (Playwright +
   Chromium, émulation `reducedMotion: 'reduce'` — pas une relecture de code) sur Accueil et
   Services : sur 27 puis 13 éléments `.reveal`/`.reveal-word` détectés, **0** avec
   `opacity != 1`, **0** avec `transform != none`, **0** encore piloté par une
   `animation-name` active ; les 4 `.stat-counter` de l'accueil ont `animation-name: none` et
   `content: none` (overlay décoratif proprement désactivé, vraie valeur toujours visible).
   Contrôle croisé sans émulation reduced-motion (Chromium) : un élément hors écran a bien
   `opacity: 0` avant tout scroll, puis `opacity: 1` après `scrollIntoView` + délai — confirme
   que le mécanisme anime réellement en usage normal (pas juste "toujours visible").
   Contrôle croisé supplémentaire en Firefox (Playwright, `CSS.supports('animation-timeline',
   'view()')` → `false`, confirmant la vérification faite en amont via MDN/caniuse le
   2026-08-29 sur le support Firefox stable) : les 27 éléments `.reveal`/`.reveal-word` ont
   tous `opacity: 1` dès le chargement (garde `@supports` efficace, aucun contenu
   définitivement masqué), les `.stat-counter::after` n'ont aucun contenu généré, et le texte
   réel `"100+"` reste présent dans `document.body.innerText`.
4. **`git -C ../novatrix status`** avant et après l'ensemble des travaux : `working tree
   clean` dans les deux cas (le dépôt est "ahead of origin by 5 commits", état préexistant
   sans rapport avec ce travail — aucun fichier de `novatrix/` n'a été modifié).

### Contrôles non exécutés (et pourquoi)

- **Safari / WebKit** : non testé en émulation réelle dans cet environnement (Playwright
  propose un moteur WebKit, mais la vérification a été priorisée sur Chromium — cas
  "supporté" — et Firefox — cas "non supporté", les deux extrêmes les plus révélateurs pour la
  garde `@supports`). Safari 17+ supporte `animation-timeline` nativement (vérifié via
  recherche MDN/caniuse le 2026-08-29) et devrait suivre le même chemin que Chromium.
- **Lighthouse / Core Web Vitals** : toujours non exécuté (candidat naturel une fois les
  animations WebGL de la Phase 4 ajoutées, comme documenté en Phase 1).
- **Device mobile physique** : idem Phase 1, non exécutable dans cet environnement.
- **Tests automatisés persistants (Vitest/Playwright en CI)** : les scripts Playwright utilisés
  pour les tests ci-dessus sont volontairement restés dans le répertoire scratchpad de la
  session (hors du dépôt `novatrix-web/`), pas ajoutés comme dépendance permanente du projet —
  aucune infrastructure de test n'existe encore dans `package.json` (inchangé depuis la
  Phase 1) et en ajouter une est une décision d'architecture qui dépasse le périmètre des 4
  livrables demandés pour cette phase.

### Correctifs post-validation Phase 2

Deux problèmes remontés par une validation indépendante après la livraison initiale de la
Phase 2, corrigés le même jour (2026-08-29) :

1. **Dégradé du hero invalide — bug réel, sévérité haute, pré-existant depuis la Phase 1**
   (introduit dans `src/components/sections/Hero.tsx` dès sa création en Phase 1, donc non
   introduit par les changements Phase 2 sur ce fichier). Le style inline référençait
   `var(--hero-from)`/`var(--hero-to)`, deux noms de custom properties qui n'ont jamais existé
   (les tokens réels définis dans `globals.css` sont `--hero-grad-start`/`--hero-grad-end` ;
   `--hero-from`/`--hero-to` ne sont que les noms des **alias Tailwind** `--color-hero-from`/
   `--color-hero-to`, pas des variables CSS directement utilisables telles quelles). Un
   `var()` non résolu sans valeur de repli invalide toute la déclaration `background`, donc le
   hero retombait sur le fond crème par défaut (`--bg-void`) avec le texte blanc du hero posé
   dessus par-dessus — contraste catastrophique. Corrigé en remplaçant par les vrais noms de
   tokens (`var(--hero-grad-start)`, `var(--hero-grad-end)`), cohérent avec `var(--hero-bg)`
   déjà utilisé sur la même ligne. **Vérifié réellement, pas juste relu** : `getComputedStyle`
   via Playwright/Chromium sur `/` après le correctif → `backgroundImage:
   "linear-gradient(135deg, rgb(28, 0, 56) 0%, rgb(109, 40, 217) 55%, rgb(192, 38, 211) 100%)"`
   (correspond exactement à `--hero-bg`/`--hero-grad-start`/`--hero-grad-end`), plus une
   capture d'écran réelle confirmant visuellement le dégradé violet/magenta derrière le texte
   blanc, contraste correct.
2. **Incohérence sémantique du titre flagship du bento Services** (introduite en Phase 2,
   `src/components/sections/ServicesGrid.tsx`) : la tuile `saas-ia` était rendue en `<h2>` à
   toutes les largeurs d'écran (seule la classe `sm:text-h3` faisait varier la taille visuelle,
   pas l'élément lui-même), en contradiction avec l'intention déjà documentée plus haut dans ce
   fichier ("l'élément HTML reste un `<h3>` dans tous les cas") — ce qui cassait la hiérarchie
   de titres de l'accueil (`h1 > h2 "Nos services" > h2 saas-ia + h3×5 autres tuiles`) au lieu
   d'un plan cohérent `h1 > h2 > h3×6`. Corrigé en repassant l'élément en `<h3>` à toutes les
   largeurs ; la différenciation visuelle reste assurée uniquement par les classes Tailwind
   (`text-h2 sm:text-h3` sur la tuile flagship contre `text-h3` sur les 5 autres). **Vérifié
   réellement** : extraction programmatique du HTML brut de `/` (`npm run build && npm run
   start` + `curl`) — le titre de la tuile `saas-ia` est bien rendu
   `<h3 class="... text-h2 sm:text-h3">`, plan de titres de l'accueil désormais `h1 > h2×4 >
   h3×9` (6 tuiles Services + 3 cartes réalisations/témoignages), aucun `<h2>` parasite.

`npm run lint` et `npm run build` ré-exécutés après ces deux correctifs : toujours 0 erreur,
5 pages + sitemap + robots toujours `○ (Static)`.

## Jalon : Phase 3 — Storytelling portfolio (terminée)

Date : 2026-08-29.

### Ce qui est fait

`ProjectCaseStudyBlock` (`src/components/sections/ProjectCaseStudy.tsx`) fait maintenant
reveal en cascade au grain **étape narrative** plutôt qu'au grain **carte entière** posé en
Phase 2. Le conteneur `<article>` (bordure/fond/ombre) reste statique et immédiatement
visible ; ce sont les 4 blocs de contenu — accroche (kicker + titre + client), Problème,
Solution, Résultat — qui portent chacun `className="reveal"` avec un délai propre, calculé
par `stepDelay(step) = staggerDelay(index, 80, 2) + staggerDelay(step, 100, 3)` :
- `staggerDelay(index, 80, 2)` : écart carte à carte, **inchangé** depuis la Phase 2.
- `staggerDelay(step, 100, 3)` : nouvel écart étape à étape au sein d'une même carte
  (0 = accroche, 1 = problème, 2 = solution, 3 = résultat).

Aucune nouvelle primitive : réutilisation stricte de `revealStyle`/`staggerDelay`
(`src/lib/reveal.ts`), des custom properties `--reveal-y`/`--reveal-delay`, de la classe
`.reveal` et de ses tokens `--ease-brand`/`--dur-reveal`/`animation-timeline: view()` déjà
posés dans `globals.css` en Phase 2 — CSS natif uniquement, aucun GSAP (aucun besoin identifié
qui l'aurait justifié pour ce périmètre). Les libellés d'étape (`<h4>Problème/Solution/
Résultat</h4>`, mono/uppercase) préexistants en Phase 1 jouent déjà le rôle d'accroche par
étape et n'ont pas été modifiés. **Aucune donnée touchée** : `src/lib/content/projects.ts`
(source des 3 cas, Phase 1) n'a reçu aucune modification — aucun chiffre ajouté, retiré ou
inventé.

### Preuve de la cascade (mesures réelles, pas une relecture de code)

Script Playwright/Chromium (scratchpad de session, non ajouté au dépôt), scroll fin (pas de
2 px) sur la 3ᵉ carte (`#site-vitrine-agence-wingoai`), lecture de `getComputedStyle(...).opacity`
sur les 4 blocs à chaque position de scroll :
- Bloc accroche (delay=160ms) : transition complète entre `scrollY` 516 → 544
  (`opacity` 0 → 1), **terminée avant** que les 3 autres blocs ne commencent.
- Blocs Problème/Solution/Résultat (delay=260/360/460ms) : `opacity=0` jusqu'à `scrollY≈660`,
  puis transition. À `scrollY=662-684`, capturés à des stades différents dans le même ordre
  que leurs délais : **Problème=0.96 > Solution=0.93 > Résultat=0.89**. Transition complète à
  `scrollY≈686`.

Ces valeurs confirment que les 4 blocs révèlent indépendamment (2 groupes temporels nets, le
second lui-même échelonné en 3 sous-étapes dans le bon ordre), et non la carte entière d'un
seul bloc. `CSS.supports('animation-timeline','view()')` confirmé `true` dans le navigateur
de test.

### Tests exécutés (résultats)

1. `npm run lint` : 0 erreur, 0 avertissement.
2. `npm run build` : succès, TypeScript compilé sans erreur, les 5 pages + `sitemap.xml` +
   `robots.txt` restent toutes `○ (Static)` (aucune régression T1 due au découpage en blocs
   animés).
3. `npm run start` + `curl` brut sur `/realisations` (sans exécution JS) : les 3 cas complets
   (SMS Shopify+Twilio, Jeefox, WingoAI) présents dans le HTML brut, y compris les chiffres
   sourcés (`supérieur à 90 %`, `98 %`). 13 `class="reveal"` détectés avec les valeurs
   `--reveal-delay` attendues pour les 3 cartes : carte 0 → 0/100/200/300 ms, carte 1 →
   80/180/280/380 ms, carte 2 → 160/260/360/460 ms — conforme exactement à la formule
   `stepDelay`.
4. `git diff --stat -- src/lib/content/projects.ts` : vide (fichier non touché, aucun chiffre
   modifié).
5. `git -C ../novatrix status` avant et après : `working tree clean` dans les deux cas, aucun
   fichier de `novatrix/` modifié.

### Décision prise en autonomie — piste future non implémentée

Aucun besoin réel de **nouvel élément visuel** (icône par étape, connecteur/timeline visuel,
nouvelle couleur sémantique type "problème = alerte / résultat = succès") n'a été identifié
pour que la cascade fonctionne : le vocabulaire déjà établi (translateY 12 px, délai, `.reveal`)
suffit à produire un storytelling en cascade lisible, comme le montrent les mesures ci-dessus.
Conformément à la consigne explicite de cette étape, je ne l'ai donc **pas** implémenté et je
le note ici comme piste future à considérer, hors périmètre de ce jalon : un connecteur visuel
léger (ex. ligne verticale reliant les 3 colonnes Problème/Solution/Résultat, ou une
numérotation 01/02/03) pourrait renforcer la lecture "étapes d'un même récit" au-delà du simple
décalage temporel — décision de design system à valider séparément (`designer-ui-ux`/
`architecte-systeme`), pas une décision unilatérale d'implémentation.

### Contrôles non exécutés (et pourquoi)

- **Safari/WebKit et Firefox en émulation dédiée pour ce changement précis** : non ré-exécutés
  spécifiquement sur ce diff — le mécanisme réutilise à l'identique la garde `@supports
  (animation-timeline: view())` déjà validée en Phase 2 (Chromium supporté / Firefox stable non
  supporté, testés à cette occasion-là), donc aucun nouveau risque de compatibilité introduit
  par ce changement (mêmes classes, mêmes propriétés CSS, appliquées à des éléments
  supplémentaires).
- **`prefers-reduced-motion` spécifique à ce changement** : non re-testé isolément — la règle
  globale déjà en place dans `globals.css` s'applique automatiquement à toute classe `.reveal`,
  y compris les nouveaux blocs, sans modification de cette règle.
- **Tests automatisés persistants** : script Playwright de vérification resté dans le
  scratchpad de session, non ajouté comme dépendance permanente du projet (même choix qu'en
  Phase 2, `package.json` inchangé).

## Jalon : Phase 4 — Effet signature WebGL du hero (terminée)

Date : 2026-08-29.

### Décision technique : OGL (pas Three.js/R3F)

Recommandation du brief suivie : OGL en premier choix. L'effet demandé est ciblé (un seul
shader plein écran réactif au curseur/mouvement organique lent en fond de hero), pas une
scène 3D (aucun modèle GLTF, aucune physique, aucune lumière/matériaux PBR, aucun besoin de
scene-graph riche). Rien n'a fait apparaître un besoin réel qui rendrait OGL limitant pour ce
périmètre — décision non révisée. `npm install ogl` → `1.0.11`, zéro dépendance transitive
supplémentaire (`node_modules/ogl/package.json`), types TS fournis nativement
(`ogl/types/index.d.ts`), compatible du fait de son API minimale (`Renderer`, `Triangle`,
`Program`, `Mesh`) avec le pattern "triangle plein écran" standard (`src/extras/Triangle.js` :
géométrie clip-space directe, aucune caméra requise), qui suffit entièrement à un shader de
fond en 2D.

### Ce qui est fait

1. **`src/components/sections/HeroCanvas.tsx`** (`'use client'`) : composant WebGL isolé.
   - Shader GLSL ES 1.00 (compatible WebGL1 et WebGL2, aucun `#version 300 es`) : distorsion
     de matière + glow réactifs à la position du curseur (lissée par interpolation linéaire
     frame à frame), plus un bruit de Perlin/valeur simplifié pour un mouvement organique lent
     quand le curseur est immobile. Uniquement les 3 couleurs du token hero déjà en place
     (`#1C0038` / `#6D28D9` / `#C026D3`, `globals.css`), aucune couleur inventée.
   - Détection WebGL manuelle (`canvas.getContext('webgl2') || canvas.getContext('webgl')`)
     **avant** toute instanciation du `Renderer` OGL, pour un fallback réellement silencieux
     (le `Renderer` d'OGL logue lui-même une erreur console si `getContext` échoue).
   - Double vérification `prefers-reduced-motion` en tête d'effet (défense en profondeur,
     redondante avec `HeroBackground.tsx` — voir plus bas).
   - Le shader et l'appel `import('ogl')` sont dans un `try/catch` : toute erreur d'init
     (contexte perdu, échec de compilation shader, etc.) est absorbée silencieusement, le
     dégradé CSS du parent (`Hero.tsx`) reste seul visible.
   - Transition d'opacité douce (`opacity 700ms ease-out`) déclenchée seulement après le
     premier `requestAnimationFrame` réellement rendu (pas au montage du composant) — pas de
     flash entre le dégradé CSS et l'apparition du canvas.
   - Nettoyage complet au démontage : `cancelAnimationFrame`, listeners `pointermove`/`resize`
     retirés, canvas détaché du DOM, contexte WebGL libéré via l'extension
     `WEBGL_lose_context`.
   - `<div aria-hidden="true" className="pointer-events-none absolute inset-0">` : jamais
     interactif, jamais lu par un lecteur d'écran, ne bloque jamais les clics sur le CTA/les
     liens du hero (contrainte 1 du brief).
2. **`src/components/sections/HeroBackground.tsx`** (`'use client'`) : pont entre le hero
   Server Component et `HeroCanvas`. Nécessaire car Next.js interdit
   `next/dynamic(..., { ssr: false })` directement dans un Server Component ("'ssr: false' is
   not allowed with 'next/dynamic' in Server Components") — `Hero.tsx` reste donc un Server
   Component inchangé de ce point de vue, seul ce petit fichier dédié porte la directive
   `'use client'`.
   - `dynamic(() => import('./HeroCanvas').then((mod) => mod.HeroCanvas), { ssr: false })` :
     le chunk `HeroCanvas`/`ogl` n'est jamais dans le HTML initial ni dans le bundle JS de
     premier chargement (vérifié, voir tests).
   - Gate `prefers-reduced-motion` via `useSyncExternalStore` (`getServerSnapshot` renvoie
     toujours `false`, identique au premier rendu client → aucun mismatch d'hydratation) :
     tant que `matchMedia('(prefers-reduced-motion: reduce)').matches` est vrai, `HeroCanvas`
     n'est jamais monté, donc son import dynamique n'est jamais déclenché — aucun octet du
     module WebGL n'est chargé dans ce cas (pas une version "figée" du shader, rien n'est
     chargé du tout, conforme à la contrainte 3 du brief). Effet de bord positif de ce choix
     (plutôt qu'un `useState`+`useEffect` qui aurait déclenché une erreur ESLint
     `react-hooks/set-state-in-effect`, voir Tests) : si l'utilisateur bascule ce réglage OS
     en cours de visite, le canvas se démonte/remonte proprement en conséquence.
3. **`src/components/sections/Hero.tsx`** : changement strictement additif.
   - `<HeroBackground />` ajouté comme premier enfant de la `<section>`, juste avant
     `<Container>`. `<Container>` reçoit `relative z-10` (nouveau) pour garantir que le H1/
     l'accroche/le CTA restent au-dessus du calque canvas dans tous les cas (en plus de
     `pointer-events-none` côté canvas, qui suffit déjà à ne jamais intercepter les clics).
   - Aucune ligne de texte, aucun `ButtonLink`/`WhatsAppCta` déplacé ou modifié. Le style
     inline du dégradé CSS sur la `<section>` (`--hero-bg`/`--hero-grad-start`/
     `--hero-grad-end`) n'a pas été touché : c'est toujours lui qui s'affiche tant que le
     canvas n'est pas prêt, silencieux, ou désactivé par reduced-motion.
4. **`package.json`** : ajout de la dépendance `ogl` (`^1.0.11`) — aucune autre dépendance
   ajoutée.

### Tests exécutés (résultats)

1. **`npm run lint`** : 0 erreur après un aller-retour — la première version de
   `HeroBackground.tsx` (un `useState` + `setEnabled(true)` appelé directement dans le corps
   d'un `useEffect`) a été rejetée par `react-hooks/set-state-in-effect` (cascading renders).
   Corrigé en passant à `useSyncExternalStore` (voir ci-dessus). `npm run lint` final : 0
   erreur, 0 avertissement.
2. **`npm run build`** : succès, TypeScript strict compilé sans erreur. Les 8 routes
   (5 pages + `_not-found` + `sitemap.xml` + `robots.txt`) restent toutes `○ (Static)` — aucune
   régression de la contrainte T1 (SSG intact malgré l'ajout d'un composant client).
3. **Séparation du bundle (chunk `HeroCanvas`/`ogl` bien en lazy-load)** : inspection directe
   de `.next/server/app/page/build-manifest.json` (`rootMainFiles`, les 5 chunks JS chargés au
   premier rendu de `/`) comparée à une recherche du code source dans `.next/static/chunks/*` :
   - Chunk contenant le shader (`grep -rl "vUv" .next/static/chunks/`) →
     `0z9lv0_w0n84o.js` (3,5 Ko).
   - Chunk contenant OGL (`grep -rl "unable to create webgl context"
     .next/static/chunks/` — chaîne unique à `Renderer.js` d'OGL) → `2nm573r05da_o.js`
     (44 Ko, cohérent avec l'ordre de grandeur "~24 Ko minifié/gzippé" annoncé par le brief
     pour une taille non gzippée).
   - **Aucun des deux ne figure dans `rootMainFiles`** (`3s6nzrbk-8mnv.js`,
     `19mx3mg6lkumu.js`, `1mkbuudhndal5.js`, `2-rtuqsgzmno4.js`, chunk turbopack) : confirmé
     que ni le composant `HeroCanvas` ni la bibliothèque `ogl` ne sont chargés au premier
     rendu de `/`, uniquement au moment où `<HeroCanvas />` est effectivement monté côté
     client (post-hydratation, hors reduced-motion).
4. **`curl` HTML brut sur `/`** (`npm run build && npm run start -p 3101`, sans exécution
   JS) : présence confirmée du kicker ("Révolutionnez votre futur avec NovatrixAI"), de
   l'accroche ("Innover. Automatiser. Performer.", 2 occurrences — kicker+h1 imbriqués dans le
   payload RSC + le DOM rendu), du CTA ("Réserver un audit gratuit", "audit gratuit" × 6
   occurrences DOM + payload RSC) et du CTA WhatsApp ("Discuter sur WhatsApp" × 4 occurrences).
   **`grep -o "canvas" ...` → 0 occurrence** : confirmé qu'aucun `<canvas>` n'est présent dans
   le HTML servi par le serveur (cohérent avec `ssr: false` + gate reduced-motion côté client,
   contrainte 1 du brief — le canvas n'existe tout simplement pas sans JS, jamais une source
   de contenu, encore moins la seule).
5. **Vérification `prefers-reduced-motion` (lecture de code, pas de Playwright pour ce point
   précis)** : `HeroBackground.getServerSnapshot()` retourne toujours `false` ; côté client,
   `getSnapshot()` interroge `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
   avant tout rendu de `<HeroCanvas />` — si `true`, la fonction retourne `false` et
   `HeroBackground` rend `null`, donc `dynamic(() => import('./HeroCanvas'))` n'est jamais
   invoqué et le chunk `HeroCanvas`/`ogl` n'est jamais demandé au réseau. `HeroCanvas.tsx`
   porte une seconde vérification identique en tête de son propre `useEffect` (`if
   (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return`) en défense en
   profondeur, redondante mais sans coût, au cas où ce composant serait un jour réutilisé
   ailleurs sans passer par `HeroBackground`.
6. **`git status`** (`novatrix-web`) avant/après : fichiers modifiés/ajoutés attendus
   uniquement (`package.json`, `package-lock.json`, `src/components/sections/Hero.tsx` modifiés
   ; `HeroBackground.tsx`, `HeroCanvas.tsx` nouveaux), rien d'inattendu. **`git -C ../novatrix
   status`** avant/après : `working tree clean` dans les deux cas, aucun fichier de
   `novatrix/` modifié.

### Contrôles non exécutés (et pourquoi)

- **Lighthouse/Core Web Vitals réel (impact LCP mesuré)** : conforme à PROGRESS.md (Phase 1),
  explicitement prévu pour la Phase 5 une fois toutes les animations en place — la vérification
  faite ici (inspection du build manifest, chunk exclu du premier chargement) est le contrôle
  ciblé demandé pour cette phase, pas un audit Lighthouse complet.
- **Test multi-navigateurs réel (Safari/WebKit, Firefox, device mobile physique)** : non
  exécuté dans cet environnement (mêmes limites que les phases précédentes). Le shader
  n'utilise que des fonctionnalités WebGL1 de base (aucune extension optionnelle requise), et
  le fallback (contexte WebGL absent → rien ne s'affiche, dégradé CSS seul) a été vérifié par
  lecture de code et par le comportement de `HeroCanvas.tsx` (detection avant instanciation),
  pas par un test en navigateur sans support WebGL réel.
- **Simulation `matchMedia` en environnement de test automatisé (jsdom/Playwright)** : non
  mise en place — aucune infrastructure de test (Vitest/Playwright) n'existe dans ce projet
  (`package.json` toujours sans dépendance de test, cohérent avec les phases précédentes) et
  en ajouter une aurait dépassé le périmètre "vérifications ciblées" demandé pour cette phase.
  La vérification retenue est la lecture de code du point 5 ci-dessus.
- **Capture d'écran du rendu visuel du shader** : non prise, conformément à la consigne de
  sobriété en tokens de cette phase (pas de capture à chaque étape).
