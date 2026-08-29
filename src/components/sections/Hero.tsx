import { ButtonLink } from '@/components/ui/Button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { Container } from '@/components/ui/Container'

/**
 * Hero de l'accueil — seule section du site autorisée à utiliser la palette
 * violet/magenta réservée (--hero-bg / --hero-from / --hero-to), cf. brief.
 *
 * Texte réel repris tel quel (règle T3 : aucun texte de vente inventé) :
 * - kicker et accroche "Innover. Automatiser. Performer." :
 *   archives/projects/novatrix-data-enrichment-main/src/components/HeroSection.tsx
 * - paragraphe de description : archives/.../HeroSection.tsx, complété par la 2e phrase
 *   de la bio officielle du profil ComeUp (novatrix/comeup_extraction_finale.json > profile.bio).
 *
 * Phase 1 : message unique, pas de personnalisation par profil visiteur (brief section 3) —
 * cette logique nécessite du JS côté client hors périmètre HTML-first de cette phase, et
 * aucune variante de texte par persona n'existe dans les sources fournies. Voir PROGRESS.md.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-from) 55%, var(--hero-to) 100%)',
      }}
    >
      <Container className="grid min-h-[560px] items-center gap-10 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
        <div>
          <p className="kicker text-white/70">Révolutionnez votre futur avec NovatrixAI</p>
          <h1 className="text-display font-display mt-5 max-w-2xl font-bold text-white">
            Innover. Automatiser. Performer.
          </h1>
          <p className="text-body-lg mt-6 max-w-xl text-white/80">
            Chez NovatrixAI, nous vous accompagnons dans l&rsquo;intégration des technologies de
            pointe pour atteindre vos objectifs stratégiques. Notre objectif : transformer vos
            idées en solutions concrètes qui améliorent immédiatement votre performance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Réserver un audit gratuit</ButtonLink>
            <WhatsAppCta className="!border-white/30 !text-white hover:!bg-white/10" />
          </div>
        </div>
      </Container>
    </section>
  )
}
