"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

export type ShellMeta = {
  title: string
  subtitle?: string
  userName?: string
}

type ShellSegment = "dashboard" | "admin"

const PATH_DEFAULTS: Record<ShellSegment, Record<string, ShellMeta>> = {
  dashboard: {
    "/dashboard": { title: "Dashboard" },
    "/dashboard/pesan": {
      title: "Pesan Laundry",
      subtitle: "Pilih layanan dan buat pesanan baru",
    },
    "/dashboard/history": {
      title: "Riwayat Pesanan",
      subtitle: "Pantau dan kelola semua transaksi laundry kamu",
    },
    "/dashboard/profile": {
      title: "Profil & Pengaturan",
      subtitle: "Kelola detail akun dan preferensi kamu",
    },
  },
  admin: {
    "/admin": { title: "Admin Dashboard" },
    "/admin/order": {
      title: "Kelola Pesanan",
      subtitle: "Daftar lengkap semua pesanan laundry",
    },
    "/admin/cust": {
      title: "Pelanggan",
      subtitle: "Database pengguna terdaftar",
    },
    "/admin/analytics": {
      title: "Analytics",
      subtitle: "Laporan performa bisnis",
    },
    "/admin/settings": {
      title: "Pengaturan",
      subtitle: "Konfigurasi layanan & sistem",
    },
  },
}

function defaultsFor(segment: ShellSegment, pathname: string): ShellMeta {
  const map = PATH_DEFAULTS[segment]
  if (map[pathname]) return map[pathname]
  const match = Object.keys(map)
    .filter((p) => p !== (segment === "dashboard" ? "/dashboard" : "/admin"))
    .find((p) => pathname === p || pathname.startsWith(`${p}/`))
  return match ? map[match] : { title: segment === "dashboard" ? "Dashboard" : "Admin" }
}

function metaEquals(a: Partial<ShellMeta>, b: Partial<ShellMeta>) {
  return a.title === b.title && a.subtitle === b.subtitle && a.userName === b.userName
}

const ShellMetaContext = createContext<ShellMeta | null>(null)
const SetShellPageMetaContext = createContext<
  ((meta: Partial<ShellMeta>) => void) | null
>(null)

export function ShellMetaProvider({
  segment,
  children,
}: {
  segment: ShellSegment
  children: ReactNode
}) {
  const pathname = usePathname()
  const [pageMeta, setPageMetaState] = useState<Partial<ShellMeta>>({})

  const setPageMeta = useCallback((meta: Partial<ShellMeta>) => {
    setPageMetaState((prev) => (metaEquals(prev, meta) ? prev : meta))
  }, [])

  useEffect(() => {
    setPageMetaState({})
  }, [pathname])

  const meta = useMemo(
    () => ({
      ...defaultsFor(segment, pathname),
      ...pageMeta,
    }),
    [segment, pathname, pageMeta]
  )

  return (
    <SetShellPageMetaContext.Provider value={setPageMeta}>
      <ShellMetaContext.Provider value={meta}>{children}</ShellMetaContext.Provider>
    </SetShellPageMetaContext.Provider>
  )
}

export function useShellMeta() {
  const meta = useContext(ShellMetaContext)
  if (!meta) {
    throw new Error("useShellMeta must be used within ShellMetaProvider")
  }
  return meta
}

/** Set header title/subtitle for the current page without remounting the shell. */
export function useShellPageMeta(meta: Partial<ShellMeta>) {
  const setPageMeta = useContext(SetShellPageMetaContext)
  if (!setPageMeta) {
    throw new Error("useShellPageMeta must be used within ShellMetaProvider")
  }

  const { title, subtitle, userName } = meta

  useEffect(() => {
    setPageMeta({ title, subtitle, userName })
  }, [setPageMeta, title, subtitle, userName])
}
