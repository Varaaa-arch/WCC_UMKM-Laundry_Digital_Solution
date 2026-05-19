# Database

Skema PostgreSQL di Supabase. Migrasi ada di `supabase/migrations/`.

## Diagram relasi (ringkas)

```
auth.users
    |
    | 1:1
    v
profiles
    |
    | 1:N
    v
orders -----> services
    |
    +-------> tracking_logs
    |
    +-------> order_attachments
```

## Tabel

### profiles

Profil pengguna, terhubung ke `auth.users`.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid PK | FK ke auth.users |
| name | text | Nama tampilan |
| phone | text | Telepon |
| is_admin | boolean | Akses panel admin |
| created_at | timestamptz | Waktu dibuat |
| email | text | (migration 010, jika ada) |

### services

Katalog layanan laundry.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid PK | |
| name | text | Nama layanan, unik |
| slug | text | URL booking, unik |
| price_per_kg | numeric | Harga per kg |
| description | text | Deskripsi |
| duration | text | Estimasi durasi |
| image_url | text | URL gambar |
| created_at | timestamptz | |

### orders

Pesanan laundry.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid PK | |
| order_number | text | Format LND-YYYY-XXXX (unik) |
| user_id | uuid FK | profiles.id |
| customer_name | text | |
| phone | text | |
| service_id | uuid FK | services.id |
| weight | numeric | Berat estimasi (kg) |
| order_type | enum | `pickup` \| `dropoff` |
| address | text | Alamat antar-jemput |
| note | text | Catatan |
| pickup_time | text | Slot waktu |
| pickup_date | date | (opsional) |
| total_price | numeric | Total tagihan |
| status | order_status_enum | Status proses |
| is_paid | boolean | Flag lunas |
| payment_method | text | `cod` \| `qris` |
| payment_status | text | pending, processing, success, failed |
| created_at | timestamptz | |

### order_status_enum

```
pending, picked_up, washing, finished, ready_pickup, delivered
```

### tracking_logs

Riwayat perubahan status per pesanan.

| Kolom | Tipe |
|-------|------|
| id | uuid PK |
| order_id | uuid FK |
| status | order_status_enum |
| description | text |
| created_at | timestamptz |

### order_attachments

Lampiran foto pesanan (opsional).

| Kolom | Tipe |
|-------|------|
| id | uuid PK |
| order_id | uuid FK |
| image_url | text |
| created_at | timestamptz |

## Fungsi dan trigger

- `public.is_admin()` - cek role admin untuk RLS
- Trigger pembuatan `order_number` (lihat `004_triggers.sql`, `009_fix_order_number_race.sql`)
- Trigger auto-create profile on signup (`008`, `create_profile_on_signup.sql`)
- Trigger tracking log saat status order berubah (jika dikonfigurasi di migrasi)

## Row Level Security (RLS)

Ringkasan kebijakan (`003_rls.sql`):

| Tabel | User biasa | Admin |
|-------|------------|-------|
| profiles | Baca/update sendiri | Full |
| services | Baca semua (public select) | Insert/update |
| orders | CRUD milik sendiri | Full |
| tracking_logs | Baca order sendiri | Full |
| order_attachments | Sesuai order | Full |

## Index

Index utama pada `orders` (order_number, user_id, service_id, status), `tracking_logs.order_id`, `services.slug`.

## Seed

`supabase/seed.sql` dapat mengisi layanan contoh (cuci kiloan, setrika, dll.). Jalankan manual setelah migrasi.

## Menjadikan user sebagai admin

```sql
update public.profiles
set is_admin = true
where id = '<user-uuid>';
```

## Realtime

`006_realtime_publication.sql` mengaktifkan publikasi untuk tabel tertentu (jika digunakan client realtime).

## Storage

`005_storage_policies.sql` mengatur bucket untuk lampiran gambar (jika fitur upload diaktifkan).

## Backup dan migrasi

- Gunakan Supabase Dashboard > Database > Backups untuk production
- Untuk perubahan skema baru, tambah file `012_*.sql` dan push via CLI atau SQL Editor
