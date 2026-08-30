'use client'

import { useEffect, useRef } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

type MotionVideoProps = {
  src: string
  className?: string
  portrait?: boolean
  priority?: boolean
  lazy?: boolean
}

export function MotionVideo({ src, className = '', portrait = false, priority = false, lazy = false }: MotionVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const media = window.matchMedia(QUERY)

    const syncPlayback = () => {
      if (media.matches) video.pause()
      else if (!lazy) void video.play().catch(() => undefined)
    }
    syncPlayback()
    media.addEventListener('change', syncPlayback)
    return () => media.removeEventListener('change', syncPlayback)
  }, [lazy])

  return (
    <video
      ref={ref}
      className={`motion-video ${className}`}
      src={src}
      autoPlay={!lazy}
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      aria-hidden="true"
      tabIndex={-1}
      data-orientation={portrait ? 'portrait' : 'landscape'}
      data-audio-capable="true"
    />
  )
}
