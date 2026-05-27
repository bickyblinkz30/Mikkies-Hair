"use client"

import { useState, useEffect } from "react"
import { format, addDays, isBefore, startOfToday } from "date-fns"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BUSINESS_HOURS } from "@/lib/constants"

interface DateTimePickerProps {
  selectedDate: string | null
  selectedTime: string | null
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
  bookedSlots: string[]
  blockedDates: string[]
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  bookedSlots,
  blockedDates,
}: DateTimePickerProps) {
  const today = startOfToday()
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = addDays(today, weekOffset * 7)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const timeSlots: string[] = []
  for (let h = BUSINESS_HOURS.start; h < BUSINESS_HOURS.end; h++) {
    for (let m = 0; m < 60; m += BUSINESS_HOURS.interval) {
      timeSlots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      )
    }
  }

  const filteredTimeSlots = timeSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  )

  function isDateBlocked(date: Date) {
    const formatted = format(date, "yyyy-MM-dd")
    return blockedDates.includes(formatted) || isBefore(date, today)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Select Date</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setWeekOffset(weekOffset - 1)}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setWeekOffset(weekOffset + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="pb-1 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {weekDays.map((date) => {
            const formatted = format(date, "yyyy-MM-dd")
            const isSelected = selectedDate === formatted
            const blocked = isDateBlocked(date)

            return (
              <button
                key={formatted}
                onClick={() => !blocked && onDateSelect(formatted)}
                disabled={blocked}
                className={cn(
                  "flex flex-col items-center rounded-lg py-2 text-sm transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : blocked
                    ? "cursor-not-allowed text-muted-foreground/30"
                    : "hover:bg-accent"
                )}
              >
                <span
                  className={cn(
                    "text-xs",
                    isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {format(date, "MMM")}
                </span>
                <span className="text-base font-semibold">
                  {format(date, "d")}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-sm font-medium">Select Time</h3>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {filteredTimeSlots.map((time) => {
              const isSelected = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={cn(
                    "flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm transition-all",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {time}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
