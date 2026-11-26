'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Clock, Mail, Video } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Le hero « manège » — reprise de hero734.
 *
 * Ce n'est pas un semis de cartes : les panneaux sont posés sur un cylindre en
 * 3D (`rotateY` + `translateZ` sur un rayon), tournent en continu, s'inclinent
 * à l'inertie quand on les attrape, et s'effacent sur les bords. Le titre est
 * posé par-dessus, en `pointer-events-none`, pour que le glissement marche
 * même quand le curseur passe sur le texte.
 *
 * Ce qui change par rapport au bloc d'origine : le contenu (surfaces ReachDem
 * plutôt que Calendly), la couleur d'accent (l'orange de la marque) et les
 * avatars (aplats, pas d'images distantes). La mécanique est la même.
 */

const ACCENT = '#ff751f'
/** Les panneaux n'empruntent pas l'orange : il reste réservé au bouton principal
 *  et à deux détails. Un accent partout n'est plus un accent. */
const PANEL_ACCENT = '#0b0b0c'

type PanelProps = { accent: string }

const PANELS: {
  w: number
  h: number
  render: (p: PanelProps) => React.ReactNode
}[] = [
  {
    w: 250,
    h: 190,
    render: ({ accent }) => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Aujourd’hui, jeu. 14</p>
        {[
          ['09:30', 'Campagne « Rentrée »', true],
          ['11:00', 'Relance panier', false],
          ['14:15', 'Newsletter hebdo', false],
        ].map(([t, n, on]) => (
          <div
            key={String(t)}
            className="border-line flex items-center gap-2 rounded-md border px-2 py-1.5 text-[11px]"
            style={on ? { borderColor: ACCENT } : undefined}
          >
            <span className="text-ink-soft font-mono">{t}</span>
            <span className="truncate">{n}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    w: 230,
    h: 150,
    render: ({ accent }) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="from-brand to-brand-strong size-8 rounded-full bg-gradient-to-br" />
          <div>
            <p className="text-xs font-semibold">Awa Diallo</p>
            <p className="text-ink-soft text-[11px]">Profil Links</p>
          </div>
        </div>
        <div className="bg-surface-2 rounded-md px-2 py-1.5 font-mono text-[11px]">
          reachdem.cc/awa
        </div>
        <span className="self-start rounded-md px-2 py-1 text-[11px] font-medium text-white" style={{ background: accent }}>
          Copier le lien
        </span>
      </div>
    ),
  },
  {
    w: 270,
    h: 170,
    render: ({ accent }) => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Délivrabilité, 7 jours</p>
        <div className="text-ink-soft grid grid-cols-7 gap-1 text-center text-[10px]">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {Array.from({ length: 21 }).map((_, i) => {
            const on = [1, 5, 9, 12, 17].includes(i)
            return (
              <span
                key={i}
                className="bg-surface-2 h-5 rounded-sm"
                style={on ? { background: accent, opacity: 0.18 } : undefined}
              />
            )
          })}
        </div>
      </div>
    ),
  },
  {
    w: 220,
    h: 140,
    render: () => (
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold">Segment actif</p>
        <div className="flex -space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="ring-surface from-surface-2 to-line size-7 rounded-full bg-gradient-to-br ring-2"
            />
          ))}
        </div>
        <p className="text-ink-soft text-[11px]">1 248 contacts, 90 jours</p>
      </div>
    ),
  },
  {
    w: 240,
    h: 110,
    render: ({ accent }) => (
      <div className="flex gap-3">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-white"
          style={{ background: accent }}
        >
          <Mail className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold">Rappel envoyé</p>
          <p className="text-ink-soft text-[11px]">Relance automatique à J+3.</p>
        </div>
      </div>
    ),
  },
  {
    w: 260,
    h: 150,
    render: ({ accent }) => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Fuseaux : Abidjan / Paris</p>
        {[
          ['Abidjan', 8, 18],
          ['Paris', 14, 24],
        ].map(([c, a, b]) => (
          <div key={String(c)} className="flex items-center gap-2 text-[11px]">
            <span className="text-ink-soft w-14">{c}</span>
            <div className="bg-surface-2 relative h-3 flex-1 rounded-full">
              <div
                className="absolute inset-y-0 rounded-full"
                style={{
                  left: `${(Number(a) / 24) * 100}%`,
                  width: `${((Number(b) - Number(a)) / 24) * 100}%`,
                  background: accent,
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        ))}
        <p className="text-ink-soft text-[11px]">Meilleure fenêtre : 10h–13h GMT</p>
      </div>
    ),
  },
  {
    w: 210,
    h: 190,
    render: ({ accent }) => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Novembre</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="flex aspect-square items-center justify-center rounded-sm"
              style={
                i === 13 ? { background: ACCENT, color: 'white' } : i % 7 > 4 ? { opacity: 0.35 } : undefined
              }
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    w: 220,
    h: 120,
    render: () => (
      <div className="flex flex-col gap-1">
        <p className="text-ink-soft text-[11px]">Envoyés cette semaine</p>
        <p className="text-2xl font-semibold tracking-tight">32</p>
        <p className="text-ink-soft text-[11px]">6 de plus que la semaine passée</p>
      </div>
    ),
  },
  {
    w: 250,
    h: 150,
    render: ({ accent }) => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 items-center justify-center rounded-full text-white"
            style={{ background: accent }}
          >
            <Check className="size-3.5" />
          </span>
          <p className="text-xs font-semibold">Campagne envoyée</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="from-brand-soft to-brand/40 size-6 rounded-full bg-gradient-to-br" />
          <span>12 480 contacts, ven. 21, 10:00</span>
        </div>
        <div className="text-ink-soft flex items-center gap-1.5 text-[11px]">
          <Video className="size-3.5" /> Lien de désinscription ajouté
        </div>
      </div>
    ),
  },
  {
    w: 230,
    h: 130,
    render: () => (
      <div className="flex flex-col gap-2 text-[11px]">
        <p className="text-xs font-semibold">Limites d’envoi</p>
        {[
          ['Par minute', '600'],
          ['Par jour', '50 000'],
          ['Par campagne', '25 000'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-ink-soft">{k}</span>
            <span className="font-medium">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    w: 240,
    h: 140,
    render: () => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Intégrations</p>
        <div className="text-ink-soft flex flex-wrap items-center gap-2 text-[11px]">
          {['Forms', 'Links', 'Cards', 'WhatsApp'].map((n) => (
            <span key={n} className="border-line rounded-full border px-2 py-1">
              {n}
            </span>
          ))}
        </div>
        <p className="text-ink-soft text-[11px]">Un seul compte, un seul jeu de données</p>
      </div>
    ),
  },
  {
    w: 220,
    h: 120,
    render: ({ accent }) => (
      <div className="flex flex-col gap-1">
        <p className="text-ink-soft text-[11px]">Revenu attribué</p>
        <p className="text-xl font-semibold tracking-tight">2,4 M FCFA</p>
        <p className="text-ink-soft text-[11px]">
          Sur 30 jours, campagnes email
        </p>
      </div>
    ),
  },
  {
    w: 230,
    h: 120,
    render: () => (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold">Taux d’ouverture</p>
        <div className="flex items-end gap-1">
          {[38, 52, 44, 66, 58, 74, 69, 84].map((h, i) => (
            <span
              key={i}
              className={i === 7 ? 'bg-ink w-full rounded-sm' : 'bg-surface-2 w-full rounded-sm'}
              style={{ height: `${h * 0.5}px` }}
            />
          ))}
        </div>
        <p className="text-ink-soft text-[11px]">42,8 % cette semaine</p>
      </div>
    ),
  },
]

const RING = [...PANELS, ...PANELS]
const STEP = 360 / RING.length

export type HeroRingProps = {
  title?: string | null
  subtitle?: string | null
  actions?: { label?: string | null; href?: string | null; variant?: string | null }[] | null
}

export function HeroRing({ title, subtitle, actions }: HeroRingProps) {
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const rot = useRef(reduce ? 15 : 140)
  const vel = useRef(0)
  const drag = useRef<{ x: number; t: number; id: number } | null>(null)
  const lastTouch = useRef(-10000)
  const [radius, setRadius] = useState(820)
  const [inView, setInView] = useState(true)

  // Le rayon suit la largeur : un cylindre de 860 px sur mobile mettrait les
  // panneaux hors champ.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth
      setRadius(w < 640 ? 520 : w < 1024 ? 700 : 860)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // On coupe l'animation quand la section sort de l'écran : un RAF qui tourne
  // dans un onglet caché, c'est de la batterie pour rien.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const apply = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(${radius * 0.62}px) rotateY(${rot.current}deg)`
      }
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return
        let angle = (((rot.current - index * STEP) % 360) + 540) % 360
        angle -= 180
        const fade = 1 - Math.min(1, Math.max(0, (Math.abs(angle) - 58) / 22))
        panel.style.opacity = String(fade)
        panel.style.visibility = fade <= 0 ? 'hidden' : 'visible'
      })
    }

    apply()
    if (reduce || !inView) return

    let frame = 0
    let last = performance.now()
    const start = last

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      if (!drag.current) {
        const intro = now - start < 1800
        if (intro) {
          const k = (now - start) / 1800
          rot.current = 140 * Math.pow(1 - k, 3)
        } else {
          rot.current += vel.current * dt
          vel.current *= Math.pow(0.08, dt)
          if (now - lastTouch.current > 3000) {
            vel.current += (-5 - vel.current) * Math.min(1, dt * 1.5)
          }
        }
      }

      apply()
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [reduce, inView, radius])

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || (event.target as HTMLElement).closest('a,button')) return
    drag.current = { x: event.clientX, t: performance.now(), id: event.pointerId }
    vel.current = 0
    lastTouch.current = performance.now()
  }

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return

    const now = performance.now()
    const dx = event.clientX - current.x
    const degrees = dx * 0.12
    rot.current += degrees
    vel.current = (degrees / Math.max(1, now - current.t)) * 1000
    current.x = event.clientX
    current.t = now
    lastTouch.current = now
  }

  const onPointerUp = () => {
    drag.current = null
    lastTouch.current = performance.now()
  }

  return (
    <section
      ref={sectionRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={(event) => {
        if (reduce || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
        vel.current -= event.deltaX * 0.6
        lastTouch.current = performance.now()
      }}
      style={{ touchAction: 'pan-y' }}
      className="bg-surface-2/60 relative h-svh max-h-[1100px] min-h-[680px] w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
    >
      <div aria-hidden className="absolute inset-x-0 top-[62%] h-0" style={{ perspective: 900 }}>
        <div className="absolute top-0 left-1/2" style={{ transformStyle: 'preserve-3d' }}>
          <div ref={ringRef} style={{ transformStyle: 'preserve-3d' }}>
            {RING.map((panel, index) => (
              <div
                key={index}
                ref={(el) => {
                  panelRefs.current[index] = el
                }}
                className="absolute"
                style={{
                  width: panel.w,
                  height: panel.h,
                  marginLeft: -panel.w / 2,
                  marginTop: -panel.h / 2 + (index % 2 ? 92 : -92),
                  transform: `rotateY(${-index * STEP}deg) translateZ(${-radius}px)`,
                }}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + (index % 8) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-line/70 bg-surface/55 text-ink size-full rounded-2xl border p-4 shadow-[0_12px_32px_-26px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                >
                  {panel.render({ accent: PANEL_ACCENT })}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-[75rem] flex-col items-center px-4 pt-20 text-center md:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-2xl flex-col items-center gap-5"
        >
          <h1 className="text-ink text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            {title}
          </h1>
          <p className="text-ink-soft max-w-xl text-base md:text-lg">{subtitle}</p>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3 pt-1">
            {actions?.map((action, index) =>
              action?.label && action?.href ? (
                <Button
                  key={`${action.href}-${index}`}
                  asChild
                  size="lg"
                  variant={action.variant === 'outline' ? 'outline' : 'default'}
                  className={cn('h-11 rounded-full px-5', action.variant === 'outline' && 'border-line-strong')}
                >
                  <Link href={action.href}>
                    {action.label}
                    {action.variant !== 'outline' && <ArrowRight className="size-4" />}
                  </Link>
                </Button>
              ) : null,
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
