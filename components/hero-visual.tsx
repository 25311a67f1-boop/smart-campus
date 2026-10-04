'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Users, CalendarCheck, TrendingUp, CalendarDays, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Node = {
  id: string
  label: string
  value: string
  icon: LucideIcon
  x: number
  y: number
  accent: 'primary' | 'secondary' | 'success'
}

// Coordinates on a 0-100 grid around a center at (50, 50)
const nodes: Node[] = [
  { id: 'students', label: 'Students', value: '12,480', icon: Users, x: 16, y: 20, accent: 'secondary' },
  { id: 'attendance', label: 'Attendance', value: '87%', icon: CalendarCheck, x: 84, y: 16, accent: 'success' },
  { id: 'performance', label: 'Performance', value: '+8.4%', icon: TrendingUp, x: 88, y: 72, accent: 'secondary' },
  { id: 'events', label: 'Events', value: '32 live', icon: CalendarDays, x: 20, y: 82, accent: 'primary' },
  { id: 'issues', label: 'Campus Issues', value: '1,248', icon: AlertTriangle, x: 50, y: 94, accent: 'primary' },
]

const center = { x: 50, y: 48 }

const accentClasses: Record<Node['accent'], { ring: string; icon: string; dot: string }> = {
  primary: { ring: 'ring-primary/20', icon: 'text-primary', dot: 'bg-primary' },
  secondary: { ring: 'ring-secondary/20', icon: 'text-secondary', dot: 'bg-secondary' },
  success: { ring: 'ring-success/25', icon: 'text-success', dot: 'bg-success' },
}

export function HeroVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="relative aspect-square w-full max-w-lg">
      {/* connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {nodes.map((node, i) => (
          <motion.line
            key={node.id}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--secondary)"
            strokeWidth={0.35}
            strokeDasharray="2 2"
            initial={reduce ? { opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* traveling pulses along lines */}
      {!reduce &&
        nodes.map((node, i) => (
          <motion.span
            key={`pulse-${node.id}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-secondary/70"
            style={{ left: `${center.x}%`, top: `${center.y}%` }}
            initial={{ opacity: 0 }}
            animate={{
              left: [`${center.x}%`, `${node.x}%`],
              top: [`${center.y}%`, `${node.y}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* center hub */}
      <motion.div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${center.x}%`, top: `${center.y}%` }}
        initial={reduce ? { opacity: 1 } : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-foreground text-background shadow-[0_20px_50px_-12px_rgb(15_23_42/0.5)] sm:h-28 sm:w-28">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-primary/40"
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <div className="text-center">
            <div className="font-display text-xs font-semibold tracking-tight">Smart</div>
            <div className="font-display text-xs font-semibold tracking-tight">Campus</div>
          </div>
        </div>
      </motion.div>

      {/* orbit nodes */}
      {nodes.map((node, i) => {
        const a = accentClasses[node.accent]
        const Icon = node.icon
        return (
          <motion.div
            key={node.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={reduce ? { opacity: 1 } : { scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              className={`flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-[0_10px_30px_-12px_rgb(15_23_42/0.25)] ring-4 ${a.ring}`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-muted ${a.icon}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="pr-1">
                <span className="block text-[10px] font-medium text-muted-foreground">{node.label}</span>
                <span className="block font-display text-sm font-semibold text-foreground">{node.value}</span>
              </span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
