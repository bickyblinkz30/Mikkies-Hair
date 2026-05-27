"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, isBefore, startOfToday } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
      timeSlots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`)
    }
  }

  const filteredTimeSlots = timeSlots.filter((slot) => !bookedSlots.includes(slot))

  function isDateBlocked(date: Date) {
    const formatted = format(date, "yyyy-MM-dd")
    return blockedDates.includes(formatted) || isBefore(date, today)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#D4AF37]">Select Date</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#888] hover:bg-[#111] hover:text-[#D4AF37]"
              onClick={() => setWeekOffset((o) => o - 1)}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#888] hover:bg-[#111] hover:text-[#D4AF37]"
              onClick={() => setWeekOffset((o) => o + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="pb-2 text-center text-xs font-medium text-[#555]">
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
                  "flex flex-col items-center rounded-lg py-2.5 text-sm transition-all duration-200",
                  isSelected
                    ? "bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37]"
                    : blocked
                      ? "cursor-not-allowed text-[#333]"
                      : "border border-transparent text-[#888] hover:border-[#D4AF37]/30 hover:bg-[#111]"
                )}
              >
                <span className="text-[10px] uppercase tracking-wider">
                  {format(date, "MMM")}
                </span>
                <span className="mt-0.5 text-base font-semibold">
                  {format(date, "d")}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-sm font-medium text-[#D4AF37]">Select Time</h3>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {filteredTimeSlots.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm transition-all duration-200",
                      isSelected
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "border-[#1f1f1f] bg-[#0a0a0a] text-[#888] hover:border-[#D4AF37]/40 hover:bg-[#111]"
                    )}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
