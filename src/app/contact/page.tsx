import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
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
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <div className="reveal" style={revealStyle(0, 8)}>
              <Kicker>Contact</Kicker>
            </div>
            <RevealTitle
              text="Prêt à démarrer votre projet ?"
              className="text-h1 font-display mt-3 font-bold text-text-primary"
            />
            <p className="reveal text-body-lg mt-4 text-text-secondary" style={revealStyle(80, 16)}>
              Décrivez votre besoin dans le formulaire, nous vous recontactons rapidement. Pour
              une réponse plus rapide encore, écrivez-nous directement sur WhatsApp.
            </p>

            <div className="reveal mt-8 space-y-3" style={revealStyle(160, 12)}>
              <p className="text-body text-text-primary">
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:text-accent-hover">
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-body text-text-primary">{siteConfig.phoneDisplay} (WhatsApp)</p>
              <p className="text-body text-text-secondary">{siteConfig.location}</p>
            </div>

            <WhatsAppCta className="mt-8" />
          </div>

          {/* Habillage visuel de reveal (wrapper CSS uniquement) — ContactForm.tsx lui-même
              n'est pas modifié, conformément au garde-fou de la mission. */}
          <div className="reveal" style={revealStyle(80, 12)}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
