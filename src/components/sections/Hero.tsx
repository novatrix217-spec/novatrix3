import { Container } from '@/components/ui/Container'
import { MotionVideo } from '@/components/media/MotionVideo'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  return (
    <section className="lusion-hero" aria-labelledby="home-title">
      <Container className="lusion-hero-layout">
        <div className="lusion-hero-intro">
          <h1 id="home-title">
            Nous créons des systèmes IA et des expériences web interactives qui font avancer les entreprises.
          </h1>
          <p>IA · AUTOMATISATION · PRODUITS WEB</p>
        </div>

        <div className="lusion-hero-visual" data-cursor="Découvrir">
          <MotionVideo src="/media/films/station-lab.mp4" priority />
          <HeroBackground />
          <div className="hero-visual-crosses" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>

        <div className="lusion-scroll-rail" aria-hidden="true">
          <span /><span /><span /><span />
          <p>Faites défiler pour explorer</p>
        </div>
      </Container>
    </section>
  )
}
