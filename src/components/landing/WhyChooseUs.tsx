"use client"

import { motion } from "framer-motion"
import { Gem, Users, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

const reasons = [
  {
    title: "Premium Quality",
    description: "We use only the finest products for your hair, ensuring every treatment delivers exceptional results.",
    icon: Gem,
  },
  {
    title: "Expert Stylists",
    description: "Years of experience and continuous education keep our team at the forefront of hair artistry.",
    icon: Users,
  },
  {
    title: "Luxury Experience",
    description: "From consultation to finish, every moment matters. Relax and indulge in a setting designed for you.",
    icon: Crown,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function WhyChooseUs() {
  return (
    <section className="border-t border-[#1f1f1f] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            Why Mikkies Hair
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#D4AF37]" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="group rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/40 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37]/20">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
