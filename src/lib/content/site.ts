// Informations d'entreprise réelles.
// Sources vérifiées :
// - email : novatrix/components/SiteFooter.vue (mailto:contact@novatrixai.com)
//           + archives/projects/novatrix-data-enrichment-main/src/components/Footer.tsx
// - WhatsApp : archives/projects/novatrix-data-enrichment-main/src/components/ContactSection.tsx
//              et Footer.tsx (wa.me/2290163774295, +229 01 63 77 42 95)
// - localisation Cotonou : novatrix/pages/a-propos.vue ("Basés à Cotonou")
//   et indicatif téléphonique +229 (Bénin), cohérent avec le numéro WhatsApp ci-dessus.

export const siteConfig = {
  name: 'NovatrixAI',
  legalName: 'NovatrixAI',
  tagline: 'Agence IA & automatisation — chatbots IA, Make/Zapier/n8n, applications SaaS IA, sites WordPress.',
  description:
    "NovatrixAI aide les entrepreneurs et entreprises à gagner du temps, augmenter leur efficacité et automatiser leurs tâches grâce à l'intelligence artificielle et au développement sur mesure.",
  url: 'https://novatrixai.com',
  email: 'contact@novatrixai.com',
  phoneDisplay: '+229 01 63 77 42 95',
  whatsappNumber: '2290163774295',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite démarrer un projet avec NovatrixAI.')}`
  },
  location: 'Cotonou, Bénin',
} as const

export const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
] as const
