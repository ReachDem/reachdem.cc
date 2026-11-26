/**
 * La navigation de la landing, et sa source de vérité par défaut.
 *
 * Le contenu vit dans le global Payload « Réglages du site » (menu, colonnes,
 * encart, boutons) ; ce fichier en est la **valeur de repli** et le modèle de
 * types. Deux raisons :
 *
 * - le site doit rester rendable quand la base n'est pas là (build, premier
 *   démarrage, `next dev` sans Postgres) — une navbar vide serait pire qu'une
 *   navbar par défaut ;
 * - les mêmes données servent à amorcer le CMS (`scripts/seed-nav.mjs`), donc
 *   l'admin ne repart jamais d'une page blanche.
 *
 * Structure décidée dans `docs/landing/navigation.md` (2026-11-06) :
 * Produit · Solutions · Développeurs · Ressources · Prix, puis « Parler à
 * l'équipe » et « Commencer ». Prix est un lien direct, les quatre autres
 * ouvrent un panneau.
 *
 * Les `href` pointent vers des routes encore à construire : la landing n'est
 * pas publiée tant que ces pages n'existent pas (voir les prérequis de
 * publication de la même note).
 */

export type NavBadge = 'new' | 'soon'

export type NavLink = {
  label: string
  description?: string
  href: string
  badge?: NavBadge
}

export type NavColumn = {
  /** Titre de colonne ; absent pour une colonne unique sans titre. */
  heading?: string
  links: NavLink[]
}

