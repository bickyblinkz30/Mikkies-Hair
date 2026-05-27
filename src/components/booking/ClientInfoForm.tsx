"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientName">Full Name</Label>
          <Input
            id="clientName"
            name="clientName"
            placeholder="Your full name"
            value={clientName}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientEmail">Email</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            placeholder="your@email.com"
            value={clientEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientPhone">Phone Number</Label>
        <Input
          id="clientPhone"
          name="clientPhone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={clientPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Any special requests or additional information..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  )
}
