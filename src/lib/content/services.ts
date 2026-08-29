import type { Service } from './types'

// Contenu réel repris de l'ancien catalogue de services NovatrixAI, avec correction du
// bug identifié dans le brief : les liens pointaient vers des pages ComeUp (marketplace
// freelance) — ils pointent désormais exclusivement vers des ancres internes du site
// (section /services#... ou /contact), plus aucun lien externe vers ComeUp.
//
// Source des intitulés et descriptions :
// archives/projects/novatrix-data-enrichment-main/src/components/ServicesSection.tsx
// (textes de vente déjà utilisés en production, recoupés avec la liste de services réelle
// de novatrix/comeup_extraction_finale.json). Le service Make/Zapier a été complété avec
// "n8n" pour rester cohérent avec le positionnement retenu dans NOVATRIX_BRIEF.md section 1
// ("automatisation (chatbots IA, Make/Zapier/n8n...)").
export const services: Service[] = [
  {
    slug: 'saas-ia',
    title: 'Création d’application web SaaS IA',
    description:
      "Applications web sur mesure intégrant l'intelligence artificielle pour automatiser et optimiser vos processus.",
    href: '/services#saas-ia',
    source: 'archives/.../ServicesSection.tsx',
  },
  {
    slug: 'automatisation',
    title: 'Automatisation avec Make, Zapier ou n8n',
    description: 'Connectez vos outils et automatisez vos flux de travail pour gagner en productivité.',
    href: '/services#automatisation',
    source: 'archives/.../ServicesSection.tsx',
  },
  {
    slug: 'reseaux-sociaux',
    title: 'Automatisation des publications réseaux sociaux',
    description: 'Planifiez et publiez automatiquement sur tous vos réseaux sociaux.',
    href: '/services#reseaux-sociaux',
    source: 'archives/.../ServicesSection.tsx',
  },
  {
    slug: 'chatbot-leads',
    title: 'Chatbot IA de génération de leads',
    description: 'Capturez et qualifiez vos prospects 24/7 grâce à un chatbot intelligent.',
    href: '/services#chatbot-leads',
    source: 'archives/.../ServicesSection.tsx',
  },
  {
    slug: 'agent-administratif',
    title: 'Agent IA administratif',
    description: 'Automatisez votre gestion et facturation avec un agent IA dédié.',
    href: '/services#agent-administratif',
    source: 'archives/.../ServicesSection.tsx',
  },
  {
    slug: 'wordpress',
    title: 'Création de site WordPress',
    description: 'Sites web professionnels et performants avec WordPress.',
    href: '/services#wordpress',
    source: 'archives/.../ServicesSection.tsx',
  },
]
