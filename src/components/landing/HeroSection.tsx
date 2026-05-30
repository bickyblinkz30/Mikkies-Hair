"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  const TOP = 90
  const BOTTOM = 298

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
            {/* Outer golden glow ring */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'transparent',
              border: '1.5px solid rgba(212,175,55,0.25)',
              boxShadow: '0 0 40px 4px rgba(212,175,55,0.12)',
              borderRadius: '50%',
            }} />
            {/* Middle golden ring */}
            <div className="absolute rounded-full" style={{
              width: '88%', height: '88%',
              border: '1px solid rgba(212,175,55,0.4)',
              borderRadius: '50%',
            }} />
            {/* Inner dark circle background */}
            <div className="absolute rounded-full" style={{
              width: '78%', height: '78%',
              background: 'radial-gradient(circle, #1a1a1a 60%, #0d0d0d 100%)',
              border: '1px solid rgba(212,175,55,0.6)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.15)',
              borderRadius: '50%',
            }} />
            {/* Bottom golden light burst */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
              width: 120, height: 30,
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.6) 0%, transparent 70%)',
              filter: 'blur(6px)',
              bottom: '8%',
            }} />
            {/* The emblem — centered inside */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                className="w-[78%] h-[78%]"
              >
                <defs>
                  <linearGradient id="mh-silver" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#7e7e7e" />
                    <stop offset="35%" stopColor="#c8c8c8" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="65%" stopColor="#c8c8c8" />
                    <stop offset="100%" stopColor="#7e7e7e" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-1.1 0; 1.1 0; -1.1 0"
                      keyTimes="0; 0.5; 1"
                      dur="4.5s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <linearGradient id="mh-silverH" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#7a7a7a" />
                    <stop offset="35%" stopColor="#cfcfcf" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="65%" stopColor="#cfcfcf" />
                    <stop offset="100%" stopColor="#7a7a7a" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-1.1 0; 1.1 0; -1.1 0"
                      keyTimes="0; 0.5; 1"
                      dur="4.5s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <linearGradient id="mh-silverBlade" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#7a7a7a" />
                    <stop offset="35%" stopColor="#d0d0d0" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="65%" stopColor="#d0d0d0" />
                    <stop offset="100%" stopColor="#7a7a7a" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-1.1 0; 1.1 0; -1.1 0"
                      keyTimes="0; 0.5; 1"
                      dur="4.5s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <mask id="mh-hideLeftLeg" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="400" height="400" fill="#ffffff" />
                    <polygon
                      points="74,82 158,82 158,108 138,108 132,278 160,278 160,306 72,306 72,278 100,278 106,108 74,108"
                      fill="#000000"
                    />
                  </mask>
                </defs>

                <text
                  x="216"
                  y="298"
                  textAnchor="middle"
                  fontFamily="'Playfair Display','Cormorant Garamond','Times New Roman',serif"
                  fontWeight="700"
                  fontSize="300"
                  fill="url(#mh-silver)"
                  mask="url(#mh-hideLeftLeg)"
                >
                  M
                </text>

                <g transform="translate(4 0)">
                  <rect x="118" y={TOP} width="11" height="100" rx="2.5" fill="url(#mh-silverH)" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const y = TOP + 4 + i * 3.9
                    return (
                      <rect key={i} x="68" y={y} width="52" height="2.2" rx="0.8" fill="url(#mh-silverH)" />
                    )
                  })}
                  <path d={`M 68 ${TOP + 4} Q 60 ${TOP + 4} 60 ${TOP + 14} L 60 ${TOP + 18} L 68 ${TOP + 18} Z`} fill="url(#mh-silverH)" />
                  <path d={`M 68 ${TOP + 96} Q 60 ${TOP + 96} 60 ${TOP + 86} L 60 ${TOP + 82} L 68 ${TOP + 82} Z`} fill="url(#mh-silverH)" />
                </g>

                <g transform="translate(144 0)">
                  <path
                    d={`M -3 ${TOP + 4} L  0 ${TOP + 6} Q  4 ${TOP + 70} -3 ${TOP + 130} L -9 ${TOP + 130} Q -12 ${TOP + 70} -8 ${TOP + 6} Z`}
                    fill="url(#mh-silverBlade)"
                  />
                  <path d={`M -8 ${TOP + 6} L -4 ${TOP} L 0 ${TOP + 6} Z`} fill="url(#mh-silverBlade)" />
                  <g transform={`rotate(7 6 ${TOP + 130})`}>
                    <path
                      d={`M 5 ${TOP + 4} L 8 ${TOP + 6} Q 12 ${TOP + 70} 5 ${TOP + 130} L -1 ${TOP + 130} Q -4 ${TOP + 70} 0 ${TOP + 6} Z`}
                      fill="url(#mh-silverBlade)"
                    />
                    <path d={`M 0 ${TOP + 6} L 4 ${TOP} L 8 ${TOP + 6} Z`} fill="url(#mh-silverBlade)" />
                  </g>
                  <circle cx="-1" cy={TOP + 122} r="4.6" fill="#2a2a2a" />
                  <circle cx="-1" cy={TOP + 122} r="1.8" fill="#0a0a0a" />
                  <path d={`M -5 ${TOP + 134} Q -16 ${TOP + 154} -28 ${TOP + 176}`} stroke="url(#mh-silver)" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d={`M 5 ${TOP + 134} Q 16 ${TOP + 154} 28 ${TOP + 176}`} stroke="url(#mh-silver)" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <ellipse cx="-34" cy={BOTTOM - 24} rx="17" ry="19" fill="none" stroke="url(#mh-silver)" strokeWidth="6" />
                  <path
                    d={`M -41 ${BOTTOM - 6} C -46 ${BOTTOM + 0} -46 ${BOTTOM + 8} -39 ${BOTTOM + 12} C -34 ${BOTTOM + 12} -31 ${BOTTOM + 6} -32 ${BOTTOM + 0} C -33 ${BOTTOM - 4} -36 ${BOTTOM - 6} -41 ${BOTTOM - 6} Z`}
                    fill="url(#mh-silver)"
                  />
                  <ellipse cx="36" cy={BOTTOM - 24} rx="17" ry="19" fill="none" stroke="url(#mh-silver)" strokeWidth="6" />
                  <path
                    d={`M 31 ${BOTTOM - 6} C 26 ${BOTTOM + 0} 26 ${BOTTOM + 8} 33 ${BOTTOM + 12} C 38 ${BOTTOM + 12} 41 ${BOTTOM + 6} 40 ${BOTTOM + 0} C 39 ${BOTTOM - 4} 36 ${BOTTOM - 6} 31 ${BOTTOM - 6} Z`}
                    fill="url(#mh-silver)"
                  />
                </g>
              </svg>
            </div>

            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="pointer-events-none absolute left-1/2 top-[92%] h-px w-[62%] -translate-x-1/2"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.85), transparent)",
                boxShadow: "0 0 28px 6px rgba(201,168,76,0.45)",
              }}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-4 font-serif text-3xl tracking-[0.35em] md:text-4xl"
            style={{
              background: "linear-gradient(180deg,#fff,#cfcfcf 60%,#888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MIKKIES HAIR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-3 font-serif italic text-white/80 text-lg"
          >
            Radiate confidence. stay cute
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
