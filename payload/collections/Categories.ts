import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Blog',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'description', type: 'textarea' },
  ],
}
