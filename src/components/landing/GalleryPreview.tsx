"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { label: "Braiding", gradient: "from-purple-900/50 to-black" },
  { label: "Dreadlocks", gradient: "from-amber-900/50 to-black" },
  { label: "Coloring", gradient: "from-rose-900/50 to-black" },
  { label: "Styling", gradient: "from-emerald-900/50 to-black" },
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

export function GalleryPreview() {
  return (
    <section className="border-t border-[#1f1f1f] py-24" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            Our Work
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#D4AF37]" />
          <p className="mt-4 text-lg text-[#D4AF37]/70">
            A glimpse into the artistry behind every appointment
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className={cn(
                "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-[#1f1f1f] bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:border-[#D4AF37]/50",
                item.gradient,
              )}
            >
              <div className="flex h-full items-center justify-center">
                <span className="font-serif text-2xl tracking-wide text-white/40 transition-all duration-300 group-hover:text-white/80">
                  {item.label}
                </span>
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
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition-colors hover:text-[#C4A030]"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
