"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Phone, Mail, Clock, Check, Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    detail: "123 Beauty Avenue, Suite 100, New York, NY 10001",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "hello@mikkieshair.com",
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Monday - Saturday: 9:00 AM - 7:00 PM",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-[#888888]">
            We&apos;d love to hear from you. Reach out and let us make your next visit unforgettable.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-medium text-[#F5F5F5]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#888888]">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="border-t border-[#1f1f1f] pt-6">
              <p className="mb-4 text-sm font-medium text-[#888888] uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex gap-3">
                {["Instagram", "Facebook", "Pinterest", "TikTok"].map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#888888] transition-all duration-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] cursor-default"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-black"
                    >
                      <Check className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold text-[#F5F5F5]">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-[#888888]">
                      Thank you for reaching out. We&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#F5F5F5]">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="border-[#1f1f1f] bg-[#111111] text-[#F5F5F5] placeholder:text-[#888888] transition-all duration-300 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#F5F5F5]">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="border-[#1f1f1f] bg-[#111111] text-[#F5F5F5] placeholder:text-[#888888] transition-all duration-300 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#F5F5F5]">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="border-[#1f1f1f] bg-[#111111] text-[#F5F5F5] placeholder:text-[#888888] transition-all duration-300 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#F5F5F5]">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="border-[#1f1f1f] bg-[#111111] text-[#F5F5F5] placeholder:text-[#888888] transition-all duration-300 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#F5F5F5]">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Tell us more about your inquiry..."
                        className="flex w-full rounded-lg border border-[#1f1f1f] bg-[#111111] px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#888888] ring-offset-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-20 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/30">
            <MapPin className="h-10 w-10 text-[#D4AF37]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-[#D4AF37]">
              Find Us
            </h3>
            <p className="mt-1 text-sm text-[#888888]">
              123 Beauty Avenue, Suite 100, New York, NY 10001
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
