# API

Referensi HTTP API di `src/app/api/`. Semua route admin memerlukan session user dengan `profiles.is_admin = true`.

Autentikasi: cookie session Supabase (bukan Bearer token terpisah).

## Autentikasi admin

Helper: `requireAdmin()` di `src/lib/admin/auth.ts`

| Status | Arti |
|--------|------|
| 401 | Tidak login |
| 403 | Login tetapi bukan admin |

---

## Public / user

### GET `/api/orders`

**Status:** stub

Response:

```json
{ "message": "[ORDERS_STUB]" }
```

Pesanan user saat ini diambil lewat Supabase client / hooks (`useOrders`), bukan endpoint ini.

---

## Admin

Base path: `/api/admin/*`

### GET `/api/admin/stats`

Statistik dashboard overview.

**Auth:** admin

**Response (contoh struktur):**

```json
{
  "totalOrders": 0,
  "revenue": 0,
  "activeUsers": 0,
  "pendingOrders": 0,
  "revenueChange": 0,
  "ordersChange": 0,
  "chartData": [],
  "recentActivity": []
}
```

Field aktual mengikuti implementasi di `src/app/api/admin/stats/route.ts`.

---

### GET `/api/admin/orders`

Daftar pesanan dengan filter.

**Auth:** admin

**Query parameters:**

| Param | Default | Keterangan |
|-------|---------|------------|
| `q` | - | Cari order_number, customer_name, phone |
| `status` | `all` | Filter status atau `all` |
| `limit` | 20 | Max 100 |

**Response:**

```json
{
  "orders": [
    {
      "id": "uuid",
      "order_number": "LND-2026-XXXXXX",
      "customer_name": "string",
      "phone": "string",
      "status": "pending",
      "total_price": 0,
      "order_type": "pickup",
      "created_at": "ISO8601",
      "services": { "name": "Cuci Kiloan" }
    }
  ]
}
```

---

### PATCH `/api/admin/orders/[id]`

Update status pesanan.

**Auth:** admin

**Body:**

```json
{
  "status": "washing"
}
```

Status harus salah satu nilai `ORDER_STATUSES` di `src/lib/admin/constants.ts`.

**Response:**

```json
{
  "order": {
    "id": "uuid",
    "status": "washing",
    "order_number": "LND-2026-XXXXXX"
  }
}
```

Side effect: insert baris ke `tracking_logs`.

---

### GET `/api/admin/customers`

Daftar pelanggan (profiles).

**Auth:** admin

**Query parameters:**

| Param | Default | Keterangan |
|-------|---------|------------|
| `q` | - | Cari name, email, phone |
| `limit` | 50 | Max 100 |

**Response:**

```json
{
  "customers": [
    {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "phone": "string",
      "is_admin": false,
      "created_at": "ISO8601",
      "orderCount": 0
    }
  ]
}
```

---

### GET `/api/admin/analytics`

Data analitik untuk halaman admin analytics.

**Auth:** admin

Response berisi agregasi order, revenue, dan metrik periode (lihat route implementation).

---

### GET `/api/admin/settings/services`

Daftar layanan untuk panel settings.

**Auth:** admin

**Response:**

```json
{
  "services": [
    {
      "id": "uuid",
      "name": "Cuci Kiloan",
      "price_per_kg": 8000,
      "description": "string",
      "duration": "string",
      "slug": "cuci-kiloan"
    }
  ]
}
```

---

### PATCH `/api/admin/settings/services`

Perbarui layanan.

**Auth:** admin

**Body:**

```json
{
  "id": "uuid",
  "name": "Cuci Kiloan",
  "price_per_kg": 8500,
  "description": "Deskripsi baru",
  "duration": "1-2 hari"
}
```

Field selain `id` opsional; minimal satu field update.

**Response:**

```json
{
  "service": { }
}
```

---

## Server Actions (bukan REST)

| Action | File | Keterangan |
|--------|------|------------|
| `signIn` | `auth-action.ts` | Login, redirect by role |
| `signUp` | `auth-action.ts` | Register |
| `signOut` | `auth-action.ts` | Logout |
| `confirmBooking` | `booking-action.ts` | Buat pesanan |
| `getServices` | `service-action.ts` | Ambil layanan (server) |

---

## OAuth callback

### GET `/auth/callback`

Exchange `code` OAuth, lalu redirect ke `resolveAppHomePath()` (`/admin` atau `/dashboard`).

Query: `?code=...` dari provider.

---

## Kode error umum

| HTTP | Penyebab |
|------|----------|
| 401 | Session tidak ada |
| 403 | Bukan admin pada route admin |
| 400 | Body/query tidak valid |
| 500 | Error database Supabase |

## Testing API lokal

1. Login sebagai admin di browser
2. Buka DevTools > Application > Cookies (session Supabase)
3. Atau panggil dari client admin yang sudah terautentikasi (TanStack Query / fetch same-origin)

Contoh curl (perlu cookie session yang valid):

```bash
curl -b "cookies.txt" http://localhost:3000/api/admin/stats
```

Untuk development, lebih mudah menguji lewat UI admin.
