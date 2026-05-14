import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#EEF4FB]">

        {/* Section 1 — Cerita Kami */}
        <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Kiri */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-5">
              ✦ PERJALANAN KAMI
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cerita Kami</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Berawal dari sebuah garasi kecil di tahun 2021,{" "}
              <span className="text-blue-500 font-semibold">ResikLaundry</span>{" "}
              lahir dari kegelisahan akan sulitnya menemukan layanan cuci yang tidak hanya bersih, tapi
              juga menghargai waktu pelanggan. Kami percaya bahwa setiap serat kain menceritakan sebuah kisah.
            </p>

            {/* Badge */}
            <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 max-w-xs">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Image src="/images/about-me-img/aboutMe-star.png" alt="" width={20} height={20} className="w-5 h-auto" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Sejak 2021</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                  Melayani ribuan pakaian dengan penuh dedikasi dan cinta akan kebersihan.
                </p>
              </div>
            </div>
          </div>

          {/* Kanan — Mascot */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72">
              <Image
                src="/images/about-me-img/aboutMe-mascot.png"
                alt="Maskot ResikLaundry"
                fill
                className="object-contain"
                sizes="288px"
              />
            </div>
          </div>
        </section>

        {/* Section 2 — Founder */}
        <section className="bg-white/60">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Kiri — Foto CEO */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-72 h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/images/about-me-img/aboutMe-ceo.png"
                  alt="Ibu Ratih - Founder ResikLaundry"
                  fill
                  className="object-cover object-top"
                  sizes="288px"
                />
              </div>
            </div>

            {/* Kanan — Info */}
            <div>
              <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-4 block">
                Visi dari Sang Pendiri
              </span>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-blue-500 mb-1">Ibu Ratih</h2>
                <p className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-4">
                  Founder &amp; CEO ResikLaundry
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Berawal dari kecintaan pada kebersihan dan detail, Ibu Ratih membangun ResikLaundry dengan satu
                  misi: menghadirkan kesegaran kelas dunia ke setiap rumah di Indonesia. Dengan pengalaman lebih
                  dari 15 tahun di industri tekstil, beliau memastikan setiap serat kain dirawat dengan teknologi
                  terbaik dan kasih sayang.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["#WomenInBusiness", "#LaundryExpert", "#CleanLiving"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
