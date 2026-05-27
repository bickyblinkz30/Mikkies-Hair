"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const rings = [
  { size: 28, speed: 60, opacity: 0.15, borderWidth: 0.5 },
  { size: 38, speed: -45, opacity: 0.1, borderWidth: 0.5 },
  { size: 50, speed: 80, opacity: 0.07, borderWidth: 0.5 },
  { size: 65, speed: -55, opacity: 0.05, borderWidth: 0.5 },
  { size: 80, speed: 70, opacity: 0.03, borderWidth: 0.5 },
]

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
}))

export function HeroSection() {
  const floatingParticles = useMemo(() => particles, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          {rings.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/30"
              style={{
                width: `${ring.size}vw`,
                height: `${ring.size}vw`,
                minWidth: `${ring.size * 3}px`,
                minHeight: `${ring.size * 3}px`,
                opacity: ring.opacity,
                borderWidth: ring.borderWidth,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: Math.abs(ring.speed),
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          {rings.map((ring, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute rounded-full border border-[#D4AF37]/20"
              style={{
                width: `${ring.size * 0.7}vw`,
                height: `${ring.size * 0.7}vw`,
                minWidth: `${ring.size * 2.1}px`,
                minHeight: `${ring.size * 2.1}px`,
                opacity: ring.opacity * 0.8,
                borderWidth: ring.borderWidth,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: Math.abs(ring.speed) * 0.7,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[200px] min-h-[200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(212,175,55,0.12) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[150px] min-h-[150px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 65% 65%, rgba(212,175,55,0.06) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              opacity: [0, 1, 0.3, 1, 0],
              scale: [0, 1, 0.8, 1, 0],
              y: [0, -20, -40, -60, -80],
              x: [0, 10, -5, 15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute top-0 left-0 w-48 h-full sm:w-72"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, 10, 0, -5, 0],
            opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-0 right-0 w-48 h-full sm:w-72"
          style={{
            background:
              "linear-gradient(270deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, -10, 0, 5, 0],
            opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, 30, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.1, 1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, -20, 0, 30, 0],
            y: [0, 20, 0, -20, 0],
            scale: [1, 1.08, 1, 1.12, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 300"
              className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]"
            >
              <defs>
                <linearGradient id="heroMetal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#E8E8E8" />
                  <stop offset="40%" stopColor="#D4D4D4" />
                  <stop offset="50%" stopColor="#B8B8B8" />
                  <stop offset="60%" stopColor="#D4D4D4" />
                  <stop offset="75%" stopColor="#E8E8E8" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <filter id="heroGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text
                x="150"
                y="195"
                fontFamily="Playfair Display, Georgia, serif"
                fontSize="210"
                fontWeight="700"
                fill="url(#heroMetal)"
                textAnchor="middle"
                filter="url(#heroGlow)"
              >
                M
              </text>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2 font-serif text-lg tracking-[0.15em] text-white/70 md:text-xl"
          >
            Radiate confidence. Stay cute.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/booking">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                Explore Services
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
