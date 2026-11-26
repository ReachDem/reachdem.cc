'use client'

import { useEffect, useRef } from 'react'

import { setVariantContext, track } from '@/lib/analytics'
import type { Variant } from '@/lib/experiments'

/**
 * Signale l'exposition à une variante, une fois par chargement.
 *
 * C'est le dénominateur de tous les taux de conversion : sans lui, on compare
 * des inscriptions à des sessions, et les chiffres ne veulent rien dire.
 *
 * Le `useRef` protège du double montage des Effects en développement, qui
 * enverrait deux expositions pour une visite et fausserait les comptages
 * locaux.
 */
export function ExposureBeacon({ variant }: { variant: Variant }) {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true

    setVariantContext(variant)
    track('lp_exposure', { ab_variant: variant })
  }, [variant])

  return null
}
