import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

/** Remplace `lib/legal-documents.ts` (qui lisait des fichiers markdown). */
export const LegalDocuments: CollectionConfig = {
  slug: 'legal-documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'effectiveDate', 'updatedAt'],
    group: 'Contenu',
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'effectiveDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
  ],
}
