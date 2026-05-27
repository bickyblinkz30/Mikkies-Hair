"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const menuVariants = {
  closed: {
    height: 0,
    opacity: 0,
  },
  open: {
    height: "auto",
    opacity: 1,
  },
}

const linkItemVariants = {
  closed: { x: -16, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
  }),
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#D4AF37]/20 bg-black/80 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)] backdrop-blur-xl"
          : "bg-black/40 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]"
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="6" r="3" />
              <path d="M8.12 8.12 12 12" />
              <path d="M20 4 8.12 15.88" />
              <circle cx="6" cy="18" r="3" />
              <path d="M14.8 14.8 20 20" />
            </svg>
          </motion.div>
          <span className="font-serif text-xl font-bold tracking-wide text-white">
            Mikkies{" "}
            <span className="text-[#D4AF37]">Hair</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide text-[#888888] transition-colors hover:text-[#D4AF37]"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link href="/booking">
            <motion.button
              className="ml-3 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#D4AF37]/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Appointment
            </motion.button>
          </Link>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#888888] transition-colors hover:text-[#D4AF37] md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-[#D4AF37]/10 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={linkItemVariants}
                  custom={i}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-[#888888] transition-colors hover:bg-[#111111] hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={linkItemVariants}
                custom={NAV_LINKS.length}
                initial="closed"
                animate="open"
                exit="closed"
                className="pt-2"
              >
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <button className="w-full rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    Book Appointment
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
