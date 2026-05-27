"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import type { DateSelectArg, EventClickArg } from "@fullcalendar/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CalendarDays, Clock, DollarSign, User, Scissors, Ban, Trash2 } from "lucide-react"
import { format } from "date-fns"

type CalendarEvent = {
  id: string
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor: string
  textColor: string
  extendedProps: {
    type: "appointment" | "blocked"
    clientName?: string
    serviceName?: string
    status?: string
    price?: number
    phone?: string
    email?: string
  }
}

type BlockedDate = {
  id: string
  date: string
  start_time: string | null
  end_time: string | null
  reason: string | null
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [blockDate, setBlockDate] = useState("")
  const [blockReason, setBlockReason] = useState("")
  const [blockStart, setBlockStart] = useState("")
  const [blockEnd, setBlockEnd] = useState("")
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const mockAppointments = [
      {
        id: "1",
        client_name: "Sarah Johnson",
        date: "2026-05-28",
        time: "10:00",
        service: { name: "Box Braids", duration_minutes: 180, price: 150 },
        status: "confirmed",
        client_phone: "+1 (555) 123-4567",
        client_email: "sarah@email.com",
      },
      {
        id: "2",
        client_name: "Michael T.",
        date: "2026-05-28",
        time: "11:30",
        service: { name: "Barber Cut", duration_minutes: 45, price: 35 },
        status: "confirmed",
        client_phone: "+1 (555) 234-5678",
        client_email: "michael@email.com",
      },
      {
        id: "3",
        client_name: "Emily R.",
        date: "2026-05-28",
        time: "14:00",
        service: { name: "Dreadlock Retwist", duration_minutes: 90, price: 80 },
        status: "pending",
        client_phone: "+1 (555) 345-6789",
        client_email: "emily@email.com",
      },
      {
        id: "4",
        client_name: "Jessica L.",
        date: "2026-05-29",
        time: "09:00",
        service: { name: "Full Color", duration_minutes: 120, price: 120 },
        status: "confirmed",
        client_phone: "+1 (555) 456-7890",
        client_email: "jessica@email.com",
      },
      {
        id: "5",
        client_name: "David K.",
        date: "2026-05-30",
        time: "15:00",
        service: { name: "Cornrows", duration_minutes: 120, price: 100 },
        status: "confirmed",
        client_phone: "+1 (555) 567-8901",
        client_email: "david@email.com",
      },
    ]

    const eventList: CalendarEvent[] = []

    mockAppointments.forEach((apt) => {
      const startTime = apt.time
      const [h, m] = startTime.split(":").map(Number)
      const totalMinutes = h * 60 + m + apt.service.duration_minutes
      const endHour = Math.floor(totalMinutes / 60)
      const endMin = totalMinutes % 60
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMin.toString().padStart(2, "0")}`

      const bgColor = apt.status === "pending" ? "#FEF3C7" : "#EDE9FE"
      const borderColor = apt.status === "pending" ? "#F59E0B" : "#6D28D9"
      const textColor = apt.status === "pending" ? "#92400E" : "#5B21B6"

      eventList.push({
        id: apt.id,
        title: `${apt.client_name} - ${apt.service.name}`,
        start: `${apt.date}T${startTime}:00`,
        end: `${apt.date}T${endTime}:00`,
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        extendedProps: {
          type: "appointment",
          clientName: apt.client_name,
          serviceName: apt.service.name,
          status: apt.status,
          price: apt.service.price,
          phone: apt.client_phone,
          email: apt.client_email,
        },
      })
    })

    const mockBlocked: BlockedDate[] = [
      { id: "b1", date: "2026-06-01", start_time: null, end_time: null, reason: "Public Holiday" },
      { id: "b2", date: "2026-05-31", start_time: "09:00", end_time: "12:00", reason: "Personal Appointment" },
    ]

    mockBlocked.forEach((block) => {
      if (!block.start_time) {
        eventList.push({
          id: block.id,
          title: `🔒 Blocked${block.reason ? `: ${block.reason}` : ""}`,
          start: block.date,
          end: block.date,
          backgroundColor: "#FEE2E2",
          borderColor: "#EF4444",
          textColor: "#991B1B",
          allDay: true,
          extendedProps: { type: "blocked" },
        } as CalendarEvent)
      } else {
        eventList.push({
          id: block.id,
          title: `🔒 Blocked${block.reason ? `: ${block.reason}` : ""}`,
          start: `${block.date}T${block.start_time}:00`,
          end: `${block.date}T${block.end_time}:00`,
          backgroundColor: "#FEE2E2",
          borderColor: "#EF4444",
          textColor: "#991B1B",
          extendedProps: { type: "blocked" },
        })
      }
    })

    setEvents(eventList)
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    setBlockDate(selectInfo.startStr.split("T")[0])
    setShowBlockDialog(true)
  }

  function handleEventClick(clickInfo: EventClickArg) {
    const event = events.find((e) => e.id === clickInfo.event.id)
    if (event) {
      setSelectedEvent(event)
      setDetailOpen(true)
    }
  }

  async function handleBlockDate() {
    toast.success("Date blocked successfully")
    setShowBlockDialog(false)
    setBlockReason("")
    setBlockStart("")
    setBlockEnd("")
    loadEvents()
  }

  async function handleUnblock(id: string) {
    toast.success("Date unblocked")
    setDetailOpen(false)
    loadEvents()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule, block dates, and view appointments.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#EDE9FE] border border-[#6D28D9]" />
            <span className="text-muted-foreground">Confirmed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#FEF3C7] border border-[#F59E0B]" />
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#FEE2E2] border border-[#EF4444]" />
            <span className="text-muted-foreground">Blocked</span>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            initialView="dayGridMonth"
            events={events}
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            weekends={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="auto"
            contentHeight="auto"
            slotMinTime="09:00:00"
            slotMaxTime="19:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            firstDay={1}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              list: "List",
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Date / Time</DialogTitle>
            <DialogDescription>
              Mark this time as unavailable for bookings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input value={blockDate} disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time (optional)</Label>
                <Input
                  type="time"
                  value={blockStart}
                  onChange={(e) => setBlockStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Time (optional)</Label>
                <Input
                  type="time"
                  value={blockEnd}
                  onChange={(e) => setBlockEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason (optional)</Label>
              <Input
                placeholder="e.g. Public Holiday, Personal Appointment"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBlockDate} className="gap-2">
              <Ban className="h-4 w-4" />
              Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              {selectedEvent?.extendedProps.type === "appointment"
                ? "Appointment information"
                : "Blocked time information"}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && selectedEvent.extendedProps.type === "appointment" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-4">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{selectedEvent.extendedProps.clientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.extendedProps.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.extendedProps.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Scissors className="h-3 w-3" />
                    Service
                  </p>
                  <p className="font-medium">{selectedEvent.extendedProps.serviceName}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    Price
                  </p>
                  <p className="font-medium">${selectedEvent.extendedProps.price}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    Date
                  </p>
                  <p className="font-medium">
                    {format(new Date(selectedEvent.start), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Time
                  </p>
                  <p className="font-medium">
                    {format(new Date(selectedEvent.start), "h:mm a")} -{" "}
                    {format(new Date(selectedEvent.end), "h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          ) : selectedEvent && selectedEvent.extendedProps.type === "blocked" ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
                <p className="flex items-center gap-2 font-medium text-red-800 dark:text-red-200">
                  <Ban className="h-5 w-5" />
                  Blocked Time
                </p>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                  {format(new Date(selectedEvent.start), "EEEE, MMMM d, yyyy")}
                </p>
              </div>
              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={() => handleUnblock(selectedEvent.id)}
              >
                <Trash2 className="h-4 w-4" />
                Unblock This Date
              </Button>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
