"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Save } from "lucide-react"
import { toast } from "sonner"
import { AdminShell } from "@/components/admin/AdminShell"
import { AdminPageBanner } from "@/components/admin/AdminPageBanner"
import { AdminLoadingScreen } from "@/components/admin/AdminLoadingScreen"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { useAdminServices, useUpdateService } from "@/hooks/useAdminPages"
import { formatCurrency } from "@/lib/admin/constants"
import type { AdminService } from "@/lib/admin/types"

function ServiceCard({ service }: { service: AdminService }) {
  const update = useUpdateService()
  const [name, setName] = useState(service.name)
  const [price, setPrice] = useState(String(service.price_per_kg))
  const [description, setDescription] = useState(service.description ?? "")
  const [duration, setDuration] = useState(service.duration ?? "")

  const handleSave = () => {
    const priceNum = Number(price)
    if (!name.trim() || Number.isNaN(priceNum) || priceNum < 0) {
      toast.error("Nama dan harga harus valid")
      return
    }
    update.mutate(
      {
        id: service.id,
        name: name.trim(),
        price_per_kg: priceNum,
        description: description.trim() || undefined,
        duration: duration.trim() || undefined,
      },
      {
        onSuccess: () => toast.success(`Layanan "${name}" disimpan`),
        onError: () => toast.error("Gagal menyimpan layanan"),
      }
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">{service.name}</h4>
          <p className="text-xs text-slate-500">
            Saat ini: {formatCurrency(service.price_per_kg)} / kg
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={update.isPending}
          className="gap-1.5 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="size-3.5" />
          Simpan
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${service.id}`}>Nama Layanan</Label>
          <Input
            id={`name-${service.id}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-slate-200 bg-white/80"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`price-${service.id}`}>Harga / kg (IDR)</Label>
          <Input
            id={`price-${service.id}`}
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-slate-200 bg-white/80"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`desc-${service.id}`}>Deskripsi</Label>
          <Input
            id={`desc-${service.id}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-slate-200 bg-white/80"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`dur-${service.id}`}>Estimasi Durasi</Label>
          <Input
            id={`dur-${service.id}`}
            placeholder="mis. 1-2 hari"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border-slate-200 bg-white/80"
          />
        </div>
      </div>
    </motion.article>
  )
}

export default function AdminSettingsClient() {
  const { loading: authLoading, profileName } = useAdminAuth()
  const { data, isLoading } = useAdminServices()

  if (authLoading) return <AdminLoadingScreen message="Memuat pengaturan…" />

  const services = data?.services ?? []

  return (
    <AdminShell
      title="Pengaturan"
      subtitle="Konfigurasi layanan & sistem"
      userName={profileName}
    >
      <div className="space-y-6 p-4 sm:p-6">
        <AdminPageBanner
          label="Settings"
          title="Pengaturan Admin"
          description="Kelola harga layanan laundry, deskripsi, dan estimasi waktu pengerjaan."
          icon={Settings}
        />

        <section className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
          <h3 className="text-base font-semibold text-slate-900">Info Aplikasi</h3>
          <p className="mt-1 text-xs text-slate-500">
            URL aplikasi dan redirect auth dikonfigurasi via environment variables.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                App URL
              </p>
              <p className="mt-1 truncate text-sm text-slate-700">
                {process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Auth Redirect
              </p>
              <p className="mt-1 truncate text-sm text-slate-700">
                {process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ??
                  "http://localhost:3000/auth/callback"}
              </p>
            </div>
          </div>
        </section>

        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Layanan Laundry</h3>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-2xl" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center">
              <p className="text-sm text-slate-500">Belum ada layanan terdaftar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
