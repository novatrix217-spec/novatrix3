import Link from 'next/link'

export function EndExperience() {
  return (
    <section className="end-experience" aria-labelledby="end-experience-title">
      <div className="end-experience-sticky">
        <div className="end-experience-crosses" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="end-experience-content">
          <p>Un projet en tête&nbsp;?</p>
          <h2 id="end-experience-title">Créons quelque chose<br /><span>d’inoubliable.</span></h2>
        </div>
        <Link href="/contact" className="end-experience-cta" data-magnetic="true">
          <span aria-hidden="true">↓</span><span>Parlons-en</span><span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  )
}
