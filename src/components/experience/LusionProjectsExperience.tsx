'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { phase, setLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { projectGallery } from '@/lib/content/projects'
import { SceneCorners } from './SceneCorners'

const categoryStats = Array.from(new Set(projectGallery.map((project) => project.category)))

export function LusionProjectsExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introTitleRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsTrackRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const gridTrackRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  // Distance de défilement (en vh) nécessaire pour parcourir toute la grille de projets,
  // mesurée dynamiquement (Lot 4) plutôt que codée en dur : évite qu'un ajout/retrait de
  // projet dans `projectGallery` laisse les dernières cartes hors champ avant la fin.
  const gridTravelRef = useRef(224)

  useEffect(() => {
    const measureGridTravel = () => {
      const element = gridTrackRef.current
      if (!element) return
      const viewportHeight = window.innerHeight || 1
      // La translation part de +34vh (voir onRender) : il faut donc parcourir la hauteur
      // du track moins ce décalage initial, plus la hauteur du viewport, pour que le bas
      // du track (dernière carte incluse) atteigne exactement le bas du viewport en fin
      // de course — sans quoi la dernière carte reste tronquée (bug confirmé par QA).
      const initialOffsetPx = 0.34 * viewportHeight
      const travelPx = Math.max(1, element.offsetHeight + initialOffsetPx - viewportHeight)
      gridTravelRef.current = (travelPx / viewportHeight) * 100
    }
    measureGridTravel()
    // Re-mesure après le premier paint pour absorber tout réajustement tardif de mise en
    // page (polices, images) qui modifierait la hauteur réelle de la grille.
    const settleTimeout = window.setTimeout(measureGridTravel, 300)
    window.addEventListener('resize', measureGridTravel)
    return () => {
      window.clearTimeout(settleTimeout)
      window.removeEventListener('resize', measureGridTravel)
    }
  }, [])

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'projects-immersive-active',
    reducedBodyClass: 'projects-immersive-reduced',
    getChapter: (current) => (current < .09 ? 1 : current < .25 ? 2 : current < .9 ? 3 : 4),
    getHeaderColor: (chapter) => (chapter === 4 ? '#ffffff' : '#080808'),
    // Alternance de scènes : clair pour l'intro/portfolio/grille, rupture sombre sur la
    // clôture/CTA finale (déjà en place, désormais pilotée par les tokens partagés).
    getStageBackground: (chapter) =>
      chapter === 4
        ? { bg: 'var(--scene-void)', fg: 'var(--scene-void-fg)' }
        : { bg: 'var(--scene-paper)', fg: 'var(--scene-paper-fg)' },
    onRender: ({ progress: current }) => {
      // Chapitre 1 — intro "PROJETS" : fenêtre resserrée (Lot 4) pour réduire la zone morte
      // de début constatée à l'audit (0-15 % figés, ramenés à 0-9 %).
      const introLeave = phase(current, .04, .09)
      setLayer(introRef.current, 1 - introLeave, `translate3d(${introLeave * -13}vw,${introLeave * -18}vh,0) rotate(${3.5 - introLeave * 8}deg) scale(${1 + introLeave * .2})`)
      if (introTitleRef.current) introTitleRef.current.style.letterSpacing = `${-.075 + introLeave * .03}em`

      // Chapitre 2 — nouvelle scène intermédiaire (Lot 4) : présente les catégories et le
      // volume du portfolio avant la grille, pour combler l'écart de richesse relevé à
      // l'audit (la page n'avait que 3 chapitres contre 6-8 sur Home/About). Séquencée
      // strictement après la sortie de l'intro et avant l'entrée de la grille pour éviter
      // tout chevauchement disgracieux entre les trois scènes.
      const statsAlpha = phase(current, .07, .12) * (1 - phase(current, .21, .26))
      setLayer(statsRef.current, statsAlpha, `translate3d(0,${(1 - phase(current, .07, .12)) * 16}vh,0)`)
      if (statsTrackRef.current) {
        const statsReveal = phase(current, .09, .19)
        statsTrackRef.current.style.setProperty('--stats-reveal', String(statsReveal))
      }

      // Chapitre 3 — grille de projets : la distance de translation est calculée à partir
      // de la hauteur réelle du track (voir mesure ci-dessous), garantissant que la dernière
      // carte est pleinement visible avant l'entrée du chapitre de fin.
      const gridAlpha = phase(current, .23, .29) * (1 - phase(current, .89, .94))
      setLayer(gridRef.current, gridAlpha)
      if (gridTrackRef.current) {
        const gridTravelProgress = phase(current, .25, .855)
        gridTrackRef.current.style.transform = `translate3d(0,${34 - gridTravelProgress * gridTravelRef.current}vh,0)`
      }

      // Chapitre 4 — fin/CTA. Démarre après .855 (fin de course du track) et après le début
      // du fondu de sortie de la grille (.89), pour garantir une fenêtre où la dernière carte
      // est intégralement visible avec opacité pleine avant toute transition (bug QA corrigé).
      const endAlpha = phase(current, .9, .95)
      setLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 25}vh,0)`)

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${current})`
    },
  })

  return (
    <section ref={rootRef} className="projects-immersive" aria-label="Projets Novatrix">
      <div ref={stageRef} className="projects-immersive-stage" data-chapter="1">
        <SceneCorners />
        <div ref={introRef} className="projects-chapter projects-intro-scene">
          <p>Portfolio / sélection 2026</p>
          <h1 ref={introTitleRef}>PROJETS</h1>
          <div><strong>{String(projectGallery.length).padStart(2, '0')}</strong><span>↓</span></div>
          <small>Faites défiler pour explorer</small>
        </div>

        <div ref={statsRef} className="projects-chapter projects-stats-scene">
          <p className="projects-scene-index">01 / LE TERRAIN DE JEU</p>
          <h2>Un portfolio<br />qui couvre tout<br />le spectre IA.</h2>
          <div ref={statsTrackRef} className="projects-stats-track">
            {categoryStats.map((category, index) => (
              <article key={category} style={{ '--stat-index': index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{category}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="projects-chapter projects-grid-scene">
          <div ref={gridTrackRef} className="projects-grid-track">
            <header>
              <p>Une sélection de systèmes, produits et expériences numériques conçus pour produire un résultat concret.</p>
              <Link href="/contact">Votre projet <span>↗</span></Link>
            </header>
            <div className="projects-virtual-grid">
              {projectGallery.map((project, index) => (
                <Link key={project.slug} href={project.href ?? '/contact'} className="projects-virtual-card" data-cursor="Découvrir">
                  <div><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:760px) 88vw,46vw" /><span>↗</span><i aria-hidden="true" /></div>
                  <p>{project.category} · {String(index + 1).padStart(2, '0')}</p>
                  <h2>{project.previewTitle ?? project.title}</h2>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div ref={endRef} className="projects-chapter projects-end-scene">
          <div className="projects-end-shapes" aria-hidden="true">
            {Array.from({ length: 36 }, (_, index) => (
              <i key={index} style={{ left: `${(index * 41) % 98}%`, top: `${10 + (index * 29) % 78}%`, '--shape-index': index, '--shape-size': `${6 + (index % 5) * 3}px` } as CSSProperties} />
            ))}
          </div>
          <p>Le prochain projet peut commencer ici.</p>
          <h2>Construisons<br />la suite<span>.</span></h2>
          <Link href="/contact">Parlons-en <span>↗</span></Link>
          <div className="projects-next-page"><small>Continuez l’expérience</small><Link href="/a-propos">À propos <strong>→</strong></Link></div>
        </div>
        <div className="projects-progress" aria-hidden="true"><span ref={progressRef} /></div>
      </div>
    </section>
  )
}
