"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronRight, ChevronDown, MessageCircle, HelpCircle, Phone } from "lucide-react"

// ─── data ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["Semua", "Umum", "Pembayaran", "Akun", "Layanan", "Privasi"] as const
type Category = (typeof CATEGORIES)[number]

const FAQS: { q: string; a: string; cat: Category }[] = [
  { cat: "Umum", q: "Bagaimana cara memesan layanan LummyBlue?", a: "Anda dapat memesan melalui website atau aplikasi kami. Pilih jenis layanan, tentukan jadwal pengambilan, lalu konfirmasi pesanan. Kurir kami akan datang sesuai jadwal yang dipilih." },
  { cat: "Umum", q: "Berapa lama proses pengerjaan laundry?", a: "Layanan reguler selesai dalam 1–2 hari kerja. Layanan express tersedia dengan waktu pengerjaan 6 jam untuk kebutuhan mendesak Anda." },
  { cat: "Umum", q: "Apakah tersedia layanan customer support?", a: "Ya, tim kami siap membantu Senin–Sabtu pukul 08.00–20.00 WIB melalui WhatsApp, email, atau telepon." },
  { cat: "Pembayaran", q: "Metode pembayaran apa saja yang tersedia?", a: "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, ShopeePay), QRIS, dan pembayaran tunai saat pengambilan." },
  { cat: "Pembayaran", q: "Apakah tersedia refund jika tidak puas?", a: "Ya, refund dapat diajukan dalam 24 jam setelah pesanan selesai jika terdapat kerusakan atau ketidaksesuaian layanan. Proses refund membutuhkan 3–7 hari kerja." },
  { cat: "Pembayaran", q: "Bagaimana cara menghitung biaya laundry?", a: "Biaya dihitung berdasarkan berat pakaian (per kilogram) dan jenis layanan yang dipilih. Estimasi harga dapat dilihat di halaman Layanan sebelum konfirmasi pesanan." },
  { cat: "Akun", q: "Bagaimana cara mendaftar akun LummyBlue?", a: "Klik tombol Daftar di navbar, isi formulir dengan nama, email, dan kata sandi, lalu verifikasi email Anda. Proses pendaftaran hanya membutuhkan waktu kurang dari 2 menit." },
  { cat: "Akun", q: "Bagaimana jika lupa kata sandi?", a: "Klik 'Lupa Kata Sandi' di halaman login, masukkan email terdaftar, dan kami akan mengirimkan tautan reset kata sandi ke email Anda." },
  { cat: "Akun", q: "Bisakah saya mengubah informasi profil?", a: "Ya, Anda dapat mengubah nama, nomor telepon, dan alamat melalui menu Profil di dashboard akun Anda kapan saja." },
  { cat: "Layanan", q: "Jenis pakaian apa saja yang bisa dicuci?", a: "Kami menerima semua jenis pakaian termasuk baju, celana, jaket, seprai, handuk, dan pakaian formal. Untuk pakaian dengan bahan khusus, harap informasikan saat pemesanan." },
  { cat: "Layanan", q: "Apakah ada layanan antar-jemput?", a: "Ya, layanan Pickup & Delivery tersedia di area layanan kami. Kurir akan menjemput pakaian dari lokasi Anda dan mengantarkan kembali setelah selesai." },
  { cat: "Layanan", q: "Bagaimana jika pakaian saya rusak atau hilang?", a: "Kami bertanggung jawab penuh atas pakaian yang dipercayakan kepada kami. Jika terjadi kerusakan atau kehilangan, kami akan memberikan kompensasi sesuai kebijakan yang berlaku." },
  { cat: "Privasi", q: "Apakah data pribadi saya aman?", a: "Ya, semua data disimpan dengan enkripsi SSL/TLS standar industri. Kami tidak menjual atau membagikan data Anda kepada pihak ketiga tanpa izin." },
  { cat: "Privasi", q: "Bagaimana cara menghapus akun saya?", a: "Anda dapat mengajukan penghapusan akun melalui menu Pengaturan Akun atau menghubungi tim support kami. Data akan dihapus dalam 30 hari kerja." },
]

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className="rounded-2xl bg-white border border-blue-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-blue-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-sm sm:text-base leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="size-5 text-blue-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-blue-50 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Semua")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCat = activeCategory === "Semua" || f.cat === activeCategory
      const matchSearch = search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-[#EEF4FB]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#EEF4FB] pt-28 pb-14">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-slate-800 font-medium">FAQ</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 mb-5">
              <HelpCircle className="size-3.5" />
              Pusat Bantuan
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Pertanyaan yang Sering Ditanyakan
            </h1>
            <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Temukan jawaban cepat untuk pertanyaan umum mengenai layanan LummyBlue.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full rounded-full bg-white border border-blue-100 shadow-sm pl-11 pr-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.5)]"
                  : "bg-white text-slate-600 border border-blue-100 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="flex gap-8 items-start">
          {/* FAQ list */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <HelpCircle className="size-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Tidak ada hasil ditemukan</p>
                <p className="text-sm mt-1">Coba kata kunci lain atau hubungi kami langsung</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((faq, i) => (
                  <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="mt-10 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_32px_-8px_rgba(59,130,246,0.5)]"
            >
              <div>
                <p className="font-bold text-lg">Tidak menemukan jawaban yang Anda cari?</p>
                <p className="text-blue-100 text-sm mt-1">Tim kami siap membantu Anda secara langsung</p>
              </div>
              <Link href="/contact"
                className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Hubungi Tim Kami
              </Link>
            </motion.div>
          </div>

          {/* Sidebar help card */}
          <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-28">
            <div className="rounded-2xl bg-white border border-blue-100 shadow-sm p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 mb-4">
                <MessageCircle className="size-5 text-blue-500" />
              </div>
              <p className="font-bold text-slate-900 mb-1">Masih butuh bantuan?</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Tim support kami siap menjawab pertanyaan Anda secara langsung.
              </p>
              <Link href="/contact"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-blue-500 text-white text-sm font-semibold py-2.5 hover:bg-blue-600 transition-colors shadow-[0_4px_16px_-4px_rgba(59,130,246,0.5)]"
              >
                <Phone className="size-4" />
                Hubungi Kami
              </Link>
            </div>

            <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-100 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">Statistik</p>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{FAQS.length}</p>
                  <p className="text-xs text-slate-500">Pertanyaan tersedia</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{CATEGORIES.length - 1}</p>
                  <p className="text-xs text-slate-500">Kategori topik</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
