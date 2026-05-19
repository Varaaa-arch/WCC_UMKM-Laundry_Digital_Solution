# Flow

Alur bisnis utama aplikasi.

## Flow pengunjung (belum login)

```
Beranda (/)
    |
    +---> Layanan (/layanan)
    |         |
    |         +---> Login required untuk booking
    |
    +---> Tentang / Kontak / FAQ
    |
    +---> Login (/login) atau Register (/register)
```

## Flow registrasi dan login

```
Register / Login
    |
    v
Supabase Auth (session cookie)
    |
    v
Trigger / upsert profiles
    |
    v
resolveAppHomePath()
    |
    +-- is_admin = true  ---> /admin
    |
    +-- is_admin = false ---> /dashboard
```

OAuth mengikuti alur yang sama melalui `/auth/callback`.

## Flow pemesanan (user terlogin)

```
/dashboard/pesan atau /layanan
    |
    v
Pilih layanan (setService di Zustand)
    |
    v
/layanan/booking/[slug]
    |
    +-- Set berat (kg)
    +-- Pilih pickup: ambil-sendiri | antar-jemput
    +-- (Opsional) alamat, catatan, waktu
    |
    v
/layanan/booking/[slug]/payment
    |
    +-- Pilih metode: cod | qris
    |
    v
confirmBooking (Server Action)
    |
    +-- Insert orders
    +-- payment_status: pending | processing
    |
    v
/layanan/booking/success
    |
    v
/dashboard/history (lacak status)
```

## Status pesanan

Urutan umum lifecycle:

```
pending
    |
    v
picked_up  (dijemput)
    |
    v
washing    (dicuci)
    |
    v
finished   (dikeringkan)
    |
    v
ready_pickup (siap diambil)
    |
    v
delivered  (terkirim / selesai)
```

Perubahan status admin menulis ke `orders.status` dan dapat mencatat `tracking_logs`.

## Flow admin

```
Login sebagai admin
    |
    v
/admin (overview stats)
    |
    +---> /admin/order
    |         Filter, search, update status
    |
    +---> /admin/cust
    |         Daftar profiles / pelanggan
    |
    +---> /admin/analytics
    |         Grafik dan metrik
    |
    +---> /admin/settings
              Kelola services (nama, harga, slug, gambar)
```

## Flow proteksi route (middleware)

File: `src/proxy.ts`

```
Request ke route protected
    |
    v
Ada session user?
    |
    +-- Tidak ---> redirect /login
    |
    +-- Ya
          |
          Route /admin/* ?
          |
          +-- Ya, bukan admin ---> redirect /dashboard
          |
          +-- Lanjut
```

Protected paths: `/dashboard`, `/admin`, `/layanan/booking`, `/history`, `/settings`.

## Flow navbar (user terlogin)

```
Klik nama / avatar di navbar
    |
    v
roleLoaded dari useAuthStore?
    |
    v
is_admin ?
    |
    +-- true  ---> navigate /admin
    |
    +-- false ---> navigate /dashboard
```

## Flow alamat tersimpan (profil)

```
/dashboard/profile
    |
    +-- Klik kartu alamat ---> set isDefault (visual biru)
    +-- Tambah alamat (modal) ---> alamat baru jadi default
    +-- Hapus (ikon menu) ---> jika default hilang, pilih pertama
```

Data alamat saat ini disimpan di state client (belum persist ke database).

## Diagram booking (ringkas)

```
[User] --> [Pilih Layanan] --> [Booking Form] --> [Payment] --> [DB: orders]
                                                              |
                                                              v
                                                         [Dashboard / History]
                                                              ^
                                                              |
                                                         [Admin update status]
```
