/**
 * Le tirage A/B de la landing.
 *
 * Un seul point d'entrée : `/`. Le visiteur reçoit une variante une fois, elle
 * est écrite dans un cookie, et elle ne bouge plus. Le hash porte sur l'IP et
 * l'user-agent plutôt que sur un compteur : deux visiteurs différents n'ont
 * pas besoin d'alterner, ils ont besoin d'être stables.
 *
 * Le cookie est posé sur `.reachdem.cc` en production pour survivre au passage
 * du sous-domaine provisoire vers l'apex. Un cookie d'hôte (`landing.reachdem.cc`)
 * mourrait à la bascule et réassignerait tout le monde — donc réexposerait tout
 * le monde, et le test serait bon à jeter.
 */

export const EXPERIMENT_COOKIE = 'rd_ab'
export const EXPERIMENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 90
export const VARIANT_HEADER = 'x-rd-variant'

export type Variant = 'a' | 'b'

export function normalizeVariant(value: string | null | undefined): Variant | null {
  return value === 'a' || value === 'b' ? value : null
}

/** FNV-1a 32 bits : stable, sans dépendance, exécutable dans le middleware. */
export function hashSeed(seed: string): number {
  let hash = 0x811c9dc5
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function assignVariant(seed: string): Variant {
  return hashSeed(seed) % 2 === 0 ? 'a' : 'b'
}

/**
 * Les robots et les aperçus de liens ne participent pas au test : ils
 * recevraient une variante au hasard, ce qui ferait changer l'aperçu d'une
 * annonce d'un scan à l'autre et polluerait le dénominateur.
 */
const NON_HUMAN =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|facebookexternalhit|slackbot|discordbot|whatsapp|telegrambot|google-inspectiontool/i

export function isNonHuman(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true
  return NON_HUMAN.test(userAgent)
}
