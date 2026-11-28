import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Variante éditoriale du bloc features (d'après feature42).
 *
 * Pas de cartes, pas d'icônes, pas de fonds teintés : un titre en colonne
 * étroite à gauche, quatre valeurs en 2×2 à droite, séparées par un filet.
 * La hiérarchie tient uniquement à la typographie et au vide — c'est ce qui
 * la distingue du reste de la page, qui est fait de surfaces.
 *
 * Retokénisation par rapport au bloc d'origine : Neue Montreal, encre
 * #0b0b0c, gris #52525b, filets #e8e8ea. Aucune couleur d'accent dans les
 * quatre valeurs ; le seul orange est la flèche du lien.
 */

export type FeatureValue = {
  title?: string | null
  description?: string | null
}

export function FeatureValues({
  eyebrow,
  title,
  description,
  items,
  linkLabel,
  linkHref,
}: {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  items?: FeatureValue[] | null
  linkLabel?: string | null
  linkHref?: string | null
}) {
  const valeurs = items ?? []

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          {eyebrow && (
            <p className="text-ink-soft text-[11px] font-medium tracking-[0.14em] uppercase">{eyebrow}</p>
          )}
          <h2 className="text-ink mt-4 text-[2rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-[2.75rem]">
            {title}
          </h2>
          {description && (
            <p className="text-ink-soft mt-5 max-w-sm text-[15px] leading-relaxed">{description}</p>
          )}
          {linkLabel && linkHref && (
            <Link
              href={linkHref}
              className="text-ink group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              {linkLabel}
              <ArrowRight className="text-brand size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {valeurs.map((item, index) => (
            <div key={`${item.title}-${index}`} className="border-line border-t pt-5">
              <span className="text-ink-soft/70 font-mono text-[11px] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <dt className="text-ink mt-2 text-base font-medium">{item.title}</dt>
              {item.description && (
                <dd className="text-ink-soft mt-2 text-sm leading-relaxed">{item.description}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
