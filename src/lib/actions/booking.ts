"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendBookingEmail } from "@/lib/email"
import { STYLIST_NAME, STYLIST_EMAIL } from "@/lib/constants"

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
      status: "pending",
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
    type: "pending",
  })

  await sendBookingEmail({
    clientEmail: STYLIST_EMAIL,
    clientName,
    serviceName: service?.name || "Selected Service",
    date: formattedDate,
    time,
    stylistName: STYLIST_NAME,
    type: "stylist_pending",
    appointmentId: appointment?.id,
  })

  revalidatePath("/booking")
  revalidatePath("/dashboard")

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
  status: "confirmed" | "declined" | "completed" | "cancelled"
) {
  const supabase = await createServerSupabaseClient()

  const { data: appointment } = await supabase
    .from("appointments")
    .select("*, service:services(*)")
    .eq("id", appointmentId)
    .single()

  if (!appointment) throw new Error("Appointment not found")

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId)

  if (error) throw new Error(error.message)

  const formattedDate = new Date(appointment.date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  await sendBookingEmail({
    clientEmail: appointment.client_email,
    clientName: appointment.client_name,
    serviceName: appointment.service?.name || "Selected Service",
    date: formattedDate,
    time: appointment.time,
    stylistName: STYLIST_NAME,
    type: status === "confirmed" ? "confirmation" : "declined",
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/appointments")
  revalidatePath("/dashboard/calendar")

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
