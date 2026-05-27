"use client"

import Link from "next/link"
import { Scissors } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const serviceLinks = [
  { label: "Hair Cut", href: "/services" },
  { label: "Hair Treatment", href: "/services" },
  { label: "Blow Dry", href: "/services" },
  { label: "Hair Coloring", href: "/services" },
  { label: "Hair Styling", href: "/services" },
  { label: "Braiding", href: "/services" },
  { label: "Wig Installation", href: "/services" },
]

export function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Scissors className="h-5 w-5 text-black" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-white">
                Mikkies{" "}
                <span className="text-[#D4AF37]">Hair</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#888888]">
              Radiate confidence. Stay cute.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#666666]">
              Premium hair salon dedicated to bringing your vision to life with artistry,
              precision, and the highest standard of care.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] transition-colors duration-200 hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] transition-colors duration-200 hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f1f1f] text-[#888888] transition-all duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f1f1f] text-[#888888] transition-all duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f1f1f] text-[#888888] transition-all duration-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
                </svg>
              </a>
            </div>
            <div className="mt-6 h-px w-12 bg-[#D4AF37]/40" />
            <p className="mt-4 text-sm text-[#888888]">
              hello@mikkieshair.com
            </p>
            <p className="mt-1 text-sm text-[#888888]">
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="relative mt-12 pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          <p className="text-center text-sm text-[#666666]">
            &copy; {new Date().getFullYear()} Mikkies Hair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
