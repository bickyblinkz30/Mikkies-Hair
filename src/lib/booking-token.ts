export async function generateToken(appointmentId: string): Promise<string> {
  const encoder = new TextEncoder()
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  const key = encoder.encode(secret)
  const message = encoder.encode(appointmentId)
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, message)
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function verifyToken(
  appointmentId: string,
  token: string
): Promise<boolean> {
  const expected = await generateToken(appointmentId)
  return token === expected
}
