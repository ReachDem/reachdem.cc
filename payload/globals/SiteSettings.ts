import type { GlobalConfig } from 'payload'

const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
  { name: 'description', type: 'text' as const },
]

/**
 * Réglages globaux du site : navigation, pied de page, contacts.
 * Évite d'avoir le menu et le footer codés en dur dans `components/Header.tsx`
 * et `components/Footer.tsx`.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Réglages du site',
  admin: { group: 'Contenu' },
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'ReachDem' },
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://reachdem.cc',
      admin: { description: 'URL canonique, sans barre finale.' },
    },
    {
      name: 'headerActions',
      type: 'array',
      maxRows: 2,
      admin: { description: 'Boutons de l’en-tête : « Parler à l’équipe » puis « Commencer ».' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'outline',
          options: [
            { label: 'Contour', value: 'outline' },
            { label: 'Plein', value: 'primary' },
          ],
        },
      ],
    },
    {
      name: 'navGroups',
      type: 'array',
      label: 'Menus de navigation',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'columns',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'links', type: 'array', fields: linkFields },
          ],
        },
        {
          name: 'featured',
          type: 'group',
          label: 'Encart à droite',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'ctaLabel', type: 'text' },
            { name: 'ctaHref', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'links', type: 'array', fields: linkFields },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'salesEmail', type: 'email', admin: { description: 'Destinataire du formulaire /sales.' } },
        { name: 'supportEmail', type: 'email' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
