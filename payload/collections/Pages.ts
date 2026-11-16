import type { CollectionConfig } from 'payload'
import { layoutBlocks, seoField } from '../blocks'
import { slugField } from '../fields/slug'

/**
 * Pages libres (home, /pricing, /faq, /roadmap, pages éditoriales).
 * Le contenu est une pile de blocs : l'ordre des sections se change depuis l'admin.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'layout', 'updatedAt'],
    group: 'Contenu',
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const slug = data?.slug as string | undefined
        return slug && slug !== 'home' ? `${base}/${slug}` : base
      },
    },
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'layout',
      type: 'blocks',
      blocks: layoutBlocks,
      admin: { description: 'Sections de la page, dans l’ordre d’affichage.' },
    },
    seoField,
  ],
}
