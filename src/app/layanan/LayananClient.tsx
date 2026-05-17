"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheckIcon, ArrowLeftIcon } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/useOrderStore";
import { BubbleButton } from "@/components/ui/bubble-button";
import type { Service } from "@/types/service";

const SLUG_IMAGE: Record<string, string> = {
  "cuci-kiloan":    "/images/layanan-image/cuci.png",
  "cuci-setrika":   "/images/layanan-image/cuci-setrika.png",
  "cuci-setrika-1": "/images/layanan-image/cuci-setrika.png",
  "dry-clean":      "/images/layanan-image/cuci.png",
  "express":        "/images/layanan-image/cuci-setrika.png",
};

const DEFAULT_IMAGE = "/images/layanan-image/cuci.png";

export default function LayananClient({ services }: { services: Service[] }) {
  const router = useRouter();
  const { setService, setStep } = useOrderStore();
  const [selected, setSelected] = useState<Service | null>(null);

  const handleLanjutkan = () => {
    if (!selected) return;
    setService(selected);
    setStep("dropoff");
    router.push(`/layanan/booking/${selected.slug}`);
  };

  return (
    <>
      <main className="min-h-screen bg-[#EEF4FB] flex flex-col items-center px-4 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Pilih Layanan Anda
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            Kami siap mengurus pakaian Anda dengan sentuhan profesional dan penuh kasih sayang.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl mb-8">
          {services.map((svc) => {
            const isSelected = selected?.id === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => setSelected(svc)}
                style={{ borderRadius: "28px" }}
                className={[
                  "group relative flex-1 bg-white text-center",
                  "transition-all duration-300 ease-out cursor-pointer",
                  "hover:-translate-y-1.5",
                  isSelected
                    ? "ring-2 ring-blue-400 shadow-[0_8px_40px_rgba(59,130,246,0.18)] -translate-y-1.5 bg-[#f5f9ff]"
                    : "shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.13)] hover:ring-1 hover:ring-blue-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center",
                    "transition-all duration-300 ease-out",
                    isSelected
                      ? "bg-blue-500 shadow-lg shadow-blue-300/60 scale-100 opacity-100"
                      : "scale-75 opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>

                <div className="px-6 pt-6 pb-2">
                  <div className="relative w-full h-48">
                    <Image
                      src={svc.image_url ?? SLUG_IMAGE[svc.slug] ?? DEFAULT_IMAGE}
                      alt={svc.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <div className="px-6 pt-5 pb-6">
                  <h2 className="font-bold text-gray-900 text-xl mb-3 tracking-tight">{svc.name}</h2>
                  <div className="flex items-baseline justify-center gap-0.5 mb-4">
                    <span className="inline-flex items-baseline bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-100">
                      Rp {svc.price_per_kg.toLocaleString("id-ID")}
                      <span className="font-normal text-blue-400 text-xs ml-0.5">/Kg</span>
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{svc.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <BubbleButton
          onClick={handleLanjutkan}
          disabled={selected === null}
          className={[
            "w-full max-w-xs py-4 px-10 rounded-full font-bold text-base text-white transition-all duration-300 border-0 outline-none",
            selected
              ? "bg-linear-to-r from-blue-400 to-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.45)] hover:scale-[1.02] active:scale-[0.98]"
              : "bg-linear-to-r from-blue-300 to-blue-400 opacity-60 cursor-not-allowed",
          ].join(" ")}
        >
          Lanjutkan
        </BubbleButton>

        <Link
          href="/"
          className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </Link>

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
