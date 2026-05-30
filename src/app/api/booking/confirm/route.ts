import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/booking-token"
import { confirmAppointment } from "@/lib/actions/booking"

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
    await confirmAppointment(id)
    return NextResponse.redirect(
      new URL("/?confirmed=true", request.url)
    )
  } catch {
    return NextResponse.redirect(
      new URL("/booking/confirmation?error=failed", request.url)
    )
  }
}
