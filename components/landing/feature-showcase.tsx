import Link from 'next/link'
import { ArrowRight, Check, CornerDownRight } from 'lucide-react'

/**
 * Bloc « écrans » — d'après feature72.
 *
 * Un bandeau de titre étroit à gauche, puis deux grandes cartes côte à côte.
 * Chaque carte porte une surface produit en haut (construite en CSS, pas une
 * capture), puis son titre et sa phrase.
 *
 * C'est la variante « preuve » : là où l'encadré raconte le système, celle-ci
 * montre deux écrans et laisse le lecteur conclure.
 */

type Visual = 'sends' | 'revenue'

export type ShowcaseItem = {
  visual?: Visual | null
  title?: string | null
  description?: string | null
}

function SendsVisual() {
  const lignes = [
    ['Campagne Rentrée', '12 480', '99,2 %'],
    ['Relance J+3', '1 248', '41,0 %'],
    ['Newsletter hebdo', '8 910', '38,4 %'],
  ]

  return (
    <div className="border-line bg-surface-2/60 rounded-xl border p-3">
      <div className="flex items-center justify-between">
        <span className="text-ink-soft text-[10px] font-medium tracking-[0.12em] uppercase">Envois</span>
        <span className="text-ink-soft text-[10px]">Délivrés</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {lignes.map(([nom, volume, taux], index) => (
          <div
            key={nom}
            className="bg-surface border-line flex items-center gap-2 rounded-md border px-2 py-1.5"
          >
            {index === 0 ? (
              <Check className="text-brand size-3 shrink-0" />
            ) : (
              <CornerDownRight className="text-ink-soft/60 size-3 shrink-0" />
            )}
            <span className="text-ink truncate text-[11px]">{nom}</span>
            <span className="text-ink-soft ml-auto shrink-0 text-[10px] tabular-nums">{volume}</span>
            <span className="text-ink w-10 shrink-0 text-right text-[10px] tabular-nums">{taux}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RevenueVisual() {
  const bars = [34, 46, 39, 58, 52, 67, 61, 78]

  return (
    <div className="border-line bg-surface-2/60 rounded-xl border p-3">
      <div className="flex items-baseline justify-between">
        <span className="text-ink text-[15px] font-medium tabular-nums">2,4 M FCFA</span>
        <span className="text-ink-soft text-[10px]">30 jours</span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1">
        {bars.map((height, index) => (
          <span
            key={index}
            className={index === bars.length - 1 ? 'bg-ink flex-1 rounded-t-[3px]' : 'bg-line flex-1 rounded-t-[3px]'}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="border-line mt-2 flex items-center justify-between border-t pt-2">
        <span className="text-ink-soft text-[10px]">Attribué à 6 campagnes</span>
        <span className="text-ink-soft text-[10px] tabular-nums">+18 %</span>
      </div>
    </div>
  )
}

export function FeatureShowcase({
  title,
  description,
  linkLabel,
  linkHref,
  items,
}: {
  title?: string | null
  description?: string | null
  linkLabel?: string | null
  linkHref?: string | null
  items?: ShowcaseItem[] | null
}) {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-ink text-[2rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-[2.5rem]">
              {title}
            </h2>
            {description && <p className="text-ink-soft mt-4 text-[15px] leading-relaxed">{description}</p>}
          </div>

          {linkLabel && linkHref && (
            <Link
              href={linkHref}
              className="text-ink group inline-flex items-center gap-2 text-sm font-medium"
            >
              {linkLabel}
              <ArrowRight className="text-brand size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {(items ?? []).map((item, index) => (
            <div key={`${item.title}-${index}`} className="border-line bg-surface rounded-2xl border p-4">
              {item.visual === 'revenue' ? <RevenueVisual /> : <SendsVisual />}

              <h3 className="text-ink mt-5 text-base font-medium">{item.title}</h3>
              {item.description && (
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
