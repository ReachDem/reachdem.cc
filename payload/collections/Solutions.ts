import type { CollectionConfig } from 'payload'
import { layoutBlocks, seoField } from '../blocks'
import { slugField } from '../fields/slug'

/**
 * Pages Solutions (`/solutions/<slug>`).
 * Trois familles, conformes au menu décidé le 2026-11-06 :
 * par métier, par secteur, par cas d'usage.
 */
export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'family', 'slug', 'order'],
    group: 'Contenu',
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'family',
      type: 'select',
      required: true,
      options: [
        { label: 'Par métier', value: 'metier' },
        { label: 'Par secteur', value: 'secteur' },
        { label: 'Par cas d’usage', value: 'cas-usage' },
      ],
    },
    {
      name: 'menuLabel',
      type: 'text',
      admin: { description: 'Libellé court affiché dans le menu déroulant Solutions.' },
    },
    {
      name: 'menuDescription',
      type: 'text',
      admin: { description: 'Une ligne affichée sous le libellé dans le menu.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Ordre d’affichage (croissant).' },
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Décocher pour afficher « Bientôt » au lieu d’un lien.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: layoutBlocks,
      admin: { description: 'Gabarit sent.dm : résultat, tension, douleurs, capacités, contrôle, fiabilité, FAQ.' },
    },
    seoField,
  ],
}
