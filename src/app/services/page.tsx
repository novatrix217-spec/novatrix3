import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { ButtonLink } from '@/components/ui/Button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { RevealTitle } from '@/components/ui/RevealTitle'
import { services } from '@/lib/content/services'
import { siteConfig } from '@/lib/content/site'
import { revealStyle, staggerDelay } from '@/lib/reveal'
import { MotionVideo } from '@/components/media/MotionVideo'
import { CapabilityDeck } from '@/components/experience/CapabilityDeck'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Chatbots IA, automatisation Make/Zapier/n8n, applications SaaS IA, agents IA administratifs et sites WordPress — les services de NovatrixAI.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div className="reveal" style={revealStyle(0, 8)}><Kicker>Services</Kicker></div>
              <RevealTitle text="Des systèmes qui travaillent avec vous." className="text-h1 mt-4 text-text-primary" />
              <p className="reveal text-body-lg mt-6 max-w-2xl text-text-secondary" style={revealStyle(80, 16)}>{siteConfig.tagline}</p>
            </div>
            <div className="page-media reveal" style={revealStyle(120, 16)} aria-hidden="true">
              <MotionVideo src="/media/films/expertise.mp4" />
              <span>Services / 01</span>
            </div>
          </div>
          <nav aria-label="Index des services" className="mt-12 grid border-y border-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <a key={service.slug} href={`#${service.slug}`} className="group flex min-h-16 items-center gap-4 border-b border-border-subtle py-3 pr-4 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                <span className="kicker text-accent">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-small font-semibold text-text-primary group-hover:text-accent">{service.title}</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <CapabilityDeck />

      <Section>
        <Container>
          <div className="border-b border-border-subtle">
            {services.map((service, index) => (
              <article key={service.slug} id={service.slug} style={revealStyle(staggerDelay(index, 80, 3), 12)} className="reveal scroll-mt-24 grid gap-5 border-t border-border-subtle py-10 lg:grid-cols-12 lg:gap-6 lg:py-14">
                <span className="kicker text-accent lg:col-span-1">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="text-h3 text-text-primary lg:col-span-5">{service.title}</h2>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-body-lg max-w-2xl text-text-secondary">{service.description}</p>
                  <ButtonLink href="/contact" variant="secondary" className="mt-6">Discuter de ce besoin</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container className="dark-panel rounded-3xl p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-16">
          <div>
            <Kicker>Un besoin précis&nbsp;?</Kicker>
            <h2 className="text-h2 mt-4 max-w-4xl text-white">Construisons le bon système, pas seulement un nouvel outil.</h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/contact">Réserver un audit gratuit</ButtonLink>
            <WhatsAppCta className="!border-white/30 !text-white hover:!bg-white/10" />
          </div>
        </Container>
      </Section>
    </>
  )
}
