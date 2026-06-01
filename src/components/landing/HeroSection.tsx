"use client"

import { motion } from "framer-motion"
import HeroCircle from "@/components/HeroCircle"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <HeroCircle />
        </motion.div>
      </div>
    </section>
  )
}
