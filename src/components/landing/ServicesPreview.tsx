"use client"

import Link from "next/link"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { Scissors, Braces, Palette, Sparkles, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Hair Cutting & Styling",
    description: "Precision cuts and custom styling tailored to your face shape and lifestyle.",
    icon: Scissors,
  },
  {
    title: "Braiding & Weaves",
    description: "Expert braiding and weave installation with flawless finishes.",
    icon: Braces,
  },
  {
    title: "Hair Coloring",
    description: "Premium color treatments from subtle highlights to bold transformations.",
    icon: Palette,
  },
  {
    title: "Treatments & Care",
    description: "Deep conditioning and scalp treatments to restore your hair's natural vitality.",
    icon: Sparkles,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function ServicesPreview() {
  return (
    <section className="relative py-24" id="services">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl tracking-wide text-white sm:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-white/30" />
          <p className="mt-4 text-lg text-white/50">
            Premium hair care tailored to your unique style
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/0 transition-all duration-500 group-hover:opacity-100 group-hover:from-[#D4AF37]/0 group-hover:via-[#D4AF37]/[0.03] group-hover:to-[#D4AF37]/[0.06]"
              />
              <div className="absolute inset-0 rounded-xl border border-[#D4AF37]/0 transition-all duration-500 group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.2)]" />
              <div className="relative z-10">
                <div className="mb-5 flex h-10 w-10 items-center justify-center text-white/40 transition-all duration-500 group-hover:text-[#D4AF37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
