  /** URL/href placeholders use paths or hashes — do not wrap in [...] or Next `<Link>` will error. Replace these string values when wiring real routes. */

  export const SITE = {
    name: "LummyBlue",
    tagline: "[SITE_TAGLINE]",
  } as const

  export const NAV = {
    logo: "LummyBlue",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Layanan", href: "/layanan" },
      { label: "Tentang Kami", href: "/about" },
      { label: "Kontak", href: "/contact" },
    ] as const,
    loginLabel: "Masuk",
    loginHref: "/login",
    cta: "Daftar",
    ctaHref: "/register",
    mobileMenuLabel: "[MOBILE_MENU_LABEL]",
    mobileSheetTitle: "[MOBILE_MENU_TITLE]",
  } as const

  export const HERO = {
    badge: "#1 Modern Laundry Service",
    titleLine1: "Kesegaran Sempurna,",
    titleLine2: "Tanpa Repot.",
    subtitle:
      "Layanan laundry modern dengan standar kebersihan tinggi, teknologi cuci terkini, dan pengantaran praktis.",
    primaryBtn: "Pesan Sekarang",
    primaryHref: "/layanan",
    secondaryBtn: "Lihat Detail",
    secondaryHref: "#hero-secondary-placeholder",
    imageAlt: "Maskot laundry mesin cuci dan kurir",
    /** Dasar “lantai awan” di bawah hero (Material Blue 200 ≈ mockup) */
    cloudFloorColor: "#90CAF9",
    assets: {
      iconClock: "/images/home-image/gambar-jam.png",
      iconShirt: "/images/home-image/gambar-baju.png",
      iconThumbs: "/images/home-image/gambar-jempol.png",
    },
    features: {
      leftTop:
        "Nikmati waktu luang Anda lebih banyak sementara kami menangani cucian Anda dengan standar kebersihan tertinggi dan efisiensi teknologi.",
      leftBottom:
        "Dengan teknologi pencucian modern dan perhatian pada detail, kami memastikan setiap pakaian kembali bersih dan nyaman digunakan.",
      rightTop:
        "Nikmati layanan laundry praktis dengan kualitas terbaik untuk menemani aktivitas harian Anda tanpa repot mencuci sendiri.",
    },
  } as const

  export const HOW_TO_ORDER = {
    title: "Pilih Cara Anda",
    subtitle: "Kami memberikan fleksibilitas penuh untuk kebutuhan gaya hidup modern anda",
    cards: [
      {
        title: "Pickup & Delivery",
        description: "Cocok untuk Anda yang sibuk. Kami jemput ke rumah dan antar kembali dalam keadaan rapi dan harum.",
        linkLabel: "Pesan Pickup",
        href: "#option-1-link-placeholder",
        linkAria: "Pesan Pickup",
      },
      {
        title: "Self Drop-Off",
        description: "Ingin mampir sebentar? Drop cucian Anda di outlet terdekat kami kapan saja Anda mau.",
        linkLabel: "Cari Outlet",
        href: "#option-2-link-placeholder",
        linkAria: "Cari Outlet",
      },
    ] as const,
  } as const

  export const ADVANTAGES = {
    mainTitle: "Keunggulan Laundry Kami",
    mainDescription: "Mengapa ribuan keluarga mempercayakan pakaian mereka kepada kami setiap harinya.",
    features: [
      {
        title: "Cepat",
        description: "Layanan kilat 6 jam selesai untuk kebutuhan mendesak Anda.",
      },
      {
        title: "Terjangkau",
        description: "Harga kompetitif dengan paket langganan yang hemat kantong.",
      },
      {
        title: "Fleksibel",
        description: "Atur jadwal pengambilan dan pengiriman sesuai keinginan Anda. Tidak perlu lagi menunggu seharian di rumah.",
      },
    ] as const,
  } as const

  export const HOW_IT_WORKS = {
    title: "Bagaimana Kami Bekerja",
    subtitle: "Alur sederhana dan efisien untuk mempermudah Anda.",
    steps: [
      {
        n: 1,
        title: "Pesan",
        description: "Pesan layanan laundry Anda melalui website atau aplikasi kami.",
      },
      {
        n: 2,
        title: "Pengambilan",
        description: "Kurir kami akan datang ke tempat Anda untuk mengambil cucian Anda.",
      },
      {
        n: 3,
        title: "Proses",
        description: "Cucian Anda akan diproses dengan standar kebersihan tertinggi dan efisiensi teknologi.",
      },
      {
        n: 4,
        title: "Selesai",
        description: "Cucian Anda akan diantar kembali ke tempat Anda dalam keadaan rapi dan harum.",
      },
    ] as const,
  } as const

  export const TESTIMONIALS = {
    title: "Apa Kata Pelanggan Kami",
    items: [
      {
        text: "Sangat puas dengan layanannya! Wanginya enak banget dan rapi sekali setrikanya. Menghemat waktu saya banget.",
        name: "Siska Pratama",
        role: "Mahasiswi",
        avatarAlt: "/images/siska-pratama.png",
      },
      {
        text: "Fitur pickup & delivery-nya juara. Kurirnya ramah dan selalu tepat waktu sesuai jadwal yang saya pilih di app.",
        name: "Andi Wijaya",
        role: "Freelancer",
        avatarAlt: "/images/andi-wijaya.png",
      },
      {
        text: "Harganya sangat masuk akal dibanding kompetitor. Hasil cuci keringnya tidak merusak bahan pakaian mahal saya.",
        name: "Budi Hartono",
        role: "Pengusaha",
        avatarAlt: "/images/budi-hartono.png",
      },
    ] as const,
  } as const

  export const FOOTER = {
    tagline: "Solusi laundry modern dan terpercaya di Indonesia. Kami memberikan layanan kebersihan terbaik untuk kenyamanan Anda.",
    logo: "LummyBlue",
    columns: [
      {
        heading: "Layanan Kami",
        links: [
          { label: "Cuci Kering" },
          { label: "Setrika Premium" },
          { label: "Laundry Sepatu" },
          { label: "Express Service" },
        ],
      },
      {
        heading: "Navigasi",
        links: [
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "/layanan" },
          { label: "Tentang Kami", href: "/about" },
          { label: "Riwayat", href: "/history" },
          { label: "Kontak", href: "/contact" },
        ],
      },
      {
        heading: "Bantuan",
        links: [
          { label: "Syarat & Ketentuan", href: "#footer-col4-link-placeholder-1" },
          { label: "Kebijakan Privasi", href: "#footer-col4-link-placeholder-2" },
          { label: "FAQ", href: "#footer-col4-link-placeholder-3" },
        ],
      },
    ] as const,
    copyright: "© 2024 Laundry. Solusi laundry modern dan terpercaya di Indonesia.",
    socialInstagramHref: "#social-instagram-placeholder",
    socialFacebookHref: "#social-facebook-placeholder",
    socialTwitterHref: "#social-twitter-placeholder",
    socialInstagramAria: "[SOCIAL_INSTAGRAM_ARIA]",
    socialFacebookAria: "[SOCIAL_FACEBOOK_ARIA]",
    socialTwitterAria: "[SOCIAL_TWITTER_ARIA]",
  } as const
