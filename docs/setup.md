# Setup

Panduan menjalankan LummyBlue di mesin lokal.

## 1. Clone dan install dependensi

```bash
git clone <repository-url>
cd laundry
npm install
```

## 2. Environment variables

Salin template environment:

```bash
cp .env.example .env.local
```

Isi nilai berikut di `.env.local`:

| Variabel | Keterangan |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (hanya server; jangan expose ke client) |
| `NEXT_PUBLIC_APP_URL` | Base URL app, mis. `http://localhost:3000` |
| `NEXT_PUBLIC_AUTH_REDIRECT_URL` | Callback OAuth, mis. `http://localhost:3000/auth/callback` |

## 3. Supabase

### Buat proyek

1. Buat proyek baru di [supabase.com](https://supabase.com).
2. Catat URL dan API keys dari Settings > API.

### Jalankan migrasi

Urutan file di `supabase/migrations/` (disarankan berurutan):

1. `001_init_tables.sql` - tabel inti
2. `002_functions.sql` - fungsi helper (`is_admin`, dll.)
3. `003_rls.sql` - Row Level Security
4. `004_triggers.sql` - trigger order number, tracking
5. `005_storage_policies.sql` - storage (jika dipakai)
6. `006_realtime_publication.sql` - realtime
7. `007_add_slug_and_extras.sql` - slug layanan, note pesanan
8. `008_auto_create_profile.sql` / `create_profile_on_signup.sql` - profil otomatis
9. `009_fix_order_number_race.sql`
10. `010_fix_profiles_email_column.sql`
11. `011_payment_fields.sql` - payment_method, payment_status

Jalankan via Supabase SQL Editor atau CLI:

```bash
# Jika memakai Supabase CLI
supabase link --project-ref <project-ref>
supabase db push
```

### Seed data (opsional)

File `supabase/seed.sql` berisi data layanan contoh. Jalankan manual di SQL Editor setelah migrasi jika diperlukan.

### Auth redirect URLs

Di Supabase Dashboard > Authentication > URL Configuration:

- **Site URL**: `http://localhost:3000` (development)
- **Redirect URLs**: tambahkan `http://localhost:3000/auth/callback`

Untuk OAuth (Google, Discord, dll.), aktifkan provider di Authentication > Providers dan sesuaikan redirect.

## 4. Buat akun admin

Setelah user pertama terdaftar, set flag admin di database:

```sql
update public.profiles
set is_admin = true
where id = '<uuid-user-dari-auth-users>';
```

Atau berdasarkan email jika kolom email ada di profiles:

```sql
update public.profiles
set is_admin = true
where email = 'admin@example.com';
```

## 5. Jalankan development server

```bash
npm run dev
```

Akses:

- Beranda: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard user: http://localhost:3000/dashboard
- Dashboard admin: http://localhost:3000/admin (setelah `is_admin = true`)

## 6. Build production (opsional)

```bash
npm run build
npm run start
```

## Troubleshooting

### Login redirect salah

Pastikan `profiles` punya baris untuk user dan `is_admin` sesuai harapan. Cek `resolveAppHomePath` di `src/lib/auth/resolve-home-path.ts`.

### Error RLS saat insert order

User harus punya baris di `profiles`. Trigger signup atau upsert di `confirmBooking` akan membuat profil jika belum ada.

### Migrasi gagal urutan

Jalankan migrasi sesuai nomor file. Jangan lewati `002_functions.sql` sebelum `003_rls.sql`.

### Port sudah dipakai

```bash
npm run dev -- -p 3001
```

Sesuaikan `NEXT_PUBLIC_APP_URL` jika port berubah.

## Dokumen terkait

- [Deployment](deployment.md)
- [Database](database.md)
