"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { createAppointment } from "@/lib/actions/booking"
import { Button } from "@/components/ui/button"
import { ServiceSelector } from "@/components/booking/ServiceSelector"
import { DateTimePicker } from "@/components/booking/DateTimePicker"
import { ClientInfoForm } from "@/components/booking/ClientInfoForm"
import { BookingConfirmation } from "@/components/booking/BookingConfirmation"
import type { Service } from "@/lib/types"

const SERVICES: Service[] = [
  { id: "1", name: "Hair Cut", description: "Precision cutting tailored to your face shape", duration_minutes: 60, price: 0, image_url: "", category: "Haircuts", active: true, created_at: "" },
  { id: "2", name: "Hair Treatment", description: "Deep conditioning and scalp therapy", duration_minutes: 90, price: 0, image_url: "", category: "Treatment", active: true, created_at: "" },
  { id: "3", name: "Blow Dry", description: "Professional blow-dry styling", duration_minutes: 45, price: 0, image_url: "", category: "Styling", active: true, created_at: "" },
  { id: "4", name: "Hair Coloring", description: "Full color, highlights, balayage", duration_minutes: 120, price: 0, image_url: "", category: "Coloring", active: true, created_at: "" },
  { id: "5", name: "Hair Styling", description: "Custom styling for any occasion", duration_minutes: 60, price: 0, image_url: "", category: "Styling", active: true, created_at: "" },
  { id: "6", name: "Braiding", description: "Expert braiding services", duration_minutes: 180, price: 0, image_url: "", category: "Braiding", active: true, created_at: "" },
  { id: "7", name: "Wig Installation", description: "Professional wig installation", duration_minutes: 120, price: 0, image_url: "", category: "Wigs", active: true, created_at: "" },
  { id: "8", name: "Frontal Styling", description: "Frontal preparation and styling", duration_minutes: 90, price: 0, image_url: "", category: "Styling", active: true, created_at: "" },
]

const STEPS = ["Service", "Date & Time", "Your Info", "Confirm"]

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)
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
        router.push(
          `/booking/confirmation?name=${encodeURIComponent(clientName)}&service=${encodeURIComponent(selectedService.name)}&date=${selectedDate}&time=${selectedTime}`
        )
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false)
    }
  }

  function goNext() {
    setDirection(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    setDirection(-1)
    setStep((s) => s - 1)
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

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="min-h-screen py-16 sm:py-24 relative z-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Request a Consultation
          </h1>
          <div className="mt-4 text-[#C9A84C] text-xl opacity-70">◇</div>
          <p className="mt-4 text-lg text-white/50">
            Tell us what you need and we&apos;ll reach out to discuss your perfect style.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                      i <= step
                        ? "bg-[#C9A84C] text-black"
                        : "bg-[#111] text-white/30"
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                      i <= step ? "text-[#C9A84C]" : "text-white/30"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-3 h-0.5 w-10 sm:w-16 transition-colors duration-300 ${
                      i < step ? "bg-[#C9A84C]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8">
          {step < 3 && (
            <div className="mb-6">
              <h2 className="font-serif text-xl text-[#C9A84C]">
                {step === 0 && "Choose a Service"}
                {step === 1 && "Pick Date & Time"}
                {step === 2 && "Your Information"}
              </h2>
              <div className="mt-2 h-px w-12 bg-[#C9A84C]/50" />
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              
            >
              {step === 0 && (
                <ServiceSelector services={SERVICES} selected={selectedService} onSelect={setSelectedService} />
              )}
              {step === 1 && (
                <DateTimePicker
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={setSelectedDate}
                  onTimeSelect={setSelectedTime}
                  bookedSlots={bookedSlots}
                  blockedDates={blockedDates}
                />
              )}
              {step === 2 && (
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
              )}
              {step === 3 && selectedService && selectedDate && selectedTime && (
                <BookingConfirmation
                  service={selectedService}
                  date={selectedDate}
                  time={selectedTime}
                  clientName={clientName}
                  clientEmail={clientEmail}
                  clientPhone={clientPhone}
                  notes={notes}
                  onEdit={() => { setDirection(-1); setStep(0) }}
                  onConfirm={handleConfirm}
                  submitting={submitting}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={step === 0}
                className="gap-2 border-white/10 text-white/50 hover:bg-[#111] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={goNext}
                disabled={!canProceed()}
                className="gap-2 bg-[#C9A84C] text-black hover:bg-[#C9A84C]/90"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-4 text-center text-sm">
          <p className="font-medium text-[#C9A84C]">Consultation Required</p>
          <p className="mt-1 text-white/50">
            Once submitted, the stylist will review your request and contact you to discuss pricing and details.
          </p>
        </div>
      </div>
    </div>
  )
}
