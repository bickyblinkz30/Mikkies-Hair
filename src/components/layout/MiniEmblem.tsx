"use client"

import { useId } from "react"

export function MiniEmblem({ size = 32 }: { size?: number }) {
  const TOP = 90
  const BOTTOM = 298
  const uid = useId().replace(/:/g, "")

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      aria-label="Mikkies Hair mark"
    >
      <defs>
        <linearGradient id={`silver-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ededed" />
          <stop offset="55%" stopColor="#b9b9b9" />
          <stop offset="80%" stopColor="#7c7c7c" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </linearGradient>
        <linearGradient id={`silverH-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a7a7a" />
          <stop offset="35%" stopColor="#e5e5e5" />
          <stop offset="65%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#9a9a9a" />
        </linearGradient>
        <linearGradient id={`silverBlade-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a8a8a" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#6f6f6f" />
        </linearGradient>
        <mask id={`hideLeftLeg-${uid}`} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="400" height="400" fill="#ffffff" />
          <polygon
            points="74,82 158,82 158,108 138,108 132,278 160,278 160,306 72,306 72,278 100,278 106,108 74,108"
            fill="#000000"
          />
        </mask>
      </defs>

      <g opacity="0.8">
        {[198, 184, 168].map((r, i) => (
          <ellipse
            key={r}
            cx="200"
            cy="200"
            rx={r}
            ry={r * 0.95}
            fill="none"
            stroke={`rgba(220,220,220,${0.12 + i * 0.05})`}
            strokeWidth="1.2"
          />
        ))}
      </g>

      <text
        x="216"
        y="298"
        textAnchor="middle"
        fontFamily="'Playfair Display','Cormorant Garamond','Times New Roman',serif"
        fontWeight="700"
        fontSize="300"
        fill={`url(#silver-${uid})`}
        mask={`url(#hideLeftLeg-${uid})`}
      >
        M
      </text>

      <g transform="translate(4 0)">
        <rect x="118" y={TOP} width="11" height="100" rx="2.5" fill={`url(#silverH-${uid})`} />
        {Array.from({ length: 10 }).map((_, i) => {
          const y = TOP + 4 + i * 9.5
          return (
            <rect key={i} x="68" y={y} width="52" height="5" rx="1.2" fill={`url(#silverH-${uid})`} />
          )
        })}
        <path
          d={`M 68 ${TOP + 4} Q 60 ${TOP + 4} 60 ${TOP + 14} L 60 ${TOP + 18} L 68 ${TOP + 18} Z`}
          fill={`url(#silverH-${uid})`}
        />
        <path
          d={`M 68 ${TOP + 96} Q 60 ${TOP + 96} 60 ${TOP + 86} L 60 ${TOP + 82} L 68 ${TOP + 82} Z`}
          fill={`url(#silverH-${uid})`}
        />
      </g>

      <g transform="translate(144 0)">
        <path
          d={`M -3 ${TOP + 4} L 0 ${TOP + 6} Q 4 ${TOP + 70} -3 ${TOP + 130} L -9 ${TOP + 130} Q -12 ${TOP + 70} -8 ${TOP + 6} Z`}
          fill={`url(#silverBlade-${uid})`}
        />
        <path d={`M -8 ${TOP + 6} L -4 ${TOP} L 0 ${TOP + 6} Z`} fill={`url(#silverBlade-${uid})`} />
        <g transform={`rotate(7 6 ${TOP + 130})`}>
          <path
            d={`M 5 ${TOP + 4} L 8 ${TOP + 6} Q 12 ${TOP + 70} 5 ${TOP + 130} L -1 ${TOP + 130} Q -4 ${TOP + 70} 0 ${TOP + 6} Z`}
            fill={`url(#silverBlade-${uid})`}
          />
          <path d={`M 0 ${TOP + 6} L 4 ${TOP} L 8 ${TOP + 6} Z`} fill={`url(#silverBlade-${uid})`} />
        </g>
        <circle cx="-1" cy={TOP + 122} r="4.6" fill="#2a2a2a" />
        <circle cx="-1" cy={TOP + 122} r="1.8" fill="#0a0a0a" />
        <path
          d={`M -5 ${TOP + 134} Q -16 ${TOP + 154} -28 ${TOP + 176}`}
          stroke={`url(#silver-${uid})`}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M 5 ${TOP + 134} Q 16 ${TOP + 154} 28 ${TOP + 176}`}
          stroke={`url(#silver-${uid})`}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="-34" cy={BOTTOM - 24} rx="17" ry="19" fill="none" stroke={`url(#silver-${uid})`} strokeWidth="6" />
        <path
          d={`M -41 ${BOTTOM - 6} C -46 ${BOTTOM + 0} -46 ${BOTTOM + 8} -39 ${BOTTOM + 12} C -34 ${BOTTOM + 12} -31 ${BOTTOM + 6} -32 ${BOTTOM + 0} C -33 ${BOTTOM - 4} -36 ${BOTTOM - 6} -41 ${BOTTOM - 6} Z`}
          fill={`url(#silver-${uid})`}
        />
        <ellipse cx="36" cy={BOTTOM - 24} rx="17" ry="19" fill="none" stroke={`url(#silver-${uid})`} strokeWidth="6" />
        <path
          d={`M 31 ${BOTTOM - 6} C 26 ${BOTTOM + 0} 26 ${BOTTOM + 8} 33 ${BOTTOM + 12} C 38 ${BOTTOM + 12} 41 ${BOTTOM + 6} 40 ${BOTTOM + 0} C 39 ${BOTTOM - 4} 36 ${BOTTOM - 6} 31 ${BOTTOM - 6} Z`}
          fill={`url(#silver-${uid})`}
        />
      </g>
    </svg>
  )
}
