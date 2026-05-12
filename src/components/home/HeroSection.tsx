import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

import { HERO } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

function FeatureBlurb({
  iconSrc,
  children,
}: {
  iconSrc: string
  children: React.ReactNode
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.78)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.85)", padding: "1rem", boxShadow: "0 8px 24px -8px rgba(15,55,120,0.14)", display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
      <div className="relative size-14 shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" sizes="56px" />
      </div>
      <p className="text-sm leading-relaxed text-[#3d5a73]">{children}</p>
    </div>
  )
}

export function HeroSection() {
  const assets = HERO.assets

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f8ff 0%, #e3f2fd 50%, #d6ecfa 100%)" }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 pb-0 pt-8 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6">
          <Badge
            variant="outline"
            className="rounded-full border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-[#0d4a8c]"
          >
            {HERO.badge}
          </Badge>
        </div>

        {/* Judul */}
        <h1
          id="hero-heading"
          className="mb-10 text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
        >
          <span className="block text-[#0d2847]">{HERO.titleLine1}</span>
          <span className="block text-[#228be6]">{HERO.titleLine2}</span>
        </h1>

        {/* Grid 3 kolom */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Kiri */}
          <div className="flex flex-col gap-5 pb-10 lg:pb-20">
            <FeatureBlurb iconSrc={assets.iconClock}>{HERO.features.leftTop}</FeatureBlurb>
            <FeatureBlurb iconSrc={assets.iconShirt}>{HERO.features.leftBottom}</FeatureBlurb>
          </div>

          {/* Tengah — maskot overlap ke awan */}
          <div className="relative z-10 flex justify-center">
            <div className="relative w-[300px] sm:w-[360px] lg:w-[400px] xl:w-[440px]"
              style={{ aspectRatio: "1 / 1", marginBottom: "-80px" }}>
              <Image
                src="/images/laundry-mascot.png"
                alt={HERO.imageAlt}
                fill
                priority
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 1024px) 90vw, 440px"
              />
            </div>
          </div>

          {/* Kanan */}
          <div className="flex flex-col gap-5 pb-10 lg:pb-20">
            <FeatureBlurb iconSrc={assets.iconThumbs}>{HERO.features.rightTop}</FeatureBlurb>
            <Link
              href={HERO.primaryHref}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#5bc8f5] via-[#38a7f0] to-[#1971c2] px-8 text-base font-semibold text-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.5)] transition hover:brightness-105 active:scale-[0.98]"
            >
              <Play className="size-4 fill-current" aria-hidden />
              {HERO.primaryBtn}
            </Link>
          </div>
        </div>
      </div>

      {/* Zona awan — background biru + gambar awan di atas */}
      <div
        className="relative h-[200px] w-full overflow-hidden sm:h-[240px] lg:h-[280px]"
        style={{ backgroundColor: "#90CAF9" }}
        aria-hidden
      >
        {/* Gambar awan: transparan di atas, awan biru di bawah — tampilkan dari atas */}
        <Image
          src={assets.cloudWave}
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
    </section>
  )
}
