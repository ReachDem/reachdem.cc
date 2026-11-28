/**
 * Le contenu de la home, en code.
 *
 * Deux usages, une seule source :
 *  - `scripts/seed-home.ts` pousse ces blocs dans Payload ;
 *  - `app/(frontend)/page.tsx` les rend quand la base est absente — ce qui est
 *    le cas sur le Worker Cloudflare, qui n'a pas de connexion Postgres.
 *
 * Sans ce repli, la landing déployée retombait sur la pile de placeholders :
 * le CMS marche en local, mais rien n'arrivait en production.
 */

type Action = { label: string; href: string; variant: 'primary' | 'outline' }

const HERO_A = {
  blockType: 'hero' as const,
  design: 'ring' as const,
  eyebrow: 'Délivrabilité mesurée',
  title: 'Vos emails arrivent. Vous le savez.',
  subtitle:
    'Routage surveillé, rebonds traités, délivrabilité lue en direct. Fini les envois à l’aveugle : vous voyez ce qui est parti, ce qui est arrivé, et ce qui a été lu.',
  actions: [
    { label: 'Envoyer ma première campagne', href: '/signup', variant: 'primary' },
    { label: 'Voir les tarifs', href: '/pricing', variant: 'outline' },
  ] as Action[],
}

const HERO_B = {
  blockType: 'hero' as const,
  design: 'bento' as const,
  eyebrow: 'Preuve, pas promesse',
  title: 'Montrez ce que vos campagnes rapportent.',
  subtitle:
    'Ouvertures, clics, ventes attribuées — et la preuve de diffusion, créateur par créateur. Des chiffres que vous posez sur la table, pas ceux qu’il faut défendre.',
  actions: [
    { label: 'Créer mon compte', href: '/signup', variant: 'primary' },
    { label: 'Parler à l’équipe', href: '/sales', variant: 'outline' },
  ] as Action[],
}

const LOGOS = {
  blockType: 'logos' as const,
  title: 'Sponsored and powered by the best',
  items: [
    { brand: 'google' },
    { brand: 'meta' },
    { brand: 'cloudflare' },
    { brand: 'elevenlabs' },
    { brand: 'vercel' },
    { brand: 'deepseek' },
  ],
}

const FEATURES_INSET = {
  blockType: 'features' as const,
  design: 'inset' as const,
  eyebrow: 'Système d’exploitation marketing',
  title: 'Un seul système pour distribuer, communiquer et mesurer.',
  description:
    'Email, pages Links, cartes de visite, formulaires, reporting d’influence : les mêmes contacts, les mêmes événements, une seule vérité. Vous ne recollez plus quatre outils pour reconstituer une campagne.',
  items: [
    {
      title: 'Email : campagnes, newsletters, séquences',
      description: 'Du premier message à la relance, sans changer d’outil ni réimporter une liste.',
    },
    {
      title: 'Links et Cards : votre présence, partagée',
      description: 'Un profil qui prospecte, une carte qui se tend — et chaque visite attribuée.',
    },
    {
      title: 'Forms : des formulaires qui alimentent la même liste',
      description: 'Chaque réponse arrive dans le contact, prête à recevoir la campagne suivante.',
    },
    {
      title: 'Une seule vérité : contacts, événements, revenus',
      description: 'Ce que vous voyez dans l’email et ce que vous voyez en caisse, au même endroit.',
    },
  ],
  linkLabel: 'Voir la plateforme',
  linkHref: '/product',
  cardKicker: 'Le système',
  cardTitle: 'Email · Links · Cards · Forms',
  cardCaption: 'Un compte, un jeu de données, un seul endroit où regarder.',
  cardLinkLabel: 'Explorer ↑',
  cardHref: '/product',
}

const FEATURES_SHOWCASE = {
  blockType: 'features' as const,
  design: 'showcase' as const,
  title: 'La preuve, pas la promesse.',
  description: 'Deux écrans suffisent : ce qui est parti, et ce que ça a rapporté.',
  linkLabel: 'Voir un rapport complet',
  linkHref: '/product',
  items: [
    {
      visual: 'sends' as const,
      title: 'Chaque envoi, jusqu’au domaine',
      description: 'Ce qui est parti, ce qui est arrivé, ce qui a été lu — sans moyenne qui cache le défaut.',
    },
    {
      visual: 'revenue' as const,
      title: 'Le revenu, attribué campagne par campagne',
      description: 'Chaque commande remonte à la campagne qui l’a produite. Pas un clic : une vente.',
    },
  ],
}

export const HOME_TITLES = {
  a: 'Home A — promesse produit',
  b: 'Home B — promesse résultat',
} as const

export type HomeVariant = 'a' | 'b'

/** La pile de blocs d'une variante, prête à être rendue ou semée. */
export function homeLayout(variant: HomeVariant) {
  return [variant === 'b' ? HERO_B : HERO_A, LOGOS, variant === 'b' ? FEATURES_SHOWCASE : FEATURES_INSET]
}
