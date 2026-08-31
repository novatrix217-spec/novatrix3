'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { phase, setLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { ContactForm } from '@/components/forms/ContactForm'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { siteConfig } from '@/lib/content/site'
import { SceneCorners } from './SceneCorners'

/**
 * Expérience Contact (Lot 6) : arrivée immersive courte, puis un chapitre formulaire
 * volontairement large et quasi statique (pas de sur-animation pendant que l'utilisateur
 * tape), puis une clôture. Le formulaire (`ContactForm`) est un composant client autonome,
 * jamais démonté par cette page pendant le scroll (aucune clé React qui changerait) :
 * son state interne (saisie, validation, focus) n'est jamais affecté par le scroll-scrub,
 * qui ne pilote que l'opacité/transform du conteneur qui l'englobe.
 */
export function LusionContactExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const formSceneRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLSpanElement>(null)

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'contact-immersive-active',
    reducedBodyClass: 'contact-immersive-reduced',
    // Chapitre 2 (formulaire) volontairement très large : l'utilisateur doit pouvoir
    // scroller un peu sans jamais perdre l'accès au formulaire ni déclencher de
    // transition intrusive pendant la saisie.
    getChapter: (current) => (current < .13 ? 1 : current < .92 ? 2 : 3),
    // Les chapitres 1-2 (intro + formulaire) restent sur fond sombre : le logo du header
    // reste blanc, et surtout aucune ré-écriture de la scène pendant que l'utilisateur
    // saisit son message (non-régression formulaire, cf. commentaire de tête de fichier).
    // Seule la clôture (chapitre 3) passe en scène claire, cohérent avec l'alternance des
    // 4 autres pages : rupture ponctuelle de fin, jamais pendant l'interaction avec le
    // formulaire.
    getHeaderColor: (chapter) => (chapter === 3 ? '#080808' : '#ffffff'),
    getStageBackground: (chapter) =>
      chapter === 3
        ? { bg: 'var(--scene-paper)', fg: 'var(--scene-paper-fg)' }
        : { bg: 'var(--scene-void)', fg: 'var(--scene-void-fg)' },
    onRender: ({ progress: current }) => {
      const introLeave = phase(current, .045, .11)
      setLayer(introRef.current, 1 - introLeave, `translate3d(0,${-introLeave * 10}vh,0) scale(${1 + introLeave * .06})`)

      const formAlpha = phase(current, .07, .13) * (1 - phase(current, .88, .93))
      setLayer(formSceneRef.current, formAlpha, `translate3d(0,${(1 - phase(current, .07, .13)) * 10}vh,0)`, 0)

      const endAlpha = phase(current, .89, .93)
      setLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 20}vh,0)`)

      if (progressLineRef.current) progressLineRef.current.style.transform = `scaleX(${current})`
    },
  })

  return (
    <section ref={rootRef} className="contact-immersive" aria-label="Contact Novatrix">
      <div ref={stageRef} className="contact-immersive-stage" data-chapter="1">
        <SceneCorners />
        <div ref={introRef} className="contact-chapter contact-intro-scene">
          <p>Contact / nouveau projet</p>
          <h1>Parlons de ce qui<br />vient après.</h1>
          <p className="contact-intro-scroll">Faites défiler pour accéder au formulaire ↓</p>
        </div>

        <div ref={formSceneRef} className="contact-chapter contact-form-scene">
          <div className="contact-form-grid">
            <div className="contact-form-aside">
              <p className="contact-scene-index">Brief projet</p>
              <h2>Décrivez votre besoin,<br />on s’occupe du reste.</h2>
              <p className="contact-form-copy">Pour une réponse plus directe, écrivez-nous sur WhatsApp.</p>
              <address className="contact-address">
                <div><span>Email</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
                <div><span>Téléphone</span><span>{siteConfig.phoneDisplay}</span></div>
                <div><span>Localisation</span><span>{siteConfig.location}</span></div>
              </address>
              <WhatsAppCta className="contact-whatsapp-cta" />
            </div>
            <div className="contact-form-panel">
              <ContactForm />
            </div>
          </div>
        </div>

        <div ref={endRef} className="contact-chapter contact-end-scene">
          <p>Une collaboration commence par une conversation claire.</p>
          <h2>À très vite<span>.</span></h2>
          <div className="contact-next-page"><small>Continuez l’expérience</small><Link href="/">Accueil <strong>→</strong></Link></div>
        </div>

        <div className="contact-progress" aria-hidden="true"><span ref={progressLineRef} /></div>
      </div>
    </section>
  )
}
