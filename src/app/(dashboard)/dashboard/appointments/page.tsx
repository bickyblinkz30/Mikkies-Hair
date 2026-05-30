"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Search, Clock, DollarSign, CalendarDays, Check, X, Eye, Loader2 } from "lucide-react"
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
import { updateAppointmentStatus, getAppointments } from "@/lib/actions/booking"

interface ServiceInfo {
  id: string
  name: string
  description: string | null
  duration_minutes: number
  price: number
  image_url: string | null
  category: string
  active: boolean
  created_at: string
}

interface Appointment {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_id: string
  date: string
  time: string
  status: string
  notes: string | null
  created_at: string
  service: ServiceInfo | null
}

const statusVariant: Record<string, "success" | "warning" | "pending" | "secondary" | "destructive"> = {
  pending: "pending",
  confirmed: "success",
  completed: "success",
  declined: "destructive",
  cancelled: "secondary",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null)

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .catch(() => toast.error("Failed to load appointments"))
      .finally(() => setLoading(false))
  }, [])

  const filtered = appointments.filter(
    (apt) =>
      apt.client_name.toLowerCase().includes(search.toLowerCase()) ||
      apt.service?.name?.toLowerCase().includes(search.toLowerCase())
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

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
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
                            {getInitials(apt.client_name)}
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
                            {apt.service?.name || "Unknown Service"}
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
                              ${apt.service?.price ?? "—"}
                            </span>
                            <span>{apt.service?.duration_minutes ?? "—"} min</span>
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
      )}
    </div>
  )
}
