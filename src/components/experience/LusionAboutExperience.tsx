'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { phase, setLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { services } from '@/lib/content/services'
import { AboutParticleCanvas } from './AboutParticleCanvas'
import { SceneCorners } from './SceneCorners'

const collective = [
  ['01', 'Stratégie produit', 'Cadrer le problème, simplifier le parcours et décider ce qui mérite réellement d’être construit.'],
  ['02', 'IA & automatisation', 'Connecter les outils, orchestrer les agents et supprimer les tâches qui ralentissent les équipes.'],
  ['03', 'Design d’expérience', 'Donner à chaque interaction une hiérarchie claire, une présence forte et un mouvement utile.'],
  ['04', 'Développement', 'Transformer la vision en produits rapides, robustes et simples à faire évoluer.'],
  ['05', 'Partenaires experts', 'Mobiliser les bonnes expertises autour du projet, sans alourdir la collaboration.'],
] as const

const windowOpacity = (p: number, a: number, b: number, c: number, d: number) => phase(p, a, b) * (1 - phase(p, c, d))

export function LusionAboutExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const storyTitleRef = useRef<HTMLHeadingElement>(null)
  const collectiveRef = useRef<HTMLDivElement>(null)
  const collectiveTrackRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)
  const expertiseRef = useRef<HTMLDivElement>(null)
  const expertiseCardsRef = useRef<Array<HTMLAnchorElement | null>>([])
  const endRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const progressLineRef = useRef<HTMLSpanElement>(null)

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'about-immersive-active',
    reducedBodyClass: 'about-immersive-reduced',
    getChapter: (current) => (current < 0.1 ? 1 : current < 0.39 ? 2 : current < 0.61 ? 3 : current < 0.74 ? 4 : current < 0.94 ? 5 : 6),
    getHeaderColor: (chapter) => (chapter === 6 ? '#080808' : '#ffffff'),
    // Alternance de scènes : sombre (hero → collectif → terrain de jeu) → violet saturé sur
    // le chapitre manifeste "AREA OF EXPERTISE" (motif Lusion volontaire, cf. commit c768802 —
    // ne pas neutraliser) → clair sur la clôture/CTA.
    getStageBackground: (chapter) =>
      chapter === 5
        ? { bg: 'var(--scene-glow)', fg: 'var(--scene-glow-fg)' }
        : chapter === 6
          ? { bg: 'var(--scene-paper)', fg: 'var(--scene-paper-fg)' }
          : { bg: 'var(--scene-void)', fg: 'var(--scene-void-fg)' },
    onRender: ({ progress: current }) => {
      progressRef.current = current
      // Hero recalibré (Lot 3) : démarre dès 4 % du scroll (au lieu de 12 %) pour un rythme
      // d'entrée cohérent avec la Home, qui bouge dès ~6,5 %. Le cross-fade avec la scène
      // suivante (storyAlpha) est resserré dans la même proportion pour éviter un "trou"
      // visuel entre la sortie du hero et l'arrivée de la scène "story".
      const heroLeave = phase(current, .04, .1)
      setLayer(heroRef.current, 1 - heroLeave, `translate3d(0,${-heroLeave * 12}vh,0) scale(${1 + heroLeave * .08})`)
      if (heroTitleRef.current) heroTitleRef.current.style.transform = `translate3d(${heroLeave * -6}vw,${heroLeave * -8}vh,0) skewX(${heroLeave * -9}deg) scaleX(${1 + heroLeave * .2})`
      const storyAlpha = windowOpacity(current, .06, .16, .33, .4)
      setLayer(storyRef.current, storyAlpha, `translate3d(0,${(1 - phase(current, .06, .16)) * 16}vh,0)`)
      if (storyTitleRef.current) {
        const drift = phase(current, .2, .37)
        storyTitleRef.current.style.transform = `translate3d(${drift * -5}vw,${drift * -5}vh,0)`
      }
      const collectiveAlpha = windowOpacity(current, .34, .4, .56, .62)
      setLayer(collectiveRef.current, collectiveAlpha)
      if (collectiveTrackRef.current) collectiveTrackRef.current.style.transform = `translate3d(${7 - phase(current, .39, .585) * 126}vw,0,0)`
      setLayer(proofRef.current, windowOpacity(current, .56, .62, .69, .745), `translate3d(0,${(1 - phase(current, .56, .63)) * 20}vh,0)`)
      setLayer(expertiseRef.current, windowOpacity(current, .7, .755, .9, .945))
      const deck = phase(current, .74, .9)
      const center = (expertiseCardsRef.current.length - 1) / 2
      expertiseCardsRef.current.forEach((card, index) => {
        if (!card) return
        const spread = index - center
        const arrival = phase(deck, index * .035, .52 + index * .035)
        const exit = phase(deck, .72 + index * .018, .98)
        const x = spread * 18 * arrival + spread * 12 * (1 - arrival)
        const y = Math.abs(spread) * 13 * (1 - arrival) - exit * (85 + index * 10)
        const rotation = spread * 14 * (1 - arrival) + spread * -2.2 * arrival + exit * (index % 2 ? 15 : -15)
        card.style.transform = `translate3d(calc(-50% + ${x}vw),calc(-50% + ${y}vh),${index * 18}px) rotate(${rotation}deg) scale(${.7 + arrival * .3 + exit * .12})`
        card.style.opacity = String(1 - exit)
      })
      const endAlpha = phase(current, .915, .965)
      setLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 24}vh,0)`)
      if (progressLineRef.current) progressLineRef.current.style.transform = `scaleX(${current})`
    },
  })

  return (
    <section ref={rootRef} className="about-immersive" aria-label="À propos de Novatrix">
      <div ref={stageRef} className="about-immersive-stage" data-chapter="1">
        <SceneCorners />
        <AboutParticleCanvas progressRef={progressRef} />
        <div ref={heroRef} className="about-chapter about-hero-scene">
          <p>Studio créatif · IA · produits numériques</p>
          <h1 ref={heroTitleRef}>NOVATRIX</h1>
          <div className="about-hero-intro"><span>Nous sommes</span><strong>un studio de production<br /><em>numérique.</em></strong></div>
          <p className="about-hero-scroll">Faites défiler pour nous découvrir ↓</p>
        </div>
        <div ref={storyRef} className="about-chapter about-story-scene">
          <p className="about-scene-index">01 / NOTRE VISION</p>
          <h2 ref={storyTitleRef}>Un collectif de<br />spécialistes en design,<br />IA et technologie.</h2>
          <div className="about-story-copy">
            <p>Nous travaillons ensemble pour transformer des idées ambitieuses en expériences numériques claires, immersives et performantes.</p>
            <p>Depuis Cotonou, nous construisons des systèmes pensés pour être compris rapidement et utilisés durablement.</p>
          </div>
        </div>
        <div ref={collectiveRef} className="about-chapter about-collective-scene">
          <header><p>02 / LE COLLECTIF</p><h2>Des expertises<br />qui avancent ensemble.</h2></header>
          <div ref={collectiveTrackRef} className="about-collective-track">
            {collective.map(([index, title, text]) => (
              <article key={index}>
                <span>{index}</span>
                <div className="about-collective-portrait" aria-hidden="true"><i /><i /><i /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
        <div ref={proofRef} className="about-chapter about-proof-scene">
          <p className="about-scene-index">03 / TERRAIN DE JEU</p>
          <h2>Produits<br />Automatisations<br />Expériences</h2>
          <div className="about-proof-marquee" aria-hidden="true">
            <span>NOVATRIX LABS · IA · MOTION · WEBGL · N8N · PRODUIT · DESIGN · </span>
            <span>NOVATRIX LABS · IA · MOTION · WEBGL · N8N · PRODUIT · DESIGN · </span>
          </div>
          <div className="about-proof-grid">
            <article><strong>100+</strong><span>Projets réalisés</span></article>
            <article><strong>3</strong><span>Disciplines réunies</span></article>
            <article><strong>01</strong><span>Partenaire, de l’idée au produit</span></article>
          </div>
        </div>
        <div ref={expertiseRef} className="about-chapter about-expertise-scene">
          <p>04 / AREA OF EXPERTISE</p>
          <h2>CHAMPS<br />D’EXPERTISE</h2>
          <div className="about-expertise-cards">
            {services.map((service, index) => (
              <Link key={service.slug} href={service.href} ref={(element) => { expertiseCardsRef.current[index] = element }} className="about-expertise-card" data-cursor="Découvrir">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{service.title}</h3><p>{service.description}</p></div>
                <strong>↗</strong>
              </Link>
            ))}
          </div>
        </div>
        <div ref={endRef} className="about-chapter about-end-scene">
          <div className="about-end-noise" aria-hidden="true" />
          <p>Une collaboration commence par une conversation claire.</p>
          <h2>Travaillons<br />ensemble<span>!</span></h2>
          <Link href="/contact">Démarrer un projet <span>↗</span></Link>
          <div className="about-next-page"><small>Continuez l’expérience</small><Link href="/realisations">Nos projets <strong>→</strong></Link></div>
        </div>
        <div className="about-progress" aria-hidden="true"><span ref={progressLineRef} /></div>
      </div>
    </section>
  )
}
