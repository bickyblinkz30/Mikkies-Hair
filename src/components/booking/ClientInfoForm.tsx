"use client"

import { cn } from "@/lib/utils"

interface ClientInfoFormProps {
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onNotesChange: (value: string) => void
}

export function ClientInfoForm({
  clientName,
  clientEmail,
  clientPhone,
  notes,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onNotesChange,
}: ClientInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="clientName" className="text-sm font-medium text-[#C9A84C]">
            Full Name
          </label>
          <input
            id="clientName"
            name="clientName"
            placeholder="Your full name"
            value={clientName}
            onChange={(e) => onNameChange(e.target.value)}
            required
            className={cn(
              "flex h-11 w-full rounded-lg border bg-[#0a0a0a] px-4 py-2 text-sm text-white",
              "placeholder:text-white/30",
              "border-white/10 focus:border-[#C9A84C] focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)]",
              "focus:outline-none transition-all duration-200"
            )}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="clientEmail" className="text-sm font-medium text-[#C9A84C]">
            Email
          </label>
          <input
            id="clientEmail"
            name="clientEmail"
            type="email"
            placeholder="your@email.com"
            value={clientEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className={cn(
              "flex h-11 w-full rounded-lg border bg-[#0a0a0a] px-4 py-2 text-sm text-white",
              "placeholder:text-white/30",
              "border-white/10 focus:border-[#C9A84C] focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)]",
              "focus:outline-none transition-all duration-200"
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="clientPhone" className="text-sm font-medium text-[#C9A84C]">
          Phone Number
        </label>
        <input
          id="clientPhone"
          name="clientPhone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={clientPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
          className={cn(
            "flex h-11 w-full rounded-lg border bg-[#0a0a0a] px-4 py-2 text-sm text-white",
            "placeholder:text-white/30",
            "border-white/10 focus:border-[#C9A84C] focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)]",
            "focus:outline-none transition-all duration-200"
          )}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium text-[#C9A84C]">
          Notes <span className="text-white/30">(Optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Any special requests or additional information..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className={cn(
            "flex w-full rounded-lg border bg-[#0a0a0a] px-4 py-3 text-sm text-white",
            "placeholder:text-white/30",
            "border-white/10 focus:border-[#C9A84C] focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)]",
            "focus:outline-none transition-all duration-200 resize-none"
          )}
        />
      </div>
    </div>
  )
}
