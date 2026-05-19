"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { Search, Users } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { AdminPageBanner } from "@/components/admin/AdminPageBanner"
import { AdminLoadingScreen } from "@/components/admin/AdminLoadingScreen"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { useAdminCustomers } from "@/hooks/useAdminPages"
import { useDebounce } from "@/hooks/useDebounce"
import type { AdminCustomer } from "@/lib/admin/types"

export default function AdminCustomersClient() {
  const { loading: authLoading, profileName } = useAdminAuth()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  const { data, isLoading, isFetching } = useAdminCustomers(debouncedSearch)

  const customers = data?.customers ?? []
  const totalOrders = useMemo(
    () => customers.reduce((s, c) => s + c.order_count, 0),
    [customers]
  )

  if (authLoading) return <AdminLoadingScreen message="Memuat pelanggan…" />

  return (
    <AdminShell
      title="Pelanggan"
      subtitle="Database pengguna terdaftar"
      userName={profileName}
    >
      <div className="space-y-6 p-4 sm:p-6">
        <AdminPageBanner
          label="Customers"
          title="Manajemen Pelanggan"
          description="Lihat profil pengguna, jumlah pesanan, dan status akun admin."
          icon={Users}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-xs text-slate-500">Total Pelanggan</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {isLoading ? "—" : customers.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
            <p className="text-xs text-slate-500">Total Pesanan</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {isLoading ? "—" : totalOrders}
            </p>
          </div>
          <div className="col-span-2 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-xl sm:col-span-1">
            <p className="text-xs text-slate-500">Admin</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {isLoading ? "—" : customers.filter((c) => c.is_admin).length}
            </p>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/60 bg-white/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Daftar Pelanggan</h3>
              <p className="text-xs text-slate-500">
                {isFetching && !isLoading ? "Memperbarui…" : "Cari berdasarkan nama, email, atau telepon"}
              </p>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari pelanggan…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full border-slate-200 bg-white/80 pl-8 sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto p-2 sm:p-4">
            {isLoading ? (
              <div className="space-y-2 p-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : customers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-medium text-slate-600">Tidak ada pelanggan</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Nama
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Kontak
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Pesanan
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Bergabung
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Role
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c: AdminCustomer) => (
                    <TableRow
                      key={c.id}
                      className="border-slate-50 transition-colors hover:bg-blue-50/30"
                    >
                      <TableCell className="py-3 font-semibold text-slate-800">
                        {c.name}
                      </TableCell>
                      <TableCell className="py-3">
                        <p className="text-sm text-slate-600">{c.phone}</p>
                        {c.email && (
                          <p className="text-[11px] text-slate-400">{c.email}</p>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-slate-700">
                        {c.order_count}
                      </TableCell>
                      <TableCell className="py-3 text-xs text-slate-500">
                        {format(new Date(c.created_at), "d MMM yyyy", { locale: localeId })}
                      </TableCell>
                      <TableCell className="py-3">
                        {c.is_admin ? (
                          <Badge className="bg-violet-500/10 text-violet-700 hover:bg-violet-500/10">
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                            User
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </motion.section>
      </div>
    </AdminShell>
  )
}
