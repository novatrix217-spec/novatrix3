'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { phase, setLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { projectGallery } from '@/lib/content/projects'

export function LusionProjectsExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introTitleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const gridTrackRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'projects-immersive-active',
    reducedBodyClass: 'projects-immersive-reduced',
    getChapter: (current) => (current < .15 ? 1 : current < .78 ? 2 : 3),
    getHeaderColor: (chapter) => (chapter === 3 ? '#ffffff' : '#080808'),
    onRender: ({ progress: current }) => {
      const introLeave = phase(current, .09, .18)
      setLayer(introRef.current, 1 - introLeave, `translate3d(${introLeave * -13}vw,${introLeave * -18}vh,0) rotate(${3.5 - introLeave * 8}deg) scale(${1 + introLeave * .2})`)
      if (introTitleRef.current) introTitleRef.current.style.letterSpacing = `${-.075 + introLeave * .03}em`
      const gridAlpha = phase(current, .1, .17) * (1 - phase(current, .73, .8))
      setLayer(gridRef.current, gridAlpha)
      if (gridTrackRef.current) gridTrackRef.current.style.transform = `translate3d(0,${34 - phase(current, .15, .76) * 224}vh,0)`
      const endAlpha = phase(current, .76, .83)
      setLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 25}vh,0)`)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${current})`
    },
  })

  return (
    <section ref={rootRef} className="projects-immersive" aria-label="Projets Novatrix">
      <div ref={stageRef} className="projects-immersive-stage" data-chapter="1">
        <div ref={introRef} className="projects-chapter projects-intro-scene">
          <p>Portfolio / sélection 2026</p>
          <h1 ref={introTitleRef}>PROJETS</h1>
          <div><strong>{String(projectGallery.length).padStart(2, '0')}</strong><span>↓</span></div>
          <small>Faites défiler pour explorer</small>
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
