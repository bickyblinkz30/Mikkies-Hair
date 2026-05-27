"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="border-t border-[#1f1f1f] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 px-8 py-16 text-center sm:px-16"
        >
          <h2 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl">
            Ready to Transform Your Look?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#D4AF37]/70">
            Book your appointment today and experience the Mikkies Hair difference
          </p>
          <Link href="/booking">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-[#C4A030]"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
