"use client";

import { MapPinIcon, ClockIcon, CreditCardIcon, PackageIcon, InfoIcon } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";

const PAYMENT_OPTIONS = [
  {
    id: "cod" as const,
    label: "Bayar di Tempat (COD)",
    desc: "Pembayaran saat drop-off atau mengambil",
  },
  {
    id: "transfer" as const,
    label: "Transfer Bank & E-Wallet",
    desc: "QRIS, BCA, Mandiri, BNI, BRI, DANA, GoPay, ShopeePay",
  },
];

function MapPlaceholder({ storeName }: { storeName: string }) {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-linear-to-br from-slate-700 via-slate-800 to-slate-900">
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>
      <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
          <MapPinIcon className="w-6 h-6 text-blue-600" style={{ fill: "#2563eb" }} />
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
        {storeName}
      </div>
    </div>
  );
}

export default function DropOffStep() {
  const { paymentMethod, setPaymentMethod } = useOrderStore();

  return (
    <div className="flex flex-col gap-5">
      {/* Self Drop-off Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <PackageIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Self Drop-off</h3>
            <p className="text-gray-500 text-xs mt-0.5">Bawa cucian Anda ke gerai kami</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-xl flex gap-2.5">
          <InfoIcon aria-hidden="true" className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800">Instruksi Pengantaran</p>
            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
              Pastikan cucian sudah dalam keadaan terpisah antara pakaian berwarna dan putih. Staff
              kami akan melakukan timbang ulang di lokasi.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Lokasi Gerai Terdekat</p>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
              <MapPinIcon className="w-3 h-3" />
              <span>1.2 km dari Anda</span>
            </div>
          </div>
          <MapPlaceholder storeName="LaundryKini – Sudirman" />
        </div>

        <div className="mt-3 flex items-center gap-2.5 p-3 border border-gray-100 rounded-xl">
          <ClockIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-800">Jam Operasional</p>
            <p className="text-xs text-gray-500">Setiap Hari: 07.00 – 21.00 WIB</p>
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Metode Pembayaran</h3>
        <div className="flex flex-col gap-2">
          {PAYMENT_OPTIONS.map((option) => {
            const isSelected = paymentMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPaymentMethod(option.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="w-8 h-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <CreditCardIcon className={`w-4 h-4 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{option.desc}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
