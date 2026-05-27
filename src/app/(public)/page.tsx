import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesPreview } from "@/components/landing/ServicesPreview"
import { WhyChooseUs } from "@/components/landing/WhyChooseUs"
import { GalleryPreview } from "@/components/landing/GalleryPreview"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { CTABanner } from "@/components/landing/CTABanner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <GalleryPreview />
      <TestimonialsSection />
      <CTABanner />
    </>
  )
}
