"use client"

import { CalendarDays, Users, Clock, DollarSign, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const recentAppointments = [
  {
    id: "1",
    client: "Sarah Johnson",
    service: "Box Braids",
    date: "2026-05-28",
    time: "10:00",
    status: "confirmed",
    initials: "SJ",
  },
  {
    id: "2",
    client: "Michael T.",
    service: "Barber Cut",
    date: "2026-05-28",
    time: "11:30",
    status: "confirmed",
    initials: "MT",
  },
  {
    id: "3",
    client: "Emily R.",
    service: "Dreadlock Retwist",
    date: "2026-05-28",
    time: "14:00",
    status: "pending",
    initials: "ER",
  },
  {
    id: "4",
    client: "Jessica L.",
    service: "Full Color",
    date: "2026-05-29",
    time: "09:00",
    status: "pending",
    initials: "JL",
  },
]

const statusVariant: Record<string, "success" | "warning" | "pending" | "secondary" | "destructive"> = {
  confirmed: "success",
  pending: "pending",
  declined: "destructive",
  cancelled: "secondary",
  completed: "success",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your salon overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Today's Appointments",
            value: "4",
            change: "+2 from yesterday",
            icon: CalendarDays,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
          },
          {
            title: "Total Clients",
            value: "128",
            change: "+12 this month",
            icon: Users,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
          },
          {
            title: "Hours Booked",
            value: "24",
            change: "This week",
            icon: Clock,
            color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
          },
          {
            title: "Revenue",
            value: "$2,450",
            change: "+18% this month",
            icon: DollarSign,
            color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
          },
        ].map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-4 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
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
              {recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {apt.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{apt.client}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.service} &middot; {apt.date} at {apt.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[apt.status] || "secondary"}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
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
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full h-20 flex-col gap-1">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </Link>
              <Link href="/booking">
                <Button className="w-full h-20 flex-col gap-1" variant="default">
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-xs">New Booking</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
