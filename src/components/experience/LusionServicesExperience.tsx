'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { phase, windowOpacity, setLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { MotionVideo } from '@/components/media/MotionVideo'
import { services } from '@/lib/content/services'
import { keyStats } from '@/lib/content/stats'
import { siteConfig } from '@/lib/content/site'

// Méthode en 4 étapes — reprend le principe déjà en place dans CapabilityDeck (cadrage,
// IA/automatisation, design, développement) sans dupliquer son moteur d'animation propre :
// ce chapitre le remplace en le fusionnant dans le scroll-scrub unique de la page (Lot 5,
// cf. plan validé).
const method = [
  ['01', 'Cadrer', 'Comprendre le problème réel, mesurer ce qui compte et décider ce qui mérite d’être construit.'],
  ['02', 'Concevoir', 'Modéliser le système — parcours, données, automatisations — avant d’écrire la moindre ligne de code.'],
  ['03', 'Construire', 'Développer, connecter et tester chaque brique en conditions réelles, par itérations courtes.'],
  ['04', 'Faire vivre', 'Mesurer l’usage, ajuster et transmettre un système que l’équipe sait faire évoluer seule.'],
] as const

export function LusionServicesExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const methodRef = useRef<HTMLDivElement>(null)
  const methodTrackRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLSpanElement>(null)
  const [activeService, setActiveService] = useState(0)

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'services-immersive-active',
    reducedBodyClass: 'services-immersive-reduced',
    getChapter: (current) => (current < .09 ? 1 : current < .32 ? 2 : current < .76 ? 3 : current < .89 ? 4 : 5),
    getHeaderColor: (chapter) => (chapter === 3 || chapter === 4 ? '#080808' : '#ffffff'),
    onRender: ({ progress: current }) => {
      const heroLeave = phase(current, .045, .095)
      setLayer(heroRef.current, 1 - heroLeave, `translate3d(0,${-heroLeave * 10}vh,0) scale(${1 + heroLeave * .08})`)
      if (heroVisualRef.current) {
        heroVisualRef.current.style.transform = `perspective(1100px) rotateX(${heroLeave * 5}deg) scale(${1 + heroLeave * .16}) translate3d(0,${-heroLeave * 5}vh,0)`
      }

      const methodAlpha = windowOpacity(current, .08, .14, .29, .335)
      setLayer(methodRef.current, methodAlpha, `translate3d(0,${(1 - phase(current, .08, .14)) * 16}vh,0)`)
      if (methodTrackRef.current) {
        const methodTravel = phase(current, .13, .32)
        methodTrackRef.current.style.transform = `translate3d(${5 - methodTravel * 82}vw,0,0)`
      }

      const gridAlpha = windowOpacity(current, .3, .36, .73, .78)
      setLayer(gridRef.current, gridAlpha)

      const proofAlpha = windowOpacity(current, .755, .8, .865, .9)
      setLayer(proofRef.current, proofAlpha, `translate3d(0,${(1 - phase(current, .755, .8)) * 18}vh,0)`)

      const endAlpha = phase(current, .875, .92)
      setLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 22}vh,0)`)

      if (progressLineRef.current) progressLineRef.current.style.transform = `scaleX(${current})`
    },
  })

  return (
    <section ref={rootRef} className="services-immersive" aria-label="Services Novatrix">
      <div ref={stageRef} className="services-immersive-stage" data-chapter="1">
        <div ref={heroRef} className="services-chapter services-hero-scene">
          <p>Services / méthode / systèmes</p>
          <h1>Des systèmes qui<br />travaillent avec vous.</h1>
          <p className="services-hero-tagline">{siteConfig.tagline}</p>
          <div ref={heroVisualRef} className="services-hero-visual" data-cursor="Explorer">
            <MotionVideo src="/media/films/expertise.mp4" priority />
            <span>NOVATRIX / SERVICES 01</span>
          </div>
          <p className="services-hero-scroll">Faites défiler pour explorer ↓</p>
        </div>

        <div ref={methodRef} className="services-chapter services-method-scene">
          <header><p className="services-scene-index">01 / NOTRE MÉTHODE</p><h2>Quatre étapes,<br />un seul système.</h2></header>
          <div ref={methodTrackRef} className="services-method-track">
            {method.map(([index, title, text]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="services-chapter services-grid-scene">
          <header><p className="services-scene-index">02 / L’OFFRE</p><h2>Six champs<br />d’intervention.</h2></header>
          <div className="services-grid" role="list">
            {services.map((service, index) => (
              <article
                key={service.slug}
                role="listitem"
                className="services-grid-item"
                data-active={activeService === index}
                onPointerEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                tabIndex={0}
              >
                <div className="services-grid-item-top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="services-grid-item-cross" aria-hidden="true">+</span>
                </div>
                <h3>{service.title}</h3>
                <div className="services-grid-item-body" aria-hidden={activeService !== index}>
                  <p>{service.description}</p>
                  <Link href="/contact" tabIndex={activeService === index ? 0 : -1} data-cursor="Discuter">Discuter de ce besoin <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div ref={proofRef} className="services-chapter services-proof-scene">
          <p className="services-scene-index">03 / EN CHIFFRES</p>
          <div className="services-proof-grid">
            {keyStats.map((stat) => (
              <article key={stat.id}><strong>{stat.value}</strong><span>{stat.label}</span></article>
            ))}
          </div>
        </div>

        <div ref={endRef} className="services-chapter services-end-scene">
          <p>Un besoin précis ?</p>
          <h2>Construisons le bon<br />système<span>.</span></h2>
          <div className="services-end-actions">
            <Link href="/contact">Réserver un audit gratuit <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="services-next-page"><small>Continuez l’expérience</small><Link href="/contact">Contact <strong>→</strong></Link></div>
        </div>

        <div className="services-progress" aria-hidden="true"><span ref={progressLineRef} /></div>
      </div>
    </section>
  )
}
