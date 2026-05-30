"use client";

export default function HeroCircle() {
  const rings = [
    { size: 100, opacity: 0.20, width: 1,   spin: "20s",  reverse: false },
    { size: 92,  opacity: 0.26, width: 1,   spin: "26s",  reverse: true  },
    { size: 84,  opacity: 0.32, width: 1,   spin: "32s",  reverse: false },
    { size: 76,  opacity: 0.38, width: 1,   spin: "38s",  reverse: true  },
    { size: 68,  opacity: 0.46, width: 1,   spin: "44s",  reverse: false },
    { size: 60,  opacity: 0.55, width: 1.2, spin: "50s",  reverse: true  },
    { size: 52,  opacity: 0.65, width: 1.2, spin: "56s",  reverse: false },
    { size: 44,  opacity: 0.78, width: 1.4, spin: null,   reverse: false },
  ];

  const sparkles = [
    { top: "4%",  left: "50%", size: 4, delay: "0s"   },
    { top: "12%", left: "85%", size: 2, delay: "0.4s" },
    { top: "50%", left: "98%", size: 3, delay: "0.8s" },
    { top: "88%", left: "85%", size: 4, delay: "1.2s" },
    { top: "96%", left: "50%", size: 2, delay: "1.6s" },
    { top: "88%", left: "15%", size: 3, delay: "2.0s" },
    { top: "50%", left: "2%",  size: 4, delay: "2.4s" },
    { top: "12%", left: "15%", size: 2, delay: "2.8s" },
  ];

  return (
    <div className="relative mx-auto flex items-center justify-center w-[520px] h-[520px] sm:w-[560px] sm:h-[560px]">
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${r.size}%`,
            height: `${r.size}%`,
            border: `${r.width}px solid rgba(212,175,55,${r.opacity})`,
            boxShadow: i === rings.length - 1
              ? "inset 0 0 80px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.18)"
              : "none",
            background: i === rings.length - 1
              ? "radial-gradient(circle at 50% 40%, #1a1812 0%, #0a0a0a 100%)"
              : "transparent",
            animation: r.spin
              ? `ringSpin ${r.spin} linear infinite${r.reverse ? " reverse" : ""}`
              : "none",
          }}
        />
      ))}

      <div className="absolute top-1/2 -translate-y-1/2 -left-[14%] w-[14%] h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.55))" }} />
      <div className="absolute top-1/2 -translate-y-1/2 -right-[14%] w-[14%] h-px"
           style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.55))" }} />

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

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
           style={{
             bottom: "16%",
             width: 220, height: 30,
             background: "radial-gradient(ellipse at center, rgba(245,215,140,0.85) 0%, rgba(212,175,55,0.35) 45%, transparent 80%)",
             filter: "blur(6px)",
           }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-[55%]">
        <svg viewBox="0 0 120 140" width="135" height="135" fill="none"
             style={{ filter: "drop-shadow(0 0 10px rgba(220,220,220,0.35))" }}>
          <defs>
            <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#e8e8e8" />
              <stop offset="40%"  stopColor="#ffffff" />
              <stop offset="70%"  stopColor="#b0b0b0" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#f5d78e" />
              <stop offset="100%" stopColor="#c8941a" />
            </linearGradient>
          </defs>
          <g transform="rotate(-30 30 50)">
            <rect x="22" y="10" width="10" height="60" rx="3" fill="url(#silverGrad)" />
            {[15,23,31,39,47,55,63].map(y => (
              <rect key={y} x="22" y={y} width="10" height="3" rx="1" fill="url(#silverGrad)" opacity="0.6" />
            ))}
          </g>
          <g transform="rotate(-20 60 70)">
            <ellipse cx="52" cy="108" rx="7" ry="7" fill="url(#silverGrad)" />
            <ellipse cx="52" cy="108" rx="4" ry="4" fill="#111" />
            <path d="M52 101 L62 40 L66 40 L56 101" fill="url(#silverGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </g>
          <g transform="rotate(20 68 70)">
            <ellipse cx="68" cy="108" rx="7" ry="7" fill="url(#silverGrad)" />
            <ellipse cx="68" cy="108" rx="4" ry="4" fill="#111" />
            <path d="M68 101 L58 40 L54 40 L64 101" fill="url(#silverGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </g>
          <circle cx="60" cy="72" r="3" fill="url(#goldAccent)" />
          <text x="60" y="105" textAnchor="middle" fontSize="90" fontFamily="'Playfair Display', serif"
                fontWeight="700" fill="url(#silverGrad)" opacity="0.28">M</text>
        </svg>

        <div style={{
          fontFamily: "'Cinzel','Playfair Display',serif",
          fontSize: "clamp(15px, 2.2vw, 23px)",
          fontWeight: 700,
          letterSpacing: "0.35em",
          color: "#ffffff",
          textShadow: "0 0 22px rgba(255,255,255,0.18)",
          marginTop: "-4px",
          lineHeight: 1.1,
        }}>
          MIKKIES&nbsp;HAIR
        </div>

        <div style={{
          fontFamily: "'Dancing Script','Great Vibes',cursive",
          fontSize: "clamp(12px, 1.5vw, 16px)",
          color: "rgba(255,255,255,0.8)",
          marginTop: "6px",
          letterSpacing: "0.04em",
        }}>
          Radiate confidence.&nbsp;stay&nbsp;cute
        </div>
      </div>

      <style jsx>{`
        @keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle  { from { opacity: 0.3; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
