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
          <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[380px] md:h-[380px]">
            {/* Concentric rings — SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <radialGradient id="circleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(192,192,192,0.3)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(192,192,192,0.15)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(192,192,192,0.08)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(192,192,192,0.06)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(192,192,192,0.04)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="140" fill="url(#circleGlow)" />
              <circle cx="200" cy="200" r="132" fill="#0a0a0a" stroke="rgba(192,192,192,0.25)" strokeWidth="1" />
              <circle cx="200" cy="200" r="126" fill="none" stroke="rgba(192,192,192,0.35)" strokeWidth="0.5" />
            </svg>

            {/* Emblem composition — M centered, scissors + comb grouped on left */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center gap-0">
                {/* Scissors + Comb group */}
                <div className="flex items-center gap-0">
                  <span
                    className="text-[30px] sm:text-[38px] md:text-[45px] leading-none"
                    style={{ filter: "brightness(0) invert(0.92)", marginRight: "-6px" }}
                  >
                    🪮
                  </span>
                  <span
                    className="text-[30px] sm:text-[38px] md:text-[45px] leading-none"
                    style={{ filter: "brightness(0) invert(0.92)" }}
                  >
                    ✂
                  </span>
                </div>
                {/* M centered — overlaps into scissors via negative margin */}
                <span
                  className="font-serif font-bold text-[55px] sm:text-[70px] md:text-[80px] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 25%, #D4D4D4 40%, #B8B8B8 50%, #D4D4D4 60%, #E8E8E8 75%, #FFFFFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginLeft: "-10px",
                  }}
                >
                  M
                </span>
              </div>
            </div>
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
