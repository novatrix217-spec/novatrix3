import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/sections/Hero'
import { StatsStrip } from '@/components/sections/StatsStrip'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Testimonials } from '@/components/sections/Testimonials'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Kicker } from '@/components/ui/Kicker'
import { ButtonLink } from '@/components/ui/Button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { projectCaseStudies } from '@/lib/content/projects'
import { siteConfig } from '@/lib/content/site'

export const metadata: Metadata = {
  title: 'Accueil',
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-b border-border-subtle bg-surface py-10">
        <StatsStrip />
      </div>

      <Section id="services">
        <Container>
          <Kicker>Services</Kicker>
          <h2 className="text-h2 font-display mt-3 max-w-2xl font-bold text-text-primary">
            Nos services d&rsquo;IA et d&rsquo;automatisation
          </h2>
          <p className="text-body-lg mt-4 max-w-2xl text-text-secondary">
            Des solutions concrètes pour transformer votre business avec l&rsquo;intelligence
            artificielle — sans dépendance à une marketplace tierce.
          </p>
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </Container>
      </Section>

      <Section surface id="realisations">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Kicker>Portfolio</Kicker>
              <h2 className="text-h2 font-display mt-3 font-bold text-text-primary">Nos dernières réalisations</h2>
            </div>
            <Link href="/realisations" className="text-small font-semibold text-accent hover:text-accent-hover">
              Voir toutes nos réalisations →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projectCaseStudies.map((project) => (
              <Link
                key={project.slug}
                href={`/realisations#${project.slug}`}
                className="rounded-lg border border-border-subtle bg-elevated p-6 shadow-[var(--elev-1)] hover:border-accent/40"
              >
                <p className="kicker text-accent">{project.category}</p>
                <h3 className="text-h3 font-display mt-3 font-bold text-text-primary">{project.title}</h3>
                <p className="text-small mt-3 text-text-secondary">{project.solution}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Kicker>Témoignages</Kicker>
          <h2 className="text-h2 font-display mt-3 font-bold text-text-primary">Ce que nos clients disent de nous</h2>
          <div className="mt-10">
            <Testimonials limit={3} />
          </div>
        </Container>
      </Section>

      <Section surface>
        <Container className="rounded-xl bg-elevated p-10 text-center shadow-[var(--elev-2)] sm:p-14">
          <h2 className="text-h2 font-display font-bold text-text-primary">Prêt à transformer votre business ?</h2>
          <p className="text-body-lg mx-auto mt-4 max-w-xl text-text-secondary">
            Réservez un audit gratuit ou écrivez-nous directement — sans engagement.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Réserver un audit gratuit</ButtonLink>
            <WhatsAppCta />
          </div>
        </Container>
      </Section>
    </>
  )
}
