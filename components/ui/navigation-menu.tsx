'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

/**
 * NavigationMenu shadcn (style new-york), branché sur le paquet `radix-ui`
 * déjà présent dans le dépôt.
 *
 * Le `Viewport` est ce qui produit l'effet « un seul panneau qui se
 * transforme » : Radix expose la hauteur et la largeur du contenu actif en
 * variables CSS (`--radix-navigation-menu-viewport-*`), donc le panneau
 * s'anime d'un menu à l'autre au lieu d'ouvrir une boîte par menu.
 */

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn('group/navigation-menu relative flex max-w-max flex-1 items-center', className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('group flex flex-1 list-none items-center gap-1', className)}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        'group/trigger inline-flex h-9 items-center gap-1.5 rounded-md border border-transparent px-3 text-sm font-normal text-ink transition-colors',
        'hover:bg-surface-2',
        // Le déclencheur ouvert garde une bordure, et son chevron pivote.
        'data-[state=open]:border-line-strong data-[state=open]:bg-surface-2',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className="size-3.5 text-ink-soft transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'top-0 left-0 w-full p-2 md:absolute md:w-auto',
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-4 data-[motion=from-start]:slide-in-from-left-4',
        'data-[motion=to-end]:slide-out-to-right-4 data-[motion=to-start]:slide-out-to-left-4',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'flex flex-col gap-0.5 rounded-md p-2.5 text-sm transition-colors hover:bg-surface-2',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn('absolute top-full left-0 isolate z-50 flex justify-center')}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'origin-top-center relative mt-2 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-[0_18px_40px_-24px_rgba(11,11,12,0.35)] md:w-(--radix-navigation-menu-viewport-width)',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:duration-150 data-[state=open]:duration-250',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-line" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}
