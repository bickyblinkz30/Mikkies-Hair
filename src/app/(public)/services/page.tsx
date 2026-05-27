"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Scissors, Sparkles, Wind, Stars, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    name: "Hair Cut",
    description: "Precision cutting tailored to your face shape and style preferences",
    category: "Cutting",
    icon: Scissors,
  },
  {
    name: "Hair Treatment",
    description: "Deep conditioning, keratin treatments, and scalp therapy",
    category: "Treatment",
    icon: Sparkles,
  },
  {
    name: "Blow Dry",
    description: "Professional blow-dry styling for that perfect finish",
    category: "Styling",
    icon: Wind,
  },
  {
    name: "Hair Coloring",
    description: "Full color, highlights, balayage, and creative color",
    category: "Coloring",
    icon: Palette,
  },
  {
    name: "Hair Styling",
    description: "Custom styling for any occasion — from casual to red carpet",
    category: "Styling",
    icon: Stars,
  },
  {
    name: "Braiding",
    description: "Expert braiding including box braids, cornrows, and passion twists",
    category: "Braiding",
    icon: Scissors,
  },
  {
    name: "Wig Installation",
    description: "Professional wig installation and customization",
    category: "Installation",
    icon: Scissors,
  },
  {
    name: "Frontal Styling",
    description: "Expert frontal preparation, bleaching, and styling",
    category: "Styling",
    icon: Scissors,
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Services
          </h1>
          <div className="mt-4 text-[#C9A84C] text-xl opacity-70">◇</div>
          <p className="mt-4 text-lg text-white/50">
            Premium hair care tailored to your unique style
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.name}
                variants={item}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#111] p-6 transition-all duration-300 hover:border-[#C9A84C]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.12)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="inline-block rounded-full border border-[#C9A84C]/30 px-3 py-1 text-xs font-medium text-[#C9A84C]">
                  {service.category}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {service.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>

                <div className="mt-6">
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
