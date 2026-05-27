"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Award, Heart, Sparkles, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
  viewport: { once: true, margin: "-80px" },
}

const child = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const values = [
  {
    title: "Excellence",
    description: "We never compromise on quality",
    icon: Award,
  },
  {
    title: "Creativity",
    description: "Every style is a work of art",
    icon: Sparkles,
  },
  {
    title: "Community",
    description: "Building confidence one strand at a time",
    icon: Heart,
  },
]

const timeline = [
  { year: "2018", event: "Mikkies Hair founded with a vision for luxury hair care" },
  { year: "2020", event: "Expanded team with master stylists from around the country" },
  { year: "2022", event: "Opened flagship salon in the heart of New York" },
  { year: "2024", event: "Named Top Salon in NYC by Beauty Excellence Awards" },
  { year: "2025", event: "Launched premium product line and expanded services" },
]

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-[#888888]">
            Where artistry meets elegance — every strand tells a story
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="relative">
            <Quote className="absolute -left-2 -top-8 h-12 w-12 text-[#D4AF37]/20" />
            <p className="text-lg leading-relaxed text-[#F5F5F5]/90">
              Founded with a passion for transforming hair and boosting confidence,
              Mikkies Hair is more than a salon — it&apos;s an experience.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#F5F5F5]/80">
              Every appointment is crafted with care, precision, and an eye for
              artistry. We believe great hair is the ultimate accessory.
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="rounded-xl border border-[#D4AF37]/40 bg-black/50 p-8 text-center sm:p-12">
            <h2 className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#F5F5F5]/85">
              To provide exceptional hair care in a luxurious, welcoming environment
              where every client leaves feeling beautiful and confident.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20"
        >
          <h2 className="mb-12 text-center font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
            Our Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  variants={child}
                  className="group rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/60 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#F5F5F5]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#888888]">
                    {v.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="mb-12 text-center font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
            Our Journey
          </h2>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[19px] top-0 h-full w-px bg-[#D4AF37]/30" />
            <div className="space-y-10">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black text-[#D4AF37] text-sm font-bold">
                    {entry.year.slice(2)}
                  </div>
                  <div className="pt-1.5">
                    <span className="text-xs font-semibold tracking-widest text-[#D4AF37]/70 uppercase">
                      {entry.year}
                    </span>
                    <p className="mt-1 text-[#F5F5F5]/80">{entry.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h2 className="font-serif text-2xl font-bold text-[#D4AF37] sm:text-3xl">
            Ready to Experience the Difference?
          </h2>
          <p className="mt-3 text-[#888888]">
            Book your appointment and let us transform your look.
          </p>
          <Link href="/booking" className="mt-8 inline-block">
            <Button className="gap-2 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
              Book Your Appointment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
