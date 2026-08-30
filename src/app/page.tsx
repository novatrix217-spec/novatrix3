import type { Metadata } from 'next'
import { LusionHomeExperience } from '@/components/experience/LusionHomeExperience'
import { siteConfig } from '@/lib/content/site'

export const metadata: Metadata = {
  title: 'Accueil',
  description: siteConfig.description,
}

export default function HomePage() {
  return <LusionHomeExperience />
}
