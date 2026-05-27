import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesPreview } from "@/components/landing/ServicesPreview"
import { WhyChooseUs } from "@/components/landing/WhyChooseUs"
import { GalleryPreview } from "@/components/landing/GalleryPreview"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { CTABanner } from "@/components/landing/CTABanner"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesPreview />
        <WhyChooseUs />
        <GalleryPreview />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
