"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheckIcon, ArrowLeftIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useOrderStore, type ServiceType } from "@/store/useOrderStore";

type ServiceCard = {
  id: ServiceType;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
};

const SERVICES: ServiceCard[] = [
  {
    id: "cuci-kering-setrika",
    title: "Cuci Kering",
    description: "Layanan cuci bersih menggunakan deterjen premium tanpa proses setrika.",
    price: 5000,
    priceUnit: "Kg",
    image: "/images/layanan-image/cuci-bersih.png",
  },
  {
    id: "setrika-ekspres",
    title: "Cuci + Setrika",
    description: "Paket lengkap cuci bersih dan setrika uap untuk hasil maksimal yang rapi.",
    price: 8000,
    priceUnit: "Kg",
    image: "/images/layanan-image/cuci-setrika.png",
  },
];

export default function LayananPage() {
  const router = useRouter();
  const { setService, setStep } = useOrderStore();
  const [selected, setSelected] = useState<ServiceType | null>(null);

  const handleLanjutkan = () => {
    if (!selected) return;
    setService(selected);
    setStep("dropoff");
    router.push("/layanan/booking");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#EEF4FB] flex flex-col items-center px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Pilih Layanan Anda
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            Kami siap mengurus pakaian Anda dengan sentuhan profesional dan penuh kasih sayang.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl mb-8">
          {SERVICES.map((svc) => {
            const isSelected = selected === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => setSelected(svc.id)}
                className={[
                  "group relative flex-1 rounded-2xl bg-white text-left overflow-hidden",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-1 hover:shadow-xl",
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-xl -translate-y-1"
                    : "shadow-md",
                ].join(" ")}
              >
                {/* Image */}
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-bold text-gray-900 text-base mb-2">{svc.title}</h2>

                  {/* Price badge */}
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Rp {svc.price.toLocaleString("id-ID")}/{svc.priceUnit}
                  </span>

                  <p className="text-gray-500 text-xs leading-relaxed">{svc.description}</p>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Lanjutkan Button */}
        <button
          onClick={handleLanjutkan}
          disabled={!selected}
          className={[
            "w-full max-w-2xl py-3.5 rounded-full font-semibold text-sm transition-all duration-200",
            selected
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
              : "bg-blue-300 text-white cursor-not-allowed",
          ].join(" ")}
        >
          Lanjutkan
        </button>

        {/* Back link */}
        <Link
          href="/"
          className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </Link>

        {/* Info banner */}
        <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
          <ShieldCheckIcon className="w-4 h-4 text-green-500 shrink-0" />
          <span>
            Pakaian Anda akan dijemput oleh kurir profesional kami dalam{" "}
            <span className="text-blue-600 font-semibold">30 menit</span>.
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
