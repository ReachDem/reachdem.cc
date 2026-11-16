import type { CollectionConfig } from 'payload'
import { seoField } from '../blocks'
import { slugField } from '../fields/slug'

/** Parcours de formation de /academy. */
export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'published', 'order'],
    group: 'Academy',
  },
  versions: { drafts: true },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'summary', type: 'textarea', required: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'level',
      type: 'select',
      defaultValue: 'debutant',
      options: [
        { label: 'Débutant', value: 'debutant' },
        { label: 'Intermédiaire', value: 'intermediaire' },
        { label: 'Avancé', value: 'avance' },
      ],
    },
    {
      name: 'requiresAccount',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Un compte ReachDem est requis pour suivre le parcours (suivi de progression).',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar' },
    },
    { name: 'content', type: 'richText', admin: { description: 'Présentation détaillée du parcours.' } },
    seoField,
  ],
}
