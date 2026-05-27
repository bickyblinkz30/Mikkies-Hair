import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { GallerySection } from "@/components/landing/GallerySection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { BookingCTA } from "@/components/landing/BookingSection"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  )
}
