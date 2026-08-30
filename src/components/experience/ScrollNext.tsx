'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'

const nextByPath: Record<string, { href: string; label: string }> = {
  '/': { href: '/a-propos', label: 'À propos' },
  '/services': { href: '/realisations', label: 'Réalisations' },
  '/realisations': { href: '/a-propos', label: 'À propos' },
  '/a-propos': { href: '/contact', label: 'Contact' },
  '/contact': { href: '/', label: 'Accueil' },
}

export function ScrollNext() {
  const pathname = usePathname()
  const next = nextByPath[pathname] ?? nextByPath['/']

  return (
    <section className="scroll-next" aria-label="Page suivante">
      <Container>
        <p>Continuez à défiler pour découvrir</p>
        <Link href={next.href} data-cursor="Suivant">
          <span>{next.label}</span><span aria-hidden="true">→</span>
        </Link>
        <div className="scroll-next-line" aria-hidden="true"><i /><i /><i /><i /></div>
      </Container>
    </section>
  )
}
