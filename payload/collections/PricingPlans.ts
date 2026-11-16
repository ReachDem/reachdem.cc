import type { CollectionConfig } from 'payload'

/**
 * Grille tarifaire. Remplace `lib/pricing-data.ts`.
 * `icon` est un nom d'icône lucide-react, résolu côté front.
 */
export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'cadence', 'featured', 'order'],
    group: 'Contenu',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'price', type: 'text', required: true, admin: { description: 'Texte libre, ex. « 5 000 XAF ».' } },
    { name: 'cadence', type: 'text', admin: { description: 'Ex. « /mois ».' } },
    { name: 'eyebrow', type: 'text', admin: { description: 'Ex. « Pour un opérateur solo ».' } },
    { name: 'summary', type: 'textarea' },
    { name: 'icon', type: 'text', admin: { description: 'Nom d’icône lucide-react (ex. MessageSquare).' } },
    { name: 'accent', type: 'text', admin: { description: 'Classes Tailwind d’accent (ex. bg-primary/10 text-primary).' } },
    { name: 'ctaLabel', type: 'text', required: true },
    { name: 'ctaHref', type: 'text', required: true },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryHref', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
