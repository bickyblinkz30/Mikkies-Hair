"use client"

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { Gem, Users, Crown } from "lucide-react"

const reasons = [
  {
    title: "Premium Quality",
    description: "Only the finest products for exceptional results.",
    icon: Gem,
  },
  {
    title: "Expert Stylists",
    description: "Years of experience in hair artistry.",
    icon: Users,
  },
  {
    title: "Luxury Experience",
    description: "Relax and indulge in a setting designed for you.",
    icon: Crown,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function WhyChooseUs() {
  return (
    <section className="relative border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl tracking-wide text-white sm:text-5xl">
            Why Mikkies Hair
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-white/30" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-16"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="group flex flex-col items-center text-center max-w-xs"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 transition-all duration-500 group-hover:border-[#D4AF37]/30 group-hover:text-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
