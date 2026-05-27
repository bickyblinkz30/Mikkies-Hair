import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { GallerySection } from "@/components/landing/GallerySection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { BookingCTA } from "@/components/landing/BookingSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  )
}
