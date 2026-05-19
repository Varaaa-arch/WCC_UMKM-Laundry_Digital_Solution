# Features

Daftar fitur per area aplikasi.

## Beranda (publik)

- Hero dengan maskot dan animasi khusus (anime.js, Framer Motion terbatas)
- Section: cara pesan, keunggulan, alur kerja, testimoni, CTA
- Navbar fixed dengan link marketing dan area user (login / profil)
- Footer

**Tidak diubah** oleh sistem animasi global inner pages.

## Marketing dan informasi

| Halaman | Fitur |
|---------|-------|
| `/layanan` | Grid layanan dari database, pilih dan lanjut booking |
| `/about` | Cerita brand, founder, peta, kontak |
| `/contact` | Kartu kontak, form pesan (UI), jam operasional, sosial media |
| `/faq` | Accordion pertanyaan umum |
| `/kebijakan-privasi` | Dokumen kebijakan |
| `/syarat-ketentuan` | Dokumen syarat |

## Autentikasi

- Login email/password (`signIn` server action)
- Register dengan metadata nama (`signUp`)
- OAuth callback di `/auth/callback`
- Logout
- Redirect pasca-login berdasarkan `is_admin`
- Proteksi route via `src/proxy.ts`

## Booking dan pembayaran

1. Pilih layanan di `/layanan`
2. Form booking `/layanan/booking/[slug]`:
   - Estimasi berat (kg)
   - Metode: ambil sendiri atau antar-jemput (+ biaya tetap)
   - Alamat, catatan, waktu penjemputan (jika antar-jemput)
   - Ringkasan harga
3. Halaman pembayaran: COD atau QRIS (UI)
4. `confirmBooking` server action menyimpan ke `orders`
5. Halaman sukses

State booking: `useOrderStore` (Zustand).

## Dashboard pengguna

| Fitur | Lokasi |
|-------|--------|
| Ringkasan pesanan aktif | `/dashboard` |
| Quick actions (pesan, riwayat, profil) | Dashboard home |
| Pesan laundry | `/dashboard/pesan` |
| Riwayat dengan filter dan pagination | `/dashboard/history` |
| Profil: nama, telepon, preferensi notifikasi | `/dashboard/profile` |
| Alamat tersimpan: pilih default, tambah, hapus | Profil |
| Keluar akun | Profil / shell |

## Dashboard admin

| Fitur | Lokasi |
|-------|--------|
| Statistik: total order, revenue, users, pending | `/admin` |
| Grafik revenue | Overview |
| Feed aktivitas tracking | Overview |
| Daftar dan filter pesanan | `/admin/order` |
| Update status pesanan | Admin orders API |
| Daftar pelanggan | `/admin/cust` |
| Analytics | `/admin/analytics` |
| Kelola layanan (CRUD via API) | `/admin/settings` |

Akses dibatasi `requireAdmin()` dan RLS.

## Navbar dan navigasi

- Link marketing (Beranda, Layanan, Tentang, Kontak)
- User terlogin: avatar + nama mengarah ke `/dashboard` atau `/admin`
- Transisi halaman dengan curtain biru (non-shell routes)
- Mobile sheet menu

## Animasi (inner pages)

- Page transition: fade, blur, slide
- Shell transition di dashboard/admin
- Reveal on scroll (`Reveal`, `Stagger`)
- Lenis smooth scroll (non-mobile, non-home)
- Loading skeleton (`PageLoading`)
- Dialog animasi premium
- `prefers-reduced-motion` dihormati

## Yang belum / stub

- `GET /api/orders` masih stub (`[ORDERS_STUB]`)
- Beberapa form kontak hanya simulasi client-side
- Notifikasi di header shell masih data dummy

Lihat [API](api.md) untuk detail endpoint.
