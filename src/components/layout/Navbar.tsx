"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { NAV } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-white transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-17 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-blue-600 sm:text-xl"
        >
          {NAV.logo}
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-10 md:flex lg:gap-12">
          {NAV.links.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <li key={item.label} className="relative flex flex-col items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <span className="absolute -bottom-[22px] h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={NAV.loginHref}
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            {NAV.loginLabel}
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-md bg-blue-500 px-6 py-2 h-10 text-white shadow-none hover:bg-blue-600 focus-visible:ring-blue-600/40"
          >
            <Link href={NAV.ctaHref}>{NAV.cta}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden rounded-lg border-blue-300 text-blue-600 hover:bg-blue-50 sm:inline-flex"
          >
            <Link href={NAV.ctaHref}>{NAV.cta}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="border-slate-200 text-slate-700"
                aria-label={NAV.mobileMenuLabel}
              >
                <Menu className="size-5 shrink-0" aria-hidden />
              </Button>
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
                          <Link
                            href={item.href}
                            className={cn(
                              "block py-2 text-base font-medium",
                              isActive ? "text-blue-600" : "text-slate-800"
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
                <SheetClose asChild>
                  <Link
                    href={NAV.loginHref}
                    className="py-2 text-base font-semibold text-blue-600"
                  >
                    {NAV.loginLabel}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Link href={NAV.ctaHref}>{NAV.cta}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
