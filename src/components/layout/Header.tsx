'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { navLinks, siteConfig } from '@/lib/content/site'
import { Container } from '@/components/ui/Container'
import { NovatrixLogo } from '@/components/brand/NovatrixLogo'

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a[href]')?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const toggleSound = () => {
    setSoundEnabled((enabled) => {
      const next = !enabled
      window.dispatchEvent(new CustomEvent('novatrix:sound-change', { detail: { enabled: next } }))
      return next
    })
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Aller au contenu</a>
      <header className="experience-header" data-open={open} style={{ viewTransitionName: 'site-header' }}>
        <Container className="experience-header-inner">
          <Link href="/" className="experience-logo" aria-label={`${siteConfig.name} — Accueil`} data-cursor="Accueil">
            <NovatrixLogo />
          </Link>
          <div className="experience-header-actions">
            <button type="button" className="experience-sound" aria-pressed={soundEnabled} aria-label={soundEnabled ? 'Couper le son des vidéos' : 'Activer le son des vidéos'} onClick={toggleSound} data-magnetic="true">
              <span className="experience-sound-bars" aria-hidden="true"><i /><i /><i /></span>
              <span>{soundEnabled ? 'Son on' : 'Son off'}</span>
            </button>
            <Link href="/contact" className="experience-talk" data-magnetic="true" data-cursor="Écrire">
              <span aria-hidden="true">→</span><span>Parlons-nous</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="experience-navigation"
              className="experience-menu-button"
              data-magnetic="true"
              onClick={() => setOpen((value) => !value)}
            >
              <span>{open ? 'Fermer' : 'Menu'}</span>
              <span className="experience-menu-dots" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </Container>
      </header>

      {open ? (
        <div ref={panelRef} id="experience-navigation" role="dialog" aria-modal="true" aria-label="Menu principal" className="experience-menu-panel">
          <Container className="experience-menu-layout">
            <nav aria-label="Navigation principale" className="experience-menu-links">
              {navLinks.map((link, index) => {
                const current = isCurrent(pathname, link.href)
                return (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={current ? 'page' : undefined} className="experience-menu-link" style={{ '--menu-index': index } as React.CSSProperties}>
                    <span className="experience-menu-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="experience-menu-text"><span>{link.label}</span><span aria-hidden="true">{link.label}</span></span>
                    <span className="experience-menu-arrow" aria-hidden="true">↗</span>
                  </Link>
                )
              })}
            </nav>
            <div className="experience-menu-meta">
              <p><span>Studio</span>{siteConfig.location}</p>
              <p><span>Nouveaux projets</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
              <Link href="/contact" onClick={() => setOpen(false)} className="experience-menu-cta">Démarrer un projet <span aria-hidden="true">→</span></Link>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  )
}
