import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

/**
 * Bloc « encadré éditorial » — d'après feature239.
 *
 * Un cadre fin à pointes de coin, un badge, un très gros titre, une promesse
 * en une phrase, un bouton en contour. À droite, une carte image qui montre
 * une surface produit.
 *
 * Retokénisation : le cadre reste #e8e8ea (jamais noir), les pointes de coin
 * passent en encre pleine pour marquer la grille, la carte de droite n'est
 * pas une photo de banque d'images mais un panneau dégradé en encre — cohérent
 * avec les tuiles du hero, et sans image à charger.
 */

export function FeatureInset({
  badge,
  title,
  description,
  linkLabel,
  linkHref,
  cardKicker,
  cardTitle,
  cardCaption,
  cardHref,
  cardLinkLabel,
}: {
  badge?: string | null
  title?: string | null
  description?: string | null
  linkLabel?: string | null
  linkHref?: string | null
  cardKicker?: string | null
  cardTitle?: string | null
  cardCaption?: string | null
  cardHref?: string | null
  cardLinkLabel?: string | null
}) {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-line relative border">
          {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos) => (
            <span key={pos} aria-hidden className={`bg-ink absolute size-1.5 rounded-full ${pos}`} />
          ))}

          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_minmax(0,20rem)] lg:gap-14 lg:p-14">
            <div>
              {badge && (
                <span className="border-line text-ink-soft inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium">
                  {badge}
                  <ChevronRight className="size-3" />
                </span>
              )}

              <h2 className="text-ink mt-5 text-[2rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance sm:text-[2.5rem] md:text-[3.25rem]">
                {title}
              </h2>

              {description && (
                <p className="text-ink-soft mt-5 max-w-xl text-[15px] leading-relaxed">{description}</p>
              )}

              {linkLabel && linkHref && (
                <Link
                  href={linkHref}
                  className="border-line-strong text-ink hover:border-ink mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
                >
                  {linkLabel}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              )}
            </div>

            <Link
              href={cardHref ?? linkHref ?? '#'}
              className="from-ink to-ink-soft/90 group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b p-5 text-white lg:-mr-6"
            >
              <span className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">
                {cardKicker}
              </span>

              <span className="text-center">
                <span className="block text-[1.75rem] leading-[1.05] font-medium tracking-[-0.02em] text-balance">
                  {cardTitle}
                </span>
                {cardCaption && (
                  <span className="mt-2 block text-[12.5px] leading-snug text-white/65">{cardCaption}</span>
                )}
              </span>

              <span className="text-center text-[12px] font-medium text-white/80 transition-colors group-hover:text-white">
                {cardLinkLabel}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
