# Deployment

Panduan deploy LummyBlue ke production.

## Platform yang disarankan

- **Vercel** - native untuk Next.js
- Alternatif: Node.js VPS, Docker, Railway, Netlify (dengan adapter sesuai)

Dokumen ini fokus pola umum; langkah Vercel paling singkat.

## Prasyarat production

1. Proyek Supabase production (bukan dev) dengan migrasi lengkap
2. Domain production (opsional)
3. Environment variables siap
4. `npm run build` sukses di lokal

## Environment variables (production)

Set di panel hosting (Vercel > Settings > Environment Variables):

| Variabel | Wajib | Catatan |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | URL Supabase prod |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Ya | Hanya server; jangan expose ke client bundle |
| `NEXT_PUBLIC_APP_URL` | Ya | `https://yourdomain.com` |
| `NEXT_PUBLIC_AUTH_REDIRECT_URL` | Ya | `https://yourdomain.com/auth/callback` |

Jangan commit `.env.local` ke git.

## Supabase production

### Migrasi

Jalankan semua file di `supabase/migrations/` ke database production (SQL Editor atau `supabase db push`).

### Auth URLs

Di Supabase Dashboard > Authentication:

- **Site URL**: `https://yourdomain.com`
- **Redirect URLs**:
  - `https://yourdomain.com/auth/callback`
  - URL preview Vercel jika dipakai (`https://*.vercel.app/auth/callback`)

### OAuth providers

Aktifkan provider yang dipakai dan set redirect URI ke production callback.

### RLS

Pastikan `003_rls.sql` sudah diterapkan. Jangan disable RLS di production tanpa alasan keamanan.

### Admin pertama

Set `is_admin = true` untuk akun operator production via SQL Editor.

## Deploy ke Vercel

### Via Git

1. Push repositori ke GitHub/GitLab/Bitbucket
2. Import project di [vercel.com](https://vercel.com)
3. Framework preset: **Next.js**
4. Tambah environment variables
5. Deploy

### Build settings (default)

- Build command: `npm run build`
- Output: Next.js default
- Install: `npm install`

### Domain custom

Tambah domain di Vercel > Domains, lalu update:

- `NEXT_PUBLIC_APP_URL`
- Supabase Auth redirect URLs

## Deploy manual (Node server)

```bash
npm ci
npm run build
npm run start
```

Jalankan di port 3000 atau behind reverse proxy (Nginx) dengan HTTPS.

Contoh Nginx proxy pass ke `localhost:3000`.

## Post-deploy checklist

- [ ] Beranda dan halaman marketing terbuka
- [ ] Register / login berfungsi
- [ ] Admin redirect ke `/admin`, user ke `/dashboard`
- [ ] Booking end-to-end (buat order di DB)
- [ ] Admin bisa update status order
- [ ] OAuth callback (jika dipakai)
- [ ] HTTPS aktif (cookie secure)
- [ ] Tidak ada secret di client bundle

## Performance

- Gambar: gunakan `next/image` (sudah dipakai di banyak halaman)
- Static assets di `public/`
- Pertimbangkan CDN Vercel untuk asset

## Monitoring

- Vercel Analytics / Logs
- Supabase Dashboard > Logs (API, Auth, Postgres)
- Optional: Sentry untuk error tracking (belum terintegrasi default)

## Rollback

- Vercel: redeploy deployment sebelumnya dari Deployments tab
- Database: restore backup Supabase sebelum migrasi destructive

## CI (opsional)

Contoh pipeline minimal:

```yaml
# .github/workflows/ci.yml (contoh)
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

Tambahkan secret env di GitHub jika build membutuhkan variabel Supabase.

## Keamanan

- Rotasi `SUPABASE_SERVICE_ROLE_KEY` jika bocor
- Batasi admin (`is_admin`) hanya untuk operator tepercaya
- Review RLS sebelum go-live
- Aktifkan MFA di akun Supabase dan Vercel

## Dokumen terkait

- [Setup](setup.md)
- [Database](database.md)
- [API](api.md)
