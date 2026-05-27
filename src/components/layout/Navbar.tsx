"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 100 100"
              fill="none"
            >
              <defs>
                <linearGradient id="navMetal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#E0E0E0" />
                  <stop offset="50%" stopColor="#C0C0C0" />
                  <stop offset="65%" stopColor="#E0E0E0" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <text
                x="50"
                y="68"
                fontFamily="Playfair Display, Georgia, serif"
                fontSize="80"
                fontWeight="700"
                fill="url(#navMetal)"
                textAnchor="middle"
              >
                M
              </text>
            </svg>
          </div>
          <span className="font-serif text-xl font-bold tracking-wide text-white">
            Mikkies Hair
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/booking">
            <span className="ml-3 inline-block rounded-md border border-white px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10">
              Book Appointment
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-white/70 transition-colors hover:text-white md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium tracking-wide transition-colors",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2">
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <span className="block w-full rounded-md border border-white px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10">
                    Book Appointment
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
