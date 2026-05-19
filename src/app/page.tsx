import { HomeExperience } from "@/components/home/HomeExperience"
import { Footer } from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#EEF4FB]">
      <HomeExperience />
      <Footer />
    </div>
  )
}
