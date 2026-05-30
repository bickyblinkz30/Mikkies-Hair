"use client"

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

const ExpertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 22a8 8 0 0 1 16 0" />
  </svg>
)

const ProductsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M9 2h6v3H9z" />
    <path d="M7 5h10v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
    <path d="M10 12h4" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6z" />
    <path d="M12 8v6" />
    <path d="M9 11h6" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
  </svg>
)

const reasons = [
  { title: "Expert Stylists",   description: "Trained professionals who care.",          Icon: ExpertIcon },
  { title: "Premium Products",  description: "We use only the best for your hair.",       Icon: ProductsIcon },
  { title: "Hygienic & Safe",   description: "Clean, safe and relaxing environment.",     Icon: ShieldIcon },
  { title: "Personalized Care", description: "Because your hair is unique.",              Icon: HeartIcon },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function WhyChooseUs() {
  return (
    <section className="relative bg-black pb-32 pt-8">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl tracking-wide text-white md:text-4xl">
            Why Choose Us
          </h2>
          <div className="mx-auto mt-3 text-[#C9A84C]">◇</div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason) => {
            const Icon = reason.Icon
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="flex flex-col items-start"
              >
                <div className="text-[#C9A84C]">
                  <Icon />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm text-white/55">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
