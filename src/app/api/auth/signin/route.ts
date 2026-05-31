import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const formData = await req.formData()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("Sign in error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
