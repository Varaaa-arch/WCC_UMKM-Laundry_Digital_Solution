"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardShell from "@/components/layout/DashboardShell"
import { useAuthStore } from "@/store/useAuthStore"
import DashboardPesanClient from "./DashboardPesanClient"
import type { Service } from "@/types/service"

export default function PesanPageShell({ services }: { services: Service[] }) {
  const router = useRouter()
  const { user, loading: authLoading, init } = useAuthStore()

  useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [authLoading, user, router])

  const displayName =
    (user?.user_metadata?.full_name as string) ?? user?.email?.split("@")[0] ?? "User"

  if (authLoading || !user) {
    return (
      <DashboardShell title="Pesan Laundry" subtitle="Booking layanan laundry">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell
      title="Pesan Laundry"
      subtitle="Pilih layanan dan buat pesanan baru"
      userName={displayName}
    >
      <DashboardPesanClient services={services} />
    </DashboardShell>
  )
}
