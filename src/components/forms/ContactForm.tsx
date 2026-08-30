'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'

type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'message' | 'consent', string>>
}

const initialState: ContactFormState = { status: 'idle', message: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Formulaire de contact réel (brief, livrable Phase 1 point 5) : nom, email, message,
 * consentement RGPD a minima. Validation HTML5 côté client (required, type=email) +
 * revalidation JS côté client ci-dessous (mêmes règles, mêmes messages).
 *
 * Historique : ce formulaire utilisait une Server Action (`src/app/contact/actions.ts`,
 * `useActionState`). Converti en gestion 100% client (`onSubmit` + état local) pour
 * l'export statique (`output: 'export'` dans next.config.ts), qui ne supporte pas les
 * Server Actions. La Server Action a été retirée (fichier `actions.ts` supprimé) : son
 * contenu (validation + honeypot + messages) est repris ici à l'identique.
 *
 * Ce que fait cette version (inchangé fonctionnellement par rapport à la Server Action) :
 * - valide les champs (honeypot anti-bot inclus, mêmes règles, mêmes messages d'erreur) ;
 * - rejette silencieusement les soumissions de bot (champ honeypot `company_website`) ;
 * - journalise la demande (console.info) sans donnée sensible superflue.
 *
 * Ce qu'il reste à brancher avant mise en production (indépendamment du static export) :
 * - envoi réel de la donnée à un backend (email transactionnel, webhook CRM, ou API dédiée
 *   — nécessairement un service externe puisque l'export statique n'a plus de serveur
 *   Next.js pour traiter la requête) ;
 * - persistance réelle (Sanity dataset "leads", ou base de données dédiée) ;
 * - protection anti-spam supplémentaire (rate limiting / captcha) si le volume l'exige.
 *
 * Ceci reste un STUB documenté : aucune donnée n'est réellement transmise ni persistée.
 */
export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState)
  const [pending, setPending] = useState(false)
  const feedbackRef = useRef<HTMLParagraphElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setPending(true)

    if (!navigator.onLine) {
      setState({ status: 'error', message: 'Vous semblez être hors ligne. Contactez-nous par WhatsApp ou réessayez une fois connecté.' })
      setPending(false)
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }

    // Honeypot anti-bot : champ caché que seuls les robots remplissent.
    if (formData.get('company_website')) {
      setState({ status: 'success', message: 'Votre demande a bien été reçue.' })
      setPending(false)
      return
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
      setState({ status: 'error', message: 'Merci de corriger les champs indiqués ci-dessous.', fieldErrors })
      setPending(false)
      requestAnimationFrame(() => feedbackRef.current?.focus())
      return
    }

    // Journalisation minimale côté client (dev uniquement) — aucune donnée sensible au-delà
    // de ce qui est strictement nécessaire pour un lead, pas de log de champs libres non
    // tronqués. TODO : remplacer par un envoi réel (email/CRM/webhook), cf. commentaire ci-dessus.
    console.info('[contact] nouvelle demande (stub, non persistée)', {
      name,
      email,
      messageLength: message.length,
      receivedAt: new Date().toISOString(),
    })

    setState({
      status: 'success',
      message: 'Votre demande est prête. Ce formulaire de démonstration ne transmet pas encore les données : contactez-nous par email ou WhatsApp pour finaliser l’envoi.',
    })
    setPending(false)
    requestAnimationFrame(() => feedbackRef.current?.focus())
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 rounded-xl border border-border-subtle bg-elevated p-6 shadow-[0_24px_70px_rgba(28,0,56,.09)] sm:p-8 lg:p-10">
      {/* Honeypot anti-bot — champ masqué, jamais rempli par un humain. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor="contact-name" className="text-small font-semibold text-text-primary">
          Nom *
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? 'contact-name-error' : undefined}
            className="mt-2 min-h-12 w-full rounded-md border border-border-strong bg-surface px-4 py-3 text-body text-text-primary"
          />
          {state.fieldErrors?.name && <span id="contact-name-error" className="text-small mt-1 block text-error">{state.fieldErrors.name}</span>}
        </label>

        <label htmlFor="contact-email" className="text-small font-semibold text-text-primary">
          Email professionnel *
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? 'contact-email-error' : undefined}
            className="mt-2 min-h-12 w-full rounded-md border border-border-strong bg-surface px-4 py-3 text-body text-text-primary"
          />
          {state.fieldErrors?.email && <span id="contact-email-error" className="text-small mt-1 block text-error">{state.fieldErrors.email}</span>}
        </label>
      </div>

      <label htmlFor="contact-message" className="text-small font-semibold text-text-primary">
        Votre projet ou besoin *
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? 'contact-message-error' : undefined}
          className="mt-2 w-full rounded-md border border-border-strong bg-surface px-4 py-3 text-body text-text-primary"
        />
        {state.fieldErrors?.message && <span id="contact-message-error" className="text-small mt-1 block text-error">{state.fieldErrors.message}</span>}
      </label>

      <label htmlFor="contact-consent" className="flex items-start gap-3 text-small text-text-secondary">
        <input id="contact-consent" name="consent" type="checkbox" required aria-invalid={Boolean(state.fieldErrors?.consent)} aria-describedby={state.fieldErrors?.consent ? 'contact-consent-error' : undefined} className="mt-1 size-5 shrink-0 accent-accent" />
        <span>
          J&rsquo;accepte que NovatrixAI me recontacte au sujet de cette demande, conformément à sa
          politique de confidentialité. *
        </span>
      </label>
      {state.fieldErrors?.consent && <span id="contact-consent-error" className="text-small -mt-3 text-error">{state.fieldErrors.consent}</span>}

      {state.status !== 'idle' && (
        <p
          ref={feedbackRef}
          role={state.status === 'error' ? 'alert' : 'status'}
          tabIndex={-1}
          className={`text-small rounded-md p-3 ${state.status === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? 'Validation…' : 'Valider ma demande'}
      </Button>
    </form>
  )
}
