import Link from 'next/link'
import { navLinks, siteConfig } from '@/lib/content/site'
import { Container } from '@/components/ui/Container'
import { ScrollNext } from '@/components/experience/ScrollNext'

export function Footer() {
  return (
    <>
      <footer className="lusion-footer" style={{ viewTransitionName: 'site-footer' }}>
        <Container>
          <div className="lusion-footer-top">
            <p>Un projet, une idée ou un défi à partager&nbsp;?</p>
            <h2>Construisons<br />la suite.</h2>
          </div>

          <div className="lusion-footer-middle">
            <div>
              <p className="lusion-footer-label">Studio</p>
              <p>{siteConfig.location}</p>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">{siteConfig.phoneDisplay}</a>
            </div>
            <div>
              <p className="lusion-footer-label">Nouveaux projets</p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
            <nav aria-label="Navigation du pied de page">
              {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </nav>
            <a href={`mailto:${siteConfig.email}`} className="lusion-footer-contact">
              <span>Votre message</span><span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="lusion-footer-bottom">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
            <span>Studio numérique indépendant</span>
            <a href="#main-content" aria-label="Retour en haut">↑</a>
          </div>
        </Container>
      </footer>
      <ScrollNext />
    </>
  )
}
