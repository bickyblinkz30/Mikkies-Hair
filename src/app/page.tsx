import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesPreview } from "@/components/landing/ServicesPreview"
import { WhyChooseUs } from "@/components/landing/WhyChooseUs"
import ParticleBackground from "@/components/ParticleBackground"

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <div className="flex min-h-screen flex-col relative z-10">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ServicesPreview />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    </>
  )
}
