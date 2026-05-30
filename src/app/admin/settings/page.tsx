"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Scissors, Save, MessageCircle, Loader2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut } from "@/lib/actions/auth"
import { getSettings, updateSetting, validateAndNormalizePhone } from "@/lib/actions/settings"

export default function AdminSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSettings()
      .then((data) => {
        setWhatsappNumber(data.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447123456789")
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const normalized = await validateAndNormalizePhone(whatsappNumber)
      const result = await updateSetting("whatsapp_number", normalized)
      if (result.success) {
        setWhatsappNumber(normalized)
        toast.success("WhatsApp number updated successfully")
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid phone number")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C]">
                <Scissors className="h-4 w-4 text-black" />
              </div>
              <span className="font-serif text-lg font-bold text-white">Mikkies Hair</span>
              <span className="rounded-md bg-[#C9A84C]/10 px-2 py-0.5 text-xs font-medium text-[#C9A84C]">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/admin" className="text-sm text-white/50 hover:text-white transition-colors">
                Consultations
              </a>
              <form action={signOut}>
                <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-white">Settings</h1>
            <p className="mt-1 text-white/50">
              Manage your salon configuration
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-white/30" />
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="border border-white/10 bg-[#0a0a0a]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#25D366]/10">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">WhatsApp Configuration</CardTitle>
                      <p className="mt-0.5 text-sm text-white/50">
                        Manage your WhatsApp business number
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="flex items-center gap-2 text-sm font-medium text-[#C9A84C]">
                        <Phone className="h-4 w-4" />
                        WhatsApp Number
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="447123456789"
                        className="flex h-11 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:outline-none focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)] transition-all duration-200 font-mono"
                      />
                      <p className="text-xs text-white/30">
                        Enter number in international format without spaces or symbols. Example: 447123456789
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#111] p-4">
                      <h4 className="text-sm font-medium text-white/70">Preview</h4>
                      <p className="mt-2 text-sm text-white/50">
                        WhatsApp link:{" "}
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline"
                        >
                          https://wa.me/{whatsappNumber}
                        </a>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-3 text-sm text-white/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                      <span>
                        Environment variable fallback:{" "}
                        <code className="text-[#C9A84C]">
                          {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "Not set"}
                        </code>
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={saving}
                      className="gap-2 bg-[#C9A84C] text-black hover:bg-[#C9A84C]/90"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-[#0a0a0a]">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Future Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Salon Email", value: "hello@mikkieshair.com" },
                      { label: "Business Hours", value: "Mon-Sat 9:00 AM - 7:00 PM" },
                      { label: "Instagram URL", value: "Not configured" },
                      { label: "Facebook URL", value: "Not configured" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-[#111] p-3">
                        <span className="text-sm text-white/70">{item.label}</span>
                        <span className="text-sm text-white/30">{item.value}</span>
                      </div>
                    ))}
                    <p className="pt-2 text-xs text-white/20">
                      Additional settings will be available in a future update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
