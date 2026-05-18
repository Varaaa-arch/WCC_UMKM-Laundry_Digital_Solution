"use client"

import { UserShell } from "@/components/dashboard/UserShell"

type DashboardShellProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userName?: string
}

export default function DashboardShell({
  children,
  title,
  subtitle,
  userName,
}: DashboardShellProps) {
  return (
    <UserShell title={title} subtitle={subtitle} userName={userName}>
      {children}
    </UserShell>
  )
}
