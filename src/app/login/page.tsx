"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scissors } from "lucide-react"
import Link from "next/link"
import { signIn } from "@/lib/actions/auth"

export default function AdminLoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#C9A84C]/10">
              <Scissors className="h-6 w-6 text-[#C9A84C]" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-white/50">Mikkies Hair Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#C9A84C]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@mikkieshair.com"
                className="flex h-11 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:outline-none focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)] transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#C9A84C]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="flex h-11 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:outline-none focus:shadow-[0_0_15px_-5px_rgba(201,168,76,0.2)] transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#C9A84C] px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-[#C9A84C]/90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/30">
            Authorized stylists and administrators only.
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-white/30 hover:text-[#C9A84C] transition-colors">
            &larr; Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
