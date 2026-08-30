import type { Metadata } from 'next'
import { LusionServicesExperience } from '@/components/experience/LusionServicesExperience'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Chatbots IA, automatisation Make/Zapier/n8n, applications SaaS IA, agents IA administratifs et sites WordPress — les services de NovatrixAI.',
}

export default function ServicesPage() {
  return <LusionServicesExperience />
}
