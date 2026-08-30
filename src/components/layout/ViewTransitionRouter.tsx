'use client'

import { startTransition, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const routes = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Expertises' },
  { path: '/realisations', label: 'Projets' },
  { path: '/a-propos', label: 'À propos' },
  { path: '/contact', label: 'Contact' },
] as const

function getRouteMeta(pathname: string) {
  const index = Math.max(0, routes.findIndex((route) => route.path === pathname))
  return {
    index: String(index + 1).padStart(2, '0'),
    label: routes[index]?.label ?? 'Novatrix',
    total: String(routes.length).padStart(2, '0'),
  }
}

export function ViewTransitionRouter() {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [destination, setDestination] = useState(() => getRouteMeta(pathname))
  const pendingPath = useRef<string | null>(null)
  const phaseRef = useRef<'idle' | 'cover' | 'reveal'>('idle')
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (!pendingPath.current || pendingPath.current !== pathname) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    pendingPath.current = null
    phaseRef.current = 'reveal'
    setPhase('reveal')
    timers.current.push(window.setTimeout(() => {
      phaseRef.current = 'idle'
      setPhase('idle')
    }, 820))
  }, [pathname])

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
    }

    function handleClick(event: MouseEvent) {
      if (
        phaseRef.current !== 'idle' ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return

      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download')) return
      if (anchor.target && anchor.target !== '_self') return

      let url: URL
      try { url = new URL(anchor.href, window.location.href) } catch { return }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      event.preventDefault()
      clearTimers()
      pendingPath.current = url.pathname
      setDestination(getRouteMeta(url.pathname))
      phaseRef.current = 'cover'
      setPhase('cover')

      timers.current.push(window.setTimeout(() => {
        startTransition(() => router.push(`${url.pathname}${url.search}${url.hash}`))
      }, 520))
      timers.current.push(window.setTimeout(() => {
        if (!pendingPath.current) return
        pendingPath.current = null
        phaseRef.current = 'reveal'
        setPhase('reveal')
        timers.current.push(window.setTimeout(() => {
          phaseRef.current = 'idle'
          setPhase('idle')
        }, 820))
      }, 4200))
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      clearTimers()
    }
  }, [router])

  return (
    <div className="route-transition" data-phase={phase} aria-hidden="true">
      <div className="route-transition-grid" />
      <p className="route-transition-mark">NOVATRIX® / DIGITAL STUDIO</p>
      <p className="route-transition-index"><span>{destination.index}</span> / {destination.total}</p>
      <div className="route-transition-title">
        <span>{destination.label}</span>
        <span>{destination.label}</span>
      </div>
      <div className="route-transition-track"><span /></div>
      <p className="route-transition-status">Chargement de la prochaine scène</p>
    </div>
  )
}
