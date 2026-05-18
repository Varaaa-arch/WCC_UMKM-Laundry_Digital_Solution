"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Search } from "lucide-react"
import DashboardShell from "@/components/layout/DashboardShell"
import { useAuthStore } from "@/store/useAuthStore"
import { useOrders } from "@/hooks/useOrder"

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:      { label: "Menunggu",    color: "bg-gray-100 text-gray-600" },
  picked_up:    { label: "Dijemput",    color: "bg-blue-100 text-blue-700" },
  washing:      { label: "Proses",      color: "bg-amber-100 text-amber-700" },
  finished:     { label: "Selesai",     color: "bg-green-100 text-green-700" },
  ready_pickup: { label: "Siap Ambil",  color: "bg-purple-100 text-purple-700" },
  delivered:    { label: "Terkirim",    color: "bg-teal-100 text-teal-700" },
  cancelled:    { label: "Dibatalkan",  color: "bg-red-100 text-red-600" },
}

const PAGE_SIZE = 8

export default function HistoryPage() {
  const router = useRouter()
  const { user, loading: authLoading, init } = useAuthStore()
  const { orders, loading } = useOrders()

  const [search, setSearch]       = useState("")
  const [statusFilter, setStatus] = useState("semua")
  const [page, setPage]           = useState(1)

  useEffect(() => { const u = init(); return u }, [init])
  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [authLoading, user, router])

  if (authLoading || !user) return null

  const displayName =
    (user.user_metadata?.full_name as string) ?? user.email?.split("@")[0] ?? "User"

  const filtered = orders.filter((o) => {
    const matchSearch = search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.services?.name ?? "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "semua" || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilter = (val: string) => { setStatus(val); setPage(1) }
  const handleSearch = (val: string) => { setSearch(val); setPage(1) }

  return (
    <DashboardShell
      title="Riwayat Pesanan"
      subtitle="Pantau dan kelola semua transaksi laundry kamu"
      userName={displayName}
    >
      <div className="space-y-5 p-4 sm:p-6">

        {/* Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {[
              { val: "semua",    label: "Semua Status" },
              { val: "washing",  label: "Proses" },
              { val: "finished", label: "Selesai" },
              { val: "cancelled",label: "Dibatalkan" },
            ].map(({ val, label }) => (
              <button key={val} onClick={() => handleFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  statusFilter === val
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Cari ID atau layanan..."
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 w-full sm:w-56"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-5 py-3 text-left font-medium">Tanggal</th>
                <th className="px-5 py-3 text-left font-medium">ID Pesanan</th>
                <th className="px-5 py-3 text-left font-medium">Layanan</th>
                <th className="px-5 py-3 text-left font-medium">Total Harga</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Memuat...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Tidak ada pesanan ditemukan.</td></tr>
              ) : paginated.map((order) => {
                const s = STATUS_MAP[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-600" }
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-blue-600 font-medium">#{order.id.slice(0, 8).toUpperCase()}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">{order.services?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-900">
                      Rp {(order.total_price ?? 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>
                Menampilkan {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} hingga {Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >‹</button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                      page === p ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                    }`}
                  >{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >›</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardShell>
  )
}
