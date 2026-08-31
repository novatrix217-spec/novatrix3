'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { MotionVideo } from '@/components/media/MotionVideo'
import { NovatrixLogo } from '@/components/brand/NovatrixLogo'
import { projectGallery } from '@/lib/content/projects'
import { phase, windowOpacity, setLayer as updateLayer } from '@/lib/scrollScrub'
import { useScrollScrub } from './useScrollScrub'
import { ImmersiveWorldCanvas } from './ImmersiveWorldCanvas'

function selectMosaicVideo(index: number) {
  window.dispatchEvent(new CustomEvent('novatrix:video-focus', { detail: { index } }))
}

const mosaicMedia = [
  { src: '/media/films/vision.mp4', label: 'Vision / IA' },
  { src: '/media/films/expertise.mp4', label: 'Expertise / Produit' },
  { src: '/media/films/orbit-lab.mp4', label: 'Orbit / Lab' },
  { src: '/media/films/exploration.mp4', label: 'Exploration / Motion' },
  { src: '/media/films/station-lab.mp4', label: 'Station / Expérience' },
] as const

export function LusionHomeExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const reelFrameRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const projectsTrackRef = useRef<HTMLDivElement>(null)
  const projectsHeadingRef = useRef<HTMLHeadingElement>(null)
  const projectCardsRef = useRef<Array<HTMLAnchorElement | null>>([])
  const manifestoRef = useRef<HTMLDivElement>(null)
  const manifestoTitleRef = useRef<HTMLHeadingElement>(null)
  const astronautSceneRef = useRef<HTMLDivElement>(null)
  const astronautRef = useRef<HTMLDivElement>(null)
  const astronautWordmarkRef = useRef<HTMLHeadingElement>(null)
  const tunnelRef = useRef<HTMLDivElement>(null)
  const tunnelAstronautRef = useRef<HTMLDivElement>(null)
  const tunnelKickerRef = useRef<HTMLParagraphElement>(null)
  const tunnelTitleRef = useRef<HTMLHeadingElement>(null)
  const worldPanelsRef = useRef<HTMLDivElement>(null)
  const worldOrbsRef = useRef<HTMLDivElement>(null)
  const worldSheetsRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const mosaicTrackRef = useRef<HTMLDivElement>(null)
  const mosaicTilesRef = useRef<Array<HTMLDivElement | null>>([])
  const collaborationRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const progressLabelRef = useRef<HTMLSpanElement>(null)
  const progressLineRef = useRef<HTMLSpanElement>(null)
  const threadRef = useRef<SVGPathElement>(null)
  const threadGlowRef = useRef<SVGPathElement>(null)

  const soundEnabledRef = useRef(false)
  const activeMosaicIndexRef = useRef(0)
  const lastChapterRef = useRef(-1)
  const syncPlaybackRef = useRef<(chapter: number) => void>(() => undefined)

  useEffect(() => {
    syncPlaybackRef.current = (chapter: number) => {
      const stage = stageRef.current
      if (!stage) return
      const soundEnabled = soundEnabledRef.current
      const activeMosaicIndex = activeMosaicIndexRef.current
      stage.dataset.sound = soundEnabled ? 'on' : 'off'
      const chapters = stage.querySelectorAll<HTMLElement>(':scope > .immersive-chapter')
      const activeChapter = chapters[chapter - 1]
      const mosaicBudget = 1
      const mosaicPlaybackOrder = [activeMosaicIndex, ...mosaicMedia.map((_, index) => index).filter((index) => index !== activeMosaicIndex)].slice(0, mosaicBudget)
      mosaicTilesRef.current.forEach((tile, index) => tile?.classList.toggle('is-audible', soundEnabled && chapter === 7 && index === activeMosaicIndex))
      const videos = stage.querySelectorAll<HTMLVideoElement>('video')
      videos.forEach((video) => {
        const tileIndex = Number(video.closest<HTMLElement>('[data-video-index]')?.dataset.videoIndex ?? -1)
        const shouldPlay = video.closest('.immersive-chapter') === activeChapter && (chapter !== 7 || mosaicPlaybackOrder.includes(tileIndex))
        video.muted = true
        if (shouldPlay) void video.play().catch(() => undefined)
        else video.pause()
      })
      if (!soundEnabled || !activeChapter) return
      const audible = chapter === 7
        ? activeChapter.querySelector<HTMLVideoElement>(`[data-video-index="${activeMosaicIndex}"] video`)
        : activeChapter.querySelector<HTMLVideoElement>('video')
      if (!audible) return
      audible.muted = false
      audible.volume = 0.72
      void audible.play().catch(() => undefined)
    }

    const soundChange = (event: Event) => {
      soundEnabledRef.current = Boolean((event as CustomEvent<{ enabled?: boolean }>).detail?.enabled)
      syncPlaybackRef.current(lastChapterRef.current < 1 ? 1 : lastChapterRef.current)
    }
    const videoFocus = (event: Event) => {
      activeMosaicIndexRef.current = Number((event as CustomEvent<{ index?: number }>).detail?.index ?? 0)
      if (lastChapterRef.current === 7) syncPlaybackRef.current(7)
    }

    window.addEventListener('novatrix:sound-change', soundChange)
    window.addEventListener('novatrix:video-focus', videoFocus)
    return () => {
      window.removeEventListener('novatrix:sound-change', soundChange)
      window.removeEventListener('novatrix:video-focus', videoFocus)
    }
  }, [])

  useScrollScrub({
    rootRef,
    stageRef,
    activeBodyClass: 'home-immersive-active',
    reducedBodyClass: 'home-immersive-reduced',
    getChapter: (current) => (current < 0.09 ? 1 : current < 0.225 ? 2 : current < 0.455 ? 3 : current < 0.535 ? 4 : current < 0.63 ? 5 : current < 0.845 ? 6 : current < 0.935 ? 7 : 8),
    getHeaderColor: (chapter) => (chapter <= 4 || chapter === 8 ? '#080808' : '#ffffff'),
    // Alternance de scènes (Lot cohérence transversale) : clair (hero → manifeste) → sombre
    // (astronaute → tunnel → mosaïque) → clair (clôture/CTA), rythme déjà en place, désormais
    // piloté par les tokens `--scene-*` partagés avec les 4 autres pages.
    getStageBackground: (chapter) =>
      chapter >= 5 && chapter <= 7
        ? { bg: 'var(--scene-void)', fg: 'var(--scene-void-fg)' }
        : { bg: 'var(--scene-paper)', fg: 'var(--scene-paper-fg)' },
    onChapterChange: (chapter) => {
      lastChapterRef.current = chapter
      if (progressLabelRef.current) progressLabelRef.current.textContent = String(chapter).padStart(2, '0')
      window.dispatchEvent(new CustomEvent('novatrix:world-activity', { detail: { active: chapter === 6 } }))
      syncPlaybackRef.current(chapter)
    },
    onRender: ({ progress: current }) => {
      progressRef.current = current
      const mobileViewport = window.innerWidth <= 900

      const heroLeave = phase(current, 0.065, 0.095)
      updateLayer(heroRef.current, 1 - heroLeave, `translate3d(0,${-heroLeave * 10}vh,0) scale(${1 + heroLeave * 0.1})`)
      if (heroVisualRef.current && current < 0.11) {
        heroVisualRef.current.style.transform = `perspective(1200px) rotateX(${heroLeave * 6}deg) scale(${1 + heroLeave * 0.2}) translate3d(0,${-heroLeave * 6}vh,0)`
        heroVisualRef.current.style.borderRadius = `${20 - heroLeave * 20}px`
      }

      const reelAlpha = windowOpacity(current, 0.085, 0.11, 0.205, 0.225)
      updateLayer(reelRef.current, reelAlpha, `translate3d(0,${(1 - phase(current, 0.085, 0.11)) * 16 - phase(current, 0.205, 0.225) * 12}vh,0)`)
      const reelExpansion = phase(current, 0.11, 0.185)
      if (reelFrameRef.current && reelAlpha > 0.001) {
        reelFrameRef.current.style.transform = `translate3d(-50%,${14 - reelExpansion * 14}vh,0) rotate(${(1 - reelExpansion) * -4.2}deg) scale(${0.48 + reelExpansion * 0.57})`
        reelFrameRef.current.style.borderRadius = `${36 - reelExpansion * 34}px`
        reelFrameRef.current.style.clipPath = `polygon(${6 - reelExpansion * 6}% 0,100% ${4 - reelExpansion * 4}%,${96 + reelExpansion * 4}% 100%,0 ${94 + reelExpansion * 6}%)`
      }

      const projectsAlpha = windowOpacity(current, 0.205, 0.235, 0.44, 0.46)
      updateLayer(projectsRef.current, projectsAlpha)
      if (projectsTrackRef.current && projectsAlpha > 0.001) {
        const projectTravel = phase(current, 0.235, 0.455)
        const projectDistance = mobileViewport ? 350 : 270
        projectsTrackRef.current.style.transform = `translate3d(0,${8 - projectTravel * projectDistance}vh,0)`
      }
      if (projectsHeadingRef.current && projectsAlpha > 0.001) {
        const headingReveal = phase(current, 0.208, 0.248)
        projectsHeadingRef.current.style.opacity = String(headingReveal)
        projectsHeadingRef.current.style.transform = `translate3d(0,${(1 - headingReveal) * 22}vh,0) rotate(${(1 - headingReveal) * 3}deg)`
      }
      if (projectsAlpha > 0.001) {
        projectCardsRef.current.forEach((card, index) => {
          if (!card) return
          const row = mobileViewport ? index : Math.floor(index / 2)
          const step = mobileViewport ? 0.022 : 0.045
          const start = 0.245 + row * step
          const reveal = phase(current, start, start + 0.032)
          const direction = index % 2 === 0 ? -1 : 1
          card.style.opacity = String(reveal)
          card.style.transform = `translate3d(${(1 - reveal) * direction * 4}vw,${(1 - reveal) * 18}vh,0) rotate(${(1 - reveal) * direction * 2.4}deg) scale(${0.92 + reveal * 0.08})`
          card.style.setProperty('--card-reveal', String(reveal))
        })
      }

      const manifestoAlpha = windowOpacity(current, 0.455, 0.475, 0.515, 0.545)
      updateLayer(manifestoRef.current, manifestoAlpha, `translate3d(0,${(1 - phase(current, 0.455, 0.48)) * 16}vh,0)`)
      if (manifestoTitleRef.current && manifestoAlpha > 0.001) {
        const drift = phase(current, 0.465, 0.54)
        manifestoTitleRef.current.style.transform = `translate3d(${-drift * 5}vw,${-drift * 7}vh,0) scale(${1 + drift * 0.07})`
      }

      const astronautAlpha = windowOpacity(current, 0.515, 0.55, 0.61, 0.645)
      updateLayer(astronautSceneRef.current, astronautAlpha)
      if (astronautSceneRef.current && astronautAlpha > 0.001) {
        const wipe = phase(current, 0.515, 0.56)
        astronautSceneRef.current.style.clipPath = `polygon(0 ${100 - wipe * 100}%,100% ${82 - wipe * 82}%,100% 100%,0 100%)`
      }
      if (astronautRef.current && astronautAlpha > 0.001) {
        const enter = phase(current, 0.52, 0.565)
        const retreat = phase(current, 0.565, 0.64)
        astronautRef.current.style.opacity = String(enter * (1 - retreat * 0.18))
        astronautRef.current.style.transform = `translate3d(-50%,${24 - enter * 24 - retreat * 8}%,0) scale(${0.7 + enter * 0.5 - retreat * 0.76}) rotate(${(1 - enter) * -5 + retreat * 4}deg)`
      }
      if (astronautWordmarkRef.current && astronautAlpha > 0.001) {
        const wordmarkAlpha = phase(current, 0.545, 0.575) * (1 - phase(current, 0.605, 0.635))
        astronautWordmarkRef.current.style.opacity = String(wordmarkAlpha)
        astronautWordmarkRef.current.style.transform = `translate3d(-50%,${(1 - wordmarkAlpha) * 8}vh,0) scale(${0.88 + wordmarkAlpha * 0.12})`
      }

      const tunnelAlpha = windowOpacity(current, 0.61, 0.65, 0.83, 0.865)
      updateLayer(tunnelRef.current, tunnelAlpha)
      const tunnelTravel = phase(current, 0.64, 0.84)
      if (tunnelAstronautRef.current && tunnelAlpha > 0.001) {
        tunnelAstronautRef.current.style.opacity = String(1 - tunnelTravel * 0.78)
        tunnelAstronautRef.current.style.transform = `translate3d(-50%,-50%,0) scale(${0.68 - tunnelTravel * 0.54}) rotate(${tunnelTravel * 18}deg)`
      }
      const tunnelCopyLeave = phase(current, 0.65, 0.695)
      if (tunnelTitleRef.current && tunnelAlpha > 0.001) {
        tunnelTitleRef.current.style.opacity = String(1 - tunnelCopyLeave)
        tunnelTitleRef.current.style.transform = `translate3d(0,${-tunnelCopyLeave * 11}vh,0) scale(${1 + tunnelCopyLeave * 0.1})`
      }
      if (tunnelAlpha > 0.001) {
        if (tunnelKickerRef.current) tunnelKickerRef.current.style.opacity = String(1 - tunnelCopyLeave)
        updateLayer(worldPanelsRef.current, windowOpacity(tunnelTravel, 0.12, 0.22, 0.38, 0.48), `perspective(900px) translate3d(0,0,0) rotateZ(${tunnelTravel * 10}deg) scale(${1.15 - tunnelTravel * 0.22})`)
        updateLayer(worldOrbsRef.current, windowOpacity(tunnelTravel, 0.36, 0.46, 0.64, 0.74), `translate3d(-50%,-50%,0) rotate(${tunnelTravel * 80}deg) scale(${0.72 + tunnelTravel * 0.5})`)
        updateLayer(worldSheetsRef.current, windowOpacity(tunnelTravel, 0.62, 0.72, 0.94, 1), `translate3d(0,${(0.7 - tunnelTravel) * 20}vh,0) rotate(${(tunnelTravel - 0.7) * 12}deg) scale(${1.08 - tunnelTravel * 0.1})`)
      }

      const mosaicAlpha = windowOpacity(current, 0.825, 0.86, 0.92, 0.945)
      updateLayer(mosaicRef.current, mosaicAlpha)
      if (mosaicTrackRef.current && mosaicAlpha > 0.001) {
        const reveal = phase(current, 0.83, 0.91)
        const collaboration = phase(current, 0.895, 0.93)
        mosaicTrackRef.current.style.setProperty('--mosaic-reveal', String(reveal))
        mosaicTrackRef.current.style.transform = `scale(${1.16 - reveal * 0.16}) rotate(${(1 - reveal) * -1.5}deg)`
        mosaicTrackRef.current.style.opacity = String(1 - collaboration)
        mosaicTilesRef.current.forEach((tile, index) => {
          if (!tile) return
          const tileReveal = phase(reveal, index * 0.085, 0.42 + index * 0.085)
          tile.style.setProperty('--tile-reveal', String(tileReveal))
        })
      }
      const collaborationAlpha = phase(current, 0.895, 0.93) * (1 - phase(current, 0.935, 0.95))
      updateLayer(collaborationRef.current, collaborationAlpha, `translate3d(0,${(1 - collaborationAlpha) * 10}vh,0)`)
      collaborationRef.current?.classList.toggle('is-active', collaborationAlpha > 0.01)

      const endAlpha = phase(current, 0.92, 0.95)
      updateLayer(endRef.current, endAlpha, `translate3d(0,${(1 - endAlpha) * 22}vh,0)`)

      if (progressLineRef.current) progressLineRef.current.style.transform = `scaleX(${current})`
      const threadDraw = phase(current, 0.075, 0.925)
      const threadOpacity = phase(current, 0.065, 0.1) * (1 - phase(current, 0.92, 0.96))
      if (threadRef.current) {
        threadRef.current.style.strokeDashoffset = String(1 - threadDraw)
        threadRef.current.style.opacity = String(threadOpacity)
      }
      if (threadGlowRef.current) {
        threadGlowRef.current.style.strokeDashoffset = String(1 - threadDraw)
        threadGlowRef.current.style.opacity = String(threadOpacity * 0.48)
      }
    },
  })

  return (
    <section ref={rootRef} className="immersive-home" aria-label="Expérience Novatrix">
      <div ref={stageRef} className="immersive-home-stage" data-chapter="1" data-sound="off">
        <svg className="immersive-brand-thread" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="novatrix-thread-glow"><feGaussianBlur stdDeviation="11" /></filter>
            <linearGradient id="novatrix-thread-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6c00ff" /><stop offset=".54" stopColor="#ee00e8" /><stop offset="1" stopColor="#8df8ff" /></linearGradient>
          </defs>
          <path ref={threadGlowRef} className="immersive-brand-thread-glow" pathLength="1" d="M-90 626 C156 92 378 838 626 348 S1032 -70 1532 528" />
          <path ref={threadRef} className="immersive-brand-thread-line" pathLength="1" d="M-90 626 C156 92 378 838 626 348 S1032 -70 1532 528" />
          <path className="immersive-brand-thread-pulse" pathLength="1" d="M-90 626 C156 92 378 838 626 348 S1032 -70 1532 528" />
        </svg>
        <div className="immersive-brand-stamp" aria-hidden="true"><NovatrixLogo compact /><span>NOVATRIX<br />DIGITAL STUDIO</span></div>
        <div ref={heroRef} className="immersive-chapter immersive-hero">
          <div className="immersive-hero-copy">
            <p>Studio IA · automatisation · expériences numériques</p>
            <h1>Nous créons des récits numériques<br />et des expériences interactives<br />qui rendent les marques inoubliables.</h1>
          </div>
          <div ref={heroVisualRef} className="immersive-hero-visual" data-cursor="Explorer">
            <MotionVideo src="/media/films/station-lab.mp4" priority />
            <div className="immersive-hero-prism" aria-hidden="true"><i /><i /><i /></div>
            <span className="immersive-media-label">NOVATRIX / WORLD 01</span>
            <div className="immersive-cross-grid" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
          </div>
          <div className="immersive-scroll-hint"><i>+</i><i>+</i><p>Faites défiler pour explorer</p><i>+</i><i>+</i></div>
        </div>

        <div ref={reelRef} className="immersive-chapter immersive-reel-scene">
          <div className="immersive-reel-heading">
            <h2><span>Idées fortes,</span><span>rendues vivantes.</span></h2>
            <p>Stratégie, intelligence artificielle, produit, motion et développement réunis dans une même expérience.</p>
          </div>
          <div ref={reelFrameRef} className="immersive-reel-frame" data-cursor="Voir le film">
            <MotionVideo src="/media/films/kinetic-reel.mp4" lazy />
            <div className="immersive-reel-glass" />
            <p>PLAY <span>▶</span> REEL</p>
          </div>
        </div>

        <div ref={projectsRef} className="immersive-chapter immersive-projects-scene">
          <div ref={projectsTrackRef} className="immersive-projects-track">
            <header>
              <div className="immersive-projects-meta"><p>Projets sélectionnés</p><Link href="/realisations">Tous les projets <span>↗</span></Link></div>
              <h2 ref={projectsHeadingRef}>Projets<br /><span>phares.</span></h2>
            </header>
            <div className="immersive-project-grid">
              {projectGallery.slice(0, 8).map((project, index) => (
                <Link ref={(element) => { projectCardsRef.current[index] = element }} key={project.slug} href={project.href ?? `/realisations#${project.slug}`} className="immersive-project-card" data-cursor="Découvrir">
                  <div className="immersive-project-media"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:760px) 88vw,46vw" /><span>↗</span></div>
                  <p>{project.category} · {String(index + 1).padStart(2, '0')}</p>
                  <h3>{project.previewTitle ?? project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div ref={manifestoRef} className="immersive-chapter immersive-manifesto">
          <svg viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true"><path d="M-70 610 C250 700 270 80 620 210 S930 650 1510 180" /></svg>
          <h2 ref={manifestoTitleRef}>Là où les idées<br />deviennent des<br /><em>expériences.</em></h2>
          <div className="immersive-manifesto-aside"><span>Notre approche</span><p>La technologie disparaît derrière l’évidence du geste, la précision du système et la force de l’émotion.</p></div>
        </div>

        <div ref={astronautSceneRef} className="immersive-chapter immersive-astronaut-scene">
          <div className="immersive-space-dust" aria-hidden="true">{Array.from({ length: 54 }, (_, index) => <i key={index} style={{ '--dust-index': index, top: `${(index * 61) % 97}%`, left: `${(index * 43) % 101}%`, width: `${1 + index % 3}px`, opacity: .12 + (index % 5) * .08 } as CSSProperties} />)}</div>
          <p>Une idée prend vie lorsqu’on lui donne un monde.</p>
          <h2 ref={astronautWordmarkRef} className="immersive-astronaut-wordmark"><span>AU-DELÀ DU</span><span>POSSIBLE</span></h2>
          <div ref={astronautRef} className="immersive-astronaut-cutout"><Image src="/media/brand/novatrix-astronaut-cutout.png" alt="" fill sizes="50vw" priority /></div>
        </div>

        <div ref={tunnelRef} className="immersive-chapter immersive-tunnel-scene">
          <ImmersiveWorldCanvas progressRef={progressRef} />
          <div className="immersive-world-frames" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ '--frame-index': index } as CSSProperties} />)}</div>
          <div ref={worldPanelsRef} className="immersive-world-panels" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
          <div ref={worldOrbsRef} className="immersive-world-orbs" aria-hidden="true">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
          <div ref={worldSheetsRef} className="immersive-world-sheets" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
          <p ref={tunnelKickerRef} className="immersive-world-kicker">NOVATRIX LAB / EXPÉRIENCE 01</p>
          <div ref={tunnelAstronautRef} className="immersive-tunnel-astronaut"><Image src="/media/brand/novatrix-astronaut-cutout.png" alt="" fill sizes="22vw" /></div>
          <h2 ref={tunnelTitleRef}>AU-DELÀ<br />DU POSSIBLE</h2>
        </div>

        <div ref={mosaicRef} className="immersive-chapter immersive-mosaic-scene">
          <div ref={mosaicTrackRef} className="immersive-mosaic-track">
            {mosaicMedia.map((media, index) => (
              <div ref={(element) => { mosaicTilesRef.current[index] = element }} key={media.src} className={`immersive-mosaic-tile immersive-mosaic-tile-${index + 1}`} data-video-index={index} tabIndex={0} aria-label={`${media.label}, activer cette vidéo`} data-cursor="Écouter" onPointerEnter={() => selectMosaicVideo(index)} onFocus={() => selectMosaicVideo(index)} onClick={() => selectMosaicVideo(index)}>
                <MotionVideo src={media.src} lazy />
                <span>{String(index + 1).padStart(2, '0')} / {media.label}</span>
              </div>
            ))}
            <div className="immersive-mosaic-astronaut"><Image src="/media/brand/novatrix-astronaut-cutout.png" alt="" fill sizes="34vw" /></div>
          </div>
          <p>De la stratégie à l’image, du système à l’émotion.</p>
          <div ref={collaborationRef} className="immersive-collaboration">
            <p>Un nouveau monde commence par une conversation.</p>
            <h2>Travaillons<br /><em>ensemble !</em></h2>
            <Link href="/contact">Démarrer un projet <span>↗</span></Link>
            <div aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--collab-index': index, '--collab-x': `${(index * 37) % 97}%`, '--collab-y': `${18 + (index * 53) % 76}%` } as CSSProperties} />)}
            </div>
          </div>
        </div>

        <div ref={endRef} className="immersive-chapter immersive-end">
          <div className="immersive-end-main">
            <p>Un projet ambitieux en tête ?</p>
            <h2>Parlons de<br />votre projet.</h2>
            <Link href="/contact">Démarrer une conversation <span>↗</span></Link>
            <div className="immersive-end-meta"><p><span>Nouveau projet</span>contact@novatrix.fr</p><p><span>Studio</span>Cotonou · Paris · À distance</p><p><span>Disponibilité</span>Ouvert aux projets 2026</p></div>
          </div>
          <div className="immersive-end-next"><small>Continuez l’expérience</small><Link href="/a-propos">À propos <strong>→</strong></Link><div>{Array.from({ length: 5 }, (_, index) => <i key={index}>+</i>)}</div></div>
        </div>

        <div className="immersive-stage-ui" aria-hidden="true"><span ref={progressLabelRef}>01</span><div><span ref={progressLineRef} /></div><p>SCROLL TO EXPLORE</p></div>
      </div>
    </section>
  )
}
