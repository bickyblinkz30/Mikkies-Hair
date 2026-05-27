"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Search, Clock, DollarSign, CalendarDays, Check, X, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateAppointmentStatus } from "@/lib/actions/booking"

const mockAppointments = [
  {
    id: "1",
    client_name: "Sarah Johnson",
    client_email: "sarah@email.com",
    client_phone: "+1 (555) 123-4567",
    date: "2026-05-28",
    time: "10:00",
    service: { name: "Box Braids", duration_minutes: 180, price: 150 },
    status: "pending",
    notes: "Would like medium length braids",
    initials: "SJ",
  },
  {
    id: "2",
    client_name: "Michael T.",
    client_email: "michael@email.com",
    client_phone: "+1 (555) 234-5678",
    date: "2026-05-28",
    time: "11:30",
    service: { name: "Barber Cut", duration_minutes: 45, price: 35 },
    status: "confirmed",
    notes: "",
    initials: "MT",
  },
  {
    id: "3",
    client_name: "Emily R.",
    client_email: "emily@email.com",
    client_phone: "+1 (555) 345-6789",
    date: "2026-05-28",
    time: "14:00",
    service: { name: "Dreadlock Retwist", duration_minutes: 90, price: 80 },
    status: "pending",
    notes: "",
    initials: "ER",
  },
  {
    id: "4",
    client_name: "Jessica L.",
    client_email: "jessica@email.com",
    client_phone: "+1 (555) 456-7890",
    date: "2026-05-29",
    time: "09:00",
    service: { name: "Full Color", duration_minutes: 120, price: 120 },
    status: "completed",
    notes: "Allergic to ammonia, please use ammonia-free products",
    initials: "JL",
  },
  {
    id: "5",
    client_name: "David K.",
    client_email: "david@email.com",
    client_phone: "+1 (555) 567-8901",
    date: "2026-05-30",
    time: "15:00",
    service: { name: "Cornrows", duration_minutes: 120, price: 100 },
    status: "confirmed",
    notes: "",
    initials: "DK",
  },
]

const statusVariant: Record<string, "success" | "warning" | "pending" | "secondary" | "destructive"> = {
  pending: "pending",
  confirmed: "success",
  completed: "success",
  declined: "destructive",
  cancelled: "secondary",
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [search, setSearch] = useState("")
  const [selectedApt, setSelectedApt] = useState<typeof mockAppointments[0] | null>(null)

  const filtered = appointments.filter(
    (apt) =>
      apt.client_name.toLowerCase().includes(search.toLowerCase()) ||
      apt.service.name.toLowerCase().includes(search.toLowerCase())
  )

  async function handleStatusChange(id: string, status: "confirmed" | "declined" | "completed" | "cancelled") {
    try {
      await updateAppointmentStatus(id, status)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      )
      toast.success(`Appointment ${status} successfully`)
      setSelectedApt(null)
    } catch {
      toast.error("Failed to update appointment")
    }
  }

  const tabs = ["all", "pending", "confirmed", "completed"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">
          Manage and review all client bookings.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
            {filtered
              .filter((a) => tab === "all" || a.status === tab)
              .map((apt) => (
                <Card key={apt.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {apt.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{apt.client_name}</p>
                            <Badge variant={statusVariant[apt.status] || "secondary"} className="capitalize">
                              {apt.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {apt.service.name}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ${apt.service.price}
                            </span>
                            <span>{apt.service.duration_minutes} min</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApt(apt)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {apt.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => handleStatusChange(apt.id, "confirmed")}
                            >
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleStatusChange(apt.id, "declined")}
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(apt.id, "completed")}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedApt} onOpenChange={() => setSelectedApt(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Full details of the booking.</DialogDescription>
          </DialogHeader>
          {selectedApt && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Client</p>
                <p className="text-lg font-semibold">{selectedApt.client_name}</p>
                <p className="text-sm text-muted-foreground">{selectedApt.client_email}</p>
                <p className="text-sm text-muted-foreground">{selectedApt.client_phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedApt.service.name}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedApt.service.duration_minutes} min</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedApt.date}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedApt.time}</p>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold text-primary">${selectedApt.service.price}</p>
              </div>
              {selectedApt.notes && (
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Notes</p>
                  <p className="text-sm">{selectedApt.notes}</p>
                </div>
              )}
              <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                Payment: Cash (pay at appointment)
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            {selectedApt?.status === "pending" && (
              <>
                <Button onClick={() => handleStatusChange(selectedApt.id, "confirmed")}>
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button variant="destructive" onClick={() => handleStatusChange(selectedApt.id, "declined")}>
                  <X className="h-4 w-4 mr-1" />
                  Decline
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
