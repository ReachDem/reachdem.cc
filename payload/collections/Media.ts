import type { CollectionConfig } from 'payload'

/**
 * Médias. Le stockage réel (Cloudflare R2) est branché dans payload.config.ts
 * via @payloadcms/storage-s3, uniquement si les variables S3_* sont présentes.
 * Sans elles, le stockage local fonctionne : le CMS démarre quand même.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'],
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Texte alternatif, obligatoire pour l’accessibilité et le SEO.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Crédit ou source, si nécessaire.' },
    },
  ],
}
