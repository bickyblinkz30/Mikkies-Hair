"use client"

import { format } from "date-fns"
import { Clock, DollarSign, CalendarDays, Scissors, CheckCircle } from "lucide-react"
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
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold">Almost Done!</h3>
            <p className="text-sm text-muted-foreground">
              Please review your booking details before confirming.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Scissors className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Service</p>
            <p className="font-medium">{service.name}</p>
            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {service.duration_minutes} min
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                ${service.price}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date & Time</p>
            <p className="font-medium">{formattedDate}</p>
            <p className="text-sm text-muted-foreground">at {time}</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">Client Information</p>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>{clientName}</p>
            <p>{clientEmail}</p>
            <p>{clientPhone}</p>
            {notes && <p className="italic">Note: {notes}</p>}
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <p className="font-medium">Payment Method: Cash</p>
          <p className="mt-1">
            Please pay in cash at the time of your appointment. Your booking
            will be confirmed by the stylist.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Edit Booking
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  )
}
