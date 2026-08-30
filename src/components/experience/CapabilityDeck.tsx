'use client'

import { useEffect, useRef } from 'react'
import { services } from '@/lib/content/services'

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

export function CapabilityDeck() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<Array<HTMLElement | null>>([])

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
      const center = (cardsRef.current.length - 1) / 2
      const spreadSize = Math.min(window.innerWidth * .125, 175)
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        const spread = index - center
        const arrival = clamp(progress * 1.45 - index * .055)
        const exit = clamp((progress - .66 - index * .018) / .24)
        const x = spread * spreadSize * (1 - arrival) + spread * 28 * arrival
        const y = Math.abs(spread) * 26 * (1 - arrival) - exit * (180 + index * 24)
        const rotation = spread * 8 * (1 - arrival) + spread * -2 * arrival + exit * (index % 2 ? 18 : -18)
        const scale = .72 + arrival * .28 + exit * .18
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${index * 10}px) rotate(${rotation}deg) scale(${scale})`
        card.style.opacity = String(1 - exit)
      })
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
    <section ref={sectionRef} className="capability-deck" aria-labelledby="capability-deck-title">
      <div className="capability-deck-sticky">
        <p className="capability-deck-kicker">NOVATRIX / CAPACITÉS</p>
        <h2 id="capability-deck-title">Une équipe.<br />Plusieurs champs<br />d’action.</h2>
        <div className="capability-deck-cards">
          {services.slice(0, 6).map((service, index) => (
            <article
              key={service.slug}
              ref={(element) => { cardsRef.current[index] = element }}
              className="capability-card"
              data-active={index === 0}
            >
              <div className="capability-card-top"><span>{String(index + 1).padStart(2, '0')}</span><span>✦</span></div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="capability-deck-scroll">Continuez à défiler ↓</p>
      </div>
    </section>
  )
}
