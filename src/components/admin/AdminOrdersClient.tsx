"use client"

import { Package } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { AdminPageBanner } from "@/components/admin/AdminPageBanner"
import { AdminLoadingScreen } from "@/components/admin/AdminLoadingScreen"
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable"
import { useAdminAuth } from "@/hooks/useAdminAuth"

export default function AdminOrdersClient() {
  const { loading, profileName } = useAdminAuth()

  if (loading) return <AdminLoadingScreen message="Memuat pesanan…" />

  return (
    <AdminShell
      title="Kelola Pesanan"
      subtitle="Daftar lengkap semua pesanan laundry"
      userName={profileName}
    >
      <div className="space-y-6 p-4 sm:p-6">
        <AdminPageBanner
          label="Orders"
          title="Manajemen Pesanan"
          description="Cari, filter, dan perbarui status pesanan pelanggan dari satu tempat."
          icon={Package}
        />
        <RecentOrdersTable
          title="Semua Pesanan"
          subtitle="Tampilkan hingga 100 pesanan terbaru"
          limit={100}
          showPhone
        />
      </div>
    </AdminShell>
  )
}
