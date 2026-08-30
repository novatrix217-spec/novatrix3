'use client'

import { useEffect, useRef, useState } from 'react'

export function ExperienceLayer() {
  const [loader, setLoader] = useState<'loading' | 'leaving' | 'hidden'>('loading')
  const [progress, setProgress] = useState(0)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.documentElement.classList.add('experience-ready')
      return
    }

    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / 1250)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))
      if (elapsed < 1) frame = requestAnimationFrame(tick)
      else {
        setLoader('leaving')
        document.documentElement.classList.add('experience-ready')
        window.setTimeout(() => setLoader('hidden'), 720)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame = 0
    let magneticTarget: HTMLElement | null = null

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
      const nextMagnetic = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnetic]') : null
      if (magneticTarget && magneticTarget !== nextMagnetic) magneticTarget.style.transform = ''
      magneticTarget = nextMagnetic
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect()
        const offsetX = (event.clientX - rect.left - rect.width / 2) * .14
        const offsetY = (event.clientY - rect.top - rect.height / 2) * .18
        magneticTarget.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
      }
    }
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null
      const cursor = cursorRef.current
      const label = cursorLabelRef.current
      if (!cursor || !label) return
      const text = target?.dataset.cursor ?? ''
      cursor.dataset.active = text ? 'true' : 'false'
      label.textContent = text
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${value})`
    }
    const animate = () => {
      currentX += (targetX - currentX) * .16
      currentY += (targetY - currentY) * .16
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    frame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('scroll', onScroll)
      if (magneticTarget) magneticTarget.style.transform = ''
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {loader !== 'hidden' ? (
        <div className="experience-loader" data-leaving={loader === 'leaving'} aria-hidden="true">
          <div className="experience-loader-mark">NOVATRIX</div>
          <div className="experience-loader-count">{String(progress).padStart(3, '0')}</div>
          <div className="experience-loader-line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        </div>
      ) : null}
      <div ref={cursorRef} className="experience-cursor" aria-hidden="true"><span ref={cursorLabelRef} /></div>
      <div className="experience-scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
    </>
  )
}
