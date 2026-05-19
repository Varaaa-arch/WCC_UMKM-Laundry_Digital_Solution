"use client"

import "./home.css"

import { AdvantagesSection } from "@/components/home/AdvantagesSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { HowToOrderSection } from "@/components/home/HowToOrderSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export function HomeExperience() {
  return (
    <main className="home-shell antialiased">
      <HeroSection />
      <HowToOrderSection />
      <AdvantagesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </main>
  )
}
