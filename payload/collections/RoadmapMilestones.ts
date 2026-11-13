import type { CollectionConfig } from 'payload'

/** Remplace `lib/roadmap-data.ts`. */
export const RoadmapMilestones: CollectionConfig = {
  slug: 'roadmap-milestones',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['phase', 'title', 'status', 'period', 'order'],
    group: 'Contenu',
  },
  access: { read: () => true },
  fields: [
    { name: 'id', type: 'text', admin: { description: 'Identifiant lisible (ex. core-workspace).' } },
    { name: 'phase', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'planned',
      options: [
        { label: 'Livré', value: 'completed' },
        { label: 'En cours', value: 'in-progress' },
        { label: 'Prévu', value: 'planned' },
      ],
    },
    { name: 'statusLabel', type: 'text', admin: { description: 'Libellé affiché si différent du statut.' } },
    { name: 'period', type: 'text', admin: { description: 'Ex. « T4 2026 ».' } },
    { name: 'icon', type: 'text', admin: { description: 'Nom d’icône lucide-react.' } },
    { name: 'accent', type: 'text' },
    { name: 'reverse', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'preview',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'eyebrow', type: 'text' },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
