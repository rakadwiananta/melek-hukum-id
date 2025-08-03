'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'>
>(({ className, children, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('relative z-10', className)}
    {...props}
  >
    {children}
  </nav>
))
NavigationMenu.displayName = 'NavigationMenu'

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
    {...props}
  />
))
NavigationMenuList.displayName = 'NavigationMenuList'

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('relative', className)}
    {...props}
  />
))
NavigationMenuItem.displayName = 'NavigationMenuItem'

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </button>
))
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute left-0 top-full mt-1.5 w-full overflow-hidden rounded-md border bg-white shadow-lg',
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = 'NavigationMenuContent'

interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, asChild, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      className
    )}
    {...props}
  />
))
NavigationMenuLink.displayName = 'NavigationMenuLink'

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
}
