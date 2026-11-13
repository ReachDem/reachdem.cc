import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/** Leçons d'un parcours. L'ordre est porté par `order`. */
export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'order', 'durationMinutes', '_status'],
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
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      index: true,
    },
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: { description: 'Ordre dans le parcours (croissant).' },
    },
    { name: 'summary', type: 'textarea' },
    {
      name: 'durationMinutes',
      type: 'number',
      admin: { description: 'Durée estimée, en minutes.' },
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Visible sans compte : sert d’aperçu pour décider de s’inscrire.',
      },
    },
    { name: 'content', type: 'richText', required: true },
  ],
}
