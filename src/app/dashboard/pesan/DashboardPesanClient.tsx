"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShieldCheck, ChevronRight } from "lucide-react"
import { useOrderStore } from "@/store/useOrderStore"
import type { Service } from "@/types/service"

const SLUG_IMAGE: Record<string, string> = {
  "cuci-kiloan":    "/images/layanan-image/cuci.png",
  "cuci-setrika":   "/images/layanan-image/cuci-setrika.png",
  "cuci-setrika-1": "/images/layanan-image/cuci-setrika.png",
  "dry-clean":      "/images/layanan-image/cuci.png",
  "express":        "/images/layanan-image/cuci-setrika.png",
}
const DEFAULT_IMAGE = "/images/layanan-image/cuci.png"

export default function DashboardPesanClient({ services }: { services: Service[] }) {
  const router = useRouter()
  const { setService, setStep, estimatedWeight, setWeight } = useOrderStore()
  const [selected, setSelected] = useState<Service | null>(null)

  const subtotal = selected ? selected.price_per_kg * estimatedWeight : 0

  const handleLanjutkan = () => {
    if (!selected) return
    setService(selected)
    setStep("dropoff")
    router.push(`/layanan/booking/${selected.slug}`)
  }

  return (
    <div className="px-6 py-6 flex flex-col lg:flex-row gap-6">

      {/* Left: service picker + weight */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pesan Laundry</h1>
          <p className="text-gray-400 text-sm mt-1">Pilih layanan dan atur jadwal penjemputan pakaian Anda.</p>
        </div>

        {/* 1. Pilih Layanan */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-3">1. Pilih Layanan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((svc) => {
              const isSelected = selected?.id === svc.id
              return (
                <button key={svc.id} onClick={() => setSelected(svc)}
                  className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 bg-white ${
                    isSelected
                      ? "border-blue-500 shadow-md shadow-blue-100"
                      : "border-gray-100 hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 overflow-hidden">
                    <Image
                      src={svc.image_url ?? SLUG_IMAGE[svc.slug] ?? DEFAULT_IMAGE}
                      alt={svc.name} width={32} height={32}
                      className="object-contain"
                    />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{svc.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{svc.description}</p>
                  <p className="text-blue-600 font-semibold text-xs mt-2">
                    Rp {svc.price_per_kg.toLocaleString("id-ID")} / kg
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* 2. Estimasi Berat */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-3">2. Estimasi Berat</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWeight(Math.max(1, estimatedWeight - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center min-w-[60px]">
                <p className="text-2xl font-bold text-gray-900">{estimatedWeight}</p>
                <p className="text-xs text-gray-400">Kilogram (kg)</p>
              </div>
              <button
                onClick={() => setWeight(estimatedWeight + 1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
              <span className="text-blue-400">ⓘ</span>
              Berat pasti akan ditimbang kembali oleh kurir saat penjemputan.
            </p>
          </div>
        </section>
      </div>

      {/* Right: summary */}
      <div className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
          <h3 className="font-bold text-gray-900 mb-4">Ringkasan</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Layanan</span>
              <span className="font-medium text-gray-900">{selected?.name ?? "—"}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Estimasi Berat</span>
              <span className="font-medium text-gray-900">{estimatedWeight} kg</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Jemput</span>
              <span className="font-medium text-green-600">Gratis</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-2.5">
              <div className="flex justify-between items-end">
                <span className="text-gray-600 text-xs">Estimasi Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLanjutkan}
            disabled={!selected}
            className="mt-5 w-full bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-blue-700 transition-colors"
          >
            Pesan Sekarang <ChevronRight className="w-4 h-4" />
          </button>

          <div className="mt-4 flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Barang kamu aman dengan perlindungan LummyBlue.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
