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

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (vUv - 0.5) * aspect;
  float travel = smoothstep(0.61, 0.86, uProgress);
  float t = uTime * 0.24 + travel * 31.0;
  vec2 pointer = (uMouse - 0.5) * vec2(0.24, -0.16);
  p += pointer * (0.35 + travel * 0.65);
  p *= rotate2d(sin(t * 0.11) * 0.12 + travel * 0.16);

  float radius = max(length(p), 0.018);
  float angle = atan(p.y, p.x);
  float depth = 0.285 / radius + t;
  float spiral = angle / (2.0 * PI) + depth * 0.055 + sin(depth * 0.42) * 0.025;

  float ringDistance = abs(fract(depth * 1.18) - 0.5);
  float ring = exp(-ringDistance * 22.0);
  float fineRing = exp(-abs(fract(depth * 3.6) - 0.5) * 48.0);
  float spoke = pow(1.0 - abs(sin(spiral * PI * 9.0)), 19.0);
  float ribbon = pow(1.0 - abs(sin(spiral * PI * 3.0 + sin(depth * 0.7))), 10.0);
  float cellNoise = noise(vec2(floor(depth * 1.7), floor(spiral * 27.0)));
  float shard = step(0.79, cellNoise) * ring * smoothstep(0.08, 0.38, radius);
  float core = 0.018 / radius;

  vec3 copper = vec3(0.88, 0.42, 0.14);
  vec3 magenta = vec3(1.0, 0.10, 0.58);
  vec3 cyan = vec3(0.04, 0.88, 1.0);
  vec3 electricBlue = vec3(0.16, 0.30, 1.0);
  vec3 acid = vec3(0.76, 1.0, 0.0);
  vec3 paletteA = mix(copper, magenta, smoothstep(0.08, 0.36, travel));
  paletteA = mix(paletteA, electricBlue, smoothstep(0.42, 0.68, travel));
  paletteA = mix(paletteA, acid, smoothstep(0.72, 0.96, travel));
  vec3 paletteB = mix(vec3(1.0, 0.74, 0.34), cyan, smoothstep(0.2, 0.48, travel));
  paletteB = mix(paletteB, vec3(0.74, 0.27, 1.0), smoothstep(0.5, 0.74, travel));
  paletteB = mix(paletteB, vec3(0.82, 1.0, 0.54), smoothstep(0.78, 1.0, travel));

  float redFringe = exp(-abs(fract((depth + radius * 0.18) * 1.18) - 0.5) * 22.0);
  float blueFringe = exp(-abs(fract((depth - radius * 0.18) * 1.18) - 0.5) * 22.0);
  vec3 chroma = vec3(redFringe, ring, blueFringe) * (0.12 + travel * 0.22);
  vec3 color = vec3(0.003, 0.004, 0.009);
  color += paletteA * ring * (0.12 + spoke * 1.18);
  color += paletteB * ribbon * (0.08 + ring * 0.72);
  color += mix(cyan, vec3(1.0), travel) * fineRing * 0.22;
  color += paletteB * shard * 1.4;
  color += chroma;
  color += mix(paletteA, vec3(0.9, 0.98, 1.0), travel) * core * (0.12 + travel * 0.32);
  color *= 0.68 + noise(p * 5.0 + t * 0.06) * 0.5;

  float vignette = smoothstep(1.08, 0.08, length((vUv - 0.5) * vec2(1.12, 1.0)));
  color *= 0.28 + vignette;
  color = pow(color, vec3(0.88));
  gl_FragColor = vec4(color, 1.0);
}
`

type ImmersiveWorldCanvasProps = {
  progressRef: RefObject<number>
  className?: string
}

export function ImmersiveWorldCanvas({ progressRef, className = '' }: ImmersiveWorldCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const host = hostRef.current
    if (!host) return

    const probe = document.createElement('canvas')
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return

    let destroyed = false
    let frame = 0
    let cleanup: (() => void) | undefined

    void (async () => {
      try {
        const { Mesh, Program, Renderer, Triangle } = await import('ogl')
        if (destroyed) return

        const renderer = new Renderer({
          alpha: false,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, window.innerWidth <= 900 ? 1 : 1.25),
        })
        const gl = renderer.gl
        gl.clearColor(0.004, 0.004, 0.012, 1)
        gl.canvas.className = 'immersive-world-canvas-element'
        host.appendChild(gl.canvas)

        const geometry = new Triangle(gl)
        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uMouse: { value: [0.5, 0.5] },
            uResolution: { value: [1, 1] },
          },
        })
        const mesh = new Mesh(gl, { geometry, program })
        const targetMouse = [0.5, 0.5]
        const currentMouse = [0.5, 0.5]
        let active = (progressRef.current ?? 0) >= 0.59 && (progressRef.current ?? 0) <= 0.88

        const resize = () => {
          const width = host.clientWidth
          const height = host.clientHeight
          if (!width || !height) return
          renderer.setSize(width, height)
          program.uniforms.uResolution.value = [width, height]
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
          if (destroyed || !active || document.hidden) {
            frame = 0
            return
          }
          currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.045
          currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.045
          program.uniforms.uTime.value = (now - started) / 1000
          program.uniforms.uProgress.value = progressRef.current ?? 0
          program.uniforms.uMouse.value = currentMouse
          renderer.render({ scene: mesh })
          frame = requestAnimationFrame(render)
        }
        const activityChange = (event: Event) => {
          const detail = (event as CustomEvent<{ active?: boolean }>).detail
          active = Boolean(detail?.active)
          if (!active && frame) {
            cancelAnimationFrame(frame)
            frame = 0
          } else if (active && !frame && !document.hidden) {
            frame = requestAnimationFrame(render)
          }
        }
        const visibilityChange = () => {
          if (document.hidden && frame) {
            cancelAnimationFrame(frame)
            frame = 0
          } else if (!document.hidden && active && !frame) {
            frame = requestAnimationFrame(render)
          }
        }
        window.addEventListener('novatrix:world-activity', activityChange)
        document.addEventListener('visibilitychange', visibilityChange)
        if (active) frame = requestAnimationFrame(render)

        cleanup = () => {
          observer.disconnect()
          window.removeEventListener('pointermove', pointerMove)
          window.removeEventListener('novatrix:world-activity', activityChange)
          document.removeEventListener('visibilitychange', visibilityChange)
          gl.canvas.remove()
          gl.getExtension('WEBGL_lose_context')?.loseContext()
        }
      } catch {
        // Le fond CSS du monde reste utilisable si WebGL est indisponible.
      }
    })()

    return () => {
      destroyed = true
      cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [progressRef])

  return <div ref={hostRef} className={`immersive-world-canvas ${className}`} aria-hidden="true" />
}
