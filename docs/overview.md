# Overview

## Tentang proyek

LummyBlue adalah aplikasi pemesanan dan pelacakan laundry. Frontend dibangun dengan Next.js App Router. Backend data dan autentikasi menggunakan Supabase (PostgreSQL, Auth, Row Level Security).

## Arsitektur tingkat tinggi

```
Browser
   |
   v
Next.js (App Router)
   |-- Server Components / Server Actions
   |-- Client Components (dashboard, booking, animasi)
   |
   v
Supabase
   |-- Auth (session cookie via @supabase/ssr)
   |-- PostgreSQL + RLS
   |-- (opsional) Realtime, Storage
```

## Segmentasi halaman

### Publik (marketing)

| Route | Keterangan |
|-------|------------|
| `/` | Beranda (HomeExperience) |
| `/layanan` | Daftar layanan |
| `/about` | Tentang kami |
| `/contact` | Kontak |
| `/faq` | FAQ |
| `/kebijakan-privasi` | Kebijakan privasi |
| `/syarat-ketentuan` | Syarat dan ketentuan |
| `/login`, `/register` | Autentikasi |

### Booking (perlu login)

| Route | Keterangan |
|-------|------------|
| `/layanan/booking/[slug]` | Form booking per layanan |
| `/layanan/booking/[slug]/payment` | Pembayaran |
| `/layanan/booking/success` | Konfirmasi sukses |

### Dashboard pengguna

Layout: `src/app/dashboard/layout.tsx` dengan sidebar persisten (`UserShell`).

| Route | Keterangan |
|-------|------------|
| `/dashboard` | Ringkasan pesanan dan aktivitas |
| `/dashboard/pesan` | Mulai pesan laundry |
| `/dashboard/history` | Riwayat pesanan |
| `/dashboard/profile` | Profil dan alamat tersimpan |

### Dashboard admin

Layout: `src/app/admin/layout.tsx` dengan `AdminAppShell`.

| Route | Keterangan |
|-------|------------|
| `/admin` | Overview statistik |
| `/admin/order` | Manajemen pesanan |
| `/admin/cust` | Daftar pelanggan |
| `/admin/analytics` | Grafik dan analitik |
| `/admin/settings` | Pengaturan layanan |

Hanya user dengan `profiles.is_admin = true` yang boleh mengakses `/admin` (dicek di middleware/proxy dan `requireAdmin()`).

## Lapisan aplikasi

| Lapisan | Lokasi | Peran |
|---------|--------|-------|
| Pages | `src/app/**/page.tsx` | Entry route |
| Layouts | `src/app/**/layout.tsx` | Shell dashboard/admin |
| Components | `src/components/**` | UI reusable |
| Server Actions | `src/actions/**` | Mutasi server (booking, auth) |
| API Routes | `src/app/api/**` | REST untuk admin (dan stub orders) |
| Stores | `src/store/**` | State client (auth, order, admin UI) |
| Hooks | `src/hooks/**` | Data fetching (orders, admin) |
| Middleware | `src/proxy.ts` | Proteksi route dan cek admin |

## Autentikasi dan role

- Session Supabase disimpan via cookie (SSR helpers di `src/lib/supabase/`).
- Setelah login, redirect mengikuti role: admin ke `/admin`, user ke `/dashboard` (`resolveAppHomePath`).
- Navbar: klik nama/avatar mengarah ke home path sesuai role.
- `useAuthStore` menyimpan `user` dan `isAdmin` dari tabel `profiles`.

## Animasi global

Sistem animasi (Framer Motion, Lenis smooth scroll) diterapkan ke halaman inner, **kecuali beranda** (`/`). Beranda mempertahankan animasi anime.js / hero sendiri.

Komponen: `src/components/motion/`, preset: `src/lib/motion/`.

## Redirect legacy

| Route lama | Redirect |
|------------|----------|
| `/profile` | `/dashboard/profile` |
| `/history` | `/dashboard/history` |
| `/services` | `/layanan` |

## Dokumen terkait

- [Setup](setup.md)
- [Features](features.md)
- [Flow](flow.md)
- [Database](database.md)
- [API](api.md)
