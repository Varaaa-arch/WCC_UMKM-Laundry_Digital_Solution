"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Users } from "lucide-react"
import { BubbleLink } from "@/components/ui/bubble-button"

// ─── animation presets ───────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
})

// ─── social proof avatars (placeholder initials) ─────────────────────────────
const AVATARS = ["S", "A", "B", "R"]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax for the mascot
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const mascotX = useTransform(springX, [-1, 1], [-14, 14])
  const mascotY = useTransform(springY, [-1, 1], [-10, 10])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      mouseX.set(((e.clientX - left) / width) * 2 - 1)
      mouseY.set(((e.clientY - top) / height) * 2 - 1)
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      className="hero-root relative isolate flex min-h-screen flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background radial glows ─────────────────────────────────────── */}
      <div className="hero-glow-blue" aria-hidden />
      <div className="hero-glow-purple" aria-hidden />

      {/* ── Noise texture overlay ───────────────────────────────────────── */}
      <div className="hero-noise" aria-hidden />

      {/* ── Vignette ────────────────────────────────────────────────────── */}
      <div className="hero-vignette" aria-hidden />

      {/* ── GIANT background wordmark ───────────────────────────────────── */}
      <div className="hero-wordmark-wrap" aria-hidden>
        <motion.span
          className="hero-wordmark"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          LUMMYBLUE
        </motion.span>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="hero-content relative z-10 flex flex-1 flex-col">

        {/* Center stage: mascot floating over wordmark */}
        <div className="hero-stage flex flex-1 items-start justify-center">
          <motion.div
            style={{ x: mascotX, y: mascotY }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            className="hero-mascot-wrap"
          >
            {/* Glow behind mascot */}
            <div className="hero-mascot-glow" aria-hidden />

            {/* Shadow under mascot */}
            <div className="hero-mascot-shadow" aria-hidden />

            {/* Mascot image */}
            <motion.div
              className="hero-mascot-img"
              initial={{ opacity: 0, y: 48, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.35 }}
            >
              <Image
                src="/images/mascot/laundry-mascot.png"
                alt="LummyBlue mascot"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 58vw, 680px"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar: left copy + right stats */}
        <div className="hero-bottom">
          {/* Left: description + CTA */}
          <motion.div className="hero-bottom-left" {...fadeUp(0.55)}>
            <p className="hero-desc">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Layanan laundry modern dengan standar kebersihan tinggi,
              teknologi cuci terkini, dan pengantaran praktis ke pintu Anda.
            </p>
            <div className="hero-cta-row">
              <BubbleLink href="/layanan" className="hero-btn-primary group">
                Pesan Sekarang
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </BubbleLink>
            </div>
          </motion.div>

          {/* Right: social proof */}
          <motion.div className="hero-bottom-right" {...fadeUp(0.7)}>
            <div className="hero-avatars">
              {AVATARS.map((initial, i) => (
                <span
                  key={i}
                  className="hero-avatar"
                  style={{ zIndex: AVATARS.length - i }}
                  aria-hidden
                >
                  {initial}
                </span>
              ))}
              <span className="hero-avatar hero-avatar-plus" aria-hidden>
                <Users className="size-3" />
              </span>
            </div>
            <div>
              <p className="hero-stat-number">1.5K+</p>
              <p className="hero-stat-label">
                Pelanggan aktif mempercayakan cucian mereka kepada kami
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Heading (sr-only for SEO) ────────────────────────────────────── */}
      <h1 id="hero-heading" className="sr-only">
        LummyBlue — Layanan Laundry Modern
      </h1>
    </section>
  )
}
