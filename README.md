# NovatrixAI — Site vitrine (novatrix-web)

Refonte du site vitrine NovatrixAI. **Phase 1 — Fondations** (scaffolding, contenu réel,
correction des bugs identifiés dans le brief) et **Phase 2 — Structure & animations légères**
(bento grid Services, reveals CSS natifs au scroll, comptage animé des stats,
`prefers-reduced-motion`) sont terminées. Voir `PROGRESS.md` pour le détail des jalons,
décisions et provenance des données.

Ce projet est indépendant de `../novatrix/` (site Nuxt actuel, en production, avec son propre
dépôt git). Il n'y a aucune dépendance de code entre les deux ; `../novatrix/` n'a pas été
modifié pour ce travail.

## Stack

- **Next.js 16** (App Router, React 19) — installé via `create-next-app@latest`, ce qui a
  résolu vers Next 16.3.3 au moment du scaffolding (satisfait l'exigence "Next.js 15+" du brief).
- **Tailwind CSS v4** — configuration CSS-first (`@theme` dans `src/app/globals.css`), pas de
  `tailwind.config.ts` (ce fichier n'est plus généré par défaut en v4). Voir "Décisions
  techniques" ci-dessous.
- **TypeScript**, ESLint (config `next/core-web-vitals`).
- **Couche de contenu locale** (`src/lib/content/*.ts`) en attendant Sanity — voir plus bas.

## Structure du projet

```
src/
  app/
    layout.tsx           racine : polices (next/font/google), métadonnées, Header/Footer
    globals.css           design tokens (couleurs, radius, typo, container, rythme vertical)
    page.tsx               Accueil
    services/page.tsx      Services
    realisations/page.tsx  Réalisations (storytelling problème/solution/résultat)
    a-propos/page.tsx      À propos (+ section équipe)
    contact/page.tsx        Contact (formulaire + WhatsApp)
    contact/actions.ts      Server Action de traitement du formulaire (stub documenté)
    sitemap.ts, robots.ts
  components/
    layout/    Header, Footer
    ui/        Container, Section, Kicker, Button, StatCard, WhatsAppCta, RevealTitle
    sections/  Hero, StatsStrip, ServicesGrid, Testimonials, TeamSection, ProjectCaseStudy
    forms/     ContactForm (client component, useActionState)
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
npm run build   # build de production (SSG des 5 pages)
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Lancer en local

```bash
cd novatrix-web
npm install
npm run dev
# http://localhost:3000
```

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

## Contenu réel — où sont les sources

Chaque fichier de `src/lib/content/*.ts` porte en commentaire la provenance exacte de chaque
donnée (fichier source, ligne de contexte). Résumé dans `PROGRESS.md`.
