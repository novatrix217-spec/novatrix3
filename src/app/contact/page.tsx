import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { ContactForm } from '@/components/forms/ContactForm'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { siteConfig } from '@/lib/content/site'

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
            <Kicker>Contact</Kicker>
            <h1 className="text-h1 font-display mt-3 font-bold text-text-primary">Prêt à démarrer votre projet ?</h1>
            <p className="text-body-lg mt-4 text-text-secondary">
              Décrivez votre besoin dans le formulaire, nous vous recontactons rapidement. Pour
              une réponse plus rapide encore, écrivez-nous directement sur WhatsApp.
            </p>

            <div className="mt-8 space-y-3">
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

          <ContactForm />
        </div>
      </Container>
    </Section>
  )
}
