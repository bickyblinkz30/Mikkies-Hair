"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative w-[350px] h-[350px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px]">
            {/* Concentric rings — SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
            >
              <circle cx="200" cy="200" r="180" fill="#0d0d0d" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(192,192,192,0.1)" strokeWidth="1" />
              <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(192,192,192,0.2)" strokeWidth="1" />
              <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(192,192,192,0.4)" strokeWidth="1" />
            </svg>

            {/* Emblem composition with exact layout specifications */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="flex items-end justify-center gap-[-8px]">
                {/* Comb */}
                <svg
                  width="35"
                  height="140"
                  viewBox="0 0 35 140"
                  className="relative z-20"
                >
                  <rect x="2" y="70" width="31" height="65" rx="3" fill="url(#silverGrad)" />
                  <rect x="3" y="10" width="4" height="62" rx="1" fill="url(#silverGrad)" />
                  <rect x="9" y="10" width="4" height="62" rx="1" fill="url(#silverGrad)" />
                  <rect x="15" y="10" width="4" height="62" rx="1" fill="url(#silverGrad)" />
                  <rect x="21" y="10" width="4" height="62" rx="1" fill="url(#silverGrad)" />
                  <rect x="27" y="10" width="4" height="62" rx="1" fill="url(#silverGrad)" />
                  <defs>
                    <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="50%" stopColor="#C0C0C0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                </svg>

                {/* Scissors */}
                <svg
                  width="80"
                  height="150"
                  viewBox="0 0 80 150"
                  className="relative z-10"
                >
                  <defs>
                    <linearGradient id="silverGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="50%" stopColor="#C0C0C0"/>
                      <stop offset="100%" stopColor="#808080"/>
                    </linearGradient>
                  </defs>
                  {/* Left blade */}
                  <path d="M 25 25 Q 15 75 20 125 L 28 125 Q 23 75 30 25 Z" fill="url(#silverGrad2)" />
                  {/* Right blade */}
                  <path d="M 55 25 Q 65 75 60 125 L 52 125 Q 57 75 50 25 Z" fill="url(#silverGrad2)" />
                  {/* Pivot screw */}
                  <circle cx="40" cy="75" r="4" fill="#666" />
                  {/* Left finger ring */}
                  <ellipse cx="28" cy="120" rx="12" ry="15" fill="none" stroke="url(#silverGrad2)" strokeWidth="3" />
                  {/* Right finger ring */}
                  <ellipse cx="52" cy="120" rx="12" ry="15" fill="none" stroke="url(#silverGrad2)" strokeWidth="3" />
                </svg>

                {/* Letter M */}
                <div
                  className="font-serif text-[130px] leading-none relative z-0"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #C0C0C0 50%, #808080 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  M
                </div>
              </div>
            </div>
          </div>

          {/* Amber glow line below circle */}
          <motion.div
            className="mt-8 h-px w-64"
            style={{
              boxShadow: "0 8px 40px rgba(201,168,76,0.6)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 font-serif text-32 tracking-[8px] text-white uppercase"
            style={{ fontSize: "32px" }}
          >
            MIKKIES HAIR
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-2 font-serif italic text-white"
            style={{ fontSize: "18px" }}
          >
            Radiate confidence. stay cute
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
