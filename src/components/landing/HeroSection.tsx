"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const rings = [
  {
    size: "h-72 w-72",
    position: "-top-20 -left-20",
    delay: 0,
    duration: 20,
    opacity: 0.15,
  },
  {
    size: "h-96 w-96",
    position: "top-1/3 -right-32",
    delay: 5,
    duration: 25,
    opacity: 0.1,
  },
  {
    size: "h-64 w-64",
    position: "bottom-20 left-1/2",
    delay: 10,
    duration: 18,
    opacity: 0.12,
  },
]

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 15,
}))

export function HeroSection() {
  const floatingParticles = useMemo(() => particles, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        {rings.map((ring) => (
          <motion.div
            key={ring.delay}
            className={`absolute ${ring.position} ${ring.size} rounded-full border border-[#D4AF37]/30`}
            style={{ opacity: ring.opacity }}
            animate={{ rotate: 360 }}
            
          />
        ))}
        {rings.map((ring) => (
          <motion.div
            key={`inner-${ring.delay}`}
            className={`absolute ${ring.position} ${ring.size} rounded-full border border-[#D4AF37]/10`}
            style={{ opacity: ring.opacity, transform: "scale(0.7)" }}
            animate={{ rotate: -360 }}
            
          />
        ))}
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -30, -60],
              x: [0, 15, 0],
            }}
            
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-7xl tracking-wide text-foreground md:text-8xl"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              Mikkies Hair
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg text-[#D4AF37]/80 md:text-xl"
          >
            Radiate confidence. Stay cute.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/booking">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-[#C4A030]"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] px-8 py-3 text-sm font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
              >
                Explore Services
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
