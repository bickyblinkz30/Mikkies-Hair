"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { CalendarDays, Clock, Scissors, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Valued Client"
  const service = searchParams.get("service") || "your service"
  const date = searchParams.get("date") || ""
  const time = searchParams.get("time") || ""

  const formattedDate = date
    ? new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D4AF37]/30 bg-[#D4AF37]/10"
        >
          <CheckCircle className="h-10 w-10 text-[#D4AF37]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 font-serif text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 text-lg text-[#888]"
        >
          Your appointment has been booked successfully. We look forward to seeing you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-6 text-left"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                <Scissors className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Service</p>
                <p className="mt-0.5 font-medium text-[#F5F5F5]">{service}</p>
              </div>
            </div>
            {formattedDate && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                  <CalendarDays className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Date</p>
                  <p className="mt-0.5 font-medium text-[#F5F5F5]">{formattedDate}</p>
                </div>
              </div>
            )}
            {time && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                  <Clock className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Time</p>
                  <p className="mt-0.5 font-medium text-[#F5F5F5]">{time}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4 text-sm">
            <p className="font-medium text-[#D4AF37]">Cash payment only at this time</p>
            <p className="mt-1 text-[#888]">
              Please pay in cash at the time of your appointment.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-[#666]">
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
              The stylist will review your booking
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
              You&apos;ll receive a confirmation email
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
              Please arrive 10 minutes early
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
              Payment is due at the appointment
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8"
        >
          <Link href="/">
            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  )
}
