import type { Metadata } from 'next'
import { LusionContactExperience } from '@/components/experience/LusionContactExperience'
import { siteConfig } from '@/lib/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactez ${siteConfig.name} par formulaire ou WhatsApp pour discuter de votre projet IA ou automatisation.`,
}

export default function ContactPage() {
  return <LusionContactExperience />
}
