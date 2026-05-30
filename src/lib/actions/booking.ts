"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendBookingEmail } from "@/lib/email"
import { STYLIST_NAME } from "@/lib/constants"

export async function createAppointment(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const serviceId = formData.get("serviceId") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const clientName = formData.get("clientName") as string
  const clientEmail = formData.get("clientEmail") as string
  const clientPhone = formData.get("clientPhone") as string
  const notes = formData.get("notes") as string

  const { data: service } = await supabase
    .from("services")
    .select("name")
    .eq("id", serviceId)
    .single()

  const timeline = [
    {
      date: new Date().toISOString().split("T")[0],
      action: "Consultation Requested",
      timestamp: new Date().toISOString(),
    },
  ]

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      service_id: serviceId,
      date,
      time,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      notes,
      status: "pending_consultation",
      consultation_timeline: JSON.stringify(timeline),
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  await sendBookingEmail({
    clientEmail,
    clientName,
    serviceName: service?.name || "Selected Service",
    date: formattedDate,
    time,
    stylistName: STYLIST_NAME,
    type: "consultation_requested",
    clientPhone,
    notes,
  })

  revalidatePath("/booking")
  revalidatePath("/dashboard")
  revalidatePath("/admin")

  return { success: true, id: appointment?.id }
}

export async function confirmAppointment(appointmentId: string) {
  return updateAppointmentStatus(appointmentId, "confirmed")
}

export async function declineAppointment(appointmentId: string) {
  return updateAppointmentStatus(appointmentId, "declined")
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "confirmed" | "declined" | "completed" | "cancelled" | "pending_consultation" | "consultation_in_progress",
  options?: { declineReason?: string }
) {
  const supabase = await createServerSupabaseClient()

  const { data: appointment } = await supabase
    .from("appointments")
    .select("*, service:services(*)")
    .eq("id", appointmentId)
    .single()

  if (!appointment) throw new Error("Appointment not found")

  const currentTimeline = (appointment.consultation_timeline as Array<{date: string; action: string; timestamp: string}>) || []
  const timelineAction = status === "confirmed"
    ? "Confirmed"
    : status === "declined"
      ? "Declined"
      : status === "consultation_in_progress"
        ? "WhatsApp Contacted"
        : status === "completed"
          ? "Completed"
          : status

  const timelineEntry = {
    date: new Date().toISOString().split("T")[0],
    action: timelineAction,
    timestamp: new Date().toISOString(),
  }

  const updateData: Record<string, unknown> = {
    status,
    consultation_timeline: JSON.stringify([...currentTimeline, timelineEntry]),
  }

  if (options?.declineReason) {
    updateData.decline_reason = options.declineReason
  }

  const { error } = await supabase
    .from("appointments")
    .update(updateData)
    .eq("id", appointmentId)

  if (error) throw new Error(error.message)

  const formattedDate = new Date(appointment.date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const serviceName = appointment.service?.name || "Selected Service"

  if (status === "confirmed") {
    await sendBookingEmail({
      clientEmail: appointment.client_email,
      clientName: appointment.client_name,
      serviceName,
      date: formattedDate,
      time: appointment.time,
      stylistName: STYLIST_NAME,
      type: "consultation_confirmed",
    })
  } else if (status === "declined") {
    await sendBookingEmail({
      clientEmail: appointment.client_email,
      clientName: appointment.client_name,
      serviceName,
      date: formattedDate,
      time: appointment.time,
      stylistName: STYLIST_NAME,
      type: "consultation_declined",
      declineReason: options?.declineReason,
    })
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/appointments")
  revalidatePath("/dashboard/calendar")
  revalidatePath("/admin")

  return { success: true }
}

export async function blockDate(date: string, startTime?: string, endTime?: string, reason?: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.from("availability").insert({
    date,
    start_time: startTime || null,
    end_time: endTime || null,
    is_blocked: true,
    reason: reason || null,
  })

  if (error) throw new Error(error.message)

  revalidatePath("/dashboard/calendar")

  return { success: true }
}

export async function unblockDate(availabilityId: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from("availability")
    .delete()
    .eq("id", availabilityId)

  if (error) throw new Error(error.message)

  revalidatePath("/dashboard/calendar")

  return { success: true }
}

export async function getServices() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("name")

  if (error) throw new Error(error.message)
  return data
}

export async function getAppointments() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*, service:services(*)")
    .order("date", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function getAppointmentsByDate(date: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*, service:services(*)")
    .eq("date", date)
    .neq("status", "cancelled")
    .order("time")

  if (error) throw new Error(error.message)
  return data
}

export async function getAvailability() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .order("date")

  if (error) throw new Error(error.message)
  return data
}

export async function getAppointmentById(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*, service:services(*)")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export async function updateAppointmentStatusWithTimeline(
  appointmentId: string,
  status: "consultation_in_progress"
) {
  return updateAppointmentStatus(appointmentId, status)
}
