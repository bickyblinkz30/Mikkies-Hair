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
    transition: { delay: i * 0.05 },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="flex h-9 w-9 items-center justify-center"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>
          <span className="font-serif text-xl font-bold tracking-wide text-white">
            Mikkies{" "}
            <span className="text-white/70">Hair</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link href="/booking">
            <motion.button
              className="ml-3 rounded-lg border border-white/40 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Appointment
            </motion.button>
          </Link>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-white/70 transition-colors hover:text-white md:hidden"
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
            className="overflow-hidden border-t border-white/10 bg-black/95 md:hidden"
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
                    className="block rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
                  <button className="w-full rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10">
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
