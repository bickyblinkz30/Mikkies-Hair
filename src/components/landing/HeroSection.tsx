"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Scissors, CalendarCheck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#111827]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Premium Beauty Booking Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Perfect Style,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                One Click Away
              </span>
            </h1>

            <p className="max-w-lg text-lg text-purple-100">
              Book appointments with top braiders, dreadlock stylists, barbers,
              and beauty professionals. No more back-and-forth — just instant
              booking.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/booking">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-white text-primary hover:bg-purple-50 sm:w-auto"
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
                >
                  View Services
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Scissors, text: "Expert Stylists" },
                { icon: CalendarCheck, text: "Instant Booking" },
                { icon: ShieldCheck, text: "Secure & Easy" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-purple-100">
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-300/20 to-pink-300/20 p-8 backdrop-blur-sm">
                <div className="flex h-full items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl bg-white/10 backdrop-blur-sm"
                      >
                        <div className="flex h-full items-center justify-center">
                          <Scissors className="h-8 w-8 text-white/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-purple-100">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
