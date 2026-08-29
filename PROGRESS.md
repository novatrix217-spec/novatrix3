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
     shadow-[var(--elev-2)] sm:border-border-subtle sm:shadow-[var(--elev-1)]`, `<h2>`) sont
     bien celles attendues.
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
