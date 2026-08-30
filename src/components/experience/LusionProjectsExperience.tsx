'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { projectGallery } from '@/lib/content/projects'

const clamp=(value:number)=>Math.max(0,Math.min(1,value))
function phase(progress:number,from:number,to:number){const value=clamp((progress-from)/Math.max(.0001,to-from));return value*value*(3-2*value)}
function setLayer(element:HTMLElement|null,opacity:number,transform='translate3d(0,0,0)'){if(!element)return;element.style.opacity=String(clamp(opacity));element.style.transform=transform;element.style.pointerEvents=opacity>.55?'auto':'none';element.inert=opacity<=.55}

export function LusionProjectsExperience(){
 const rootRef=useRef<HTMLElement>(null);const stageRef=useRef<HTMLDivElement>(null);const introRef=useRef<HTMLDivElement>(null);const introTitleRef=useRef<HTMLHeadingElement>(null);const gridRef=useRef<HTMLDivElement>(null);const gridTrackRef=useRef<HTMLDivElement>(null);const endRef=useRef<HTMLDivElement>(null);const progressRef=useRef<HTMLSpanElement>(null)
 useEffect(()=>{const root=rootRef.current;const stage=stageRef.current;if(!root||!stage)return;document.body.classList.add('projects-immersive-active');document.body.style.setProperty('--immersive-header-color','#080808');if(matchMedia('(prefers-reduced-motion:reduce)').matches){document.body.classList.add('projects-immersive-reduced');return()=>document.body.classList.remove('projects-immersive-active','projects-immersive-reduced')}
 let target=0,current=0,frame=0,previous=performance.now(),lastChapter=-1
 const measure=()=>{target=clamp(-root.getBoundingClientRect().top/Math.max(1,root.offsetHeight-innerHeight))}
 const render=(now:number)=>{const delta=Math.min(.5,Math.max(.001,(now-previous)/1000));previous=now;current+=(target-current)*(1-Math.exp(-13*delta));if(Math.abs(target-current)<.00005)current=target
  const introLeave=phase(current,.09,.18);setLayer(introRef.current,1-introLeave,`translate3d(${introLeave*-13}vw,${introLeave*-18}vh,0) rotate(${3.5-introLeave*8}deg) scale(${1+introLeave*.2})`);if(introTitleRef.current)introTitleRef.current.style.letterSpacing=`${-.075+introLeave*.03}em`
  const gridAlpha=phase(current,.1,.17)*(1-phase(current,.73,.8));setLayer(gridRef.current,gridAlpha);if(gridTrackRef.current)gridTrackRef.current.style.transform=`translate3d(0,${34-phase(current,.15,.76)*224}vh,0)`
  const endAlpha=phase(current,.76,.83);setLayer(endRef.current,endAlpha,`translate3d(0,${(1-endAlpha)*25}vh,0)`)
  const chapter=current<.15?1:current<.78?2:3;if(chapter!==lastChapter){lastChapter=chapter;stage.dataset.chapter=String(chapter);document.body.style.setProperty('--immersive-header-color',chapter===3?'#ffffff':'#080808')}
  if(progressRef.current)progressRef.current.style.transform=`scaleX(${current})`;frame=requestAnimationFrame(render)}
 addEventListener('scroll',measure,{passive:true});addEventListener('resize',measure);measure();frame=requestAnimationFrame(render);return()=>{removeEventListener('scroll',measure);removeEventListener('resize',measure);cancelAnimationFrame(frame);document.body.classList.remove('projects-immersive-active');document.body.style.removeProperty('--immersive-header-color')}} ,[])
 return <section ref={rootRef} className="projects-immersive" aria-label="Projets Novatrix"><div ref={stageRef} className="projects-immersive-stage" data-chapter="1">
  <div ref={introRef} className="projects-chapter projects-intro-scene"><p>Portfolio / sélection 2026</p><h1 ref={introTitleRef}>PROJETS</h1><div><strong>{String(projectGallery.length).padStart(2,'0')}</strong><span>↓</span></div><small>Faites défiler pour explorer</small></div>
  <div ref={gridRef} className="projects-chapter projects-grid-scene"><div ref={gridTrackRef} className="projects-grid-track"><header><p>Une sélection de systèmes, produits et expériences numériques conçus pour produire un résultat concret.</p><Link href="/contact">Votre projet <span>↗</span></Link></header><div className="projects-virtual-grid">{projectGallery.map((project,index)=><Link key={project.slug} href={project.href??'/contact'} className="projects-virtual-card" data-cursor="Découvrir"><div><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:760px) 88vw,46vw"/><span>↗</span><i aria-hidden="true"/></div><p>{project.category} · {String(index+1).padStart(2,'0')}</p><h2>{project.previewTitle??project.title}</h2></Link>)}</div></div></div>
  <div ref={endRef} className="projects-chapter projects-end-scene"><div className="projects-end-shapes" aria-hidden="true">{Array.from({length:36},(_,index)=><i key={index} style={{left:`${(index*41)%98}%`,top:`${10+(index*29)%78}%`,'--shape-index':index,'--shape-size':`${6+(index%5)*3}px`} as React.CSSProperties}/>)}</div><p>Le prochain projet peut commencer ici.</p><h2>Construisons<br/>la suite<span>.</span></h2><Link href="/contact">Parlons-en <span>↗</span></Link><div className="projects-next-page"><small>Continuez l’expérience</small><Link href="/a-propos">À propos <strong>→</strong></Link></div></div>
  <div className="projects-progress" aria-hidden="true"><span ref={progressRef}/></div>
 </div></section>
}
