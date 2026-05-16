"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { NAV } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/store/useAuthStore"
import { signOut } from "@/actions/auth-action"
import { useNavigation } from "@/contexts/NavigationContext"

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Custom link component that uses navigation context
function NavLink({ href, children, className, onClick, ...props }: React.ComponentProps<typeof Link>) {
  const { navigate, isTransitioning } = useNavigation()
  const pathname = usePathname()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick(e)
    await navigate(href)
  }

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    />
  )
}

export function Navbar() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const { user, loading, init } = useAuthStore()
  const { navigate, isTransitioning } = useNavigation()
  const reduced = Boolean(prefersReducedMotion)

  React.useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  const handleSignOut = async () => {
    await signOut()
    await navigate("/")
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        className="pointer-events-auto w-full max-w-4xl flex items-center justify-between bg-blue-500 rounded-full px-4 py-2.5 shadow-lg mt-3"
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        aria-label="Primary"
      >
        {/* Logo */}
        <NavLink href="/" className="text-base font-bold tracking-tight text-white shrink-0 pl-1">
          {NAV.logo}
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.links.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <li key={item.label}>
                <NavLink
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors cursor-pointer",
                    isActive ? "text-white" : "text-blue-100 hover:text-white"
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-16 h-8 bg-gray-700 rounded-full animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <NavLink href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
                    {(user.user_metadata?.full_name as string)?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block">{(user.user_metadata?.full_name as string) ?? user.email}</span>
              </NavLink>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <NavLink
                href={NAV.loginHref}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-2 cursor-pointer"
              >
                {NAV.loginLabel}
              </NavLink>
              <NavLink
                href={NAV.ctaHref}
                className="rounded-full bg-white text-gray-900 text-sm font-semibold px-5 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {NAV.cta}
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-gray-300 hover:text-white p-1" aria-label={NAV.mobileMenuLabel}>
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)] sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">{NAV.mobileSheetTitle}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-2 pb-8 pt-2">
                <ul className="flex flex-col gap-4">
                  {NAV.links.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                    return (
                      <li key={`${item.label}-mobile`}>
                        <SheetClose asChild>
                          <NavLink
                            href={item.href}
                            className={cn(
                              "block py-2 text-base font-medium cursor-pointer",
                              isActive ? "text-blue-600" : "text-slate-800"
                            )}
                          >
                            {item.label}
                          </NavLink>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
                <SheetClose asChild>
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <NavLink href="/dashboard" className="flex items-center gap-2 py-2 text-base font-semibold text-blue-600 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </NavLink>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 py-2 text-base font-semibold text-red-500 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  ) : (
                    <NavLink href={NAV.loginHref} className="py-2 text-base font-semibold text-blue-600 cursor-pointer">
                      {NAV.loginLabel}
                    </NavLink>
                  )}
                </SheetClose>
                {!user && (
                  <SheetClose asChild>
                    <NavLink
                      href={NAV.ctaHref}
                      className="w-full rounded-full bg-blue-600 text-white text-sm font-semibold px-5 py-3 hover:bg-blue-700 transition-colors text-center cursor-pointer"
                    >
                      {NAV.cta}
                    </NavLink>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  )
}
