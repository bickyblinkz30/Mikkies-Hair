"use client"

import Link from "next/link"
import { ArrowRight, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BookingCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-8 sm:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col items-center text-center">
            <CalendarCheck className="h-12 w-12 text-white/80" />
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Look?
            </h2>
            <p className="mt-4 max-w-lg text-purple-100">
              Request a consultation and let us create the perfect style for you.
            </p>
            <Link href="/booking" className="mt-8">
              <Button
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-purple-50"
              >
                Request Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
