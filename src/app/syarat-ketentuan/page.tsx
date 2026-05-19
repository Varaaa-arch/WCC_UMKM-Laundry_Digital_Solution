"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen, Shield, FileText, Users, CreditCard,
  Lock, Ban, AlertTriangle, RefreshCw, Phone,
  ChevronRight, MessageCircle, ChevronDown,
} from "lucide-react"

// ─── data ────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "pendahuluan",
    icon: BookOpen,
    title: "Pendahuluan",
    content: `Selamat datang di LummyBlue. Dengan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan yang tercantum di halaman ini. Harap baca dengan seksama sebelum menggunakan layanan kami.`,
    list: [
      "Syarat ini berlaku sejak Anda pertama kali menggunakan layanan LummyBlue.",
      "Kami berhak memperbarui syarat ini sewaktu-waktu dengan pemberitahuan sebelumnya.",
      "Penggunaan layanan setelah pembaruan dianggap sebagai persetujuan atas syarat baru.",
    ],
  },
  {
    id: "definisi",
    icon: FileText,
    title: "Definisi Layanan",
    content: `LummyBlue menyediakan layanan laundry modern yang mencakup cuci, kering, setrika, dan pengiriman pakaian ke lokasi pelanggan.`,
    list: [
      "\"Layanan\" merujuk pada seluruh jasa laundry yang disediakan LummyBlue.",
      "\"Pengguna\" adalah individu yang mendaftar dan menggunakan platform kami.",
      "\"Platform\" mencakup website, aplikasi mobile, dan seluruh kanal digital LummyBlue.",
      "\"Pesanan\" adalah permintaan layanan yang diajukan melalui platform.",
    ],
  },
  {
    id: "ketentuan",
    icon: Shield,
    title: "Ketentuan Penggunaan",
    content: `Pengguna wajib memenuhi persyaratan berikut untuk dapat menggunakan layanan LummyBlue secara penuh.`,
    list: [
      "Berusia minimal 17 tahun atau memiliki persetujuan orang tua/wali.",
      "Memberikan informasi yang akurat dan terkini saat pendaftaran.",
      "Menjaga kerahasiaan akun dan kata sandi Anda.",
      "Tidak menggunakan layanan untuk tujuan yang melanggar hukum.",
      "Bertanggung jawab atas seluruh aktivitas yang terjadi di akun Anda.",
    ],
  },
  {
    id: "hak-kewajiban",
    icon: Users,
    title: "Hak & Kewajiban Pengguna",
    content: `Sebagai pengguna LummyBlue, Anda memiliki hak dan kewajiban yang harus dipenuhi demi kelancaran layanan.`,
    list: [
      "Hak mendapatkan layanan sesuai standar kualitas yang dijanjikan.",
      "Hak mendapatkan informasi transparan mengenai status pesanan.",
      "Kewajiban menyerahkan pakaian dalam kondisi yang wajar.",
      "Kewajiban memberikan alamat pengambilan dan pengiriman yang valid.",
      "Kewajiban melakukan pembayaran sesuai tarif yang berlaku.",
    ],
  },
  {
    id: "pembayaran",
    icon: CreditCard,
    title: "Pembayaran & Refund",
    content: `LummyBlue menerima berbagai metode pembayaran dan memiliki kebijakan refund yang transparan.`,
    list: [
      "Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau tunai.",
      "Harga dihitung berdasarkan berat pakaian dan jenis layanan yang dipilih.",
      "Refund dapat diajukan dalam 24 jam setelah pesanan selesai jika terdapat kerusakan.",
      "Proses refund membutuhkan waktu 3-7 hari kerja.",
      "Kerusakan akibat kelalaian pengguna tidak termasuk dalam cakupan refund.",
    ],
  },
  {
    id: "privasi",
    icon: Lock,
    title: "Privasi Data",
    content: `Kami berkomitmen melindungi data pribadi Anda sesuai regulasi perlindungan data yang berlaku di Indonesia.`,
    list: [
      "Data pribadi hanya digunakan untuk keperluan operasional layanan.",
      "Kami tidak menjual atau membagikan data Anda kepada pihak ketiga tanpa izin.",
      "Data disimpan dengan enkripsi standar industri.",
      "Anda berhak meminta penghapusan data kapan saja.",
    ],
  },
  {
    id: "larangan",
    icon: Ban,
    title: "Larangan Penggunaan",
    content: `Beberapa tindakan dilarang keras dalam penggunaan platform dan layanan LummyBlue.`,
    list: [
      "Menyerahkan barang berbahaya, ilegal, atau terlarang untuk dicuci.",
      "Memberikan informasi palsu atau menyesatkan.",
      "Melakukan penyalahgunaan sistem promo atau voucher.",
      "Mencoba meretas atau mengganggu sistem platform.",
      "Menggunakan akun orang lain tanpa izin.",
    ],
  },
  {
    id: "tanggung-jawab",
    icon: AlertTriangle,
    title: "Pembatasan Tanggung Jawab",
    content: `LummyBlue bertanggung jawab atas layanan yang diberikan, namun terdapat batasan tanggung jawab yang perlu dipahami.`,
    list: [
      "Kami tidak bertanggung jawab atas kerusakan akibat sifat alami bahan pakaian.",
      "Keterlambatan akibat force majeure tidak termasuk pelanggaran SLA.",
      "Nilai ganti rugi maksimal sebesar 10x biaya layanan pesanan terkait.",
      "Barang berharga yang tidak dideklarasikan sebelumnya tidak ditanggung.",
    ],
  },
  {
    id: "perubahan",
    icon: RefreshCw,
    title: "Perubahan Ketentuan",
    content: `LummyBlue berhak mengubah syarat dan ketentuan ini dengan prosedur yang transparan.`,
    list: [
      "Perubahan akan diumumkan minimal 7 hari sebelum berlaku.",
      "Notifikasi dikirim melalui email terdaftar dan notifikasi aplikasi.",
      "Penggunaan layanan setelah tanggal efektif dianggap menyetujui perubahan.",
      "Versi terbaru selalu tersedia di halaman ini.",
    ],
  },
  {
    id: "kontak",
    icon: Phone,
    title: "Kontak",
    content: `Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, jangan ragu untuk menghubungi kami.`,
    list: [
      "Email: halo@lummyblue.com",
      "WhatsApp: +62 812-3456-7890",
      "Jam operasional: Senin–Sabtu, 08.00–20.00 WIB",
      "Alamat: Jl. Laundry Modern No. 1, Jakarta",
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  return (
    <aside className="hidden lg:block w-56 shrink-0 self-start sticky top-28">
      <div className="rounded-2xl bg-white border border-blue-100 shadow-sm p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 px-2">Daftar Isi</p>
        <nav className="space-y-0.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-blue-50"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <s.icon className="relative size-3.5 shrink-0" />
                <span className="relative truncate">{s.title}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

// ─── Mobile TOC ───────────────────────────────────────────────────────────────
function MobileToc() {
  const [open, setOpen] = useState(false)
  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
      >
        Daftar Isi
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 rounded-xl bg-white border border-blue-100 shadow-sm p-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <s.icon className="size-3.5 shrink-0" />
              {s.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SyaratKetentuanPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    Object.values(sectionRefs.current).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#EEF4FB] [scroll-behavior:smooth]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#EEF4FB] pt-28 pb-14">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-slate-800 font-medium">Syarat & Ketentuan</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 mb-5">
              <FileText className="size-3.5" />
              Dokumen Legal
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Syarat & Ketentuan
            </h1>
            <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Harap baca syarat penggunaan layanan kami dengan seksama sebelum menggunakan platform LummyBlue.
            </p>
            <p className="mt-3 text-xs text-slate-400">Terakhir diperbarui: 19 Mei 2024</p>
          </motion.div>
        </div>
      </section>

      {/* ── Main ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <MobileToc />

        <div className="flex gap-8">
          <Sidebar active={activeSection} />

          {/* Content card */}
          <div className="flex-1 min-w-0">
            <div className="rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
              {SECTIONS.map((section, i) => {
                const Icon = section.icon
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    ref={(el) => { if (el) sectionRefs.current[section.id] = el }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`px-8 py-10 sm:px-12 ${i < SECTIONS.length - 1 ? "border-b border-blue-50" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50">
                        <Icon className="size-5 text-blue-500" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-5">{section.content}</p>

                    <ul className="space-y-2.5">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <span className="mt-1.5 size-1.5 rounded-full bg-blue-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )
              })}
            </div>

            {/* Footer CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_32px_-8px_rgba(59,130,246,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Masih punya pertanyaan?</p>
                  <p className="text-blue-100 text-sm">Tim kami siap membantu Anda 24/7</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Hubungi Kami
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
