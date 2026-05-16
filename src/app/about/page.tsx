import Image from "next/image";
import { MapPinIcon, MessageCircleIcon, MailIcon, CameraIcon, SparklesIcon, CircleIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#EEF4FB]">

        {/* Section 1 — Cerita Kami */}
        <section className="bg-[#EEF4FB]">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Kiri */}
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                PERJALANAN KAMI
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">Cerita Kami</h1>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Berawal dari sebuah garasi kecil di tahun 2021,{" "}
                <span className="text-blue-500 font-semibold">ResikLaundry</span>{" "}
                lahir dari kegelisahan akan sulitnya menemukan layanan cuci yang tidak hanya bersih, tapi
                juga menghargai waktu pelanggan. Kami percaya bahwa setiap serat kain menceritakan sebuah kisah.
              </p>

              {/* Badge */}
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-w-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Image src="/images/about-me-img/aboutMe-star.png" alt="" width={22} height={22} style={{ height: "auto" }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Sejak 2021</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                    Melayani ribuan pakaian dengan penuh dedikasi dan cinta akan kebersihan.
                  </p>
                </div>
              </div>
            </div>

            {/* Kanan — Mascot besar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-[420px] h-[380px]">
                <Image
                  src="/images/about-me-img/aboutMe-mascot.png"
                  alt="Maskot ResikLaundry"
                  fill
                  className="object-contain object-right-bottom"
                  sizes="420px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Founder */}
        <section className="bg-[#deeaf7] overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 pt-10 pb-0">
            {/* Label tengah atas */}
            <div className="flex justify-center mb-8">
              <span className="text-xs font-bold text-blue-500 tracking-widest uppercase border border-blue-300 rounded-full px-5 py-1.5 bg-white/60">
                VISI DARI SANG PENDIRI
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
              {/* Kiri — Foto CEO overflow ke bawah */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-80 h-96">
                  <Image
                    src="/images/about-me-img/aboutMe-ceo.png"
                    alt="Ibu Ratih - Founder ResikLaundry"
                    fill
                    className="object-cover object-top"
                    sizes="320px"
                  />
                </div>
              </div>

              {/* Kanan — Info card */}
              <div className="pb-10">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Ibu Ratih</h2>
                  <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-4">
                    FOUNDER &amp; CEO RESIKLAUNDRY
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
          </div>
        </section>

        {/* Section 3 — Maps */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Mampir ke Workshop Kami</h2>
            <p className="text-gray-400 text-sm mt-2">Kami menyambut Anda dengan senyum dan wangi yang segar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
            {/* Kiri — Info + Jaringan */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* Kantor Pusat */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Kantor Pusat</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Jl. Melati Indah No. 27,<br />Jakarta Pusat, 10110
                </p>
                <a
                  href="https://maps.google.com/?q=Jakarta+Pusat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Buka di Google Maps
                </a>
              </div>

              {/* Jaringan Cabang */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Jaringan Cabang</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Hadir di Berbagai Wilayah</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  ResikLaundry memiliki 78 banyak cabang yang tersebar luas. Saat Anda memesan, sistem cerdas
                  kami akan otomatis menghubungkan Anda dengan cabang terdekat untuk menjamin efisiensi dan
                  kecepatan layanan maksimal.
                </p>
              </div>
            </div>

            {/* Kanan — Google Maps Embed */}
            <div className="md:col-span-3 relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta%20Pusat%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1715700000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi ResikLaundry"
              />
              {/* Badge jam operasional */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 shadow-md flex items-center gap-2 text-xs">
                <CircleIcon className="w-2 h-2 fill-green-400 text-green-400" />
                <div>
                  <p className="font-bold text-gray-800 text-xs">Buka Sekarang</p>
                  <p className="text-gray-400 text-[10px]">07.00 – 21.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Kontak */}
        <section className="bg-[#EEF4FB] py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Butuh Bantuan? Sapa Kami!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* WhatsApp */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircleIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">WhatsApp</p>
                  <p className="text-gray-400 text-xs mt-0.5">+62 812-3456-7890</p>
                </div>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-green-500 hover:text-green-600 transition-colors"
                >
                  Chat Sekarang
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <MailIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Email</p>
                  <p className="text-gray-400 text-xs mt-0.5">halo@resiklaundry.com</p>
                </div>
                <a
                  href="mailto:halo@resiklaundry.com"
                  className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Kirim Email
                </a>
              </div>

              {/* Instagram */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <CameraIcon className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Instagram</p>
                  <p className="text-gray-400 text-xs mt-0.5">@resiklaundry</p>
                </div>
                <a
                  href="https://instagram.com/resiklaundry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-purple-500 hover:text-purple-600 transition-colors"
                >
                  Follow Kami
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
