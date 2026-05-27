"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { CheckCircle, CalendarDays, Clock, Scissors, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Booking Confirmed!
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Thank you, {name}. Your appointment has been booked successfully.
        </p>

        <Card className="mt-8 border-0 bg-muted/50 shadow-sm">
          <CardContent className="p-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Scissors className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{service}</p>
                </div>
              </div>
              {formattedDate && (
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>
              )}
              {time && (
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{time}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <DollarSign className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium">Cash (Pay at appointment)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
              <p className="font-medium">📋 What happens next?</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>The stylist will review your booking</li>
                <li>You&apos;ll receive a confirmation email</li>
                <li>Please arrive 10 minutes early</li>
                <li>Payment is due at the appointment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link href="/booking">
            <Button className="w-full sm:w-auto">Book Another</Button>
          </Link>
        </div>
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
