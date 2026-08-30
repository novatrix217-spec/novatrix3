import type { ProjectCaseStudy, ProjectPreviewItem } from './types'

// Les 3 cas d'usage identifiés dans NOVATRIX_BRIEF.md section 2 ("Portfolio existant
// intéressant à valoriser en storytelling") + section 7 (livrable Phase 1, point 7).
// Structure HTML problème → solution → résultat, sans reveal animé (Phase 1 HTML-first).
//
// Sources : novatrix/rendu.json (descriptions détaillées extraites du profil ComeUp),
// archives/projects/novatrix-data-enrichment-main/src/components/PortfolioSection.tsx,
// novatrix/shared/demo.ts (résumés déjà reformulés côté Nuxt).
export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: 'relance-paniers-abandonnes-shopify-twilio',
    title: 'Relance automatique des paniers abandonnés',
    previewTitle: 'Relance Shopify',
    category: 'Automatisation e-commerce',
    client: 'Boutique e-commerce Shopify',
    problem:
      "La boutique perdait des ventes sur les paniers abandonnés : aucune relance n'était envoyée aux clients qui quittaient le tunnel d'achat sans finaliser leur commande.",
    solution:
      "Conception et mise en place d'une automatisation complète qui détecte les paniers abandonnés sur Shopify et relance chaque client par SMS personnalisé via Twilio, sans aucune intervention manuelle.",
    results: [
      'Processus entièrement automatisé : 0 intervention manuelle requise.',
      "Taux d'ouverture des SMS supérieur à 90 %.",
      'Augmentation du taux de récupération des paniers abandonnés.',
      'Gain de temps pour le client et meilleure efficacité marketing.',
    ],
    tools: ['Shopify', 'Twilio'],
    image: '/media/projects/shopify-relance.webp',
    imageAlt: 'Scénario automatisé reliant une boutique Shopify à des relances Twilio.',
    source: 'novatrix/rendu.json (portfolio), archives/.../PortfolioSection.tsx',
  },
  {
    slug: 'jeefox-moteur-de-recherche-intelligent',
    title: 'Jeefox, moteur de recherche intelligent',
    previewTitle: 'Jeefox',
    category: 'Application web IA',
    problem:
      "Le projet Jeefox nécessitait un moteur de recherche intelligent complet : une expérience de recherche avec chat intégré, un canal de monétisation publicitaire pour les annonceurs, et une administration centralisée pour piloter l'ensemble.",
    solution:
      "Développement de trois applications reliées : Jeefox Search (le moteur de recherche intelligent avec chat et publicité intégrés), Jeefox Ads (la plateforme publicitaire destinée aux annonceurs), et Jeefox Admin (l'interface d'administration du projet).",
    results: [
      'Un système multi-applications opérationnel couvrant recherche, monétisation publicitaire et pilotage administratif.',
    ],
    image: '/media/projects/jeefox.webp',
    imageAlt: 'Interface du moteur de recherche intelligent Jeefox.',
    source: 'novatrix/rendu.json (portfolio), archives/.../PortfolioSection.tsx',
  },
  {
    slug: 'site-vitrine-agence-wingoai',
    title: "Site vitrine de l'agence WingoAI",
    previewTitle: 'WingoAI',
    category: 'Site vitrine & chatbot IA',
    client: 'WingoAI — agence d’automatisation IA',
    problem:
      "WingoAI, agence d'automatisation IA spécialisée dans l'accompagnement des PME françaises (expertise IA et automatisation depuis 2022), avait besoin d'un site vitrine pour présenter son activité et ses services, puis d'un canal de support client automatisé.",
    solution:
      "Conception et développement du site vitrine agencewingo.com, puis intégration d'un chatbot IA de service support et de prise de rendez-vous directement sur le site.",
    results: [
      'Site vitrine en ligne à agencewingo.com.',
      "98 % de clients satisfaits — chiffre communiqué par WingoAI sur son propre positionnement (à ne pas confondre avec le taux de satisfaction client de NovatrixAI, voir /a-propos).",
    ],
    externalUrl: 'https://agencewingo.com',
    tools: ['Chatbot IA'],
    image: '/media/projects/wingoai.webp',
    imageAlt: 'Page d’accueil du site vitrine WingoAI.',
    source: 'novatrix/rendu.json (portfolio), archives/.../PortfolioSection.tsx',
  },
]

export const projectGallery: ProjectPreviewItem[] = [
  ...projectCaseStudies.map(({ slug, title, previewTitle, category, image, imageAlt }) => ({
    slug,
    title,
    previewTitle,
    category,
    image,
    imageAlt,
  })),
  {
    slug: 'agent-ia-gestion-agenda',
    title: 'Agent IA de gestion d’agenda',
    previewTitle: 'Agent Agenda IA',
    category: 'Agent IA administratif',
    image: '/media/projects/agent-ia-gestion-agenda.webp',
    imageAlt: 'Interface d’un agent IA dédié à la gestion d’agenda.',
    href: '/realisations',
  },
  {
    slug: 'automatisation-crm-agent-ia-n8n',
    title: 'CRM automatisé avec n8n',
    previewTitle: 'CRM + n8n',
    category: 'Automatisation CRM',
    image: '/media/projects/automatisation-crm-agent-ia-n8n.webp',
    imageAlt: 'Workflow d’automatisation CRM avec un agent IA et n8n.',
    href: '/realisations',
  },
  {
    slug: 'comparateur-mutuelles-senior',
    title: 'Comparateur de mutuelles',
    previewTitle: 'Mutuelles Senior',
    category: 'Application web',
    image: '/media/projects/comparateur-mutuelles-senior.webp',
    imageAlt: 'Interface d’un comparateur de mutuelles en ligne.',
    href: '/realisations',
  },
  {
    slug: 'solution-rh-automatisee',
    title: 'Solution RH automatisée',
    previewTitle: 'Solution RH',
    category: 'Produit SaaS IA',
    image: '/media/projects/solution-rh-automatisee.webp',
    imageAlt: 'Tableau de bord d’une solution RH automatisée.',
    href: '/realisations',
  },
  {
    slug: 'creation-contenu-ia-n8n-gpt',
    title: 'Studio de contenu IA',
    previewTitle: 'Studio IA',
    category: 'IA générative',
    image: '/media/projects/creation-contenu-ia-n8n-gpt.webp',
    imageAlt: 'Workflow de création de contenu utilisant GPT et n8n.',
    href: '/realisations',
  },
]
