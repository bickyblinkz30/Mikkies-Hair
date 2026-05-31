import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createServerClient()
    await supabase.auth.signOut()
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("Sign out error:", err)
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 })
  }
}
