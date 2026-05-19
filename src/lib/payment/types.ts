export type PaymentMethodType = "qris" | "cod"

export type PaymentStatusType = "pending" | "processing" | "success" | "failed"

export type PaymentStatusLabel =
  | "Menunggu Pembayaran"
  | "Diproses"
  | "Berhasil"
  | "Gagal"
