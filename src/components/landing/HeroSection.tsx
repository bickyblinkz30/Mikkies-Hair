import HeroCircle from "@/components/HeroCircle"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <HeroCircle />
      </div>
    </section>
  )
}
