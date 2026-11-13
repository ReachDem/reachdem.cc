import type { Field } from 'payload'

/**
 * Slug d'URL : minuscules, tirets, unique par collection.
 * Alimenté depuis un champ source (titre par défaut) mais toujours éditable.
 */
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Identifiant d’URL. Minuscules et tirets, sans accents.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const raw = (value as string | undefined)?.trim()
          || (data?.[source] as string | undefined)
          || ''
        return raw
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      },
    ],
  },
})