export type NavFeatured = {
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export type NavMenu = {
  id: string
  label: string
  /** Renseigné = lien direct, pas de panneau. */
  href?: string
  columns: NavColumn[]
  featured?: NavFeatured
  /**
   * Destinations mises en avant dans le panneau, en cartes empilées plutôt
   * qu'en colonne. Sert à Ressources : Blog et Academy sont des contenus
   * qu'on parcourt, pas des entrées de même rang que « À propos ».
   */
  featuredLinks?: NavLink[]
}

export type HeaderAction = {
  label: string
  href: string
  /** Le seul bouton plein de la barre. */
  variant: 'outline' | 'primary'
}

export type NavModel = {
  brand: string
  menus: NavMenu[]
  actions: HeaderAction[]
}

export const BADGE_LABEL: Record<NavBadge, string> = {
  new: 'Nouveau',
  soon: 'Bientôt',
}

export const DEFAULT_NAVIGATION: NavModel = {
  brand: 'ReachDem',
  menus: [
    {
      id: 'produit',
      label: 'Produit',
      columns: [
        {
          heading: 'Distribuer & prospecter',
          links: [
            {
              label: 'Cards',
              description: 'Partagez tout votre monde d’un simple geste',
              href: '/product/cards',
            },
            {
              label: 'Links',
              description: 'Votre profil pro, prêt à être partagé',
              href: '/product/links',
            },
            {
              label: 'Forms',
              description: 'Des formulaires qui convertissent',
              href: '/product/forms',
              badge: 'new',
            },
          ],
        },
        {
          heading: 'Communiquer',
          links: [
            {
              label: 'Email marketing',
              description: 'Campagnes, newsletters et séquences',
              href: '/product/email',
            },
            {
              label: 'Workflows automatisés',
              description: 'Un déclencheur, une action, sans y penser',
              href: '/product/workflows',
              badge: 'soon',
            },
          ],
        },
        {
          heading: 'Mesurer',
          links: [
            {
              label: 'Influence reporting',
              description: 'Prouvez ce que les créateurs ont diffusé',
              href: '/product/influence',
            },
            {
              label: 'IA : analytics et recommandations',
              description: 'Comprenez vos résultats, sachez quoi faire',
              href: '/product/ai',
            },
          ],
        },
      ],
    },
    {
      id: 'solutions',
      label: 'Solutions',
      columns: [
        {
          heading: 'Par métier',
          links: [
            {
              label: 'Marketing operators',
              description: 'Pilotez et prouvez chaque campagne',
              href: '/solutions/marketing-operators',
            },
            {
              label: 'Sales et business developers',
              description: 'Transformez chaque rencontre en pipeline',
              href: '/solutions/sales-business-developers',
            },
            {
              label: 'Builders',
              description: 'Ajoutez l’email à votre produit',
              href: '/solutions/builders',
            },
          ],
        },
        {
          heading: 'Par secteur',
          links: [
            {
              label: 'E-commerce',
              description: 'De la première visite à la commande suivante',
              href: '/solutions/ecommerce',
            },
            {
              label: 'Logistique',
              description: 'Prévenez chaque destinataire, à chaque étape',
              href: '/solutions/logistics',
            },
          ],
        },
        {
          heading: 'Par cas d’usage',
          links: [
            {
              label: 'Séquences de conversion',
              description: 'Du prospect au client, étape par étape',
              href: '/solutions/conversion-sequences',
            },
            {
              label: 'Notifications de commande',
              description: 'Confirmation, expédition, livraison',
              href: '/solutions/order-notifications',
            },
            {
              label: 'Création assistée par IA',
              description: 'Rédigez vos campagnes avec l’IA',
              href: '/solutions/ai-composer',
            },
            {
              label: 'Prospection terrain',
              description: 'Une carte tendue, un contact mesuré',
              href: '/solutions/field-prospecting',
            },
            {
              label: 'Preuve de diffusion',
              description: 'Ce qu’un créateur a dit, vidéo par vidéo',
              href: '/solutions/delivery-proof',
            },
          ],
        },
      ],
    },
    {
      id: 'developpeurs',
      label: 'Développeurs',
      columns: [
        {
          heading: 'Construire',
          links: [
            {
              label: 'Démarrage rapide',
              description: 'Envoyez votre premier email par API',
              href: '/docs/quickstart',
            },
            {
              label: 'Référence API',
              description: 'Chaque endpoint et chaque champ',
              href: '/docs/api',
            },
            {
              label: 'SDK',
              description: 'Node, Python et d’autres',
              href: '/docs/sdk',
            },
            {
              label: 'Webhooks',
              description: 'Statuts de livraison signés',
              href: '/docs/webhooks',
            },
            {
              label: 'Serveur MCP',
              description: 'Pilotez ReachDem depuis vos agents',
              href: '/docs/mcp',
            },
          ],
        },
        {
          heading: 'Suivre',
          links: [
            {
              label: 'Changelog',
              description: 'Ce qui est sorti récemment',
              href: '/changelog',
            },
            {
              label: 'Statut de l’API',
              description: 'Disponibilité en direct',
              href: '/status',
            },
            {
              label: 'Roadmap',
              description: 'Ce qui arrive ensuite',
              href: '/roadmap',
            },
          ],
        },
      ],
      featured: {
        title: 'Obtenir une clé API',
        description: 'Premier envoi en quelques minutes',
        ctaLabel: 'Créer un compte',
        ctaHref: '/signup',
      },
    },
    {
      id: 'ressources',
      label: 'Ressources',
      columns: [
        {
          heading: 'ReachDem',
          links: [
            {
              label: 'À propos',
              description: 'Qui nous sommes, et pourquoi',
              href: '/about',
            },
            {
              label: 'Carrières',
              description: 'Les postes ouverts',
              href: '/careers',
            },
            {
              label: 'Support',
              description: 'Une vraie personne qui répond',
              href: '/support',
            },
          ],
        },
      ],
      featuredLinks: [
        {
          label: 'Blog',
          description: 'Ce qu’on apprend en construisant ReachDem',
          href: '/blog',
        },
        {
          label: 'Academy',
          description: 'Des guides courts pour mieux envoyer',
          href: '/academy',
        },
      ],
    },
    {
      id: 'prix',
      label: 'Prix',
      href: '/pricing',
      columns: [],
    },
  ],
  actions: [
    { label: 'Parler à l’équipe', href: '/sales', variant: 'outline' },
    { label: 'Commencer', href: '/signup', variant: 'primary' },
  ],
}
