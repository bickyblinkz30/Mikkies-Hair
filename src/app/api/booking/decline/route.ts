import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/booking-token"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const token = searchParams.get("token")

  if (!id || !token) {
    return NextResponse.redirect(
      new URL("/booking/confirmation?error=invalid-link", request.url)
    )
  }

  const valid = await verifyToken(id, token)
  if (!valid) {
    return NextResponse.redirect(
      new URL("/booking/confirmation?error=invalid-link", request.url)
    )
  }

  try {
    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from("appointments")
      .select("consultation_timeline")
      .eq("id", id)
      .single()

    let currentTimeline: Array<{ date: string; action: string; timestamp: string }> = []
    if (existing?.consultation_timeline) {
      if (typeof existing.consultation_timeline === "string") {
        try { currentTimeline = JSON.parse(existing.consultation_timeline) } catch {}
      } else if (Array.isArray(existing.consultation_timeline)) {
        currentTimeline = existing.consultation_timeline
      }
    }

    const timelineEntry = {
      date: new Date().toISOString().split("T")[0],
      action: "Declined",
      timestamp: new Date().toISOString(),
    }

    const { error } = await supabase
      .from("appointments")
      .update({
        status: "declined",
        consultation_timeline: JSON.stringify([...currentTimeline, timelineEntry]),
      })
      .eq("id", id)

    if (error) throw error

    return NextResponse.redirect(
      new URL("/?declined=true", request.url)
    )
  } catch {
    return NextResponse.redirect(
      new URL("/booking/confirmation?error=failed", request.url)
    )
  }
}
