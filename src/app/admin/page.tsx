"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Search, Clock, CalendarDays, MessageCircle, Check, X,
  Eye, Loader2, History, Phone, Mail, Scissors,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAppointments, updateAppointmentStatus } from "@/lib/actions/booking"
import { signOut } from "@/lib/actions/auth"
import { getWhatsAppNumber } from "@/lib/actions/settings"
import { DECLINE_REASONS } from "@/lib/constants"
import type { Appointment, TimelineEvent } from "@/lib/types"

const statusVariant: Record<string, "success" | "warning" | "pending" | "secondary" | "destructive"> = {
  pending_consultation: "warning",
  consultation_in_progress: "pending",
  pending: "pending",
  confirmed: "success",
  completed: "success",
  declined: "destructive",
  cancelled: "secondary",
}

const statusLabels: Record<string, string> = {
  pending_consultation: "Pending Consultation",
  consultation_in_progress: "Consultation In Progress",
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  declined: "Declined",
  cancelled: "Cancelled",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("0")) return "234" + digits.slice(1)
  if (digits.startsWith("+")) return digits.slice(1)
  return digits
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null)
  const [declineDialog, setDeclineDialog] = useState<Appointment | null>(null)
  const [declineReason, setDeclineReason] = useState("")
  const [timelineDialog, setTimelineDialog] = useState<Appointment | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447123456789"
  )

  useEffect(() => {
    let cancelled = false

    getWhatsAppNumber().then((num) => {
      if (!cancelled) setWhatsappNumber(num)
    })

    getAppointments()
      .then((data) => {
        if (!cancelled) setAppointments(data)
      })
      .catch(() => {
        if (!cancelled) toast.error("Failed to load consultations")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const filtered = appointments.filter(
    (apt) =>
      apt.client_name.toLowerCase().includes(search.toLowerCase()) ||
      apt.service?.name?.toLowerCase().includes(search.toLowerCase()) ||
      apt.client_email.toLowerCase().includes(search.toLowerCase())
  )

  const counts = {
    pending_consultation: appointments.filter((a) => a.status === "pending_consultation").length,
    consultation_in_progress: appointments.filter((a) => a.status === "consultation_in_progress").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    declined: appointments.filter((a) => a.status === "declined").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  }

  async function handleConfirm(id: string) {
    setActionLoading(true)
    try {
      await updateAppointmentStatus(id, "confirmed")
      const updated = appointments.map((a) =>
        a.id === id ? { ...a, status: "confirmed" as const } : a
      )
      setAppointments(updated)
      toast.success("Consultation confirmed!")
      setSelectedApt(null)
    } catch {
      toast.error("Failed to confirm consultation")
    } finally {
      setActionLoading(false)
    }
  }

  async function handleDecline() {
    if (!declineDialog) return
    setActionLoading(true)
    try {
      await updateAppointmentStatus(declineDialog.id, "declined", {
        declineReason: declineReason || undefined,
      })
      const updated = appointments.map((a) =>
        a.id === declineDialog.id
          ? { ...a, status: "declined" as const, decline_reason: declineReason }
          : a
      )
      setAppointments(updated)
      toast.success("Consultation declined")
      setDeclineDialog(null)
      setDeclineReason("")
      setSelectedApt(null)
    } catch {
      toast.error("Failed to decline consultation")
    } finally {
      setActionLoading(false)
    }
  }

  async function handleMarkComplete(id: string) {
    setActionLoading(true)
    try {
      await updateAppointmentStatus(id, "completed")
      const updated = appointments.map((a) =>
        a.id === id ? { ...a, status: "completed" as const } : a
      )
      setAppointments(updated)
      toast.success("Marked as completed")
      setSelectedApt(null)
    } catch {
      toast.error("Failed to update")
    } finally {
      setActionLoading(false)
    }
  }

  function getWhatsAppLink(apt: Appointment): string {
    const phone = apt.client_phone ? normalizePhone(apt.client_phone) : whatsappNumber
    const message = encodeURIComponent(
      `Hi ${apt.client_name}! I'm reaching out regarding your consultation request for ${apt.service?.name || "your service"} on ${apt.date}.`
    )
    return `https://wa.me/${phone}?text=${message}`
  }

  function getTimeline(apt: Appointment): TimelineEvent[] {
    if (Array.isArray(apt.consultation_timeline)) {
      return apt.consultation_timeline
    }
    return []
  }

  const tabs = ["all", "pending_consultation", "confirmed", "declined", "completed"]

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C]">
                <Scissors className="h-4 w-4 text-black" />
              </div>
              <span className="font-serif text-lg font-bold text-white">Mikkies Hair</span>
              <span className="rounded-md bg-[#C9A84C]/10 px-2 py-0.5 text-xs font-medium text-[#C9A84C]">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/admin/settings" className="text-sm text-white/50 hover:text-white transition-colors">
                Settings
              </a>
              <form action={signOut}>
                <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-white">Consultations</h1>
          <p className="mt-1 text-white/50">
            Manage consultation requests and appointments
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="border border-white/10 bg-[#0a0a0a]">
            <CardContent className="p-4">
              <p className="text-sm text-white/50">Pending Consultations</p>
              <p className="mt-1 text-2xl font-bold text-[#C9A84C]">{counts.pending_consultation}</p>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-[#0a0a0a]">
            <CardContent className="p-4">
              <p className="text-sm text-white/50">In Progress</p>
              <p className="mt-1 text-2xl font-bold text-yellow-400">{counts.consultation_in_progress}</p>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-[#0a0a0a]">
            <CardContent className="p-4">
              <p className="text-sm text-white/50">Confirmed</p>
              <p className="mt-1 text-2xl font-bold text-green-400">{counts.confirmed}</p>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-[#0a0a0a]">
            <CardContent className="p-4">
              <p className="text-sm text-white/50">Declined</p>
              <p className="mt-1 text-2xl font-bold text-red-400">{counts.declined}</p>
            </CardContent>
          </Card>
          <Card className="border border-white/10 bg-[#0a0a0a]">
            <CardContent className="p-4">
              <p className="text-sm text-white/50">Completed</p>
              <p className="mt-1 text-2xl font-bold text-green-400">{counts.completed}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Search consultations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-white/10 bg-[#0a0a0a] pl-9 text-white placeholder:text-white/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-white/30" />
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="border-white/10 bg-[#0a0a0a]">
              <TabsTrigger value="all" className="text-white/50 data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black">All</TabsTrigger>
              <TabsTrigger value="pending_consultation" className="text-white/50 data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black">Pending</TabsTrigger>
              <TabsTrigger value="confirmed" className="text-white/50 data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black">Confirmed</TabsTrigger>
              <TabsTrigger value="declined" className="text-white/50 data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black">Declined</TabsTrigger>
              <TabsTrigger value="completed" className="text-white/50 data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black">Completed</TabsTrigger>
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
                {filtered
                  .filter((a) => tab === "all" || a.status === tab)
                  .map((apt) => (
                    <Card key={apt.id} className="border border-white/10 bg-[#0a0a0a]">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start gap-3 min-w-0">
                            <Avatar className="h-10 w-10 border border-white/10">
                              <AvatarFallback className="bg-[#C9A84C]/10 text-[#C9A84C] text-sm">
                                {getInitials(apt.client_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-white">{apt.client_name}</p>
                                <Badge variant={statusVariant[apt.status] || "secondary"} className="capitalize">
                                  {statusLabels[apt.status] || apt.status}
                                </Badge>
                              </div>
                              <p className="mt-0.5 text-sm text-white/50">
                                {apt.service?.name || "Unknown Service"}
                              </p>
                              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-white/30">
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3" />
                                  {apt.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {apt.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {apt.client_email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {apt.client_phone}
                                </span>
                              </div>
                              {apt.decline_reason && (
                                <p className="mt-1 text-xs text-red-400">
                                  Reason: {apt.decline_reason}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setTimelineDialog(apt)}
                              className="text-white/30 hover:text-[#C9A84C]"
                              title="View Timeline"
                            >
                              <History className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApt(apt)}
                              className="text-white/30 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            {(apt.status === "pending_consultation" || apt.status === "consultation_in_progress") && (
                              <>
                                <a
                                  href={getWhatsAppLink(apt)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    size="sm"
                                    className="gap-1 bg-[#25D366] text-white hover:bg-[#25D366]/90"
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                  </Button>
                                </a>
                                <Button
                                  size="sm"
                                  className="gap-1 bg-[#C9A84C] text-black hover:bg-[#C9A84C]/90"
                                  onClick={() => handleConfirm(apt.id)}
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="hidden sm:inline">Confirm</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => setDeclineDialog(apt)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="hidden sm:inline">Decline</span>
                                </Button>
                              </>
                            )}

                            {apt.status === "confirmed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkComplete(apt.id)}
                                className="border-white/10 text-white/50 hover:text-white"
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedApt} onOpenChange={() => setSelectedApt(null)}>
        <DialogContent className="border border-white/10 bg-[#0a0a0a] text-white sm:max-w-lg">
          {selectedApt && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Consultation Details</DialogTitle>
                <DialogDescription className="text-white/50">
                  Full details for {selectedApt.client_name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-lg border border-white/10 bg-[#111] p-4">
                  <h4 className="mb-3 text-sm font-medium text-[#C9A84C]">Client Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Name</span>
                      <span className="text-white">{selectedApt.client_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Email</span>
                      <span className="text-white">{selectedApt.client_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Phone</span>
                      <span className="text-white">{selectedApt.client_phone}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#111] p-4">
                  <h4 className="mb-3 text-sm font-medium text-[#C9A84C]">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Service</span>
                      <span className="text-white">{selectedApt.service?.name || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Date</span>
                      <span className="text-white">{selectedApt.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Time</span>
                      <span className="text-white">{selectedApt.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Status</span>
                      <Badge variant={statusVariant[selectedApt.status] || "secondary"} className="capitalize">
                        {statusLabels[selectedApt.status] || selectedApt.status}
                      </Badge>
                    </div>
                    {selectedApt.notes && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Notes</span>
                        <span className="text-white text-right max-w-[200px]">{selectedApt.notes}</span>
                      </div>
                    )}
                    {selectedApt.decline_reason && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Decline Reason</span>
                        <span className="text-red-400">{selectedApt.decline_reason}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a href={getWhatsAppLink(selectedApt)} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90">
                      <MessageCircle className="h-4 w-4" />
                      Open WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog open={!!declineDialog} onOpenChange={(open) => { if (!open) { setDeclineDialog(null); setDeclineReason("") } }}>
        <DialogContent className="border border-white/10 bg-[#0a0a0a] text-white sm:max-w-md">
          {declineDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Decline Consultation</DialogTitle>
                <DialogDescription className="text-white/50">
                  Provide a reason for declining {declineDialog.client_name}&apos;s request.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Decline Reason</label>
                  <Select value={declineReason} onValueChange={setDeclineReason}>
                    <SelectTrigger className="border-white/10 bg-[#111] text-white">
                      <SelectValue placeholder="Select a reason..." />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#111] text-white">
                      {DECLINE_REASONS.map((reason) => (
                        <SelectItem key={reason} value={reason} className="text-white focus:bg-[#C9A84C]/20 focus:text-white">
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button
                    variant="ghost"
                    onClick={() => { setDeclineDialog(null); setDeclineReason("") }}
                    className="text-white/50"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDecline}
                    disabled={actionLoading}
                    className="gap-1"
                  >
                    {actionLoading ? "Declining..." : "Decline Consultation"}
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Timeline Dialog */}
      <Dialog open={!!timelineDialog} onOpenChange={() => setTimelineDialog(null)}>
        <DialogContent className="border border-white/10 bg-[#0a0a0a] text-white sm:max-w-md">
          {timelineDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Consultation Timeline</DialogTitle>
                <DialogDescription className="text-white/50">
                  {timelineDialog.client_name} &middot; {timelineDialog.service?.name || "Unknown Service"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-0">
                {getTimeline(timelineDialog).length > 0 ? (
                  getTimeline(timelineDialog).map((event, i) => (
                    <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < getTimeline(timelineDialog).length - 1 && (
                        <div className="absolute left-[7px] top-4 h-full w-0.5 bg-white/10" />
                      )}
                      <div className="flex h-4 w-4 items-center justify-center">
                        <div className={`h-3 w-3 rounded-full ${
                          i === getTimeline(timelineDialog).length - 1
                            ? "bg-[#C9A84C]"
                            : "bg-white/30"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{event.action}</p>
                        <p className="text-xs text-white/30">
                          {event.date}
                          {event.timestamp && ` at ${new Date(event.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-white/30">No timeline events yet</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
