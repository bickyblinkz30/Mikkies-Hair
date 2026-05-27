"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ServiceSelector } from "@/components/booking/ServiceSelector"
import { DateTimePicker } from "@/components/booking/DateTimePicker"
import { ClientInfoForm } from "@/components/booking/ClientInfoForm"
import { BookingConfirmation } from "@/components/booking/BookingConfirmation"
import { createAppointment } from "@/lib/actions/booking"
import type { Service } from "@/lib/types"

const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Box Braids",
    description: "Classic box braids with your choice of length and thickness. Includes wash and scalp treatment.",
    duration_minutes: 180,
    price: 150,
    image_url: "",
    category: "Braiding",
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Dreadlock Retwist",
    description: "Professional retwist for established dreadlocks. Palm roll or interlocking method.",
    duration_minutes: 90,
    price: 80,
    image_url: "",
    category: "Dreadlocks",
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Haircut & Style",
    description: "Precision haircut with wash, condition, and blow-dry style.",
    duration_minutes: 60,
    price: 45,
    image_url: "",
    category: "Haircuts",
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Barber Cut",
    description: "Classic barber cut with hot towel finish and beard trim.",
    duration_minutes: 45,
    price: 35,
    image_url: "",
    category: "Barbering",
    active: true,
    created_at: new Date().toISOString(),
  },
]

const STEPS = ["Service", "Date & Time", "Your Info", "Confirm"]

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [bookedSlots] = useState<string[]>([])
  const [blockedDates] = useState<string[]>([])

  async function handleConfirm() {
    if (!selectedService || !selectedDate || !selectedTime) return

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("serviceId", selectedService.id)
      formData.set("date", selectedDate)
      formData.set("time", selectedTime)
      formData.set("clientName", clientName)
      formData.set("clientEmail", clientEmail)
      formData.set("clientPhone", clientPhone)
      formData.set("notes", notes)

      const result = await createAppointment(formData)
      if (result.success) {
        toast.success("Booking confirmed! Check your email for details.")
        router.push(`/booking/confirmation?name=${encodeURIComponent(clientName)}&service=${encodeURIComponent(selectedService.name)}&date=${selectedDate}&time=${selectedTime}`)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return selectedService !== null
      case 1:
        return selectedDate !== null && selectedTime !== null
      case 2:
        return clientName.length > 0 && clientEmail.length > 0 && clientPhone.length > 0
      default:
        return true
    }
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <ServiceSelector
            services={MOCK_SERVICES}
            selected={selectedService}
            onSelect={setSelectedService}
          />
        )
      case 1:
        return (
          <DateTimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            bookedSlots={bookedSlots}
            blockedDates={blockedDates}
          />
        )
      case 2:
        return (
          <ClientInfoForm
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            notes={notes}
            onNameChange={setClientName}
            onEmailChange={setClientEmail}
            onPhoneChange={setClientPhone}
            onNotesChange={setNotes}
          />
        )
      case 3:
        return selectedService && selectedDate && selectedTime ? (
          <BookingConfirmation
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            notes={notes}
            onEdit={() => setStep(0)}
            onConfirm={handleConfirm}
            submitting={submitting}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Book Your Appointment
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Select your service, pick a date and time, and confirm your booking.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-center">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      i <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-1 text-xs ${
                      i <= step ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-px w-8 sm:w-12 ${
                      i < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {step === 0 && "Choose a Service"}
              {step === 1 && "Pick Date & Time"}
              {step === 2 && "Your Information"}
              {step === 3 && "Confirm Booking"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (step < 3) {
                  setStep(step + 1)
                }
              }}
            >
              {renderStep()}

              {step < 3 && (
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
