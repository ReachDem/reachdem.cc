import Link from 'next/link'
import { Check, Play, Star, Zap } from 'lucide-react'

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

function Donut({ value = 43 }: { value?: number }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius

  return (
    <svg viewBox="0 0 148 148" className="size-[7.5rem]">
      <circle cx="74" cy="74" r={radius} fill="none" stroke="var(--color-surface-2)" strokeWidth="13" />
      <circle
        cx="74"
        cy="74"
        r={radius}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        transform="rotate(-90 74 74)"
      />
    </svg>
  )
}

function PhotoTile({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`from-surface-2 via-surface-2 to-line/60 rounded-2xl bg-gradient-to-br ${className}`}
    />
  )
}

/**
 * Géométrie reprise de hero104 : deux colonnes de 10,375 rem, six rangées
 * fixes et des gaps de 1,375 rem. C'est ce qui donne le rythme du collage —
 * pas les cartes elles-mêmes.
 */
function Collage() {
  return (
    <div className="grid grid-cols-[repeat(2,10.375rem)] grid-rows-[2.4375rem_7.18rem_3.187rem_7.125rem_3.75rem_4.625rem] gap-x-8 gap-y-[1.375rem] bg-[radial-gradient(closest-side,var(--color-surface-2),var(--color-transparent))] bg-[length:100%_100%] bg-center bg-no-repeat">
      <div className="relative col-[1/2] row-[1/3]">
        <PhotoTile className="h-full w-full" />
        <div className="bg-surface absolute bottom-0 flex min-w-[15rem] gap-3 rounded-2xl p-3 shadow-2xl">
          <span className="bg-brand-soft grid size-11 shrink-0 place-items-center rounded-full">
            <Zap className="size-4 fill-[var(--color-brand)] stroke-[var(--color-brand)]" />
          </span>
          <div>
            <div className="text-ink text-sm font-semibold">Alerte</div>
            <div className="text-ink-soft text-sm">Rebonds traités</div>
          </div>
        </div>
      </div>

      <div className="col-[2/3] row-[2/4]">
        <div className="bg-surface flex h-full w-full flex-col justify-between rounded-2xl p-2 shadow-lg">
          <div className="size-5 rounded-full bg-black/10" />
          <div className="from-surface-2 to-brand-soft relative flex h-[9.18rem] w-full rounded-2xl bg-gradient-to-br">
            <span className="bg-ink m-auto grid size-10 place-items-center rounded-full">
              <Play className="size-4 fill-white stroke-white" />
            </span>
          </div>
        </div>
      </div>

      <div className="col-[1/2] row-[3/5]">
        <div className="bg-surface flex h-full w-full flex-col justify-between rounded-2xl p-2 shadow-lg">
          <div className="size-5 rounded-full bg-black/10" />
          <div className="from-brand-soft to-surface-2 flex h-[9.18rem] w-full rounded-2xl bg-gradient-to-tl">
            <div className="bg-ink m-2 mx-auto flex h-fit w-fit items-center gap-1 self-end rounded-xl p-2 text-white">
              <Star className="size-4" />
              <div className="text-xs font-semibold">700 campagnes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-[2/3] row-[4/-2]">
        <div className="bg-surface flex h-full w-full flex-col justify-between rounded-2xl p-4 shadow-lg">
          <div>
            <div className="h-2 w-[80%] rounded-2xl bg-black/10" />
            <div className="mt-2 h-2 w-[50%] rounded-2xl bg-black/10" />
          </div>
          <div className="relative mx-auto">
            <Donut />
            <p className="text-ink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm font-bold whitespace-nowrap tabular-nums">
              12 480
            </p>
          </div>
        </div>
      </div>

      <div className="col-[1/2] row-[-1/-3]">
        <PhotoTile className="h-full w-full" />
      </div>
    </div>
  )
}

export function HeroBento({ eyebrow, title, subtitle, actions }: HeroProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-[75rem] px-4 sm:px-6">
        <div className="flex gap-8">
          <div className="mx-auto max-w-[50rem] lg:max-w-full">
            {eyebrow && (
              <p className="text-ink-soft mb-3 text-center text-[11px] font-medium tracking-[0.14em] uppercase lg:text-left">
                {eyebrow}
              </p>
            )}
            <h1 className="text-ink mb-[0.625rem] text-center text-5xl leading-tight font-semibold tracking-[-1px] sm:text-[3.375rem] md:text-[5.625rem] md:leading-[6.18rem] lg:text-left">
              {title}
            </h1>
            <p className="text-ink mb-10 text-center text-2xl leading-9 font-medium lg:text-left">
              {subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row lg:justify-normal">
              {actions?.map((action, index) => (
                <Link
                  key={`${action.href}-${index}`}
                  href={action.href ?? '#'}
                  className={
                    action.variant === 'outline'
                      ? 'border-line-strong text-ink hover:border-brand inline-flex h-fit w-full items-center justify-center rounded-lg border-2 px-8 py-4 text-lg font-semibold transition-all sm:w-fit'
                      : 'bg-brand text-surface hover:bg-brand/85 border-brand inline-flex h-fit w-full items-center justify-center rounded-lg border-2 px-8 py-4 text-lg font-semibold transition-all sm:w-fit'
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>

            <div className="text-ink-soft mt-6 flex flex-wrap justify-center gap-7 lg:justify-normal">
              {['Essai de 30 jours', 'Sans carte bancaire', 'Résiliable à tout moment'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="text-ink-soft size-3" />
                  <p className="text-ink-soft text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <Collage />
          </div>
        </div>
      </div>
    </section>
  )
}
