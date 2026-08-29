import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Kicker } from '@/components/ui/Kicker'
import { ProjectCaseStudyBlock } from '@/components/sections/ProjectCaseStudy'
import { projectCaseStudies } from '@/lib/content/projects'

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
          <Kicker>Portfolio</Kicker>
          <h1 className="text-h1 font-display mt-3 max-w-2xl font-bold text-text-primary">Nos réalisations</h1>
          <p className="text-body-lg mt-4 max-w-2xl text-text-secondary">
            Trois systèmes livrés en conditions réelles, présentés avec leur problème de
            départ, la solution mise en place et le résultat obtenu.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8">
            {projectCaseStudies.map((project) => (
              <div key={project.slug} id={project.slug} className="scroll-mt-24">
                <ProjectCaseStudyBlock project={project} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
