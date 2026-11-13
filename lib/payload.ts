import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Client Payload local, utilisable depuis les composants serveur et les
 * server actions.
 *
 * Attention à `overrideAccess` : l'API locale l'active par défaut, ce qui
 * contournerait les règles `access` des collections. On le désactive
 * explicitement pour tout ce qui est public (articles publiés, leçons publiées),
 * et on l'active seulement quand la requête est déjà cadrée par le code
 * (progression d'un utilisateur précis).
 */
export const getPayloadClient = () => getPayload({ config })

/** Article publié, ou null. Respecte la règle `access` de la collection. */
export async function getPublishedPost(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  })
  return docs[0] ?? null
}

/** Parcours publié, ou null. */
export async function getPublishedCourse(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'courses',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  })
  return docs[0] ?? null
}
