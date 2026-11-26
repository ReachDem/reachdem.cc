/**
 * Le consentement, réduit à ce qui compte : un cookie, deux valeurs.
 *
 * On ne charge pas GTM tant que le visiteur n'a pas accepté. C'est plus strict
 * que le Consent Mode par défaut (qui charge avec `denied` et laisse Google
 * modéliser), et c'est le choix qu'on assume : la landing n'a aucun besoin de
 * mesure pour afficher son contenu.
 *
 * Le cookie porte sur `.reachdem.cc` pour survivre au passage à l'apex : un
 * visiteur qui a accepté une fois ne doit pas se voir redemander.
 */

export const CONSENT_COOKIE = 'rd_consent'
export const CONSENT_EVENT = 'rd-consent-change'
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180

export type ConsentValue = 'granted' | 'denied'

export function readConsent(): ConsentValue | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`))
  const value = match?.[1]
  return value === 'granted' || value === 'denied' ? value : null
}

export function writeConsent(value: ConsentValue): void {
  if (typeof document === 'undefined') return
  const domain = window.location.hostname.endsWith('reachdem.cc') ? '; Domain=.reachdem.cc' : ''
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${domain}${secure}`
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
