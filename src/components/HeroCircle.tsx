"use client";

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

  /* comb teeth y-positions in local (pre-rotation) space */
  const combTeethY = [10, 22, 34, 46, 58, 70, 82, 94, 106, 118];

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
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-[56%]">
        {/*
          viewBox 120 × 140 — coordinate guide:
          M text: x≈12–108, y≈15–105 (fontSize 90, baseline y=105)
          Left M leg:  x≈12–30
          Right M leg: x≈90–108
        */}
        <svg
          viewBox="0 0 120 140"
          width="155"
          height="155"
          fill="none"
          style={{ filter: "drop-shadow(0 0 14px rgba(220,220,220,0.45))" }}
        >
          <defs>
            {/* diagonal silver highlight */}
            <linearGradient id="hcS1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#d4d4d4" />
              <stop offset="30%"  stopColor="#ffffff" />
              <stop offset="65%"  stopColor="#b8b8b8" />
              <stop offset="100%" stopColor="#787878" />
            </linearGradient>
            {/* top-to-bottom silver for tools */}
            <linearGradient id="hcS2" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%"   stopColor="#f0f0f0" />
              <stop offset="40%"  stopColor="#ffffff" />
              <stop offset="75%"  stopColor="#c0c0c0" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>
            {/* gold pivot */}
            <linearGradient id="hcGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#f7e09a" />
              <stop offset="100%" stopColor="#c8941a" />
            </linearGradient>
          </defs>

          {/* ══ M LETTER — solid silver, dominant ══ */}
          <text
            x="60" y="105"
            textAnchor="middle"
            fontSize="90"
            fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
            fontWeight="700"
            fill="url(#hcS1)"
            opacity="0.92"
          >M</text>

          {/* ══ COMB — left side, ~-22° tilt ══
               Local space: spine x=5–12, y=8–118; teeth extend RIGHT from x=12.
               Rotation centre at spine midpoint ≈ (8, 63). */}
          <g transform="rotate(-22, 8, 63)">
            {/* spine */}
            <rect x="5" y="8" width="7" height="110" rx="2.5" fill="url(#hcS2)" />
            {/* rounded tip cap */}
            <ellipse cx="8.5" cy="8" rx="3.5" ry="3" fill="url(#hcS2)" />
            {/* teeth — slender, extend right from spine edge (x=12) */}
            {combTeethY.map((y) => (
              <rect key={y} x="12" y={y} width="13" height="5" rx="1.5" fill="url(#hcS2)" />
            ))}
          </g>

          {/* ══ SCISSORS — right side, pivot at (84, 62), ~+14° tilt ══
               Two arms cross at the pivot:
                 Arm A: upper-right blade  →  lower-left handle ring
                 Arm B: upper-left  blade  →  lower-right handle ring       */}
          <g transform="translate(84, 62) rotate(14)">

            {/* Arm A — upper-right blade */}
            <path
              d="M 3,-4  L 13,-56  L 8,-56  L 0,-4  Z"
              fill="url(#hcS2)"
            />
            {/* Arm A — lower-left handle arm */}
            <path
              d="M 0,4  L -3,4  L -11,50  L -7,53  Z"
              fill="url(#hcS2)"
            />
            {/* Handle ring A — larger (finger ring) */}
            <circle
              cx="-9" cy="61"
              r="10"
              fill="none"
              stroke="url(#hcS2)"
              strokeWidth="5"
            />

            {/* Arm B — upper-left blade */}
            <path
              d="M -3,-4  L -8,-56  L -13,-56  L 0,-4  Z"
              fill="url(#hcS2)"
            />
            {/* Arm B — lower-right handle arm */}
            <path
              d="M 0,4  L 3,4  L 13,50  L 9,53  Z"
              fill="url(#hcS2)"
            />
            {/* Handle ring B — smaller (thumb ring) */}
            <circle
              cx="11" cy="60"
              r="7.5"
              fill="none"
              stroke="url(#hcS2)"
              strokeWidth="5"
            />

            {/* Pivot screw (gold) */}
            <circle cx="0" cy="0" r="4" fill="url(#hcGold)" />
            <circle cx="0" cy="0" r="1.8" fill="#1c1500" />
          </g>
        </svg>

        {/* Brand name */}
        <div style={{
          fontFamily: "'Cinzel','Playfair Display',serif",
          fontSize: "clamp(14px, 2vw, 22px)",
          fontWeight: 700,
          letterSpacing: "0.38em",
          color: "#ffffff",
          textShadow: "0 0 20px rgba(255,255,255,0.18)",
          marginTop: "-6px",
          lineHeight: 1.1,
        }}>
          MIKKIES&nbsp;HAIR
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Dancing Script','Great Vibes',cursive",
          fontSize: "clamp(11px, 1.4vw, 15px)",
          color: "rgba(255,255,255,0.78)",
          marginTop: "7px",
          letterSpacing: "0.05em",
        }}>
          Radiate confidence.&nbsp;stay&nbsp;cute
        </div>
      </div>

      <style jsx>{`
        @keyframes ringSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle  { from { opacity: 0.25; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
