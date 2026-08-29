import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { RevealTitle } from '@/components/ui/RevealTitle'
import { ProjectCaseStudyBlock } from '@/components/sections/ProjectCaseStudy'
import { projectCaseStudies } from '@/lib/content/projects'
import { revealStyle } from '@/lib/reveal'

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    'Trois systèmes livrés par NovatrixAI, présentés en problème → solution → résultat : relance SMS des paniers abandonnés, moteur de recherche IA Jeefox et site vitrine WingoAI.',
}

export default function RealisationsPage() {
  return (
    <>
      <Section className="!pb-0">
        <Container>
          <div className="reveal" style={revealStyle(0, 8)}>
            <Kicker>Portfolio</Kicker>
          </div>
          <RevealTitle
            text="Nos réalisations"
            className="text-h1 font-display mt-3 max-w-2xl font-bold text-text-primary"
          />
          <p className="reveal text-body-lg mt-4 max-w-2xl text-text-secondary" style={revealStyle(80, 16)}>
            Trois systèmes livrés en conditions réelles, présentés avec leur problème de
            départ, la solution mise en place et le résultat obtenu.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8">
            {projectCaseStudies.map((project, index) => (
              <div key={project.slug} id={project.slug} className="scroll-mt-24">
                <ProjectCaseStudyBlock project={project} index={index} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
