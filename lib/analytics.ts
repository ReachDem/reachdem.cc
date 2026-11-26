/**
 * Le contrat d'événements de la landing.
 *
 * Un seul `track()` alimente le dataLayer ; GTM traduit ensuite vers GA4,
 * PostHog ou Ads. Conséquence volontaire : ajouter un outil ne touche plus au
 * code, et deux outils ne peuvent pas compter deux fois le même événement
 * puisqu'il n'y a qu'un seul point d'émission.
 *
 * Règle : un événement de conversion s'émet **côté serveur** (Measurement
 * Protocol / API PostHog), jamais au clic. Ici, seuls les événements
 * d'intention sont côté client.
 */

import type { Variant } from './experiments'

type EventProps = {
  /** Exposition à une variante : le dénominateur de tout le reste. */
  lp_exposure: { ab_variant: Variant }
  /** Clic sur un CTA, avant toute saisie. */
  cta_clicked: { ab_variant: Variant; cta: string; location: string }
  /** Le formulaire d'inscription a reçu un premier focus. */
  signup_started: { ab_variant: Variant }
  /** Échec de validation côté client : où le formulaire bloque. */
  signup_error: { ab_variant: Variant; field: string; reason: string }
}

export type EventName = keyof EventProps

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

export function track<K extends EventName>(name: K, props: EventProps[K]): void {
  pushDataLayer({ event: name, ...props })
}

/**
 * Les balises GA4 lisent la variante comme variable de dataLayer. On la pousse
 * avant tout événement pour qu'un tag qui se déclenche tôt la trouve déjà.
 */
export function setVariantContext(variant: Variant): void {
  pushDataLayer({ ab_variant: variant })
}
