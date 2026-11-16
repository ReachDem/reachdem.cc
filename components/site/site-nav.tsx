'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { BADGE_LABEL, type HeaderAction, type NavMenu, type NavModel } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { RollingText } from './rolling-text'

/**
 * La barre de navigation de la landing.
 *
 * Desktop : le `NavigationMenu` de Radix, dont le viewport unique se
 * redimensionne et se déplace d'un menu à l'autre. Prix est un lien direct,
 * les trois autres ouvrent un panneau.
 * Mobile : un `Sheet` pleine hauteur avec des accordéons — les mêmes données,
 * une autre mise en page, aucun menu qui se superpose à un autre.
 */

function Badge({ kind }: { kind: 'new' | 'soon' }) {
  return (
    <span
      className={cn(
        'ml-1 rounded-full px-1.5 py-px text-[10px] leading-4 font-medium',
        kind === 'new' ? 'bg-brand-soft text-brand-strong' : 'bg-surface-2 text-ink-soft',
      )}
    >
      {BADGE_LABEL[kind]}
    </span>
  )
}

function PanelColumn({ column }: { column: NavMenu['columns'][number] }) {
  return (
    <div className="w-[212px] shrink-0">
      {column.heading && (
        <p className="mb-1.5 px-2.5 text-[11px] font-medium tracking-[0.1em] text-ink-soft uppercase">
          {column.heading}
        </p>
      )}
      <ul>
        {column.links.map((link) => (
          <li key={link.href}>
            <NavigationMenuLink asChild>
              <Link href={link.href} className="block rounded-md px-2.5 py-2 hover:bg-surface-2">
                <span className="flex items-center text-[13.5px] leading-5 font-medium text-ink">
                  {link.label}
                  {link.badge && <Badge kind={link.badge} />}
                </span>
                {link.description && (
                  <span className="mt-0.5 block text-xs leading-4 text-ink-soft">
                    {link.description}
                  </span>
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Panel({ menu }: { menu: NavMenu }) {
  return (
    <div className="flex gap-1 p-3">
      {menu.columns.map((column, index) => (
        <PanelColumn key={column.heading ?? index} column={column} />
      ))}

      {menu.featured && (
        <div className="ml-1 w-[224px] shrink-0 self-start rounded-lg border border-line bg-surface-2 p-3.5">
          <p className="text-[13.5px] font-medium text-ink">{menu.featured.title}</p>
          {menu.featured.description && (
            <p className="mt-1 text-xs leading-4 text-ink-soft">{menu.featured.description}</p>
          )}
          {menu.featured.ctaLabel && menu.featured.ctaHref && (
            <Button asChild size="sm" className="mt-3 w-full rounded-full">
              <Link href={menu.featured.ctaHref}>{menu.featured.ctaLabel}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function HeaderActionButton({ action }: { action: HeaderAction }) {
  return (
    <Button
      asChild
      size="lg"
      variant={action.variant === 'primary' ? 'default' : 'outline'}
      className={cn(
        'group roll-host h-9 rounded-full px-4 text-[13.5px]',
        action.variant === 'outline' && 'border-line-strong bg-surface hover:bg-surface-2',
      )}
    >
      <Link href={action.href}>
        <RollingText text={action.label} />
      </Link>
    </Button>
  )
}

function MobileNav({ nav }: { nav: NavModel }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Ouvrir le menu"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <SheetContent className="gap-0 p-0">
        <SheetHeader className="border-b border-line">
          <SheetTitle>{nav.brand}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          <Accordion type="single" collapsible className="w-full">
            {nav.menus.map((menu) =>
              menu.href ? (
                <Link
                  key={menu.id}
                  href={menu.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-surface-2"
                >
                  {menu.label}
                </Link>
              ) : (
                <AccordionItem key={menu.id} value={menu.id} className="border-line">
                  <AccordionTrigger className="px-3 text-sm font-medium hover:no-underline">
                    {menu.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    {menu.columns.map((column, index) => (
                      <div key={column.heading ?? index} className="mt-1 first:mt-0">
                        {column.heading && (
                          <p className="px-3 py-1 text-[11px] font-medium tracking-[0.1em] text-ink-soft uppercase">
                            {column.heading}
                          </p>
                        )}
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 hover:bg-surface-2"
                          >
                            <span className="flex items-center text-[13.5px] font-medium text-ink">
                              {link.label}
                              {link.badge && <Badge kind={link.badge} />}
                            </span>
                            {link.description && (
                              <span className="mt-0.5 block text-xs text-ink-soft">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>

        <div className="flex flex-col gap-2 border-t border-line p-4">
          {nav.actions.map((action) => (
            <Button
              key={action.href}
              asChild
              size="lg"
              variant={action.variant === 'primary' ? 'default' : 'outline'}
              className={cn('h-11 w-full rounded-full', action.variant === 'outline' && 'border-line-strong')}
            >
              <Link href={action.href} onClick={() => setOpen(false)}>
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNav({ nav }: { nav: NavModel }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="mr-2 text-[17px] font-medium tracking-[-0.01em] text-ink">
          {nav.brand}
        </Link>

        <NavigationMenu className="hidden h-[72px] items-center lg:flex">
          <NavigationMenuList>
            {nav.menus.map((menu) =>
              menu.href ? (
                <NavigationMenuItem key={menu.id}>
                  <Link
                    href={menu.href}
                    className="inline-flex h-9 items-center rounded-md px-3 text-sm text-ink transition-colors hover:bg-surface-2"
                  >
                    {menu.label}
                  </Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={menu.id}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Panel menu={menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          {nav.actions.map((action) => (
            <span key={action.href} className={cn(action.variant === 'outline' && 'hidden sm:inline-flex')}>
              <HeaderActionButton action={action} />
            </span>
          ))}
          <MobileNav nav={nav} />
        </div>
      </div>
    </header>
  )
}
