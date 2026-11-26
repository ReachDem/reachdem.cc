import { getPayloadClient } from './payload'

/**
 * Les pages Payload, lues par slug.
 *
 * `draft: false` volontairement : la landing publique ne doit jamais rendre un
 * brouillon. La prévisualisation passe par la route dédiée de Payload, pas par
 * cette fonction.
 */
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft: false,
  })

  return docs[0] ?? null
}

/**
 * Même lecture, mais sans jamais casser la home : si la base est absente (build
 * Cloudflare, premier démarrage), on rend le repli du code plutôt qu'une 500.
 * C'est la même règle que pour la navigation.
 */
export async function getPageBySlugSafe(slug: string) {
  try {
    return await getPageBySlug(slug)
  } catch {
    return null
  }
}
