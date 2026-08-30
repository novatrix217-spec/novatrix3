import type { Metadata } from 'next'
import { LusionProjectsExperience } from '@/components/experience/LusionProjectsExperience'

export const metadata: Metadata = {
  title: 'Réalisations',
  description: 'Découvrez les systèmes, produits IA, automatisations et expériences numériques conçus par NovatrixAI.',
}

export default function RealisationsPage() {
  return <LusionProjectsExperience />
}
