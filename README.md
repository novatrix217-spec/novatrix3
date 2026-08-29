# NovatrixAI — Site vitrine (novatrix-web)

Refonte du site vitrine NovatrixAI. **Phase 1 — Fondations** (scaffolding, contenu réel,
correction des bugs identifiés dans le brief), **Phase 2 — Structure & animations légères**
(bento grid Services, reveals CSS natifs au scroll, comptage animé des stats,
`prefers-reduced-motion`), **Phase 3 — Storytelling portfolio** (reveal en cascade par étape
narrative), **Phase 4 — Effet signature WebGL du hero** (shader OGL réactif au curseur, en
couche additive lazy-loadée) et **Phase 5 — Polish & accessibilité** (audit
`prefers-reduced-motion` exhaustif sur tout le site, transitions de page natives entre les 5
pages, vérification crawlabilité brut/rendu, test de performance) sont **toutes terminées** —
c'était la dernière phase du brief. Voir `PROGRESS.md` pour le détail des jalons, décisions et
provenance des données, ainsi que la synthèse finale du projet en fin de fichier.

Ce projet est indépendant de `../novatrix/` (site Nuxt actuel, en production, avec son propre
dépôt git). Il n'y a aucune dépendance de code entre les deux ; `../novatrix/` n'a pas été
modifié pour ce travail.

## Stack

