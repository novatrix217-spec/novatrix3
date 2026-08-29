import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { ButtonLink } from '@/components/ui/Button'
import { RevealTitle } from '@/components/ui/RevealTitle'
import { services } from '@/lib/content/services'
import { siteConfig } from '@/lib/content/site'
import { revealStyle, staggerDelay } from '@/lib/reveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Chatbots IA, automatisation Make/Zapier/n8n, applications SaaS IA, agents IA administratifs et sites WordPress — les services de NovatrixAI.",
}

export default function ServicesPage() {
  return (
    <>
      <Section className="!pb-0">
        <Container>
          <div className="reveal" style={revealStyle(0, 8)}>
            <Kicker>Services</Kicker>
          </div>
          <RevealTitle
            text="Nos services d’IA et d’automatisation"
            className="text-h1 font-display mt-3 max-w-2xl font-bold text-text-primary"
          />
          <p className="reveal text-body-lg mt-4 max-w-2xl text-text-secondary" style={revealStyle(80, 16)}>
            {siteConfig.tagline}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                style={revealStyle(staggerDelay(index, 80, 3), 12)}
                className="reveal scroll-mt-24 grid gap-6 border-t border-border-subtle pt-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-small font-bold text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-h2 font-display font-bold text-text-primary">{service.title}</h2>
                  <p className="text-body-lg mt-3 max-w-2xl text-text-secondary">{service.description}</p>
                  <ButtonLink href="/contact" variant="secondary" className="mt-6">
                    Discuter de ce besoin
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
