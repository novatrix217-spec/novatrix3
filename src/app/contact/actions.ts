'use server'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'message' | 'consent', string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Traitement du formulaire de contact — STUB DOCUMENTÉ, À BRANCHER (cf. brief, livrable
 * Phase 1 point 5 : "le vrai traitement serveur peut être un stub clair documenté 'à
 * brancher' si Sanity/API n'est pas encore prêt").
 *
 * Ce que fait cette version :
 * - valide les champs côté serveur (ne fait jamais confiance au seul client) ;
 * - rejette les soumissions de bot (champ honeypot `company_website`) ;
 * - journalise la demande côté serveur (console) sans donnée sensible superflue.
 *
 * Ce qu'il reste à brancher avant mise en production (Phase 2+) :
 * - persistance réelle (Sanity dataset "leads", ou base de données dédiée) ;
 * - notification (email transactionnel ou webhook CRM) ;
 * - protection anti-spam supplémentaire (rate limiting / captcha) si le volume l'exige.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot anti-bot : champ caché que seuls les robots remplissent.
  if (formData.get('company_website')) {
    return { status: 'success', message: 'Votre demande a bien été reçue.' }
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const consent = formData.get('consent') === 'on'

  const fieldErrors: ContactFormState['fieldErrors'] = {}
  if (!name) fieldErrors.name = 'Merci d’indiquer votre nom.'
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = 'Adresse email invalide.'
  if (!message || message.length < 10) fieldErrors.message = 'Merci de décrire votre besoin (10 caractères minimum).'
  if (!consent) fieldErrors.consent = 'Le consentement RGPD est requis pour vous recontacter.'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Merci de corriger les champs indiqués ci-dessous.', fieldErrors }
  }

  // Journalisation minimale côté serveur — aucune donnée sensible au-delà de ce qui est
  // strictement nécessaire pour un lead, pas de log de champs libres non tronqués.
  console.info('[contact] nouvelle demande reçue', {
    name,
    email,
    messageLength: message.length,
    receivedAt: new Date().toISOString(),
  })

  // TODO(Phase 2+) : persister ce lead (Sanity/API) et déclencher une notification réelle.

  return {
    status: 'success',
    message: 'Merci ! Votre demande est bien reçue, nous vous recontactons rapidement.',
  }
}
