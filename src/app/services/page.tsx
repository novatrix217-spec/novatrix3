import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { ButtonLink } from '@/components/ui/Button'
import { services } from '@/lib/content/services'
import { siteConfig } from '@/lib/content/site'

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
          <Kicker>Services</Kicker>
          <h1 className="text-h1 font-display mt-3 max-w-2xl font-bold text-text-primary">
            Nos services d&rsquo;IA et d&rsquo;automatisation
          </h1>
          <p className="text-body-lg mt-4 max-w-2xl text-text-secondary">{siteConfig.tagline}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 grid gap-6 border-t border-border-subtle pt-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10 first:border-t-0 first:pt-0"
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
