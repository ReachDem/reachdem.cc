'use client'

import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

/**
 * Le libellé qui roule au survol (micro-animation sent.dm).
 *
 * Le texte est découpé en lettres ; chaque lettre est une boîte à deux faces
 * identiques. La rotation et le décalage sont en CSS (`.roll` dans
 * `globals.css`), avec `--i` / `--n` par lettre pour l'effet de vague.
 *
 * Accessibilité : les faces sont décoratives (`aria-hidden`), un `<span>` en
 * `sr-only` porte le vrai libellé. Sous `prefers-reduced-motion`, le CSS ne
 * déclare aucune transition : le texte reste immobile.
 */
export function RollingText({ text, className }: { text: string; className?: string }) {
  const letters = Array.from(text)
  const last = Math.max(letters.length - 1, 1)

  return (
    <span className={cn('relative inline-flex', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="roll"
            style={{ '--i': index, '--n': last } as CSSProperties}
          >
            <span>{letter === ' ' ? '\u00a0' : letter}</span>
            <span>{letter === ' ' ? '\u00a0' : letter}</span>
          </span>
        ))}
      </span>
    </span>
  )
}
