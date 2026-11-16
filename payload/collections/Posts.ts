import type { CollectionConfig } from 'payload'
import { seoField } from '../blocks'
import { slugField } from '../fields/slug'

/** Articles de /blog. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status'],
    group: 'Blog',
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${data?.slug ?? ''}`,
    },
  },
  versions: { drafts: true },
  access: {
    // Seuls les articles publiés sont lisibles publiquement.
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'Résumé affiché dans la liste et en méta description.' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Date de publication affichée. Peut être future pour programmer la mise en avant.',
      },
    },
    {
      name: 'readingMinutes',
      type: 'number',
      admin: { position: 'sidebar', description: 'Laisser vide pour un calcul automatique.' },
    },
    { name: 'content', type: 'richText', required: true },
    seoField,
  ],
}
