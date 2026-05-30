"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSettings() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("settings")
    .select("key, value")

  if (error) {
    console.error("Failed to fetch settings:", error)
    return {}
  }

  const settings: Record<string, string> = {}
  for (const row of data) {
    settings[row.key] = row.value
  }
  return settings
}

export async function getWhatsAppNumber(): Promise<string> {
  const settings = await getSettings()
  return settings.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447123456789"
}

export async function updateSetting(key: string, value: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from("settings")
    .upsert({ key, value }, { onConflict: "key" })

  if (error) throw new Error(error.message)

  revalidatePath("/admin/settings")
  revalidatePath("/admin")
  revalidatePath("/booking")

  return { success: true }
}

export async function validateAndNormalizePhone(phone: string): Promise<string> {
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 7 || digits.length > 15) {
    throw new Error("Invalid phone number length")
  }
  return digits
}
