"use client"

import { useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { MoreHorizontal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge"
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useAdminDashboard"
import { useDebounce } from "@/hooks/useDebounce"
import { formatCurrency, ORDER_STATUSES, STATUS_LABELS } from "@/lib/admin/constants"
import type { AdminOrder } from "@/lib/admin/types"
import { toast } from "sonner"
import type { OrderStatus } from "@/lib/admin/constants"

type OrdersTableProps = {
  title?: string
  subtitle?: string
  limit?: number
  showPhone?: boolean
}

export function RecentOrdersTable({
  title = "Pesanan Terbaru",
  subtitle = "Kelola dan filter pesanan masuk",
  limit = 15,
  showPhone = false,
}: OrdersTableProps = {}) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const debouncedSearch = useDebounce(search, 300)
  const { data, isLoading, isFetching } = useAdminOrders(debouncedSearch, status, limit)
  const updateStatus = useUpdateOrderStatus()

  const orders = data?.orders ?? []

  const columns = useMemo<ColumnDef<AdminOrder>[]>(
    () => [
      {
        accessorKey: "order_number",
        header: "Order",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-slate-800">{row.original.order_number}</p>
            <p className="text-[11px] text-slate-400">{row.original.customer_name}</p>
          </div>
        ),
      },
      {
        id: "service",
        header: "Layanan",
        cell: ({ row }) => (
          <span className="text-sm text-slate-600">
            {row.original.services?.name ?? "—"}
          </span>
        ),
      },
      ...(showPhone
        ? [
            {
              accessorKey: "phone",
              header: "Telepon",
              cell: ({ row }: { row: { original: AdminOrder } }) => (
                <span className="text-sm text-slate-600">{row.original.phone}</span>
              ),
            } as ColumnDef<AdminOrder>,
          ]
        : []),
      {
        accessorKey: "total_price",
        header: "Total",
        cell: ({ row }) => (
          <span className="text-sm font-semibold text-slate-800">
            {formatCurrency(row.original.total_price)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "created_at",
        header: "Tanggal",
        cell: ({ row }) => (
          <span className="text-xs text-slate-500">
            {format(new Date(row.original.created_at), "d MMM yyyy", { locale: localeId })}
          </span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs" className="text-slate-400">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {ORDER_STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  disabled={updateStatus.isPending}
                  onClick={() => {
                    updateStatus.mutate(
                      { id: row.original.id, status: s },
                      {
                        onSuccess: () =>
                          toast.success(`Status → ${STATUS_LABELS[s as OrderStatus]}`),
                        onError: () => toast.error("Gagal memperbarui status"),
                      }
                    )
                  }}
                >
                  {STATUS_LABELS[s as OrderStatus]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [updateStatus, showPhone]
  )

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
      className="rounded-2xl border border-white/60 bg-white/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">
            {isFetching && !isLoading ? "Memperbarui…" : subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari order, nama, telepon…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full border-slate-200 bg-white/80 pl-8 sm:w-56"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-full border-slate-200 bg-white/80 sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto p-2 sm:p-4">
        {isLoading ? (
          <div className="space-y-2 p-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm font-medium text-slate-600">Tidak ada pesanan</p>
            <p className="mt-1 text-xs text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-slate-100 hover:bg-transparent">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-slate-50 transition-colors hover:bg-blue-50/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </motion.section>
  )
}
