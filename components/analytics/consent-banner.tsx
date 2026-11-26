'use client'

import { useEffect, useState } from 'react'

import { readConsent, writeConsent } from '@/lib/consent'

/**
 * La bannière de consentement.
 *
 * Deux boutons, de même poids visuel : un « Accepter » plus gros que le refus
 * n'est pas un consentement libre, et la CNIL comme le RGPD le disent depuis
 * assez longtemps.
 *
 * Elle ne s'affiche qu'une fois — le choix tient six mois, sur tout
 * `.reachdem.cc`.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(readConsent() === null)
  }, [])

  if (!visible) return null

  const decide = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Préférences de mesure d’audience"
      className="border-line bg-surface/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-ink-soft max-w-2xl text-[13px] leading-5">
          On mesure l’audience pour savoir quelle page fonctionne. Ça passe par Google
          Analytics et PostHog, et rien n’est chargé avant ton accord.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="border-line-strong text-ink hover:bg-surface-2 h-9 rounded-full border px-4 text-[13.5px] font-medium transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="bg-ink text-surface hover:bg-ink/90 h-9 rounded-full px-4 text-[13.5px] font-medium transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
