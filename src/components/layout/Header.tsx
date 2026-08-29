import Image from 'next/image'
import Link from 'next/link'
import { navLinks, siteConfig } from '@/lib/content/site'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border-subtle bg-elevated/95 backdrop-blur"
      style={{ viewTransitionName: 'site-header' }}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} — Accueil`}>
          <Image
            src="/brand/novatrix-mark.png"
            alt={`Logo ${siteConfig.name}`}
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <span className="font-display text-lg font-bold text-text-primary">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-accent-soft hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" className="!min-h-10 !py-2">
            Audit gratuit
          </ButtonLink>
        </div>

        {/* Nav mobile minimale, sans JS : liens visibles sur petit écran directement sous le logo. */}
        <nav aria-label="Navigation principale (mobile)" className="flex items-center gap-3 lg:hidden">
          <Link href="/contact" className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-ink-on-accent">
            Contact
          </Link>
        </nav>
      </Container>
      <nav aria-label="Navigation secondaire (mobile)" className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border-subtle px-5 py-2 text-xs lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="font-semibold text-text-secondary hover:text-accent">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
