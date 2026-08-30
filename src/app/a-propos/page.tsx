import type { Metadata } from 'next'
import { LusionAboutExperience } from '@/components/experience/LusionAboutExperience'
import { siteConfig } from '@/lib/content/site'

export const metadata: Metadata = {
  title: 'À propos',
  description: siteConfig.description,
}

export default function AProposPage() {
  return <LusionAboutExperience />
}
