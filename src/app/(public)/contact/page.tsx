"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Phone, Mail, Clock, Check, Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="py-16 sm:py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get In Touch
          </h1>
          <div className="mt-4 text-[#C9A84C] text-xl opacity-70">◇</div>
          <p className="mt-4 text-lg text-white/50">
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] transition-all duration-300 group-hover:bg-[#C9A84C] group-hover:text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/50">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="mb-4 text-sm font-medium text-white/50 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex gap-3">
                {["Instagram", "Facebook", "Pinterest", "TikTok"].map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-white/10 bg-[#111] px-4 py-2 text-xs font-medium text-white/50 transition-all duration-300 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] cursor-default"
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
            <div className="rounded-xl border border-white/10 bg-[#111] p-6 sm:p-8">
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
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-black"
                    >
                      <Check className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-white/50">
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
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="border-white/10 bg-black text-white placeholder:text-white/30 transition-all duration-300 focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="border-white/10 bg-black text-white placeholder:text-white/30 transition-all duration-300 focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="border-white/10 bg-black text-white placeholder:text-white/30 transition-all duration-300 focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="border-white/10 bg-black text-white placeholder:text-white/30 transition-all duration-300 focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Tell us more about your inquiry..."
                        className="flex w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white placeholder:text-white/30 ring-offset-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gap-2 border border-white/30 bg-transparent text-white hover:bg-white/10"
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
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111] py-20 transition-all duration-300 hover:border-[#C9A84C]/30">
            <MapPin className="h-10 w-10 text-[#C9A84C]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-white">
              Find Us
            </h3>
            <p className="mt-1 text-sm text-white/50">
              123 Beauty Avenue, Suite 100, New York, NY 10001
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
