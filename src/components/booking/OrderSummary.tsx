"use client";

import { ShieldCheckIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { confirmBooking } from "@/actions/booking-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICE_LABEL: Record<string, string> = {
    "cuci-kering-setrika": "Cuci Kering Setrika",
    "setrika-ekspres": "Setrika Ekspres",
    "cuci-satuan": "Cuci Satuan",
};

const SERVICE_NOTE: Record<string, string> = {
    "cuci-kering-setrika": "Reguler (2-3 Hari)",
    "setrika-ekspres": "Ekspres (1 Hari)",
    "cuci-satuan": "Per Satuan Pakaian",
};

export default function OrderSummary() {
    const { selectedService, estimatedWeight, paymentMethod, totalPrice, setStep } =
        useOrderStore();

    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const total = totalPrice();

    const handleConfirm = async () => {
        if (!selectedService) return;
        setLoading(true);
        
        const result = await confirmBooking({
            service: selectedService,
            estimatedWeight,
            totalPrice: total,
            paymentMethod
        });

        setLoading(false);

        if (result.success) {
            // TODO: redirect ke halaman sukses / riwayat
            router.push(`/layanan/booking/success?orderId=${result.orderId}`);
        } else {
            alert(result.error);
        }
    };

    const handleBack = () => setStep("dropoff");

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>

            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-gray-800">
                            {selectedService ? SERVICE_LABEL[selectedService] : "-"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {selectedService ? SERVICE_NOTE[selectedService] : ""}
                        </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                        Rp {selectedService ? (total / estimatedWeight).toLocaleString("id-ID") : 0}
                    </p>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                    <p>Estimasi Berat ({estimatedWeight}kg)</p>
                    <p className="font-medium text-gray-700">x {estimatedWeight}</p>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                    <p>Biaya Drop-off</p>
                    <p className="font-semibold text-blue-600">Gratis</p>
                </div>

                <div className="border-t border-dashed border-gray-200 my-1" />

                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Total Bayar</p>
                    <p className="font-bold text-blue-600 text-base">
                        Rp {total.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-5">
                <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                    {loading ? (
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Konfirmasi Pesanan
                            <ChevronRightIcon className="w-4 h-4" />
                        </>
                    )}
                </button>

                <button
                    onClick={handleBack}
                    className="w-full bg-white hover:bg-gray-50 active:scale-[0.98] text-blue-600 font-semibold text-sm py-3 rounded-xl border-2 border-blue-100 transition-all duration-150"
                >
                    Kembali ke Layanan
                </button>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                <ShieldCheckIcon className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                    Keamanan barang Anda terjamin dengan asuransi perlindungan ResikLaundry.
                </p>
            </div>
        </div>
    );
}