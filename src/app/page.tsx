import { AdvantagesSection } from "@/components/home/AdvantagesSection"
import { HeroSection } from "@/components/home/HeroSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { HowToOrderSection } from "@/components/home/HowToOrderSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Navbar />

      <main className="flex-1 bg-white">
        <HeroSection />
        <HowToOrderSection />
        <AdvantagesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  )
}