- **Next.js 16** (App Router, React 19) — installé via `create-next-app@latest`, ce qui a
  résolu vers Next 16.3.3 au moment du scaffolding (satisfait l'exigence "Next.js 15+" du brief).
- **Tailwind CSS v4** — configuration CSS-first (`@theme` dans `src/app/globals.css`), pas de
  `tailwind.config.ts` (ce fichier n'est plus généré par défaut en v4). Voir "Décisions
  techniques" ci-dessous.
- **OGL** (`^1.0.11`) — bibliothèque WebGL minimale (24 Ko minifié/gzippé annoncés, zéro
  dépendance), utilisée uniquement pour l'effet signature du hero (Phase 4), chargée en
  dynamique côté client. Voir "Décisions techniques" > OGL vs Three.js.
- **TypeScript**, ESLint (config `next/core-web-vitals`).
- **Couche de contenu locale** (`src/lib/content/*.ts`) en attendant Sanity — voir plus bas.

## Structure du projet

```
src/
  app/
    layout.tsx           racine : polices (next/font/google), métadonnées, Header/Footer,
                          ViewTransitionRouter (transitions de page, Phase 5)
    globals.css           design tokens (couleurs, radius, typo, container, rythme vertical)
    page.tsx               Accueil
    services/page.tsx      Services
    realisations/page.tsx  Réalisations (storytelling problème/solution/résultat)
    a-propos/page.tsx      À propos (+ section équipe)
    contact/page.tsx        Contact (formulaire + WhatsApp)
    sitemap.ts, robots.ts   (dynamic = 'force-static', requis par output: 'export')
  components/
    layout/    Header, Footer, ViewTransitionRouter (transitions de page natives, Phase 5)
    ui/        Container, Section, Kicker, Button, StatCard, WhatsAppCta, RevealTitle
    sections/  Hero (+ HeroBackground/HeroCanvas, effet WebGL Phase 4), StatsStrip,
               ServicesGrid, Testimonials, TeamSection, ProjectCaseStudy
    forms/     ContactForm (client component, validation + soumission 100% client)
  lib/
    content/  couche de données locale (services, projets, témoignages, stats, équipe, site)
    reveal.ts  helpers Phase 2 pour les reveals CSS (style inline --reveal-y/--reveal-delay,
               stagger plafonné, cible du compteur de stats) — aucune logique client, consommé
               uniquement par des Server Components
public/brand/   logo réel NovatrixAI (copié depuis ../logo3copie (5).PNG)
```

### Reveals CSS natifs au scroll (Phase 2)

Les animations d'apparition au scroll (`src/app/globals.css`) utilisent exclusivement
`animation-timeline: view()` — aucun JavaScript, aucune dépendance (GSAP volontairement écarté,
le CSS natif couvre l'intégralité du besoin de cette phase). Point structurant : l'état initial
`opacity:0`/`transform` n'est déclaré que dans un bloc `@supports (animation-timeline:
view())`, jamais en dehors — sans cette garde, un navigateur sans support (Firefox stable au
29/08/2026, derrière le flag `layout.css.scroll-driven-animations.enabled`) recevrait un
contenu invisible de façon permanente. Voir `PROGRESS.md` (jalon Phase 2) pour le détail complet
de la chorégraphie et les résultats des tests réels (Playwright, Chromium + Firefox, émulation
`prefers-reduced-motion`).

## Scripts disponibles

```bash
npm run dev     # serveur de développement (Turbopack)
npm run build   # export HTML statique complet (output: 'export') dans out/, un .html par page
npm run start   # ne fonctionne plus tel quel après le passage à l'export statique — voir
                # "Consulter l'export statique en local" ci-dessous pour servir out/
npm run lint    # ESLint
```

## Lancer en local

```bash
cd novatrix-web
npm install
npm run dev
# http://localhost:3000
```

## Export statique (`output: 'export'`)

Le site est configuré en export HTML statique complet (`next.config.ts` :
`output: 'export'`, `images.unoptimized: true`). `npm run build` ne démarre plus de serveur
Next.js de production : il génère directement un dossier `out/` contenant un fichier `.html`
par page (`out/index.html`, `out/services.html`, `out/realisations.html`, `out/a-propos.html`,
`out/contact.html`), plus `out/robots.txt`, `out/sitemap.xml`, `out/404.html` et les assets
statiques (`_next/static/`, `brand/`).

```bash
npm run build
# dossier out/ généré
```

### Consulter/servir l'export en local

`npm start` (`next start`) ne s'applique plus : il n'y a plus de serveur Next.js à démarrer,
seulement des fichiers statiques à servir. Utiliser n'importe quel serveur de fichiers
statiques, par exemple (aucune dépendance ajoutée au projet, `npx` télécharge l'outil à la
volée) :

```bash
npx serve out
# http://localhost:3000 (ou le port indiqué)
```

### Pourquoi ce changement, et ce qu'il désactive

Demandé explicitement par le client, en connaissance de cause que cela **désactive les
Server Actions** (Next.js ne supporte pas les Server Actions en export statique — aucun
serveur Node.js n'exécute de code au moment de la requête, uniquement des fichiers servis
tels quels). Impact concret unique sur ce projet : le formulaire de contact
(`src/components/forms/ContactForm.tsx`) utilisait une Server Action
(`src/app/contact/actions.ts`, désormais supprimé) ; il a été converti en gestion 100% client
(`onSubmit` + état local React), avec exactement la même validation, les mêmes messages
d'erreur et le même honeypot anti-bot qu'avant. Voir le commentaire en tête de
`ContactForm.tsx` pour le détail complet, et "Décisions techniques" > point 11 ci-dessous.

Audit des autres incompatibilités connues de l'export statique Next.js, toutes vérifiées sans
impact sur ce projet :
- Pas de `src/app/api/` (aucun Route Handler custom).
- Pas de `middleware.ts`.
- Pas de route dynamique `[slug]` (donc pas de `generateStaticParams` manquant à gérer).
- `src/app/sitemap.ts` et `src/app/robots.ts` (conventions Metadata File) nécessitent
  `export const dynamic = 'force-static'` en export statique dans cette version de Next.js
  (16.3.3) — ajouté aux deux fichiers.
- Le hero WebGL (`src/components/sections/HeroBackground.tsx` → `HeroCanvas.tsx`, chargé en
  `next/dynamic(..., { ssr: false })`) reste un Client Component prerendu en HTML puis monté
  après hydratation : comportement inchangé et explicitement supporté par l'export statique.
  Vérifié avec un test Playwright réel contre l'export servi localement : le `<canvas>` est
  bien absent du HTML initial (lazy-load non régressé) et un contexte WebGL est bien obtenu
  après hydratation.

**Risque connu, non bloquant** : en testant la navigation côté client sur l'export servi
localement (Playwright), le prefetch RSC automatique de `next/link` déclenche des requêtes
404 (`/services/__next.services.__PAGE__.txt`, etc. — le client construit un chemin `.`
alors que l'export génère un sous-dossier `/`). La navigation elle-même aboutit correctement
(contenu réel chargé, 0 erreur JS bloquante) car Next.js retombe sur un fetch normal au clic ;
seul le prefetch anticipé échoue silencieusement. C'est un détail d'implémentation interne à
`output: 'export'` sur cette version de Next.js, pas une régression introduite par ce
changement de configuration — à surveiller si une version ultérieure de Next.js le corrige,
ou à ignorer si le volume de 404 dans les logs d'hébergement n'est pas gênant.

## Décisions techniques prises en autonomie

### 1. Sanity non initialisé en Phase 1 — couche de contenu locale à la place

Le brief autorise explicitement cette option ("si l'init Sanity pose un blocage réel non
trivial, documente-le... et utilise des données locales structurées en attendant").

Ce qui a été vérifié concrètement dans cet environnement :
- `npx create-sanity@latest --help` nécessite un téléchargement npx puis affiche un CLI dont
  la création de projet non-interactive requiert un `--organization <id>` (un ID d'organisation
  Sanity.io existant) et un provider de connexion (`--provider`) — donc un **compte Sanity.io
  réel avec accès réseau/identifiants**, qui n'a pas été fourni à cette exécution autonome.
- Sans `--organization`/authentification, l'outil bascule en assistant interactif qui attend
  une entrée TTY (login navigateur) — testé, la commande reste bloquée sans réponse pendant
  plus de 60 s sans ces informations.

**Décision** : implémenter la Phase 1 avec une couche de contenu locale typée
(`src/lib/content/*.ts`), volontairement modélisée comme des documents plats et typés
(champs `slug`, `source`, etc.) pour ressembler à ce que seraient des schémas Sanity. Cela
permet une migration ultérieure vers Sanity (ou tout autre CMS headless) en réécrivant
uniquement la couche de récupération de données, sans toucher aux composants d'affichage.

**Reste à faire (Phase 2+)** : une fois un compte/organisation Sanity fourni par le client,
lancer `npx create-sanity@latest --project <id> --organization <id> --dataset production
--typescript --nextjs-add-config-files`, définir les schémas (`service`, `project`,
`testimonial`, `stat`, `teamMember`, `lead`), puis remplacer les imports de
`src/lib/content/*` par des requêtes GROQ.

### 2. Tailwind v4 : `@theme` CSS au lieu de `tailwind.config.ts`

Le brief demande d'"étendre `tailwind.config`" avec les tokens de couleurs sémantiques. Ce
scaffold Next.js génère Tailwind v4 par défaut, dont la configuration recommandée est
CSS-first (directive `@theme` dans le CSS global) plutôt qu'un fichier `tailwind.config.ts`
JS/TS. L'extension demandée est donc réalisée dans `src/app/globals.css` (`@theme inline`),
ce qui expose exactement les mêmes noms de classes utilitaires attendus
(`bg-void`, `text-text-primary`, `border-border-subtle`, `rounded-lg`, etc.). Aucune perte de
fonctionnalité par rapport à un fichier JS, juste un emplacement différent.

### 3. Next.js 16 (au lieu de "15+" au sens strict)

`create-next-app@latest` a résolu vers Next 16.3.3 (dernière version stable au moment du
scaffolding), ce qui reste conforme à l'exigence "Next.js 15+" du brief. Next 16 génère
automatiquement un `AGENTS.md`/`CLAUDE.md` à la racine (fichiers de l'outil, régénérés par
`next dev`/`next build`, non écrits par nous) qui documente les changements par rapport aux
versions antérieures. Aucune API cassante n'a été rencontrée pour le périmètre HTML-first de
la Phase 1 (Server Components par défaut, `next/font`, Server Actions pour le formulaire,
`sitemap.ts`/`robots.ts` — tous conformes à la documentation embarquée dans
`node_modules/next/dist/docs/`).

### 4. Pas de bibliothèque de validation de formulaire (Zod, etc.)

Le formulaire de contact valide manuellement les champs côté serveur (regex email, longueur
minimale du message, présence du consentement RGPD) plutôt que d'ajouter une dépendance
supplémentaire dès la Phase 1. À revoir si la logique de validation se complexifie en phase
ultérieure.

### 5. Pas de bascule dark mode ni de menu mobile en JS

Les tokens `.dark` du brief sont bien présents dans `globals.css` (prêts à l'emploi), mais
aucun bouton de bascule n'a été câblé en Phase 1 : ce n'est pas dans la liste des livrables
Phase 1, et cela ajouterait de l'état client (`localStorage`/`prefers-color-scheme`) hors
périmètre HTML-first. Idem pour la navigation mobile : plutôt qu'un menu hamburger avec JS
d'ouverture/fermeture, la Phase 1 affiche une barre de liens secondaire toujours visible sous
le header sur petit écran — 100 % HTML/CSS, aucune interactivité requise pour accéder à toutes
les pages.

### 6. Pas de sous-pages dynamiques par service/projet

Le brief demande "5 pages en SSR/SSG" nommément listées (Accueil, Services, Réalisations, À
propos, Contact). Les 6 services et les 3 cas d'usage sont donc présentés comme des sections
ancrées (`#slug`) au sein de leur page respective plutôt que comme des routes dynamiques
(`/services/[slug]`, `/realisations/[slug]`) — plus simple, toujours crawlable (chaque ancre a
son propre `id` et son contenu complet en HTML), et cohérent avec le périmètre annoncé. Des
routes dynamiques dédiées peuvent être ajoutées sans casser cette structure si le client le
demande.

### 7. Pas de bilinguisme FR/EN

Le site Nuxt actuel (`../novatrix/`) a un système i18n FR/EN, mais NOVATRIX_BRIEF.md ne
demande pas explicitement de le reproduire pour cette refonte, et le dupliquer sans validation
de contenu anglais aurait ajouté un risque de traduction non vérifiée. Le site est donc
livré en français uniquement pour la Phase 1.

### 8. Hero non "dynamique par profil visiteur"

Le brief (section 3) évoque un hero qui s'adapterait selon le profil du visiteur. Cette
logique nécessite du JavaScript client (détection/segmentation) incompatible avec la
contrainte HTML-first stricte de la Phase 1 ("AUCUNE animation ni WebGL à ce stade"), et
aucune variante de texte par persona n'existe dans les sources fournies — en écrire une
aurait été inventer du texte de vente, contraire à la règle T3. Le hero Phase 1 affiche donc
un message réel unique (repris de l'ancien hero React, cf. `src/components/sections/Hero.tsx`
pour la source exacte). La personnalisation est un candidat naturel pour la Phase 2.

### 9. Effet signature WebGL du hero (Phase 4) : OGL, pas Three.js/R3F

Le brief laissait le choix ouvert entre OGL et Three.js/R3F, en recommandant OGL en premier
choix si l'effet recherché est ciblé (par opposition à une scène 3D complexe avec chargement
GLTF/physique).

**Effet retenu** : un shader plein écran en fond du hero, réactif à la position du curseur
(distorsion + glow qui suit le curseur avec un lissage) et animé d'un mouvement organique lent
(bruit de valeur) quand le curseur est immobile — type Lusion, mais un seul effet ciblé, pas
une scène. Aucun modèle 3D, aucun chargement d'asset, aucune caméra à proprement parler
(géométrie "triangle plein écran" en espace clip-space direct), aucune physique.

**Décision** : OGL, conformément à la recommandation du brief, sans besoin identifié qui
l'aurait rendu limitant.
- Le pattern "triangle plein écran + shader fragment" couvert par ce périmètre est justement
  le cas d'usage central d'OGL (`Triangle`/`Program`/`Mesh`/`Renderer`, voir
  `node_modules/ogl/src/extras/Triangle.js`) — pas besoin d'un moteur de scène complet
  (chargeurs GLTF, matériaux PBR, éclairage, post-processing multi-passes) qu'apporterait
  Three.js/R3F pour un gain nul sur cet effet précis.
- Poids : `npm install ogl` résout en `1.0.11`, **zéro dépendance transitive**
  (`node_modules/ogl/package.json`), contre React Three Fiber qui embarquerait Three.js
  (bien plus volumineux) + `@react-three/fiber` + son propre reconciler React — un coût de
  bundle largement disproportionné pour un shader de fond, alors même que la contrainte 2 du
  brief (lazy-load, LCP non affecté) est justement conçue pour minimiser ce genre de poids.
- Types TypeScript fournis nativement par le paquet (`ogl/types/index.d.ts`), donc aucune
  dépendance `@types/*` supplémentaire.
- Aucun besoin de déclarative JSX scene-graph (l'apport principal de R3F par rapport à
  Three.js "vanilla") pour une scène à un seul mesh/shader — un `useEffect` impératif classique
  (`src/components/sections/HeroCanvas.tsx`) suffit et reste plus simple à auditer/nettoyer
  (un seul `try/catch`, un seul chemin de cleanup explicite) qu'une arborescence de composants
  R3F pour ce périmètre.

**Si ce périmètre évoluait** (scène 3D plus riche, modèles chargés, interactions physiques),
Three.js/R3F redeviendrait le choix recommandé — décision à réévaluer à ce moment-là, pas
anticipée ici.

Détail de l'implémentation, des garde-fous (HTML-first, lazy-load, `prefers-reduced-motion`,
fallback WebGL silencieux) et des tests : voir `PROGRESS.md` > Jalon Phase 4.

### 10. Transitions de page (Phase 5) : API View Transitions native, pas `<ViewTransition>` de React

Next.js 16 documente en interne (`node_modules/next/dist/docs/01-app/02-guides/
view-transitions.md`) le composant expérimental `<ViewTransition>` de React comme façon
"zéro-config" de faire des transitions de page dans l'App Router. Vérifié concrètement que ce
composant **nécessite `react@canary`** et n'est pas exposé par la version stable installée ici
(`react@19.2.8` — `Object.keys(require('react'))` ne contient pas `ViewTransition`). Monter
`react`/`react-dom` en canary aurait été un changement de dépendance cœur risqué pour un
chantier de "polish" en fin de projet — non fait.

**Décision retenue** : implémentation manuelle avec l'API navigateur native
`document.startViewTransition`, zéro dépendance ajoutée (`package.json` inchangé), dans un
unique composant `src/components/layout/ViewTransitionRouter.tsx` qui intercepte les clics sur
les liens internes (technique équivalente à celle utilisée en interne par la librairie
`next-view-transitions`, volontairement non installée). Fallback silencieux si l'API n'existe
pas dans le navigateur, garde `prefers-reduced-motion` revérifiée à chaque clic. Détail complet
et résultats des tests réels (Chromium + Firefox) : voir `PROGRESS.md` > Jalon Phase 5.

### 11. Export statique complet (`output: 'export'`) et conversion de la Server Action

Demandé explicitement par le client après la fin des 5 phases du brief, en connaissance de
cause que cela désactive les Server Actions (annoncé au préalable). Détail complet, audit des
incompatibilités connues de l'export statique et risque connu (404 de prefetch RSC, non
bloquant) : voir la section "Export statique" plus haut dans ce document, et `PROGRESS.md` >
jalon "Export statique" pour le compte-rendu des vérifications (build, contenu HTML par page,
comportement du formulaire, test Playwright du hero WebGL).

## Contenu réel — où sont les sources

Chaque fichier de `src/lib/content/*.ts` porte en commentaire la provenance exacte de chaque
donnée (fichier source, ligne de contexte). Résumé dans `PROGRESS.md`.
