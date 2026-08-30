'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform vec2 uResolution;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float pointField(vec2 p, float scale, float size, float seed) {
  vec2 grid = p * scale;
  vec2 cell = floor(grid);
  vec2 local = fract(grid) - 0.5;
  vec2 offset = vec2(hash(cell + seed), hash(cell + seed + 7.7)) - 0.5;
  return smoothstep(size, 0.0, length(local - offset * 0.62)) * step(0.56, hash(cell + seed * 2.1));
}
void main() {
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (vUv - 0.5) * aspect;
  p += (uMouse - 0.5) * vec2(0.055, -0.035);
  float t = uTime * 0.055 + uProgress * 1.8;
  float horizon = -0.09 + sin(p.x * 2.0 + t) * 0.035 + sin(p.x * 5.1 - t * 1.2) * 0.018;
  float ground = smoothstep(horizon + 0.18, horizon - 0.02, p.y);
  float distanceFromHorizon = max(0.035, horizon - p.y + 0.035);
  vec2 terrainUv = vec2(p.x / distanceFromHorizon + t * 0.8, 0.17 / distanceFromHorizon + t * 0.35);
  float terrain = pointField(terrainUv, 2.2, 0.14, 1.0) + pointField(terrainUv + 2.7, 4.0, 0.12, 4.0) * 0.52;
  vec2 skyUv = p + vec2(t * 0.025, 0.0);
  float stars = pointField(skyUv, 18.0, 0.11, 8.0) + pointField(skyUv + 3.1, 31.0, 0.10, 13.0) * 0.58;
  float mist = exp(-abs(p.y - horizon) * 7.0) * (0.34 + 0.1 * sin(p.x * 9.0 + t));
  vec3 color = vec3(0.006, 0.008, 0.012);
  color += vec3(0.78, 0.90, 1.0) * stars * (1.0 - ground * 0.7);
  color += mix(vec3(0.25, 0.43, 0.62), vec3(0.82, 0.95, 1.0), terrain) * terrain * ground;
  color += vec3(0.14, 0.26, 0.43) * mist;
  color += vec3(0.26, 0.14, 0.58) * exp(-length(p - vec2(-0.2, 0.12)) * 4.0) * 0.16;
  color *= 0.42 + smoothstep(1.0, 0.18, length((vUv - 0.5) * vec2(1.1, 1.0)));
  gl_FragColor = vec4(color, 1.0);
}
`

export function AboutParticleCanvas({ progressRef }: { progressRef: RefObject<number> }) {
  const hostRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = hostRef.current
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const probe = document.createElement('canvas')
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return
    let destroyed = false
    let frame = 0
    let cleanup: (() => void) | undefined
    void (async () => {
      try {
        const { Mesh, Program, Renderer, Triangle } = await import('ogl')
        if (destroyed) return
        const renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.6) })
        const gl = renderer.gl
        gl.canvas.className = 'about-particle-canvas-element'
        host.appendChild(gl.canvas)
        const program = new Program(gl, { vertex: VERTEX, fragment: FRAGMENT, uniforms: {
          uTime: { value: 0 }, uProgress: { value: 0 }, uMouse: { value: [0.5, 0.5] }, uResolution: { value: [1, 1] },
        } })
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
        const targetMouse = [0.5, 0.5]
        const currentMouse = [0.5, 0.5]
        const resize = () => {
          if (!host.clientWidth || !host.clientHeight) return
          renderer.setSize(host.clientWidth, host.clientHeight)
          program.uniforms.uResolution.value = [host.clientWidth, host.clientHeight]
        }
        const pointerMove = (event: PointerEvent) => {
          targetMouse[0] = event.clientX / window.innerWidth
          targetMouse[1] = 1 - event.clientY / window.innerHeight
        }
        const observer = new ResizeObserver(resize)
        observer.observe(host)
        window.addEventListener('pointermove', pointerMove, { passive: true })
        resize()
        const started = performance.now()
        const render = (now: number) => {
          if (destroyed) return
          currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.045
          currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.045
          program.uniforms.uTime.value = (now - started) / 1000
          program.uniforms.uProgress.value = progressRef.current ?? 0
          program.uniforms.uMouse.value = currentMouse
          renderer.render({ scene: mesh })
          frame = requestAnimationFrame(render)
        }
        frame = requestAnimationFrame(render)
        cleanup = () => {
          observer.disconnect()
          window.removeEventListener('pointermove', pointerMove)
          gl.canvas.remove()
          gl.getExtension('WEBGL_lose_context')?.loseContext()
        }
      } catch { /* fallback CSS */ }
    })()
    return () => { destroyed = true; cancelAnimationFrame(frame); cleanup?.() }
  }, [progressRef])
  return <div ref={hostRef} className="about-particle-canvas" aria-hidden="true" />
}
