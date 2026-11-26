import type { Block, Field } from 'payload'

/**
 * Blocs de mise en page réutilisables.
 * Chaque bloc correspond à un composant déjà présent dans `components/landing/`,
 * pour que le CMS pilote l'existant au lieu d'imposer une nouvelle grammaire visuelle.
 */

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heros' },
  fields: [
    {
      name: 'design',
      type: 'select',
      defaultValue: 'ring',
      admin: {
        description:
          'Mise en page du hero. « Manège » = panneaux produit en 3D qui tournent et se glissent à la main ; « Bento » = texte à gauche, collage à droite.',
      },
      options: [
        { label: 'Manège 3D (hero734)', value: 'ring' },
        { label: 'Bento éditorial (hero104)', value: 'bento' },
        { label: 'Cartes flottantes (ancien)', value: 'panels' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'wordRotate',
      type: 'array',
      maxRows: 6,
      admin: { description: 'Mots qui défilent dans le titre (composant WordRotate).' },
      fields: [{ name: 'word', type: 'text', required: true }],
    },
    {
      name: 'actions',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Plein', value: 'primary' },
            { label: 'Contour', value: 'outline' },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Fonctionnalités', plural: 'Fonctionnalités' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text', admin: { description: 'Nom d’icône lucide-react (ex. Mail).' } },
        { name: 'badge', type: 'text', admin: { description: 'Ex. « Nouveau », « Bientôt ».' } },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

export const LogosBlock: Block = {
  slug: 'logos',
  labels: { singular: 'Logos', plural: 'Logos' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const ProcessBlock: Block = {
  slug: 'process',
  labels: { singular: 'Étapes', plural: 'Étapes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Appel à l’action', plural: 'Appels à l’action' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryHref', type: 'text' },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Texte riche', plural: 'Textes riches' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
  ],
}

export const layoutBlocks: Block[] = [
  HeroBlock,
  FeaturesBlock,
  LogosBlock,
  ProcessBlock,
  RichTextBlock,
  FaqBlock,
  CtaBlock,
]

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'noIndex', type: 'checkbox', defaultValue: false },
  ],
}
