'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Sparkles } from 'lucide-react'

type Node = {
  cx: number
  cy: number
  r: number
  accent?: boolean
}

const nodes: Node[] = [
  { cx: 18, cy: 22, r: 1.4 },
  { cx: 42, cy: 12, r: 2, accent: true },
  { cx: 72, cy: 20, r: 1.4 },
  { cx: 88, cy: 38, r: 1.6 },
  { cx: 28, cy: 44, r: 2.4, accent: true },
  { cx: 58, cy: 40, r: 1.4 },
  { cx: 80, cy: 60, r: 2 },
  { cx: 20, cy: 70, r: 1.4 },
  { cx: 46, cy: 72, r: 2, accent: true },
  { cx: 68, cy: 86, r: 1.4 },
  { cx: 90, cy: 82, r: 1.6 },
  { cx: 10, cy: 50, r: 1.4 },
]

const links: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 2],
  [5, 6],
  [3, 6],
  [4, 8],
  [8, 5],
  [7, 8],
  [8, 9],
  [9, 10],
  [6, 10],
  [11, 0],
  [11, 4],
  [7, 11],
]

export function LoginVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#1e293b_0%,#0f172a_55%,#0b1120_100%)]" />

      {/* Glow accents */}
      <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />

      {/* Node network */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g stroke="#38bdf8" strokeOpacity="0.16" strokeWidth="0.15">
          {links.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].cx}
              y1={nodes[a].cy}
              x2={nodes[b].cx}
              y2={nodes[b].cy}
              initial={reduce ? { opacity: 0.18 } : { pathLength: 0, opacity: 0 }}
              animate={
                reduce
                  ? { opacity: 0.18 }
                  : { pathLength: 1, opacity: 0.18 }
              }
              transition={{ duration: 1.2, delay: 0.4 + i * 0.05, ease: 'easeInOut' }}
            />
          ))}
        </g>
        <g>
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={n.accent ? '#f97316' : '#38bdf8'}
              fillOpacity={n.accent ? 0.95 : 0.7}
              initial={reduce ? { opacity: 0.8 } : { scale: 0, opacity: 0 }}
              animate={
                reduce
                  ? { opacity: 0.8 }
                  : {
                      scale: 1,
                      opacity: 1,
                      y: [0, i % 2 === 0 ? -1.4 : 1.4, 0],
                    }
              }
              transition={{
                scale: { duration: 0.5, delay: 0.5 + i * 0.06, ease: 'backOut' },
                opacity: { duration: 0.5, delay: 0.5 + i * 0.06 },
                y: {
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                },
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export function LoginBrand() {
  return (
    <a href="/" className="inline-flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        SmartCampus
      </span>
    </a>
  )
}
