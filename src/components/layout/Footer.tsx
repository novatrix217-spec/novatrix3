import Link from 'next/link'
import { navLinks, siteConfig } from '@/lib/content/site'
import { Container } from '@/components/ui/Container'
import { services } from '@/lib/content/services'

export function Footer() {
  return (
    <footer
      className="border-t border-border-subtle bg-elevated"
      style={{ viewTransitionName: 'site-footer' }}
    >
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-text-primary">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-small text-text-secondary">{siteConfig.tagline}</p>
          <p className="mt-4 text-small text-text-secondary">{siteConfig.location}</p>
        </div>

        <div>
          <p className="kicker text-text-secondary">Navigation</p>
          <ul className="mt-4 space-y-2 text-small">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-text-secondary hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-text-secondary">Services</p>
          <ul className="mt-4 space-y-2 text-small">
            {services.slice(0, 4).map((service) => (
              <li key={service.slug}>
                <Link href={service.href} className="text-text-secondary hover:text-accent">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-text-secondary">Contact</p>
          <ul className="mt-4 space-y-2 text-small">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="text-text-secondary hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">
                {siteConfig.phoneDisplay} (WhatsApp)
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border-subtle">
        <Container className="flex flex-col gap-2 py-6 text-small text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.</span>
          <Link href="/contact" className="hover:text-accent">Nous contacter</Link>
        </Container>
      </div>
    </footer>
  )
}
