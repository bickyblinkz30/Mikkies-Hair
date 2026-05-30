"use client";

export default function GoldenEmblem() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 480, height: 480, margin: "0 auto" }}>

      {/* Outer ring: faint gold, large */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(212,175,55,0.18)",
          borderRadius: "50%",
          animation: "rotateSlow 20s linear infinite",
        }}
      />

      {/* Second ring: slightly more visible */}
      <div
        className="absolute rounded-full"
        style={{
          width: "90%", height: "90%",
          top: "5%", left: "5%",
          border: "1px solid rgba(212,175,55,0.28)",
          borderRadius: "50%",
          animation: "rotateSlow 15s linear infinite reverse",
        }}
      />

      {/* Third ring with dashed accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: "80%", height: "80%",
          top: "10%", left: "10%",
          border: "1.5px solid rgba(212,175,55,0.40)",
          borderRadius: "50%",
        }}
      />

      {/* Inner solid dark circle */}
      <div
        className="absolute rounded-full"
        style={{
          width: "70%", height: "70%",
          top: "15%", left: "15%",
          background: "radial-gradient(circle at 50% 40%, #1c1a14 0%, #0a0a0a 100%)",
          border: "1.5px solid rgba(212,175,55,0.60)",
          borderRadius: "50%",
          boxShadow:
            "inset 0 0 60px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.12)",
        }}
      />

      {/* Horizontal gold rule lines (left & right of circle) */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "-12%",
          width: "12%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5))",
          transform: "translateY(-50%)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          right: "-12%",
          width: "12%",
          height: "1px",
          background: "linear-gradient(to left, transparent, rgba(212,175,55,0.5))",
          transform: "translateY(-50%)",
        }}
      />

      {/* Bottom golden glow burst */}
      <div
        className="absolute"
        style={{
          bottom: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 160,
          height: 24,
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.75) 0%, rgba(212,175,55,0.2) 50%, transparent 80%)",
          filter: "blur(5px)",
        }}
      />

      {/* Scatter sparkle dots around outer ring */}
      {[
        { top: "6%",  left: "50%" },
        { top: "14%", left: "82%" },
        { top: "50%", left: "97%" },
        { top: "85%", left: "82%" },
        { top: "94%", left: "50%" },
        { top: "85%", left: "18%" },
        { top: "50%", left: "3%"  },
        { top: "14%", left: "18%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            ...pos,
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            background: "rgba(212,175,55,0.8)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 4px rgba(212,175,55,0.9)",
            animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* CONTENT: Scissors SVG + MIKKIES HAIR + tagline */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ width: "62%", gap: 0 }}
      >
        {/* Scissors + Comb SVG (silver metallic) */}
        <svg
          viewBox="0 0 120 140"
          width="140"
          height="140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 8px rgba(200,200,200,0.3))" }}
        >
          {/* Comb on the left, tilted */}
          <g transform="rotate(-30, 30, 50)">
            <rect x="22" y="10" width="10" height="60" rx="3" fill="url(#silverGrad)" />
            {[0,1,2,3,4,5,6].map((t) => (
              <rect key={t} x={22} y={15 + t * 8} width={10} height={3} rx={1}
                fill="url(#silverGrad)" opacity="0.6"
                transform={`translate(0, 0)`}
              />
            ))}
          </g>

          {/* Scissors blade top-left */}
          <g transform="rotate(-20, 60, 70)">
            <ellipse cx="52" cy="108" rx="7" ry="7" fill="url(#silverGrad)" />
            <ellipse cx="52" cy="108" rx="4" ry="4" fill="#111" />
            <path
              d="M52 101 L62 40 L66 40 L56 101"
              fill="url(#silverGrad)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
          </g>

          {/* Scissors blade top-right */}
          <g transform="rotate(20, 68, 70)">
            <ellipse cx="68" cy="108" rx="7" ry="7" fill="url(#silverGrad)" />
            <ellipse cx="68" cy="108" rx="4" ry="4" fill="#111" />
            <path
              d="M68 101 L58 40 L54 40 L64 101"
              fill="url(#silverGrad)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
          </g>

          {/* Scissors pivot screw */}
          <circle cx="60" cy="72" r="3" fill="url(#goldAccent)" />

          {/* M letterform in the background */}
          <text
            x="60"
            y="105"
            textAnchor="middle"
            fontSize="90"
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            fill="url(#silverGrad)"
            opacity="0.25"
          >
            M
          </text>

          <defs>
            <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#b0b0b0" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5d78e" />
              <stop offset="100%" stopColor="#c8941a" />
            </linearGradient>
          </defs>
        </svg>

        {/* MIKKIES HAIR text */}
        <div
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', serif",
            fontSize: "clamp(14px, 2.2vw, 22px)",
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "#ffffff",
            textShadow: "0 0 20px rgba(255,255,255,0.15)",
            marginTop: "-8px",
            lineHeight: 1.1,
          }}
        >
          MIKKIES HAIR
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Dancing Script', 'Great Vibes', cursive",
            fontSize: "clamp(11px, 1.4vw, 15px)",
            color: "rgba(255,255,255,0.75)",
            marginTop: "6px",
            letterSpacing: "0.04em",
          }}
        >
          Radiate confidence. stay cute
        </div>
      </div>

      {/* CSS keyframes */}
      <style jsx>{`
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          from { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
          to   { opacity: 1;   transform: translate(-50%, -50%) scale(1.3); }
        }
      `}</style>
    </div>
  );
}
