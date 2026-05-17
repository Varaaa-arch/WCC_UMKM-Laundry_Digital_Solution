import { CheckCircleIcon, MapPinIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { BubbleLink } from "@/components/ui/bubble-button";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId = "-" } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md flex flex-col gap-4">

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          {/* Animated checkmark */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-[scale-in_0.3s_ease-out]">
              <CheckCircleIcon className="w-11 h-11 text-green-500" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900">Pesanan Dikonfirmasi!</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Pesanan kamu berhasil dibuat. Silakan bawa cucian ke gerai terdekat.
          </p>

          {/* Order ID */}
          <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 mb-1">Nomor Pesanan</p>
            <p className="font-bold text-blue-600 text-lg tracking-wide">{orderId}</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Informasi Drop-off
          </p>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <MapPinIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">LaundryKini – Sudirman</p>
              <p className="text-xs text-gray-400 mt-0.5">1.2 km dari lokasi kamu</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <ClockIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Jam Operasional</p>
              <p className="text-xs text-gray-400 mt-0.5">Setiap Hari: 07.00 – 21.00 WIB</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <BubbleLink
            href="/dashboard"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-150 text-center block shadow-md shadow-blue-200"
          >
            Ke Dashboard
          </BubbleLink>
          <BubbleLink
            href="/riwayat"
            className="w-full bg-white hover:bg-gray-50 active:scale-[0.98] border-2 border-blue-100 text-blue-600 font-semibold text-sm py-3.5 rounded-xl transition-all duration-150 text-center block"
          >
            Lihat Riwayat Pesanan
          </BubbleLink>
          <Link
            href="/"
            className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 text-center block transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}