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
    <div className="flex min-h-[60vh] items-center justify-center py-16 relative z-10">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#C9A84C]/30 bg-[#C9A84C]/10"
        >
          <CheckCircle className="h-10 w-10 text-[#C9A84C]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 text-lg text-white/50"
        >
          Your appointment has been booked successfully. We look forward to seeing you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 rounded-xl border border-white/10 bg-[#0a0a0a] p-6 text-left"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A84C]/10">
                <Scissors className="h-5 w-5 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/30">Service</p>
                <p className="mt-0.5 font-medium text-white">{service}</p>
              </div>
            </div>
            {formattedDate && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A84C]/10">
                  <CalendarDays className="h-5 w-5 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/30">Date</p>
                  <p className="mt-0.5 font-medium text-white">{formattedDate}</p>
                </div>
              </div>
            )}
            {time && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A84C]/10">
                  <Clock className="h-5 w-5 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/30">Time</p>
                  <p className="mt-0.5 font-medium text-white">{time}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-4 text-sm">
            <p className="font-medium text-[#C9A84C]">Cash payment only at this time</p>
            <p className="mt-1 text-white/50">
              Please pay in cash at the time of your appointment.
            </p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-white/30">
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C9A84C]" />
              The stylist will review your booking
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C9A84C]" />
              You&apos;ll receive a confirmation email
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C9A84C]" />
              Please arrive 10 minutes early
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#C9A84C]" />
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
            <Button className="w-full border border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">
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
