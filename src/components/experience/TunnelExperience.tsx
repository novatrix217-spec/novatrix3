'use client'

import { useEffect, useRef } from 'react'
import { MotionVideo } from '@/components/media/MotionVideo'

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

export function TunnelExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const framesRef = useRef<Array<HTMLDivElement | null>>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const distance = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = clamp(-rect.top / distance)
      framesRef.current.forEach((element, index) => {
        if (!element) return
        const z = -1500 + index * 150 + progress * 1850
        const rotation = index % 2 === 0 ? progress * 34 : -progress * 34
        element.style.transform = `translate3d(-50%, -50%, ${z}px) rotate(${rotation}deg)`
        element.style.opacity = String(clamp((z + 1500) / 500) * clamp((260 - z) / 280))
      })
      if (titleRef.current) {
        const enter = clamp((progress - .16) / .22)
        const leave = clamp((progress - .72) / .2)
        titleRef.current.style.opacity = String(enter * (1 - leave))
        titleRef.current.style.transform = `translate3d(-50%, ${40 - enter * 40 - leave * 80}px, 0) scale(${.82 + enter * .18 + leave * .24})`
      }
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${.45 + progress * 2.8})`
        orbRef.current.style.opacity = String(clamp((progress - .42) / .2) * (1 - clamp((progress - .88) / .1)))
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
    <section ref={sectionRef} id="novatrix-lab" className="tunnel-experience" aria-labelledby="tunnel-title">
      <div className="tunnel-sticky">
        <div className="tunnel-scene" aria-hidden="true">
          <MotionVideo src="/media/films/station-lab.mp4" />
          {Array.from({ length: 13 }, (_, index) => (
            <div key={index} ref={(element) => { framesRef.current[index] = element }} className="tunnel-frame" />
          ))}
          <div ref={orbRef} className="tunnel-orb" />
        </div>
        <p className="tunnel-kicker">NOVATRIX LAB / EXPÉRIENCE 01</p>
        <h2 ref={titleRef} id="tunnel-title" className="tunnel-title">
          Entrez dans<br />un nouveau champ<br /><em>des possibles.</em>
        </h2>
        <p className="tunnel-scroll" aria-hidden="true">Continuez à défiler ↓</p>
      </div>
    </section>
  )
}
