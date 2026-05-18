import {
  LayoutDashboard,
  ShoppingBag,
  History,
  User,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react"
import type { ShellNavItem } from "@/components/shell/types"

export const USER_NAV: ShellNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pesan Laundry", href: "/dashboard/pesan", icon: ShoppingBag },
  { label: "Riwayat", href: "/dashboard/history", icon: History },
  { label: "Profil", href: "/dashboard/profile", icon: User },
]

export const ADMIN_NAV: ShellNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: Package, disabled: true },
  { label: "Customers", href: "/admin/customers", icon: Users, disabled: true },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, disabled: true },
  { label: "Settings", href: "/admin/settings", icon: Settings, disabled: true },
]
