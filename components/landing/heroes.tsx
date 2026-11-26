import Link from 'next/link'

import { Button } from '@/components/ui/button'

/**
 * Les deux héros du test A/B.
 *
 * `HeroPanels` vient de hero734 : titre centré, puis une pluie de cartes
 * produit. Le produit se prouve par morceaux — six surfaces réelles plutôt
 * qu'une capture d'écran unique.
 *
 * `HeroBento` vient de hero104 : promesse à gauche, bento de tuiles à droite.
 * C'est la structure du croquis de la landing (texte à gauche, visuel à
 * droite), donc la variante « sage » du test.
 *
 * Les deux n'empruntent que les tokens du site. Aucune image externe : les
 * cartes sont construites, pas photographiées, ce qui les rend justes le jour
 * où on les branche sur de vraies données.
 */

type Action = { label?: string | null; href?: string | null; variant?: string | null }

type HeroProps = {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  actions?: Action[] | null
}

function Actions({ actions, align = 'start' }: { actions?: Action[] | null; align?: 'start' | 'center' }) {
  if (!actions?.length) return null

  return (
    <div className={`mt-8 flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
      {actions.map((action, index) =>
        action?.label && action?.href ? (
          <Button
            key={`${action.href}-${index}`}
            asChild
            size="lg"
            variant={action.variant === 'outline' ? 'outline' : 'default'}
            className="h-11 rounded-full px-5"
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : null,
      )}
    </div>
  )
}

function Card({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`border-line bg-surface rounded-xl border p-3 shadow-[0_18px_40px_-28px_rgba(23,23,23,0.45)] ${className}`}
    >
      {children}
    </div>
  )
}

function SendCard() {
  return (
    <Card className="w-[232px]">
      <div className="flex items-center gap-2">
        <span className="bg-brand-soft text-brand-strong grid size-7 place-items-center rounded-full text-[11px] font-semibold">
          ✓
        </span>
        <div>
          <p className="text-ink text-[12.5px] leading-4 font-medium">Campagne livrée</p>
          <p className="text-ink-soft text-[11px]">il y a 2 min</p>
        </div>
      </div>
      <div className="border-line mt-3 flex items-baseline justify-between border-t pt-2">
        <span className="text-ink-soft text-[11px]">Destinataires</span>
        <span className="text-ink text-[13px] font-medium tabular-nums">12 480</span>
      </div>
    </Card>
  )
}

function DeliverabilityCard() {
  const bars = [38, 52, 44, 66, 58, 74, 69, 84]

  return (
    <Card className="w-[196px]">
      <p className="text-ink-soft text-[11px]">Délivrabilité</p>
      <p className="text-ink mt-1 text-[20px] leading-none font-medium tabular-nums">99,2 %</p>
      <div className="mt-3 flex h-10 items-end gap-1">
        {bars.map((height, index) => (
          <span
            key={index}
            className="bg-brand/70 flex-1 rounded-sm"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </Card>
  )
}

function LinkProfileCard() {
  return (
    <Card className="w-[210px]">
      <div className="flex items-center gap-2">
        <span className="from-brand to-brand-strong size-8 rounded-full bg-gradient-to-br" />
        <div>
          <p className="text-ink text-[12.5px] leading-4 font-medium">Awa Diallo</p>
          <p className="text-ink-soft text-[11px]">reachdem.cc/awa</p>
        </div>
      </div>
      <div className="bg-brand-soft text-brand-strong mt-3 rounded-md py-1.5 text-center text-[11px] font-medium">
        Copier le lien
      </div>
    </Card>
  )
}

function SegmentCard() {
  return (
    <Card className="w-[188px]">
      <p className="text-ink text-[12.5px] font-medium">Segment</p>
      <p className="text-ink-soft mt-1 text-[11px]">Actifs 90 jours</p>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['E-commerce', 'Abidjan', 'A acheté'].map((tag) => (
          <span
            key={tag}
            className="bg-surface-2 text-ink-soft rounded-full px-2 py-0.5 text-[10.5px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  )
}

function ScanCard() {
  return (
    <Card className="w-[204px]">
      <div className="flex items-center justify-between">
        <p className="text-ink text-[12.5px] font-medium">Carte scannée</p>
        <span className="bg-brand size-1.5 rounded-full" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="bg-surface-2 size-7 rounded-full" />
        <div>
          <p className="text-ink text-[11.5px] leading-4">Nouveau contact</p>
          <p className="text-ink-soft text-[10.5px]">ajouté à « Salon Lagos »</p>
        </div>
      </div>
    </Card>
  )
}

function InboxCard() {
  return (
    <Card className="w-[226px]">
      <div className="flex items-center gap-2">
        <span className="bg-surface-2 size-6 rounded-full" />
        <p className="text-ink text-[12px] font-medium">Réservation confirmée</p>
      </div>
      <div className="border-line mt-2 space-y-1.5 border-t pt-2">
        <div className="bg-surface-2 h-1.5 w-4/5 rounded-full" />
        <div className="bg-surface-2 h-1.5 w-3/5 rounded-full" />
      </div>
    </Card>
  )
}

export function HeroPanels({ eyebrow, title, subtitle, actions }: HeroProps) {
  return (
    <section className="border-line relative overflow-hidden border-b px-4 pt-20 pb-0 sm:px-6 lg:pt-24">
      {/* Halo : donne de la profondeur sans image ni dégradé lourd. */}
      <div
        aria-hidden
        className="from-brand-soft/70 pointer-events-none absolute inset-x-0 top-24 -z-0 mx-auto h-[380px] max-w-3xl rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="text-ink-soft text-[11px] font-medium tracking-[0.14em] uppercase">{eyebrow}</p>
        )}
        <h1 className="text-ink mt-4 text-4xl leading-[1.03] font-medium tracking-[-0.025em] sm:text-5xl lg:text-[56px]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-ink-soft mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            {subtitle}
          </p>
        )}
        <Actions actions={actions} align="center" />
      </div>

      {/* Desktop : champ de cartes qui déborde des bords. */}
      <div className="relative mx-auto mt-16 hidden h-[320px] max-w-6xl lg:block">
        <div className="absolute top-2 left-[-40px] rotate-[-5deg]">
          <SendCard />
        </div>
        <div className="absolute top-24 left-[150px] rotate-[2deg]">
          <DeliverabilityCard />
        </div>
        <div className="absolute top-6 left-[360px] rotate-[-2deg]">
          <LinkProfileCard />
        </div>
        <div className="absolute top-28 left-[590px] rotate-[4deg]">
          <SegmentCard />
        </div>
        <div className="absolute top-4 left-[790px] rotate-[-3deg]">
          <ScanCard />
        </div>
        <div className="absolute top-24 left-[990px] rotate-[3deg]">
          <InboxCard />
        </div>
      </div>

      {/* Mobile : les mêmes surfaces, empilées proprement. */}
      <div className="mt-12 grid grid-cols-2 gap-3 pb-14 lg:hidden">
        <SendCard />
        <DeliverabilityCard />
        <LinkProfileCard />
        <ScanCard />
      </div>
    </section>
  )
}

function StatTile() {
  return (
    <Card className="col-span-1 row-span-2 flex flex-col justify-between p-4">
      <div>
        <p className="text-ink-soft text-[11px]">Ouvertures</p>
        <p className="text-ink mt-1 text-2xl leading-none font-medium tabular-nums">42,8 %</p>
      </div>
      <div className="mt-6 flex h-24 items-end gap-1.5">
        {[42, 58, 46, 72, 64, 88, 76].map((height, index) => (
          <span
            key={index}
            className={index === 5 ? 'bg-brand flex-1 rounded-sm' : 'bg-surface-2 flex-1 rounded-sm'}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </Card>
  )
}

function MessageTile() {
  return (
    <Card className="flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="from-brand to-brand-strong size-6 shrink-0 rounded-full bg-gradient-to-br" />
          <div className="min-w-0">
            <p className="text-ink truncate text-[12px] font-medium">Nouvelle campagne</p>
            <p className="text-ink-soft truncate text-[11px]">Segment : actifs 90 jours</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="bg-surface-2 h-1.5 w-full rounded-full" />
          <div className="bg-surface-2 h-1.5 w-2/3 rounded-full" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-ink-soft text-[11px] tabular-nums">12 480 contacts</span>
        <span className="bg-brand text-surface rounded-full px-2.5 py-1 text-[10.5px] font-medium">
          Envoyer
        </span>
      </div>
    </Card>
  )
}

function ProofTile() {
  return (
    <Card className="relative isolate p-4">
      <div className="from-brand-soft to-surface-2 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br opacity-80" />
      <p className="text-ink text-[12px] font-medium">Preuve de diffusion</p>
      <p className="text-ink-soft mt-1 text-[11px] leading-4">
        Chaque vue, chaque clic, par créateur.
      </p>
      <div className="mt-3 flex -space-x-2">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="border-surface bg-surface-2 size-6 rounded-full border-2"
          />
        ))}
        <span className="border-surface bg-ink text-surface grid size-6 place-items-center rounded-full border-2 text-[9px]">
          +9
        </span>
      </div>
    </Card>
  )
}

export function HeroBento({ eyebrow, title, subtitle, actions }: HeroProps) {
  return (
    <section className="border-line border-b px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          {eyebrow && (
            <p className="text-ink-soft text-[11px] font-medium tracking-[0.14em] uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-ink mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.025em] sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-ink-soft mt-5 max-w-lg text-base leading-relaxed sm:text-lg">
              {subtitle}
            </p>
          )}
          <Actions actions={actions} />
          <ul className="text-ink-soft mt-7 space-y-2 text-[13px]">
            {['Email, Links, Cards, Forms : un seul compte', 'Délivrabilité suivie en direct', 'Support en français'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="bg-brand-soft text-brand-strong grid size-4 place-items-center rounded-full text-[9px]">
                    ✓
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="from-brand-soft/80 pointer-events-none absolute -inset-6 -z-0 rounded-3xl bg-gradient-to-br to-transparent blur-2xl"
          />
          <div className="relative grid min-h-[336px] grid-cols-2 grid-rows-2 gap-3">
            <StatTile />
            <MessageTile />
            <ProofTile />
          </div>
        </div>
      </div>
    </section>
  )
}
