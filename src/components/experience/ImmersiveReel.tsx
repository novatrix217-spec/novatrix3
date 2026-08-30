'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { MotionVideo } from '@/components/media/MotionVideo'
import { Container } from '@/components/ui/Container'

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

export function ImmersiveReel() {
  const pinRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const pin = pinRef.current
      if (!pin) return
      const rect = pin.getBoundingClientRect()
      const distance = Math.max(1, pin.offsetHeight - window.innerHeight)
      const progress = clamp(-rect.top / distance)
      const expand = clamp((progress - .04) / .56)
      const eased = 1 - Math.pow(1 - expand, 3)
      const scale = .5 + eased * .5
      const y = (1 - eased) * 14
      if (mediaRef.current) {
        mediaRef.current.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`
        mediaRef.current.style.borderRadius = `${Math.max(0, 20 * (1 - eased))}px`
      }
      if (captionRef.current) {
        const enter = clamp((progress - .7) / .16)
        captionRef.current.style.opacity = String(enter)
        captionRef.current.style.transform = `translate3d(0, ${(1 - enter) * 36}px, 0)`
      }
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="showreel" className="immersive-reel" aria-labelledby="reel-title">
      <Container className="immersive-reel-intro">
        <h2 id="reel-title" className="immersive-reel-title">
          <span>Idées fortes,</span><span>rendues vivantes.</span>
        </h2>
        <div className="immersive-reel-intro-copy">
          <p>Nous combinons design, IA, automatisation et développement pour créer des expériences visuellement fortes et techniquement fluides.</p>
          <Link href="/a-propos"><i aria-hidden="true" /> Notre approche</Link>
        </div>
        <div className="immersive-reel-thumb" aria-hidden="true">
          <Image src="/media/projects/jeefox.webp" alt="" fill sizes="45vw" />
        </div>
      </Container>

      <div ref={pinRef} className="immersive-reel-pin">
        <div className="immersive-reel-sticky">
          <div ref={mediaRef} className="immersive-reel-media" data-cursor="Voir le reel">
            <MotionVideo src="/media/films/kinetic-reel.mp4" />
            <div className="immersive-reel-grid" aria-hidden="true" />
            <div className="immersive-reel-play" aria-hidden="true">PLAY REEL</div>
          </div>
          <div ref={captionRef} className="immersive-reel-copy">
            <p>Concevoir des systèmes utiles, puis leur donner une présence impossible à ignorer.</p>
            <span>Novatrix / Showreel 2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}
