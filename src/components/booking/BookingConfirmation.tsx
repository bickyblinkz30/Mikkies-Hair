"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import { Clock, CalendarDays, Scissors, CheckCircle, User, Phone, Mail } from "lucide-react"
import type { Service } from "@/lib/types"

interface BookingConfirmationProps {
  service: Service
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
  onEdit: () => void
  onConfirm: () => void
  submitting: boolean
}

export function BookingConfirmation({
  service,
  date,
  time,
  clientName,
  clientEmail,
  clientPhone,
  notes,
  onEdit,
  onConfirm,
  submitting,
}: BookingConfirmationProps) {
  const formattedDate = format(new Date(date + "T12:00:00"), "EEEE, MMMM d, yyyy")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="h-6 w-6 text-[#D4AF37]" />
          </motion.div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F5F5F5]">Almost Done!</h3>
            <p className="text-sm text-[#888]">
              Please review your booking details before confirming.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/10">
              <Scissors className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Service</p>
              <p className="mt-1 font-serif text-base font-semibold text-[#F5F5F5]">{service.name}</p>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-[#666]">
                <Clock className="h-3.5 w-3.5" />
                <span>{service.duration_minutes} minutes</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/10">
              <CalendarDays className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Date & Time</p>
              <p className="mt-1 font-serif text-base font-semibold text-[#F5F5F5]">{formattedDate}</p>
              <p className="mt-0.5 text-sm text-[#D4AF37]">at {time}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-5"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[#555]">Client Information</p>
          <div className="mt-3 space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm">
              <User className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[#888]">{clientName}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[#888]">{clientEmail}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[#888]">{clientPhone}</span>
            </div>
            {notes && (
              <p className="mt-2 border-t border-[#1f1f1f] pt-2.5 text-sm italic text-[#666]">
                Note: {notes}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4 text-sm"
        >
          <p className="font-medium text-[#D4AF37]">Cash payment only at this time</p>
          <p className="mt-1 text-[#888]">
            Please pay in cash at the time of your appointment. Your booking will be confirmed by the stylist.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex gap-3 pt-2"
      >
        <button
          onClick={onEdit}
          className="flex-1 rounded-lg border border-[#1f1f1f] bg-transparent px-4 py-2.5 text-sm font-medium text-[#888] transition-all duration-200 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
        >
          Edit Booking
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className="flex-1 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-[#D4AF37]/90 disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </motion.div>
    </motion.div>
  )
}
