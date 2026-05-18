"use client"

import { AppShell } from "@/components/shell/AppShell"
import { USER_NAV } from "@/components/shell/nav-config"
import { useUserUiStore } from "@/store/useUserUiStore"

type UserShellProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userName?: string
}

export function UserShell({
  children,
  title = "Dashboard",
  subtitle,
  userName,
}: UserShellProps) {
  return (
    <AppShell
      title={title}
      subtitle={subtitle}
      userName={userName}
      nav={USER_NAV}
      panelLabel="Laundry Management"
      layoutId="user-nav-active"
      useUiStore={useUserUiStore}
    >
      {children}
    </AppShell>
  )
}
