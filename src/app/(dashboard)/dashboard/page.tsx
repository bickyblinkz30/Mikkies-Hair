"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Users, Clock, ArrowUpRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAppointments } from "@/lib/actions/booking"
import type { Appointment } from "@/lib/types"

const statusVariant: Record<string, "success" | "warning" | "pending" | "secondary" | "destructive"> = {
  pending: "warning",
  contacted: "pending",
  confirmed: "success",
  completed: "success",
  declined: "destructive",
  cancelled: "secondary",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const todayAppts = appointments.filter((a) => a.date === today && a.status !== "cancelled")
  const pendingAppts = appointments.filter((a) => a.status === "pending" || a.status === "contacted")
  const uniqueClients = new Set(appointments.map((a) => a.client_email)).size
  const completedAppts = appointments.filter((a) => a.status === "completed").length

  const recentAppointments = appointments
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your salon overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 text-purple-600 bg-purple-100 dark:bg-purple-900/30">
                <CalendarDays className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-bold">{todayAppts.length}</p>
            <p className="text-sm text-muted-foreground">Today&apos;s Appointments</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 text-blue-600 bg-blue-100 dark:bg-blue-900/30">
                <Users className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-bold">{uniqueClients}</p>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30">
                <Clock className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-bold">{pendingAppts.length}</p>
            <p className="text-sm text-muted-foreground">Pending Consultations</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 text-amber-600 bg-amber-100 dark:bg-amber-900/30">
                <CalendarDays className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-bold">{completedAppts}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Appointments</CardTitle>
            <Link href="/dashboard/appointments">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.length > 0 ? recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(apt.client_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{apt.client_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.service?.name || "Unknown"} &middot; {apt.date} at {apt.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[apt.status] || "secondary"} className="capitalize">
                    {apt.status === "pending" ? "Consultation" : apt.status}
                  </Badge>
                </div>
              )) : (
                <p className="text-center text-sm text-muted-foreground py-8">No recent appointments</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin">
                <Button variant="outline" className="w-full h-20 flex-col gap-1">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-xs">Admin Dashboard</span>
                </Button>
              </Link>
              <Link href="/dashboard/appointments">
                <Button variant="outline" className="w-full h-20 flex-col gap-1">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-xs">Manage Appointments</span>
                </Button>
              </Link>
              <Link href="/dashboard/calendar">
                <Button variant="outline" className="w-full h-20 flex-col gap-1">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-xs">Calendar</span>
                </Button>
              </Link>
              <Link href="/booking">
                <Button className="w-full h-20 flex-col gap-1" variant="default">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-xs">New Consultation</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
