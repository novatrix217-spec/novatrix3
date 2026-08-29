'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Phase 4 — effet signature WebGL du hero, calque purement décoratif.
 *
 * Rappels des garde-fous non négociables (brief Phase 4, voir aussi Hero.tsx et
 * HeroBackground.tsx qui contrôlent le montage de ce module) :
 * - jamais monté côté serveur ni au premier rendu client (voir `next/dynamic({ ssr: false })`
 *   dans HeroBackground.tsx) — ce fichier ne s'exécute qu'après hydratation, quand
 *   `HeroBackground` a déjà vérifié `prefers-reduced-motion`.
 * - double vérification de `prefers-reduced-motion` ici (defense-in-depth : si ce composant
 *   est un jour réutilisé ailleurs sans passer par `HeroBackground`, il refusera quand même de
 *   s'initialiser plutôt que d'animer par erreur).
 * - aucun texte, aucun contenu informatif : un unique `<canvas>` `aria-hidden`,
 *   `pointer-events: none`, qui ne fait jamais concurrence au H1/CTA du HTML brut.
 * - fallback strictement silencieux si WebGL est indisponible ou si l'init échoue pour
 *   n'importe quelle raison : le dégradé CSS du parent (`Hero.tsx`) reste seul visible, aucune
 *   erreur visible, aucune exception non interceptée.
 */

const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Palette hero strictement réservée (globals.css : --hero-bg / --hero-grad-start /
// --hero-grad-end), aucune autre couleur introduite ici.
const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

const vec3 cBg = vec3(0.1098, 0.0, 0.2118);     // #1C0038
const vec3 cStart = vec3(0.4275, 0.1569, 0.851); // #6D28D9
const vec3 cEnd = vec3(0.7529, 0.1490, 0.8275);  // #C026D3

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 aspect = uResolution.x > uResolution.y
    ? vec2(uResolution.x / uResolution.y, 1.0)
    : vec2(1.0, uResolution.y / uResolution.x);
  vec2 p = (vUv - 0.5) * aspect;
  vec2 mouse = (uMouse - 0.5) * aspect;

  float t = uTime * 0.05;
  float n = noise(p * 1.6 + t);

  float dist = length(p - mouse);
  float glow = exp(-dist * 3.2) * 0.55;

  vec2 warped = p + (p - mouse) * glow * 0.35;
  float mixVal = clamp(length(warped) * 0.9 + n * 0.35, 0.0, 1.0);

  vec3 color = mix(cStart, cEnd, mixVal);
  color = mix(cBg, color, 0.75 + n * 0.25);
  color += glow * 0.4 * cEnd;

  gl_FragColor = vec4(color, 1.0);
}
`

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Double garde T2 (voir commentaire d'en-tête) : n'initialise rien en reduced-motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    if (!container) return

    // Détection WebGL manuelle avant toute chose : le Renderer OGL logue une erreur console
    // si `getContext` échoue pour les deux modes, ce qu'on veut éviter pour un fallback
    // réellement silencieux (contrainte 4 du brief).
    const probe = document.createElement('canvas')
    const supportsWebgl = !!(probe.getContext('webgl2') || probe.getContext('webgl'))
    if (!supportsWebgl) return

    let destroyed = false
    let raf = 0
    let cleanup: (() => void) | undefined
    let announcedReady = false

    void (async () => {
      try {
        const { Renderer, Triangle, Program, Mesh } = await import('ogl')
        if (destroyed) return

        const renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 2),
          alpha: false,
          antialias: false,
        })
        const gl = renderer.gl
        gl.clearColor(0.1098, 0.0, 0.2118, 1)
        gl.canvas.style.display = 'block'
        gl.canvas.style.width = '100%'
        gl.canvas.style.height = '100%'

        const geometry = new Triangle(gl)
        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: [0.5, 0.4] },
            uResolution: { value: [1, 1] },
          },
        })
        const mesh = new Mesh(gl, { geometry, program })

        const resize = () => {
          const { clientWidth, clientHeight } = container
          if (clientWidth === 0 || clientHeight === 0) return
          renderer.setSize(clientWidth, clientHeight)
          program.uniforms.uResolution.value = [clientWidth, clientHeight]
        }
        resize()
        container.appendChild(gl.canvas)

        const targetMouse = [0.5, 0.4]
        const currentMouse = [0.5, 0.4]
        const onPointerMove = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) return
          targetMouse[0] = (event.clientX - rect.left) / rect.width
          targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('resize', resize)
        cleanup = () => {
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('resize', resize)
          const canvas = gl.canvas
          canvas.parentElement?.removeChild(canvas)
          gl.getExtension('WEBGL_lose_context')?.loseContext()
        }

        const start = performance.now()
        const loop = (now: number) => {
          if (destroyed) return
          currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.06
          currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.06
          program.uniforms.uTime.value = (now - start) / 1000
          program.uniforms.uMouse.value = currentMouse
          renderer.render({ scene: mesh })
          if (!announcedReady) {
            announcedReady = true
            setReady(true) // premier frame rendu -> transition d'opacité douce (contrainte 2)
          }
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      } catch {
        // Contexte/perte WebGL, échec de compilation shader, etc. : fallback silencieux,
        // le dégradé CSS statique du parent reste seul visible (contrainte 4 du brief).
      }
    })()

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 700ms ease-out' }}
    />
  )
}
