import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("appointments")
      .select("*, service:services(*)")
      .order("date", { ascending: false })

    if (error) {
      console.error("Fetch appointments error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    console.error("GET appointments error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, timelineAction, declineReason } = body

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: existing, error: fetchError } = await supabase
      .from("appointments")
      .select("consultation_timeline")
      .eq("id", id)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    let currentTimeline: Array<{ date: string; action: string; timestamp: string }> = []
    if (existing.consultation_timeline) {
      if (typeof existing.consultation_timeline === "string") {
        try { currentTimeline = JSON.parse(existing.consultation_timeline) } catch { /* ignore parse errors */ }
      } else if (Array.isArray(existing.consultation_timeline)) {
        currentTimeline = existing.consultation_timeline
      }
    }

    const timelineEntry = {
      date: new Date().toISOString().split("T")[0],
      action: timelineAction || status,
      timestamp: new Date().toISOString(),
    }

    const updateData: Record<string, unknown> = {
      status,
      consultation_timeline: JSON.stringify([...currentTimeline, timelineEntry]),
    }

    if (declineReason) {
      updateData.decline_reason = declineReason
    }

    const { data, error } = await supabase
      .from("appointments")
      .update(updateData)
      .eq("id", id)
      .select()

    if (error) {
      console.error("Update appointment error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error("PATCH appointment error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
