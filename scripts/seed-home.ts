/**
 * Amorce les deux pages de la home A/B dans Payload.
 *
 * Deux documents, deux slugs (`lp-a`, `lp-b`), un hero chacun : c'est assez
 * pour que le middleware ait quelque chose à servir et pour que le test A/B
 * compare deux promesses réelles, pas deux copies.
 *
 * Idempotent : relancer le script met à jour les pages existantes au lieu de
 * les dupliquer.
 *
 *   pnpm exec tsx scripts/seed-home.ts
 */
import { getPayload } from 'payload'

import config from '../payload.config'

const VARIANTS = [
  {
    slug: 'lp-a',
    title: 'Home A — promesse produit',
    hero: {
      eyebrow: 'Campagnes, liens, formulaires',
      title: 'Envoyez, mesurez, recommencez.',
      subtitle:
        'Une seule plateforme pour vos campagnes email, vos pages Links et vos formulaires. Un seul jeu de données, aucune réconciliation à faire.',
      actions: [
        { label: 'Commencer', href: '/signup', variant: 'primary' },
        { label: 'Voir les tarifs', href: '/pricing', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'lp-b',
    title: 'Home B — promesse résultat',
    hero: {
      eyebrow: 'Pensé pour les équipes terrain',
      title: 'Vos clients vous lisent. Enfin.',
      subtitle:
        'La plateforme email des équipes qui n’ont pas le temps d’échouer : délivrabilité suivie, segmentation simple, résultats lisibles le lundi matin.',
      actions: [
        { label: 'Créer mon compte', href: '/signup', variant: 'primary' },
        { label: 'Parler à l’équipe', href: '/sales', variant: 'outline' },
      ],
    },
  },
]

export async function seedHome() {
  const payload = await getPayload({ config })

  for (const variant of VARIANTS) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: variant.slug } },
      limit: 1,
      depth: 0,
    })

    const data = {
      title: variant.title,
      slug: variant.slug,
      _status: 'published' as const,
      layout: [{ blockType: 'hero' as const, ...variant.hero }],
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
      payload.logger.info(`[seed-home] ${variant.slug} mis à jour`)
    } else {
      await payload.create({ collection: 'pages', data })
      payload.logger.info(`[seed-home] ${variant.slug} créé`)
    }
  }
}

if (process.argv[1]?.includes('seed-home')) {
  seedHome()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
