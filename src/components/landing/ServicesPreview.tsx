"use client"

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

/* === Service icons === */

const ScissorsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <circle cx="13" cy="34" r="5" />
    <circle cx="35" cy="34" r="5" />
    <path d="M17 30 L40 9" />
    <path d="M31 30 L8 9" />
  </svg>
)

const HairTreatmentIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-10 w-10">
    <path d="M8 14c4-6 8 6 12 0s8 6 12 0 8 6 12 0" />
    <path d="M8 24c4-6 8 6 12 0s8 6 12 0 8 6 12 0" />
    <path d="M8 34c4-6 8 6 12 0s8 6 12 0 8 6 12 0" />
  </svg>
)

const BlowDryIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <path d="M8 14h22a8 8 0 0 1 0 16H8z" />
    <path d="M30 18l8-4v16l-8-4" />
    <path d="M16 30v6a4 4 0 0 0 8 0v-6" />
    <circle cx="16" cy="22" r="1.2" />
  </svg>
)

const HairColorIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-10 w-10">
    <path d="M10 22c2-6 6 4 10 0s6-6 10 0" />
    <path d="M10 30c2-6 6 4 10 0s6-6 10 0" />
    <path d="M10 38c2-6 6 4 10 0s6-6 10 0" />
  </svg>
)

const SparkleIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
    <path d="M24 6l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
    <path d="M10 30l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
    <path d="M38 32l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
  </svg>
)

const services = [
  { title: "Hair Cut",       description: "Stylish cuts tailored to your look.",       Icon: ScissorsIcon },
  { title: "Hair Treatment", description: "Nourish, repair and revive your hair.",     Icon: HairTreatmentIcon },
  { title: "Blow Dry",       description: "Sleek, smooth and long lasting.",           Icon: BlowDryIcon },
  { title: "Hair Coloring",  description: "Vibrant colors to express you.",            Icon: HairColorIcon },
  { title: "Hair Styling",   description: "Perfect style for every occasion.",         Icon: SparkleIcon },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function ServicesPreview() {
  return (
    <section className="relative bg-black py-24" id="services">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl tracking-wide text-white md:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto mt-3 text-[#C9A84C]">◇</div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.Icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="rounded-xl border border-white/10 bg-[#0c0c0c] p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.15)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center text-[#C9A84C]">
                  <Icon />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
