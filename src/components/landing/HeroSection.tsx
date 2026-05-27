"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]"
            >
              <defs>
                <linearGradient id="metalM" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#E8E8E8" />
                  <stop offset="40%" stopColor="#D4D4D4" />
                  <stop offset="50%" stopColor="#B8B8B8" />
                  <stop offset="60%" stopColor="#D4D4D4" />
                  <stop offset="75%" stopColor="#E8E8E8" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="goldFlare" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="rgba(201,168,76,0.6)" />
                  <stop offset="50%" stopColor="rgba(201,168,76,0.8)" />
                  <stop offset="60%" stopColor="rgba(201,168,76,0.6)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <radialGradient id="circleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Outer concentric rings */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(192,192,192,0.15)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(192,192,192,0.12)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(192,192,192,0.09)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(192,192,192,0.06)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(192,192,192,0.04)" strokeWidth="0.5" />

              {/* Glow behind circle */}
              <circle cx="200" cy="200" r="140" fill="url(#circleGlow)" />

              {/* Dark inner circle */}
              <circle cx="200" cy="200" r="130" fill="#0a0a0a" stroke="rgba(192,192,192,0.25)" strokeWidth="1" />

              {/* Silver ring */}
              <circle cx="200" cy="200" r="125" fill="none" stroke="rgba(192,192,192,0.35)" strokeWidth="0.5" />

              {/* Scissors (left side) */}
              <g transform="translate(200, 200) rotate(-30) translate(-55, -15)" opacity="0.7">
                <ellipse cx="0" cy="0" rx="18" ry="6" fill="none" stroke="#C0C0C0" strokeWidth="1.5" />
                <ellipse cx="0" cy="30" rx="18" ry="6" fill="none" stroke="#C0C0C0" strokeWidth="1.5" />
                <line x1="16" y1="6" x2="35" y2="40" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="24" x2="35" y2="40" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="0" cy="15" r="3" fill="#C0C0C0" />
              </g>

              {/* Comb (right side) */}
              <g transform="translate(200, 200) rotate(30) translate(20, -15)" opacity="0.7">
                <rect x="0" y="0" width="40" height="4" rx="1" fill="none" stroke="#C0C0C0" strokeWidth="1.5" />
                <line x1="5" y1="4" x2="5" y2="35" stroke="#C0C0C0" strokeWidth="1" />
                <line x1="12" y1="4" x2="12" y2="35" stroke="#C0C0C0" strokeWidth="1" />
                <line x1="19" y1="4" x2="19" y2="35" stroke="#C0C0C0" strokeWidth="1" />
                <line x1="26" y1="4" x2="26" y2="35" stroke="#C0C0C0" strokeWidth="1" />
                <line x1="33" y1="4" x2="33" y2="35" stroke="#C0C0C0" strokeWidth="1" />
              </g>

              {/* Large metallic M */}
              <text
                x="200"
                y="238"
                fontFamily="Playfair Display, Georgia, serif"
                fontSize="190"
                fontWeight="700"
                fill="url(#metalM)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                M
              </text>
            </svg>
          </div>

          {/* Gold/amber lens flare glow */}
          <motion.div
            className="mt-2 h-px w-48 sm:w-64"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.9), rgba(201,168,76,0.6), transparent)",
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
            className="mt-6 font-serif text-4xl tracking-[0.2em] text-white sm:text-5xl md:text-6xl"
          >
            MIKKIES HAIR
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-3 font-serif italic text-lg tracking-wide text-white/60 sm:text-xl"
          >
            Radiate confidence. stay cute
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
