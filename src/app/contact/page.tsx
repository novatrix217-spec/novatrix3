import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Kicker } from '@/components/ui/Kicker'
import { RevealTitle } from '@/components/ui/RevealTitle'
import { ContactForm } from '@/components/forms/ContactForm'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { siteConfig } from '@/lib/content/site'
import { revealStyle } from '@/lib/reveal'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactez ${siteConfig.name} par formulaire ou WhatsApp pour discuter de votre projet IA ou automatisation.`,
}

export default function ContactPage() {
  return (
    <section className="section-pad" aria-labelledby="contact-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal" style={revealStyle(0, 8)}><Kicker>Contact</Kicker></div>
            <RevealTitle id="contact-title" text="Parlons de ce qui vient après." className="text-h1 mt-4 text-text-primary" />
            <p className="reveal text-body-lg mt-6 max-w-xl text-text-secondary" style={revealStyle(80, 16)}>
              Décrivez votre besoin dans le formulaire. Pour une réponse plus directe, écrivez-nous sur WhatsApp.
            </p>

            <address className="reveal mt-10 border-y border-border-subtle not-italic" style={revealStyle(160, 12)}>
              <div className="grid gap-2 border-b border-border-subtle py-5 sm:grid-cols-[120px_1fr]">
                <span className="kicker text-text-secondary">Email</span>
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:text-accent-hover">{siteConfig.email}</a>
              </div>
              <div className="grid gap-2 border-b border-border-subtle py-5 sm:grid-cols-[120px_1fr]">
                <span className="kicker text-text-secondary">Téléphone</span>
                <span className="font-semibold text-text-primary">{siteConfig.phoneDisplay}</span>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[120px_1fr]">
                <span className="kicker text-text-secondary">Localisation</span>
                <span className="font-semibold text-text-primary">{siteConfig.location}</span>
              </div>
            </address>
            <WhatsAppCta className="mt-8 w-full sm:w-auto" />
          </div>

          <div className="reveal lg:col-span-7" style={revealStyle(80, 12)}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="kicker text-text-secondary">Brief projet</p>
              <span className="kicker text-accent">01 — 04</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
