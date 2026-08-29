'use client'

import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/app/contact/actions'
import { Button } from '@/components/ui/Button'

const initialState: ContactFormState = { status: 'idle', message: '' }

/**
 * Formulaire de contact réel (brief, livrable Phase 1 point 5) : nom, email, message,
 * consentement RGPD a minima. Validation HTML5 côté client (required, type=email) +
 * revalidation côté serveur dans src/app/contact/actions.ts (jamais de confiance
 * uniquement client). Le traitement serveur est un stub documenté "à brancher".
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  return (
    <form action={formAction} className="grid gap-5 rounded-lg border border-border-subtle bg-elevated p-6 shadow-[var(--elev-1)] sm:p-8">
      {/* Honeypot anti-bot — champ masqué, jamais rempli par un humain. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-small font-semibold text-text-primary">
          Nom *
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-body text-text-primary"
          />
          {state.fieldErrors?.name && <span className="text-small mt-1 block text-error">{state.fieldErrors.name}</span>}
        </label>

        <label className="text-small font-semibold text-text-primary">
          Email professionnel *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-body text-text-primary"
          />
          {state.fieldErrors?.email && <span className="text-small mt-1 block text-error">{state.fieldErrors.email}</span>}
        </label>
      </div>

      <label className="text-small font-semibold text-text-primary">
        Votre projet ou besoin *
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-body text-text-primary"
        />
        {state.fieldErrors?.message && <span className="text-small mt-1 block text-error">{state.fieldErrors.message}</span>}
      </label>

      <label className="flex items-start gap-3 text-small text-text-secondary">
        <input name="consent" type="checkbox" required className="mt-1 accent-accent" />
        <span>
          J&rsquo;accepte que NovatrixAI me recontacte au sujet de cette demande, conformément à sa
          politique de confidentialité. *
        </span>
      </label>
      {state.fieldErrors?.consent && <span className="text-small -mt-3 text-error">{state.fieldErrors.consent}</span>}

      {state.status !== 'idle' && (
        <p
          role="status"
          className={`text-small rounded-md p-3 ${state.status === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </Button>
    </form>
  )
}
