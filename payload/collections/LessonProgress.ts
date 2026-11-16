import type { CollectionConfig } from 'payload'

/**
 * Progression d'un utilisateur ReachDem sur une leçon.
 *
 * `userRef` est l'identifiant du compte **ReachDem** (app.reachdem.cc), pas un
 * utilisateur Payload : la formation est un service du produit, pas de l'admin du site.
 * Aucune donnée personnelle au-delà de l'email (affichage) n'est stockée ici.
 *
 * Écriture exclusive côté serveur via l'API locale (server actions), donc
 * `create` est refusé en REST public : personne ne peut cocher une leçon pour autrui.
 */
export const LessonProgress: CollectionConfig = {
  slug: 'lesson-progress',
  labels: { singular: 'Progression', plural: 'Progression' },
  admin: {
    useAsTitle: 'userEmail',
    defaultColumns: ['userEmail', 'course', 'lesson', 'completedAt'],
    group: 'Academy',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  indexes: [
    // Une seule ligne par (utilisateur, leçon) : la contrainte est en base, pas seulement en code.
    { fields: ['userRef', 'lesson'], unique: true },
  ],
  fields: [
    {
      name: 'userRef',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Identifiant du compte ReachDem.' },
    },
    { name: 'userEmail', type: 'email', admin: { description: 'Pour l’affichage dans l’admin.' } },
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true, index: true },
    { name: 'lesson', type: 'relationship', relationTo: 'lessons', required: true, index: true },
    {
      name: 'completedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
