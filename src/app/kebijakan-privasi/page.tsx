"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen, Database, BarChart2, Cookie, ShieldCheck,
  HardDrive, UserCheck, Share2, KeyRound, RefreshCw,
  Phone, ChevronRight, MessageCircle, ChevronDown, Lock,
} from "lucide-react"

const SECTIONS = [
  {
    id: "pendahuluan",
    icon: BookOpen,
    title: "Pendahuluan",
    content: "LummyBlue berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami.",
    list: [
      "Kebijakan ini berlaku untuk semua pengguna platform LummyBlue.",
      "Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi ini.",
      "Kami dapat memperbarui kebijakan ini dan akan memberitahu Anda sebelumnya.",
    ],
  },
  {
    id: "informasi-dikumpulkan",
    icon: Database,
    title: "Informasi yang Kami Kumpulkan",
    content: "Kami mengumpulkan berbagai jenis informasi untuk memberikan dan meningkatkan layanan kami kepada Anda.",
    list: [
      "Informasi identitas: nama, email, nomor telepon saat pendaftaran.",
      "Informasi lokasi: alamat pengambilan dan pengiriman pakaian.",
      "Data transaksi: riwayat pesanan, metode pembayaran, dan preferensi layanan.",
      "Data teknis: alamat IP, jenis perangkat, browser, dan log aktivitas.",
    ],
  },
  {
    id: "penggunaan-data",
    icon: BarChart2,
    title: "Cara Kami Menggunakan Data",
    content: "Data yang kami kumpulkan digunakan secara bertanggung jawab untuk tujuan operasional dan peningkatan layanan.",
    list: [
      "Memproses dan mengelola pesanan laundry Anda.",
      "Mengirimkan notifikasi status pesanan dan konfirmasi.",
      "Meningkatkan kualitas layanan berdasarkan feedback dan pola penggunaan.",
      "Mengirimkan informasi promosi (hanya jika Anda menyetujui).",
      "Memenuhi kewajiban hukum dan regulasi yang berlaku.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content: "Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna di platform kami.",
    list: [
      "Cookies esensial: diperlukan untuk fungsi dasar platform.",
      "Cookies analitik: membantu kami memahami cara pengguna berinteraksi.",
      "Cookies preferensi: menyimpan pengaturan dan preferensi Anda.",
      "Anda dapat menonaktifkan cookies melalui pengaturan browser kapan saja.",
    ],
  },
  {
    id: "perlindungan-data",
    icon: ShieldCheck,
    title: "Perlindungan Data",
    content: "Keamanan data Anda adalah prioritas utama kami. Kami menerapkan standar keamanan industri terkini.",
    list: [
      "Enkripsi SSL/TLS untuk semua transmisi data.",
      "Enkripsi data sensitif saat penyimpanan (at-rest encryption).",
      "Akses data dibatasi hanya untuk karyawan yang membutuhkan.",
      "Audit keamanan rutin dan penetration testing berkala.",
    ],
  },
  {
    id: "penyimpanan",
    icon: HardDrive,
    title: "Penyimpanan Informasi",
    content: "Kami menyimpan data Anda hanya selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini.",
    list: [
      "Data akun disimpan selama akun Anda aktif.",
      "Data transaksi disimpan selama 5 tahun untuk keperluan akuntansi.",
      "Data dapat dihapus atas permintaan Anda sesuai hak pengguna.",
      "Server kami berlokasi di Indonesia dan mematuhi regulasi lokal.",
    ],
  },
  {
    id: "hak-pengguna",
    icon: UserCheck,
    title: "Hak Pengguna",
    content: "Anda memiliki hak penuh atas data pribadi Anda yang kami kelola.",
    list: [
      "Hak akses: meminta salinan data pribadi yang kami miliki.",
      "Hak koreksi: memperbarui data yang tidak akurat.",
      "Hak penghapusan: meminta penghapusan data Anda.",
      "Hak portabilitas: menerima data dalam format yang dapat dibaca mesin.",
      "Hak keberatan: menolak pemrosesan data untuk tujuan tertentu.",
    ],
  },
  {
    id: "berbagi-data",
    icon: Share2,
    title: "Berbagi Informasi ke Pihak Ketiga",
    content: "Kami tidak menjual data Anda. Namun dalam kondisi tertentu, data dapat dibagikan kepada pihak ketiga terpercaya.",
    list: [
      "Mitra pengiriman untuk keperluan operasional layanan.",
      "Penyedia pembayaran untuk memproses transaksi secara aman.",
      "Penyedia analitik untuk meningkatkan performa platform.",
      "Otoritas hukum jika diwajibkan oleh regulasi yang berlaku.",
    ],
  },
  {
    id: "keamanan-akun",
    icon: KeyRound,
    title: "Keamanan Akun",
    content: "Anda bertanggung jawab menjaga keamanan akun Anda. Berikut langkah yang kami rekomendasikan.",
    list: [
      "Gunakan kata sandi yang kuat dan unik untuk akun LummyBlue.",
      "Jangan bagikan kredensial akun kepada siapapun.",
      "Segera hubungi kami jika mencurigai akses tidak sah.",
      "Aktifkan verifikasi dua langkah jika tersedia.",
    ],
  },
  {
    id: "perubahan",
    icon: RefreshCw,
    title: "Perubahan Kebijakan Privasi",
    content: "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu dengan prosedur yang transparan.",
    list: [
      "Perubahan signifikan akan diberitahukan melalui email terdaftar.",
      "Notifikasi dikirim minimal 7 hari sebelum perubahan berlaku.",
      "Versi terbaru selalu tersedia di halaman ini dengan tanggal pembaruan.",
    ],
  },
  {
    id: "kontak",
    icon: Phone,
    title: "Kontak",
    content: "Untuk pertanyaan seputar kebijakan privasi atau permintaan terkait data Anda, hubungi kami melalui:",
    list: [
      "Email: privacy@lummyblue.com",
      "WhatsApp: +62 812-3456-7890",
      "Jam operasional: Senin–Sabtu, 08.00–20.00 WIB",
    ],
  },
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } as const

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="hidden lg:block w-56 shrink-0 self-start sticky top-28">
      <div className="rounded-2xl bg-white border border-blue-100 shadow-sm p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 px-2">Daftar Isi</p>
        <nav className="space-y-0.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <a key={s.id} href={`#${s.id}`}
                className={`relative flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive ? "text-blue-600 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.span layoutId="sidebar-active-privacy"
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

function MobileToc() {
  const [open, setOpen] = useState(false)
  return (
    <div className="lg:hidden mb-6">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
      >
        Daftar Isi
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 rounded-xl bg-white border border-blue-100 shadow-sm p-3">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}
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

export default function KebijakanPrivasiPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    Object.values(sectionRefs.current).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#EEF4FB] [scroll-behavior:smooth]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#EEF4FB] pt-28 pb-14">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-slate-800 font-medium">Kebijakan Privasi</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 mb-5">
              <Lock className="size-3.5" />
              Privasi & Keamanan
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Kebijakan Privasi
            </h1>
            <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Kami menjaga dan melindungi data pribadi Anda dengan serius menggunakan standar keamanan industri terkini.
            </p>
            <p className="mt-3 text-xs text-slate-400">Terakhir diperbarui: 19 Mei 2024</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        {/* Privacy highlight card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/60 border border-blue-200 px-6 py-4"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500 shrink-0">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Data Anda terenkripsi & aman</p>
            <p className="text-xs text-slate-500 mt-0.5">Semua data disimpan dengan enkripsi SSL/TLS dan standar keamanan industri.</p>
          </div>
        </motion.div>

        <MobileToc />

        <div className="flex gap-8">
          <Sidebar active={activeSection} />

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
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_32px_-8px_rgba(59,130,246,0.5)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Masih punya pertanyaan tentang privasi?</p>
                  <p className="text-blue-100 text-sm">Tim kami siap membantu Anda 24/7</p>
                </div>
              </div>
              <Link href="/contact"
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
