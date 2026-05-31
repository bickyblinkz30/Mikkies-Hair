import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("settings")
      .select("key, value")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const settings: Record<string, string> = {}
    for (const row of data) {
      settings[row.key] = row.value
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (err) {
    console.error("GET settings error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { key, value } = await req.json()

    if (!key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from("settings")
      .upsert({ key, value }, { onConflict: "key" })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("POST settings error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
