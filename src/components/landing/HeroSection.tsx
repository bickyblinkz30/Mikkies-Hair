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
                <linearGradient id="metalTool" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#C0C0C0" />
                  <stop offset="100%" stopColor="#E0E0E0" />
                </linearGradient>
                <radialGradient id="circleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Outer concentric rings */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(192,192,192,0.3)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(192,192,192,0.15)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(192,192,192,0.08)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(192,192,192,0.06)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(192,192,192,0.04)" strokeWidth="0.5" />

              {/* Glow behind circle */}
              <circle cx="200" cy="200" r="140" fill="url(#circleGlow)" />

              {/* Dark inner circle */}
              <circle cx="200" cy="200" r="132" fill="#0a0a0a" stroke="rgba(192,192,192,0.25)" strokeWidth="1" />

              {/* Silver accent ring */}
              <circle cx="200" cy="200" r="126" fill="none" stroke="rgba(192,192,192,0.35)" strokeWidth="0.5" />

              {/* ===== COMB — left side ===== */}
              <g stroke="url(#metalTool)" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Comb body */}
                <path d="M95 290 L95 118 Q95 106 105 106 L120 106 Q130 106 130 118 L130 290 Z" />
                {/* Comb teeth pointing upward */}
                <line x1="99" y1="118" x2="99" y2="76" />
                <line x1="105" y1="118" x2="105" y2="76" />
                <line x1="111" y1="118" x2="111" y2="76" />
                <line x1="117" y1="118" x2="117" y2="76" />
                <line x1="123" y1="118" x2="123" y2="76" />
              </g>

              {/* ===== SCISSORS — center-left ===== */}
              <g stroke="url(#metalTool)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Left handle ring */}
                <ellipse cx="156" cy="282" rx="13" ry="9" />
                {/* Right handle ring */}
                <ellipse cx="184" cy="282" rx="13" ry="9" />
                {/* Handle-to-pivot connectors */}
                <path d="M150 276 L164 230" />
                <path d="M190 276 L176 230" />
                {/* Left blade */}
                <path d="M164 230 L148 95 Q145 82 153 78" />
                {/* Right blade */}
                <path d="M176 230 L192 95 Q195 82 187 78" />
                {/* Pivot screw */}
                <circle cx="170" cy="230" r="3.5" fill="url(#metalTool)" />
              </g>

              {/* ===== LARGE METALLIC M — right side ===== */}
              <text
                x="262"
                y="198"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="180"
                fontWeight="700"
                fill="url(#metalM)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                M
              </text>
            </svg>
          </div>

          {/* Gold/amber lens flare glow below circle */}
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
