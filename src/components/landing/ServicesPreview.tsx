"use client"

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

const ScissorsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M18 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    <path d="M6 4l12 16" />
    <path d="M6 20l12-16" />
  </svg>
)

const WaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12c3-4 6 4 9 0s6-4 9 0" />
    <path d="M3 6c3-4 6 4 9 0s6-4 9 0" />
    <path d="M3 18c3-4 6 4 9 0s6-4 9 0" />
  </svg>
)

const BlowDryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8c0 3 2 6 4 8h8c2-2 4-5 4-8a8 8 0 0 0-8-8z" />
    <path d="M8 18c0 2 1.5 4 4 4s4-2 4-4" />
    <path d="M10 14c.5-1 1.5-1 2 0" />
  </svg>
)

const ColorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3" />
    <path d="M5 9h14" />
    <path d="M5 15h14" />
    <circle cx="9" cy="6" r="1" fill="currentColor" />
    <circle cx="15" cy="6" r="1" fill="currentColor" />
  </svg>
)

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
    <path d="M9 4l1 3" />
    <path d="M15 4l-1 3" />
    <path d="M4 9l3 1" />
    <path d="M20 9l-3 1" />
    <path d="M9 20l1-3" />
    <path d="M15 20l-1-3" />
    <path d="M4 15l3-1" />
    <path d="M20 15l-3-1" />
  </svg>
)

const services = [
  {
    title: "Hair Cut",
    description: "Precision cutting tailored to your face shape and style preferences.",
    Icon: ScissorsIcon,
  },
  {
    title: "Hair Treatment",
    description: "Deep conditioning, keratin treatments, and scalp therapy.",
    Icon: WaveIcon,
  },
  {
    title: "Blow Dry",
    description: "Professional blow-dry styling for that perfect finish.",
    Icon: BlowDryIcon,
  },
  {
    title: "Hair Coloring",
    description: "Full color, highlights, balayage, and creative color services.",
    Icon: ColorIcon,
  },
  {
    title: "Hair Styling",
    description: "Custom styling for any occasion — from casual to red carpet.",
    Icon: SparkleIcon,
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

export function ServicesPreview() {
  return (
    <section className="relative py-24" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <div className="mt-4 text-[#C9A84C] text-xl opacity-70">◇</div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.Icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group rounded-xl border border-white/10 bg-[#111] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.15)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-[#C9A84C] transition-all duration-500">
                  <Icon />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
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
