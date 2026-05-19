"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useEffect, useState, type ComponentType } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { isNavActive } from "@/lib/shell/routes"

type SidebarNavLinkProps = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  disabled?: boolean
  collapsed: boolean
  mobile: boolean
  layoutId: string
  onNavigate?: () => void
}

export const SidebarNavLink = memo(function SidebarNavLink({
  label,
  href,
  icon: Icon,
  disabled,
  collapsed,
  mobile,
  layoutId,
  onNavigate,
}: SidebarNavLinkProps) {
  const pathname = usePathname()
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  useEffect(() => {
    if (pendingHref && isNavActive(pathname, pendingHref)) {
      setPendingHref(null)
    }
  }, [pathname, pendingHref])

  const activePath = pendingHref ?? pathname
  const active = isNavActive(activePath, href)

  return (
    <Link
      href={disabled ? "#" : href}
      prefetch
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        if (!isNavActive(pathname, href)) {
          setPendingHref(href)
        }
        if (mobile) onNavigate?.()
      }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
        "transition-colors duration-200 ease-out",
        collapsed && "justify-center px-2",
        disabled && "cursor-not-allowed opacity-40",
        active ? "text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 shadow-md shadow-blue-500/25"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      <Icon className="relative z-10 size-4 shrink-0" />
      {!collapsed && <span className="relative z-10">{label}</span>}
    </Link>
  )
})
