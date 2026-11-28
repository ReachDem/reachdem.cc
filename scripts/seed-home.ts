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

import { HOME_TITLES, homeLayout } from '../lib/home-layout'
import config from '../payload.config'

const VARIANTS = [
  {
    slug: 'lp-a',
    title: 'Home A — promesse produit',
    hero: {
      design: 'ring' as const,
      eyebrow: 'Délivrabilité mesurée',
      title: 'Vos emails arrivent. Vous le savez.',
      subtitle:
        'Routage surveillé, rebonds traités, délivrabilité lue en direct. Fini les envois à l’aveugle : vous voyez ce qui est parti, ce qui est arrivé, et ce qui a été lu.',
      actions: [
        { label: 'Envoyer ma première campagne', href: '/signup', variant: 'primary' },
        { label: 'Voir les tarifs', href: '/pricing', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'lp-b',
    title: 'Home B — promesse résultat',
    hero: {
      design: 'bento' as const,
      eyebrow: 'Preuve, pas promesse',
      title: 'Montrez ce que vos campagnes rapportent.',
      subtitle:
        'Ouvertures, clics, ventes attribuées — et la preuve de diffusion, créateur par créateur. Des chiffres que vous posez sur la table, pas ceux qu’il faut défendre.',
      actions: [
        { label: 'Créer mon compte', href: '/signup', variant: 'primary' },
        { label: 'Parler à l’équipe', href: '/sales', variant: 'outline' },
      ],
    },
  },
]

const FEATURES_INSET = {
    blockType: 'features' as const,
    design: 'inset' as const,
    eyebrow: 'Système d’exploitation marketing',
    title: 'Un seul système pour distribuer, communiquer et mesurer.',
    description:
      'Email, pages Links, cartes de visite, formulaires, reporting d’influence : les mêmes contacts, les mêmes événements, une seule vérité. Vous ne recollez plus quatre outils pour reconstituer une campagne.',
    items: [
      {
        title: 'Email : campagnes, newsletters, séquences',
        description: 'Du premier message à la relance, sans changer d’outil ni réimporter une liste.',
      },
      {
        title: 'Links et Cards : votre présence, partagée',
        description: 'Un profil qui prospecte, une carte qui se tend — et chaque visite attribuée.',
      },
      {
        title: 'Forms : des formulaires qui alimentent la même liste',
        description: 'Chaque réponse arrive dans le contact, prête à recevoir la campagne suivante.',
      },
      {
        title: 'Une seule vérité : contacts, événements, revenus',
        description: 'Ce que vous voyez dans l’email et ce que vous voyez en caisse, au même endroit.',
      },
    ],
    linkLabel: 'Voir la plateforme',
    linkHref: '/product',
    cardKicker: 'Le système',
    cardTitle: 'Email · Links · Cards · Forms',
    cardCaption: 'Un compte, un jeu de données, un seul endroit où regarder.',
    cardLinkLabel: 'Explorer ↑',
    cardHref: '/product',
  }

const FEATURES_SHOWCASE = {
  blockType: 'features' as const,
  design: 'showcase' as const,
  title: 'La preuve, pas la promesse.',
  description: 'Deux écrans suffisent : ce qui est parti, et ce que ça a rapporté.',
  linkLabel: 'Voir un rapport complet',
  linkHref: '/product',
  items: [
    {
      visual: 'sends' as const,
      title: 'Chaque envoi, jusqu’au domaine',
      description: 'Ce qui est parti, ce qui est arrivé, ce qui a été lu — sans moyenne qui cache le défaut.',
    },
    {
      visual: 'revenue' as const,
      title: 'Le revenu, attribué campagne par campagne',
      description: 'Chaque commande remonte à la campagne qui l’a produite. Pas un clic : une vente.',
    },
  ],
}

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
      layout: homeLayout(variant.slug === 'lp-b' ? 'b' : 'a'),
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
