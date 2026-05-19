# LummyBlue

Aplikasi web layanan laundry modern berbasis Next.js. Pengguna dapat memesan cuci, melacak status pesanan, dan mengelola profil. Admin mengelola pesanan, pelanggan, analitik, dan layanan melalui panel terpisah.

## Fitur utama

- Landing page marketing dengan animasi khusus (beranda tidak memakai sistem animasi global)
- Pemesanan layanan (kiloan, setrika, dry clean, dan lainnya)
- Alur booking: pilih layanan, estimasi berat, metode pengambilan, pembayaran
- Dashboard pengguna: ringkasan pesanan, riwayat, profil, alamat tersimpan
- Dashboard admin: overview, orders, customers, analytics, settings
- Autentikasi Supabase (email/password dan OAuth)
- Role admin (`profiles.is_admin`) dengan redirect otomatis ke `/admin`

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, TanStack Query, Zustand, Framer Motion, Lenis.

Detail lengkap: [docs/tech-stack.md](docs/tech-stack.md)

## Persyaratan

- Node.js 20 atau lebih baru
- npm (atau pnpm/yarn)
- Proyek Supabase (URL, anon key, service role key)

## Instalasi cepat

```bash
git clone <repository-url>
cd laundry
npm install
cp .env.example .env.local
```

Isi variabel di `.env.local`, lalu jalankan migrasi Supabase (lihat [docs/setup.md](docs/setup.md)).

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Perintah

| Perintah        | Keterangan                    |
|-----------------|-------------------------------|
| `npm run dev`   | Server development            |
| `npm run build` | Build production              |
| `npm run start` | Jalankan build production     |
| `npm run lint`  | ESLint                        |

## Struktur dokumentasi

| Dokumen | Isi |
|---------|-----|
| [docs/overview.md](docs/overview.md) | Gambaran arsitektur dan route |
| [docs/setup.md](docs/setup.md) | Setup lokal dan Supabase |
| [docs/tech-stack.md](docs/tech-stack.md) | Library dan konvensi |
| [docs/features.md](docs/features.md) | Fitur per modul |
| [docs/flow.md](docs/flow.md) | Alur bisnis pengguna dan admin |
| [docs/database.md](docs/database.md) | Skema database dan RLS |
| [docs/api.md](docs/api.md) | API routes |
| [docs/deployment.md](docs/deployment.md) | Deploy production |

## Struktur folder (ringkas)

```
src/
  app/              # App Router (halaman & API)
  components/       # UI, dashboard, admin, motion
  actions/          # Server Actions
  hooks/            # React hooks
  lib/              # Utilitas, Supabase, admin, motion
  store/            # Zustand stores
supabase/
  migrations/       # SQL migrasi
  seed.sql          # Data awal (opsional)
docs/               # Dokumentasi proyek
```

## Environment

Salin `.env.example` ke `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Hak akses

- **User biasa**: `/dashboard`, booking, riwayat
- **Admin** (`is_admin = true`): `/admin` dan API admin; navbar dan login mengarah ke panel admin

## Lisensi

Lihat file [LICENSE](LICENSE) di root repositori.
