# Tech Stack

## Core

| Teknologi | Versi (approx.) | Penggunaan |
|-----------|-----------------|------------|
| Next.js | 16.x | App Router, SSR, API routes |
| React | 19.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Supabase | - | Auth, PostgreSQL, RLS |

## State dan data

| Library | Penggunaan |
|---------|------------|
| Zustand | `useAuthStore`, `useOrderStore`, `useAdminUiStore` |
| TanStack Query | Fetching data di dashboard/admin |
| Server Actions | Booking, auth (`src/actions/`) |

## UI

| Library | Penggunaan |
|---------|------------|
| shadcn/ui + Radix UI | Button, dialog, sheet, table, dll. |
| lucide-react | Ikon |
| class-variance-authority, clsx, tailwind-merge | Styling utilitas |
| Sonner | Toast notifikasi |
| Recharts | Grafik admin |
| react-countup | Animasi angka statistik |

## Animasi

| Library | Penggunaan |
|---------|------------|
| framer-motion | Transisi halaman, reveal, dashboard |
| anime.js | Animasi scroll khusus beranda |
| lenis | Smooth scroll (non-home, desktop) |
| three.js | Efek khusus (bubble button) |

Preset dan provider: `src/lib/motion/`, `src/components/motion/`.

**Catatan:** Beranda (`/`) tidak dibungkus animasi global agar hero dan scroll landing tetap final.

## Validasi dan form

| Library | Penggunaan |
|---------|------------|
| react-hook-form | Form (di beberapa halaman) |
| zod | Validasi skema |

## Font

- Poppins (body)
- Plus Jakarta Sans (display/hero)
- Geist Mono (monospace)

Dideklarasikan di `src/app/layout.tsx`.

## Struktur kode (konvensi)

- Path alias `@/` mengarah ke `src/`
- Server Components default; `"use client"` hanya jika perlu interaktivitas
- Admin API memakai `requireAdmin()` dari `src/lib/admin/auth.ts`
- Shell dashboard/admin: `src/components/shell/`, nav di `nav-config.ts`

## Scripts npm

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

## Dependensi yang tidak dipakai di runtime utama

Beberapa placeholder atau modul opsional mungkin ada untuk pengembangan lanjutan. Cek `package.json` untuk daftar lengkap.
