import type { LucideIcon } from "lucide-react"

export type ShellNavItem = {
  label: string
  href: string
  icon: LucideIcon
  disabled?: boolean
}

export type ShellUiStore = {
  sidebarCollapsed: boolean
  mobileOpen: boolean
  toggleSidebar: () => void
  setMobileOpen: (v: boolean) => void
}
