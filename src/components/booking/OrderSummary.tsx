"use client";

import { ShieldCheckIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { useOrderStore, ANTAR_JEMPUT_FEE } from "@/store/useOrderStore";
import { confirmBooking } from "@/actions/booking-action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BubbleButton } from "@/components/ui/bubble-button";

export default function OrderSummary() {
  const { selectedService, estimatedWeight, pickupMethod, paymentMethod, address, note, pickupTime, setStep } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const subtotal = selectedService ? selectedService.price_per_kg * estimatedWeight : 0;
  const antarJemputFee = pickupMethod === "antar-jemput" ? ANTAR_JEMPUT_FEE : 0;
  const total = subtotal + antarJemputFee;

  const handleConfirm = async () => {
    if (!selectedService) return;
    setLoading(true);
    const result = await confirmBooking({
      serviceId: selectedService.id,
      estimatedWeight,
      totalPrice: total,
      paymentMethod,
      pickupMethod,
      address,
      note,
      pickupTime,
    });
    setLoading(false);
    if (result.success) {
      router.push(`/layanan/booking/success?orderId=${result.orderId}`);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-4">
      <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{selectedService?.name ?? "-"}</span>
          <span className="font-semibold text-gray-900">Rp {(selectedService?.price_per_kg ?? 0).toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Estimasi Berat ({estimatedWeight} Kg)</span>
          <span className="font-medium text-gray-700">× {estimatedWeight}</span>
        </div>
        {pickupMethod === "antar-jemput" && (
          <div className="flex justify-between items-center text-gray-600">
            <span>Layanan Antar-Jemput</span>
            <span className="font-semibold text-gray-900">Rp {ANTAR_JEMPUT_FEE.toLocaleString("id-ID")}</span>
          </div>
        )}
        <div className="border-t border-dashed border-gray-200 my-1" />
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800">Total Bayar</span>
          <span className="font-bold text-blue-600 text-base">Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-5">
        <BubbleButton
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-400 to-blue-600 disabled:opacity-60 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-blue-200"
        >
          {loading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <><span>Konfirmasi Pesanan</span><ChevronRightIcon className="w-4 h-4" /></>}
        </BubbleButton>
        <BubbleButton
          onClick={() => { setStep("layanan"); router.push("/layanan"); }}
          className="w-full hover:bg-gray-50 active:scale-[0.98] text-blue-600 font-semibold text-sm py-3 rounded-xl border border-blue-100 transition-all duration-150"
        >
          Kembali ke Pilih Layanan
        </BubbleButton>
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
        <ShieldCheckIcon className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          Keamanan barang Anda terjamin dengan asuransi perlindungan LaundryKini.
        </p>
      </div>
    </div>
  );
}
