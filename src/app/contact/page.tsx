"use client"

import { useState } from "react"
import { Footer } from "@/components/layout/Footer"
import { MessageCircleIcon, MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircle2Icon, ArrowRightIcon } from "lucide-react"

const CONTACTS = [
  {
    icon: MessageCircleIcon,
    label: "WhatsApp",
    value: "+62 812-3456-7890",
    sub: "Balas dalam < 5 menit",
    href: "https://wa.me/6281234567890",
    color: "bg-green-500",
    light: "bg-green-50 text-green-600",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: "halo@resiklaundry.com",
    sub: "Balas dalam 1×24 jam",
    href: "mailto:halo@resiklaundry.com",
    color: "bg-blue-500",
    light: "bg-blue-50 text-blue-600",
  },
  {
    icon: PhoneIcon,
    label: "Telepon",
    value: "(021) 1234-5678",
    sub: "Senin–Sabtu, 08.00–20.00",
    href: "tel:02112345678",
    color: "bg-purple-500",
    light: "bg-purple-50 text-purple-600",
  },
  {
    icon: MapPinIcon,
    label: "Alamat",
    value: "Jl. Melati Indah No. 27",
    sub: "Jakarta Pusat, 10110",
    href: "https://maps.google.com/?q=Jakarta+Pusat",
    color: "bg-orange-500",
    light: "bg-orange-50 text-orange-600",
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <>
      
      <main className="min-h-screen bg-[#EEF4FB]">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-6 py-20 text-white text-center">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Kami Siap Membantu
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
              Hubungi <span className="text-cyan-200">Kami</span>
            </h1>
            <p className="text-blue-100 text-base max-w-md mx-auto leading-relaxed">
              Ada pertanyaan, saran, atau ingin tahu lebih lanjut? Tim kami selalu siap menyambut Anda.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONTACTS.map(({ icon: Icon, label, value, sub, href, color, light }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${light}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5 leading-snug">{value}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Hubungi <ArrowRightIcon className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Form + Info */}
        <section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Left — form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Kirim Pesan</h2>
              <p className="text-gray-400 text-sm mb-7">Isi form di bawah dan kami akan segera menghubungi Anda.</p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2Icon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Pesan Terkirim!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">Tim kami akan menghubungi Anda secepatnya. Terima kasih!</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }) }}
                    className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-1.5 block">Nama Lengkap</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-1.5 block">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="john@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">Pesan</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tulis pesan Anda di sini..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><SendIcon className="w-4 h-4" /> Kirim Pesan</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right — info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Jam operasional */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jam Operasional</span>
              </div>
              {[
                { day: "Senin – Jumat", time: "08.00 – 20.00" },
                { day: "Sabtu", time: "08.00 – 18.00" },
                { day: "Minggu", time: "09.00 – 15.00" },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">{day}</span>
                  <span className="text-sm font-semibold text-gray-900">{time}</span>
                </div>
              ))}
            </div>

            {/* Sosmed */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6 text-white">
              <h3 className="font-bold text-base mb-1">Ikuti Kami</h3>
              <p className="text-blue-100 text-xs mb-5">Update terbaru, promo, dan tips perawatan pakaian.</p>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com/resiklaundry" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl px-4 py-3 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span className="text-sm font-semibold">@resiklaundry</span>
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl px-4 py-3 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-sm font-semibold">@resiklaundry</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
