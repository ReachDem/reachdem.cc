import { DEFAULT_NAVIGATION, type HeaderAction, type NavBadge, type NavMenu, type NavModel } from '@/lib/navigation'
import { getPayloadClient } from '@/lib/payload'

import { SiteNav } from './site-nav'

/**
 * L'en-tête du site : la navigation vient du global Payload « Réglages du
 * site », avec `DEFAULT_NAVIGATION` en repli.
 *
 * Le repli n'est pas un cache : c'est ce qui permet à la landing de se rendre
 * au build et en développement sans base joignable. Une navigation vide serait
 * pire qu'une navigation par défaut, et le CMS reste la source dès qu'il a du
 * contenu — d'où le `try` explicite plutôt qu'une erreur 500 sur la home.
 */

/**
 * Forme minimale attendue du global. Déclarée ici plutôt qu'importée des types
 * générés : ceux-ci datent du dernier `payload generate:types`, et une navbar
 * qui cesse de compiler parce qu'un champ a été ajouté au CMS n'aide personne.
 * Le mapping ci-dessous tolère les deux (champ absent, valeur nulle).
 */
type SettingsRecord = {
  siteName?: string | null
  navGroups?: {
    label?: string | null
    href?: string | null
    columns?: {
      heading?: string | null
      links?: {
        label?: string | null
        href?: string | null
        description?: string | null
        badge?: string | null
      }[]
    }[]
    featured?: {
      title?: string | null
      description?: string | null
      ctaLabel?: string | null
      ctaHref?: string | null
    } | null
  }[]
  headerActions?: {
    label?: string | null
    href?: string | null
    variant?: string | null
  }[]
}

type SettingsValue = SettingsRecord | null

async function loadSettings() {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: false })
  } catch {
    return null
  }
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function toBadge(value: unknown): NavBadge | undefined {
  return value === 'new' || value === 'soon' ? value : undefined
}

/** Traduit le global Payload en modèle de navigation ; `null` s'il est vide. */
function toNavModel(settings: SettingsValue): NavModel | null {
  const groups = settings?.navGroups
  if (!Array.isArray(groups) || groups.length === 0) return null

  const menus: NavMenu[] = groups.flatMap((group, index) => {
    const label = typeof group?.label === 'string' ? group.label.trim() : ''
    if (!label) return []

    const columns = (group.columns ?? []).flatMap((column) => {
      const links = (column?.links ?? []).flatMap((link) => {
        const linkLabel = typeof link?.label === 'string' ? link.label.trim() : ''
        const href = typeof link?.href === 'string' ? link.href.trim() : ''
        if (!linkLabel || !href) return []
        return [
          {
            label: linkLabel,
            description: link.description?.trim() || undefined,
            href,
            badge: toBadge(link.badge),
          },
        ]
      })
      return links.length > 0 ? [{ heading: column?.heading?.trim() || undefined, links }] : []
    })

    const featured = group.featured?.title
      ? {
          title: group.featured.title,
          description: group.featured.description ?? undefined,
          ctaLabel: group.featured.ctaLabel ?? undefined,
          ctaHref: group.featured.ctaHref ?? undefined,
        }
      : undefined

    return [
      {
        id: slugify(label) || `menu-${index}`,
        label,
        href: group.href?.trim() || undefined,
        columns,
        featured,
      },
    ]
  })

  if (menus.length === 0) return null

  const actions: HeaderAction[] = (settings?.headerActions ?? []).flatMap((action) => {
    const label = typeof action?.label === 'string' ? action.label.trim() : ''
    const href = typeof action?.href === 'string' ? action.href.trim() : ''
    if (!label || !href) return []
    return [{ label, href, variant: action.variant === 'primary' ? 'primary' : 'outline' }]
  })

  return {
    brand: settings?.siteName?.trim() || DEFAULT_NAVIGATION.brand,
    menus,
    actions: actions.length > 0 ? actions : DEFAULT_NAVIGATION.actions,
  }
}

export async function SiteHeader() {
  const settings = (await loadSettings()) as SettingsValue
  const nav = toNavModel(settings) ?? DEFAULT_NAVIGATION
  return <SiteNav nav={nav} />
}
