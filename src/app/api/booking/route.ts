import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendBookingEmail } from '@/lib/email'
import { STYLIST_NAME } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { serviceId, date, time, clientName, clientEmail, clientPhone, notes } = body

    if (!date || !time || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: date, time, name, email, phone' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    let serviceName = "Selected Service"
    if (serviceId) {
      try {
        const { data: service } = await supabase
          .from("services")
          .select("name")
          .eq("id", serviceId)
          .single()
        if (service) serviceName = service.name
      } catch {
        // services table may not exist or IDs may not match
      }
    }

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
        date,
        time,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        notes: notes || null,
        status: "pending_consultation",
        consultation_timeline: JSON.stringify(timeline),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    try {
      await sendBookingEmail({
        clientEmail,
        clientName,
        serviceName,
        date: formattedDate,
        time,
        stylistName: STYLIST_NAME,
        type: "consultation_requested",
        clientPhone,
        notes,
      })
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr)
    }

    return NextResponse.json({
      success: true,
      data: appointment,
      message: "Consultation request submitted successfully!"
    }, { status: 200 })

  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
