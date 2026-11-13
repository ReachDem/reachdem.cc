import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Le compte ReachDem (app.reachdem.cc) est la seule identité acceptée par /academy.
 * Payload ne gère ici que le contenu : la session vient du produit.
 *
 * Deux implémentations sont possibles, et une seule est active à la fois :
 *
 * 1. **Vérification par le produit** (recommandé, rien à partager côté secret) :
 *    `REACHDEM_SESSION_VERIFY_URL` pointe vers un endpoint de app.reachdem.cc qui
 *    reçoit le cookie de session et répond `{ id, email, name? }` en 200, ou 401.
 *    C'est le même modèle que Forms, qui valide déjà la session de l'app.
 *
 * 2. **Aucune configuration** : la fonction renvoie `null`, /academy affiche un
 *    état « connexion requise » au lieu de planter. Le site reste déployable.
 *
 * Tant que `REACHDEM_SESSION_VERIFY_URL` n'est pas défini, la formation n'est pas
 * ouverte : c'est volontaire, une progression non authentifiée ne vaut rien.
 */

export type ReachDemUser = {
  id: string
  email: string
  name?: string
}

const VERIFY_URL = process.env.REACHDEM_SESSION_VERIFY_URL
const APP_URL = process.env.REACHDEM_APP_URL || 'https://app.reachdem.cc'
const COOKIE_NAMES = [
  'better-auth.session_token',
  '__Secure-better-auth.session_token',
]

export const isAcademyConfigured = Boolean(VERIFY_URL)

/** Retourne l'utilisateur ReachDem courant, ou null. Ne redirige jamais. */
export async function getReachDemUser(): Promise<ReachDemUser | null> {
  if (!VERIFY_URL) return null

  const jar = await cookies()
  const cookieHeader = COOKIE_NAMES
    .map((name) => {
      const value = jar.get(name)?.value
      return value ? `${name}=${value}` : null
    })
    .filter(Boolean)
    .join('; ')

  if (!cookieHeader) return null

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'GET',
      headers: { cookie: cookieHeader, accept: 'application/json' },
      // Une session change à chaque requête : pas de cache.
      cache: 'no-store',
    })

    if (!response.ok) return null

    const data = (await response.json()) as Partial<ReachDemUser>
    if (!data.id || !data.email) return null

    return { id: String(data.id), email: String(data.email), name: data.name }
  } catch {
    // Produit injoignable : on refuse l'accès plutôt que d'ouvrir par défaut.
    return null
  }
}

/** Comme `getReachDemUser`, mais renvoie vers la connexion produit si absent. */
export async function requireReachDemUser(nextPath: string): Promise<ReachDemUser> {
  const user = await getReachDemUser()
  if (user) return user

  const target = new URL('/login', APP_URL)
  target.searchParams.set('next', nextPath)
  redirect(target.toString())
}
