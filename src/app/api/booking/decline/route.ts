import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/booking-token"

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
    const response = await fetch(`${request.nextUrl.origin}/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "declined" })
    })

    if (!response.ok) {
      throw new Error('Failed to decline appointment')
    }

    return NextResponse.redirect(
      new URL("/?declined=true", request.url)
    )
  } catch {
    return NextResponse.redirect(
      new URL("/booking/confirmation?error=failed", request.url)
    )
  }
}
