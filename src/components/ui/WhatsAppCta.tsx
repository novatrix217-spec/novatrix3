import { siteConfig } from '@/lib/content/site'
import { ButtonLink } from './Button'

/**
 * CTA WhatsApp — conservé comme option secondaire rapide en complément du formulaire
 * de contact (brief, livrable Phase 1 point 5 : "ne supprime pas WhatsApp, ajoute-le
 * en option secondaire").
 */
export function WhatsAppCta({ className = '' }: { className?: string }) {
  return (
    <ButtonLink href={siteConfig.whatsappUrl} variant="secondary" external className={className}>
      Discuter sur WhatsApp
    </ButtonLink>
  )
}
