import { PaymentPageClient } from "@/components/payment/PaymentPageClient"
import { use } from "react"

export const metadata = {
  title: "Pembayaran | LummyBlue",
  description: "Selesaikan pembayaran booking laundry Anda",
}

export default function PaymentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  return <PaymentPageClient slug={slug} />
}
