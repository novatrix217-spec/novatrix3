'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties, PointerEvent } from 'react'
import type { ProjectPreviewItem } from '@/lib/content/types'

type PreviewStyle = CSSProperties & {
  '--pointer-x'?: string
  '--pointer-y'?: string
  '--preview-x'?: string
  '--preview-y'?: string
  '--tilt-x'?: string
  '--tilt-y'?: string
}

export function ProjectPreview({ project, index }: { project: ProjectPreviewItem; index: number }) {
  function updatePointer(event: PointerEvent<HTMLAnchorElement>) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const style = event.currentTarget.style
    style.setProperty('--pointer-x', `${x * 100}%`)
    style.setProperty('--pointer-y', `${y * 100}%`)
    style.setProperty('--preview-x', `${(x - 0.5) * 8}px`)
    style.setProperty('--preview-y', `${(y - 0.5) * 8}px`)
    style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`)
    style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`)
  }

  function resetPointer(event: PointerEvent<HTMLAnchorElement>) {
    const style = event.currentTarget.style
    style.setProperty('--preview-x', '0px')
    style.setProperty('--preview-y', '0px')
    style.setProperty('--tilt-x', '0deg')
    style.setProperty('--tilt-y', '0deg')
  }

  const style: PreviewStyle = {
    '--pointer-x': '50%',
    '--pointer-y': '50%',
    '--preview-x': '0px',
    '--preview-y': '0px',
    '--tilt-x': '0deg',
    '--tilt-y': '0deg',
  }

  return (
    <Link
      href={project.href ?? `/realisations#${project.slug}`}
      className="project-preview group"
      style={style}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      data-cursor="Voir"
    >
      <div className="project-preview-media">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="project-preview-image"
        />
        <span className="project-preview-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="project-preview-footer">
        <p>{project.category} · Projet {String(index + 1).padStart(2, '0')}</p>
        <h3><span aria-hidden="true">→</span>{project.previewTitle ?? project.title}</h3>
      </div>
    </Link>
  )
}
