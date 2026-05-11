import { ShirtIcon, ZapIcon, SparklesIcon, ClockIcon, ShieldCheckIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PesanButton from "@/components/layanan/PesanButton";
import type { ServiceType } from "@/store/useOrderStore";

type ServiceCard = {
  id: ServiceType;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  duration: string;
  popular?: boolean;
};

const SERVICES: ServiceCard[] = [
  {
    id: "cuci-kering-setrika",
    icon: <ShirtIcon className="w-6 h-6 text-blue-600" />,
    title: "Cuci Kering",
    description: "Pembersihan mendalam tanpa merusak tekstur kain. Cocok untuk pakaian sehari-hari.",
    price: 9000,
    priceUnit: "kg",
    duration: "2-3 Hari Kerja",
  },
  {
    id: "setrika-ekspres",
    icon: <SparklesIcon className="w-6 h-6 text-white" />,
    title: "Cuci Setrika",
    description: "Solusi lengkap untuk penampilan rapi. Cuci bersih dan setrika presisi untuk kenyamanan maksimal.",
    price: 7000,
    priceUnit: "kg",
    duration: "2-3 Hari Kerja",
    popular: true,
  },
  {
    id: "cuci-satuan",
    icon: <ZapIcon className="w-6 h-6 text-blue-600" />,
    title: "Layanan Express",
    description: "Butuh cepat? Kami memprioritaskan cucian Anda agar selesai dalam waktu singkat tanpa kompromi kualitas.",
    price: 15000,
    priceUnit: "kg",
    duration: "1 Hari Kerja",
  },
];

export default function LayananPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-white pt-14 pb-12 text-center px-4">
          <span className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Pilihan Terbaik
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Layanan Kebersihan Profesional
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Nikmati kesegaran pakaian Anda dengan teknologi pencucian mutakhir. Kami memastikan
            setiap serat kain terjaga kualitasnya.
          </p>
        </section>

        {/* Service Cards */}
        <section className="max-w-5xl mx-auto px-4 pb-16 -mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SERVICES.map((svc) => {
              const isPopular = svc.popular === true;
              return (
                <div
                  key={svc.id}
                  className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-md ${
                    isPopular
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white border-gray-100 shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute top-4 right-4 bg-white text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Populer
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPopular ? "bg-blue-500" : "bg-blue-50"
                    }`}
                  >
                    {svc.icon}
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h2 className={`font-bold text-base ${isPopular ? "text-white" : "text-gray-900"}`}>
                      {svc.title}
                    </h2>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isPopular ? "text-blue-100" : "text-gray-500"}`}>
                      {svc.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className={`flex items-center gap-1.5 text-xs ${isPopular ? "text-blue-100" : "text-gray-400"}`}>
                    <ClockIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{svc.duration}</span>
                  </div>

                  {/* Price */}
                  <div className={`flex items-baseline gap-1 ${isPopular ? "text-white" : "text-blue-600"}`}>
                    <span className="text-xl font-bold">
                      Rp {svc.price.toLocaleString("id-ID")}
                    </span>
                    <span className={`text-xs ${isPopular ? "text-blue-100" : "text-gray-400"}`}>
                      / {svc.priceUnit}
                    </span>
                  </div>

                  <PesanButton service={svc.id} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Quality Banner */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="rounded-2xl overflow-hidden bg-slate-800 relative min-h-[160px] flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-bold text-lg">Kualitas Terjamin</h3>
              </div>
              <p className="text-slate-300 text-sm max-w-sm">
                Setiap proses diawasi oleh tim profesional dengan standar kebersihan rumah sakit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
