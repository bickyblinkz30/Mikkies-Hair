"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Scissors, Braces, Palette, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function ServicesPreview() {
  return (
    <section className="py-24" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#D4AF37]" />
          <p className="mt-4 text-lg text-[#D4AF37]/70">
            Premium hair care tailored to your unique style
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group cursor-pointer rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-[#D4AF37]/50 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] transition-colors group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
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
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition-colors hover:text-[#C4A030]"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
