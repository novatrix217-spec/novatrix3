import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { RevealTitle } from '@/components/ui/RevealTitle'
import { TeamSection } from '@/components/sections/TeamSection'
import { siteConfig } from '@/lib/content/site'
import { revealStyle, staggerDelay } from '@/lib/reveal'

export const metadata: Metadata = {
  title: 'À propos',
  description: siteConfig.description,
}

// Contenu réel repris de la bio officielle du profil ComeUp de NovatrixAI
// (novatrix/comeup_extraction_finale.json > profile.bio, extraction du 22/12/2025).
const expertiseAreas = [
  'Bots Discord sur mesure pour dynamiser vos communautés',
  "Applications intégrant l'API ChatGPT pour moderniser vos outils internes",
  'APIs performantes avec Node.js pour fluidifier vos workflows',
  'Sites WordPress optimisés SEO pour augmenter votre visibilité',
  'Web scraping pour récupérer et structurer vos données',
  'Configuration de serveurs Linux (VPS) fiable et sécurisée',
  'Modèles GPT personnalisés pour automatiser vos tâches et améliorer votre service client',
]

export default function AProposPage() {
  return (
    <>
      <Section className="!pb-0">
        <Container>
          <div className="reveal" style={revealStyle(0, 8)}>
            <Kicker>À propos</Kicker>
          </div>
          <RevealTitle
            text="Transformer vos idées en solutions concrètes, mesurables et durables."
            className="text-h1 font-display mt-3 max-w-3xl font-bold text-text-primary"
          />
          <p className="reveal text-body-lg mt-4 max-w-2xl text-text-secondary" style={revealStyle(80, 16)}>
            {siteConfig.description} Chaque projet est conçu pour apporter des résultats réels à
            votre activité, qu&rsquo;il s&rsquo;agisse d&rsquo;automatisation, de développement
            personnalisé ou d&rsquo;intégration IA.
          </p>
        </Container>
      </Section>

      <Section id="expertise">
        <Container>
          <h2 className="reveal text-h2 font-display font-bold text-text-primary" style={revealStyle(0, 12)}>
            Ce que nous faisons pour vous
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {expertiseAreas.map((item, index) => (
              <li
                key={item}
                style={revealStyle(staggerDelay(index, 80, 3), 10)}
                className="reveal text-body flex gap-3 rounded-lg border border-border-subtle bg-elevated p-5 text-text-primary"
              >
                <span aria-hidden="true" className="text-accent">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface id="equipe">
        <Container>
          <div className="reveal" style={revealStyle(0, 8)}>
            <Kicker>Équipe</Kicker>
          </div>
          <h2 className="reveal text-h2 font-display mt-3 font-bold text-text-primary" style={revealStyle(80, 12)}>
            L&rsquo;équipe NovatrixAI
          </h2>
          <div className="mt-8">
            <TeamSection />
          </div>
        </Container>
      </Section>

      <Section id="localisation">
        <Container>
          <h2 className="reveal text-h2 font-display font-bold text-text-primary" style={revealStyle(0, 12)}>
            Où nous trouver
          </h2>
          <p className="reveal text-body-lg mt-4 max-w-xl text-text-secondary" style={revealStyle(80, 16)}>
            NovatrixAI opère depuis {siteConfig.location} et accompagne des clients francophones
            et internationaux à distance.
          </p>
        </Container>
      </Section>
    </>
  )
}
