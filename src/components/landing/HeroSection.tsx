"use client"

import { motion } from "framer-motion"
import GoldenEmblem from "@/components/GoldenEmblem"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <GoldenEmblem />
        </motion.div>
      </div>
    </section>
  )
}
