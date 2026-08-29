import { ButtonLink } from '@/components/ui/Button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { Container } from '@/components/ui/Container'
import { revealStyle } from '@/lib/reveal'
import { HeroBackground } from './HeroBackground'

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
 *
 * Phase 4 : effet signature WebGL (`HeroBackground` → `HeroCanvas`, voir ces fichiers et
 * README.md > Décisions techniques pour le choix OGL) posé en calque strictement additif,
 * `absolute inset-0` par-dessus ce dégradé CSS statique — qui reste le fond réel tant que le
 * canvas n'est pas prêt (lazy-load post-hydratation) ou si WebGL/`prefers-reduced-motion` ne
 * le permet pas (contraintes T1/T2 non négociables). `Hero.tsx` reste un Server Component : ce
 * fichier ne gagne aucune directive `'use client'`, aucune donnée du hero (H1/accroche/CTA)
 * n'est déplacée dans le canvas.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-grad-start) 55%, var(--hero-grad-end) 100%)',
      }}
    >
      <HeroBackground />
      <Container className="relative z-10 grid min-h-[560px] items-center gap-10 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
        <div>
          <p className="reveal kicker text-white/70" style={revealStyle(0, 8)}>
            Révolutionnez votre futur avec NovatrixAI
          </p>
          <h1
            className="reveal text-display font-display mt-5 max-w-2xl font-bold text-white"
            style={revealStyle(80, 12)}
          >
            Innover. Automatiser. Performer.
          </h1>
          <p className="reveal text-body-lg mt-6 max-w-xl text-white/80" style={revealStyle(160, 16)}>
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
