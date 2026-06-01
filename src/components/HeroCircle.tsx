"use client";

import Image from "next/image";

export default function HeroCircle() {
  const rings = [
    { size: 100, opacity: 0.13, width: 1,   spin: "22s",  reverse: false },
    { size: 91,  opacity: 0.17, width: 1,   spin: "28s",  reverse: true  },
    { size: 82,  opacity: 0.22, width: 1,   spin: "34s",  reverse: false },
    { size: 73,  opacity: 0.28, width: 1,   spin: "40s",  reverse: true  },
    { size: 64,  opacity: 0.36, width: 1,   spin: "46s",  reverse: false },
    { size: 55,  opacity: 0.48, width: 1.2, spin: "52s",  reverse: true  },
    { size: 46,  opacity: 0.62, width: 1.3, spin: "58s",  reverse: false },
    { size: 38,  opacity: 0.78, width: 1.5, spin: null,   reverse: false },
  ];

  const sparkles = [
    { top: "3%",  left: "50%", size: 4, delay: "0s"   },
    { top: "11%", left: "84%", size: 2, delay: "0.4s" },
    { top: "50%", left: "98%", size: 3, delay: "0.8s" },
    { top: "89%", left: "84%", size: 4, delay: "1.2s" },
    { top: "97%", left: "50%", size: 2, delay: "1.6s" },
    { top: "89%", left: "16%", size: 3, delay: "2.0s" },
    { top: "50%", left: "2%",  size: 4, delay: "2.4s" },
    { top: "11%", left: "16%", size: 2, delay: "2.8s" },
  ];

  return (
    <div className="relative mx-auto flex items-center justify-center w-[540px] h-[540px] sm:w-[580px] sm:h-[580px]">
      {/* ── Concentric rings ── */}
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${r.size}%`,
            height: `${r.size}%`,
            border: `${r.width}px solid rgba(212,175,55,${r.opacity})`,
            boxShadow: i === rings.length - 1
              ? "inset 0 0 90px rgba(0,0,0,0.97), 0 0 35px rgba(212,175,55,0.15)"
              : "none",
            background: i === rings.length - 1
              ? "radial-gradient(circle at 50% 42%, #1c1a12 0%, #080808 100%)"
              : "transparent",
            animation: r.spin
              ? `ringSpin ${r.spin} linear infinite${r.reverse ? " reverse" : ""}`
              : "none",
          }}
        />
      ))}

      {/* horizontal accent lines */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[14%] w-[14%] h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5))" }} />
      <div className="absolute top-1/2 -translate-y-1/2 -right-[14%] w-[14%] h-px"
           style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.5))" }} />

      {/* sparkle dots */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: "rgba(245,215,140,0.95)",
            boxShadow: "0 0 6px rgba(245,215,140,1)",
            animation: `twinkle 1.8s ease-in-out infinite alternate`,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* bottom warm glow */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
           style={{
             bottom: "15%", width: 230, height: 32,
             background: "radial-gradient(ellipse at center, rgba(245,215,140,0.9) 0%, rgba(212,175,55,0.38) 45%, transparent 80%)",
             filter: "blur(7px)",
           }} />

      {/* ── Emblem ── */}
      <div className="relative z-10 flex items-center justify-center w-[64%] h-[64%]">
        <Image
          src="/mikkies-emblem.png"
          alt="Mikkies Hair – Radiate confidence, stay cute"
          width={426}
          height={470}
          priority
          className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]"
        />
      </div>

      <style jsx>{`
        @keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle  { from { opacity: 0.25; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
