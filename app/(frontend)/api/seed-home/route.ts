import { seedHome } from '@/scripts/seed-home'

/**
 * Amorce les pages `lp-a` / `lp-b` depuis le serveur Next, en développement
 * uniquement.
 *
 * Le script en ligne de commande ne peut pas tourner ici : Payload charge
 * `undici` au démarrage, qui casse sous Node 24 sur cette machine. Le serveur
 * Next, lui, charge Payload correctement — donc on passe par lui.
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  try {
    await seedHome()
    return Response.json({ ok: true, pages: ['lp-a', 'lp-b'] })
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
