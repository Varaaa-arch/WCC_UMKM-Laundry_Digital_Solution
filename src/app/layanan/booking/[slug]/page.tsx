"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { useOrderStore, ANTAR_JEMPUT_FEE } from "@/store/useOrderStore";
import { MinusIcon, PlusIcon, MapPinIcon, StoreIcon, ChevronRightIcon, ShieldCheckIcon, TimerIcon, ShieldIcon } from "lucide-react";
import { getServices } from "@/actions/service-action";
import { BubbleButton } from "@/components/ui/bubble-button";
import type { Service } from "@/types/service";

const PICKUP_TIMES = [
  "Sekarang (Kuri terdekat)",
  "Hari ini 10:00 - 12:00",
  "Hari ini 12:00 - 14:00",
  "Hari ini 14:00 - 16:00",
  "Hari ini 16:00 - 18:00",
  "Besok 08:00 - 10:00",
];

export default function BookingSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const {
    selectedService, setService, setStep,
    estimatedWeight, setWeight,
    pickupMethod, setPickupMethod,
    address, setAddress,
    note, setNote,
    pickupTime, setPickupTime,
  } = useOrderStore();

  const [service, setServiceState] = useState<Service | null>(selectedService?.slug === slug ? selectedService : null);

  useEffect(() => {
    // Jika service sudah ada di store dan slug cocok, skip fetch
    if (selectedService?.slug === slug) {
      setServiceState(selectedService);
      setStep("dropoff");
      return;
    }
    // Fetch dari DB berdasarkan slug
    getServices().then((services) => {
      const found = services.find((s) => s.slug === slug);
      if (!found) { router.replace("/layanan"); return; }
      setServiceState(found);
      setService(found);
      setStep("dropoff");
    });
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!service) return null;

  const subtotal = service.price_per_kg * estimatedWeight;
  const antarJemputFee = pickupMethod === "antar-jemput" ? ANTAR_JEMPUT_FEE : 0;
  const total = subtotal + antarJemputFee;

  const handleContinueToPayment = () => {
    if (pickupMethod === "antar-jemput" && !address.trim()) return;
    router.push(`/layanan/booking/${slug}/payment`);
  };

  return (
    <>
      <main className="min-h-screen bg-[#EEF4FB] px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT — Form */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Estimasi Berat */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-dashed border-gray-100">
                <Image src="/images/layanan-image/booking-image/estimasi-image.png" alt="" width={20} height={20} className="w-5 h-auto" style={{ height: "auto" }} />
                <h2 className="font-bold text-gray-900 text-lg">Estimasi Berat</h2>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-5">
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[180px]">
                    Masukkan estimasi berat pakaian Anda. Berat akhir akan diverifikasi saat penjemputan.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setWeight(Math.max(1, estimatedWeight - 1))}
                      className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <div className="text-center min-w-[48px]">
                      <span className="text-4xl font-bold text-gray-900">{estimatedWeight}</span>
                      <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5">Kilogram</p>
                    </div>
                    <button
                      onClick={() => setWeight(estimatedWeight + 1)}
                      className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  {service.image_url ? (
                    <Image src={service.image_url} alt={service.name} width={130} height={130} style={{ width: 130, height: "auto" }} />
                  ) : (
                    <Image src="/images/layanan-image/booking-image/mesinCuci.png" alt="mesin cuci" width={130} height={130} loading="eager" priority style={{ width: 130, height: "auto" }} />
                  )}
                </div>
              </div>
            </div>

            {/* Metode Pengambilan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/images/layanan-image/booking-image/kurir-image.png" alt="" width={20} height={20} className="w-5 h-auto" style={{ height: "auto" }} />
                <h2 className="font-bold text-gray-900 text-base">Metode Pengambilan</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {(["ambil-sendiri", "antar-jemput"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPickupMethod(method)}
                    className={[
                      "relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all duration-200",
                      pickupMethod === method ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-gray-200",
                    ].join(" ")}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {method === "ambil-sendiri"
                        ? <StoreIcon className="w-4 h-4 text-blue-600" />
                        : <MapPinIcon className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {method === "ambil-sendiri" ? "Ambil Sendiri" : "Diantar ke Rumah"}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {method === "ambil-sendiri" ? "Ke outlet kami. Gratis biaya layanan." : "Kurir kami jemput ke lokasi Anda. Tarif Rp 15.000."}
                      </p>
                    </div>
                    <div className={["absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center", pickupMethod === method ? "border-blue-500" : "border-gray-300"].join(" ")}>
                      {pickupMethod === method && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                  </button>
                ))}
              </div>

              {pickupMethod === "antar-jemput" && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Jl. Sudirman No. 123, Kebayoran Baru..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                    />
                  </div>

                  {/* Fake nearby laundry detection */}
                  {address.trim().length >= 10 && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Outlet Terdekat Ditemukan</span>
                      </div>
                      {[
                        { name: "LummyBlue Cabang Pusat", dist: "0.8 km", eta: "~10 menit" },
                        { name: "LummyBlue Cabang Selatan", dist: "1.4 km", eta: "~15 menit" },
                      ].map((outlet) => (
                        <div key={outlet.name} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{outlet.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Jarak {outlet.dist} · ETA kurir {outlet.eta}</p>
                          </div>
                          <span className="text-xs font-bold text-green-500 bg-green-50 rounded-full px-2.5 py-1">Tersedia</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Catatan (Opsional)</label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Pagar hitam, samping Indomaret"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Waktu Penjemputan</label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition bg-white"
                      >
                        {PICKUP_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 text-base mb-4">Ringkasan Pesanan</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{service.name}</span>
                  <span className="font-semibold text-gray-900">Rp {service.price_per_kg.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimasi Berat ({estimatedWeight} Kg)</span>
                  <span className="font-semibold text-gray-900">× {estimatedWeight}</span>
                </div>
                {pickupMethod === "antar-jemput" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Layanan Antar-Jemput</span>
                    <span className="font-semibold text-gray-900">Rp {ANTAR_JEMPUT_FEE.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="border-t border-dashed border-gray-200 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Bayar</span>
                  <span className="font-bold text-blue-600 text-lg">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <p className="text-gray-400 text-xs">*Total akhir akan disesuaikan sesuai timbangan fisik</p>
              </div>

              <BubbleButton
                onClick={handleContinueToPayment}
                disabled={pickupMethod === "antar-jemput" && !address.trim()}
                className="mt-5 w-full bg-linear-to-r from-blue-400 to-blue-600 text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Lanjut ke Pembayaran <ChevronRightIcon className="w-4 h-4" />
              </BubbleButton>

              <BubbleButton
                onClick={() => router.push("/layanan")}
                className="mt-2.5 w-full text-blue-500 font-semibold text-sm py-2.5 px-8 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors"
              >
                Kembali ke Pilih Layanan
              </BubbleButton>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: <ShieldCheckIcon className="w-5 h-5 text-blue-500" />, label: "Garansi Kebersihan" },
                  { icon: <TimerIcon className="w-5 h-5 text-blue-500" />, label: "Cepat & Tepat" },
                  { icon: <ShieldIcon className="w-5 h-5 text-blue-500" />, label: "Bayar Aman" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 rounded-xl">
                    {b.icon}
                    <span className="text-gray-500 text-[10px] font-medium leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
