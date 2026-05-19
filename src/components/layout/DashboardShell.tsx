"use client"

import { useShellPageMeta } from "@/components/shell/ShellMetaContext"

type DashboardShellProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userName?: string
}

/** Sets shell header meta only — sidebar stays mounted in dashboard layout. */
export default function DashboardShell({
  children,
  title,
  subtitle,
  userName,
}: DashboardShellProps) {
  useShellPageMeta({
    ...(title !== undefined && { title }),
    ...(subtitle !== undefined && { subtitle }),
    ...(userName !== undefined && { userName }),
  })

  return <>{children}</>
}
