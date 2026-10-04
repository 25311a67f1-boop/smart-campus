'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Users, CalendarCheck, TrendingUp, CalendarDays, Boxes, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'

type PulseNode = {
  id: string
  label: string
  icon: LucideIcon
  x: number
  y: number
  metric: string
  detail: string
}

const nodes: PulseNode[] = [
  { id: 'students', label: 'Students', icon: Users, x: 50, y: 12, metric: '12,480 enrolled', detail: '4.2% growth vs. last term across 6 faculties.' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, x: 84, y: 34, metric: '87% average', detail: 'Highest on Tuesdays, lowest during exam weeks.' },
  { id: 'performance', label: 'Performance', icon: TrendingUp, x: 76, y: 74, metric: '3.4 avg GPA', detail: 'Correlates strongly with attendance above 85%.' },
  { id: 'events', label: 'Events', icon: CalendarDays, x: 24, y: 74, metric: '32 this month', detail: 'Workshops drive the most engagement per seat.' },
  { id: 'resources', label: 'Resources', icon: Boxes, x: 16, y: 34, metric: '78% utilized', detail: 'Labs peak midday; study rooms peak evenings.' },
  { id: 'issues', label: 'Issues', icon: AlertTriangle, x: 50, y: 92, metric: '1,248 active', detail: '94% resolved within the target SLA window.' },
]

const center = { x: 50, y: 50 }

export function CampusPulse() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>('attendance')
  const activeNode = nodes.find((n) => n.id === active) ?? null

  return (
    <section id="analytics" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-medium tracking-wide text-secondary uppercase">
                Live interconnections
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                Campus Pulse
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
                Every signal on campus is connected. Hover a node to highlight it, then select one
                to reveal what the data is telling you.
              </p>
            </Reveal>

            <div className="mt-8 min-h-[132px]">
              <AnimatePresence mode="wait">
                {activeNode && (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-border bg-card p-6 shadow-[0_16px_40px_-24px_rgb(15_23_42/0.3)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                        <activeNode.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {activeNode.label}
                        </p>
                        <p className="text-sm font-medium text-primary">{activeNode.metric}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeNode.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              {nodes.map((node) => {
                const isActive = active === node.id
                return (
                  <line
                    key={node.id}
                    x1={center.x}
                    y1={center.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? 'var(--primary)' : 'var(--border)'}
                    strokeWidth={isActive ? 0.6 : 0.3}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>

            {/* center */}
            <div
              className="absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background"
              style={{ left: `${center.x}%`, top: `${center.y}%` }}
            >
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full ring-2 ring-primary/40"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="font-display text-[11px] font-semibold">Pulse</span>
            </div>

            {/* nodes */}
            {nodes.map((node) => {
              const isActive = active === node.id
              const Icon = node.icon
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActive(node.id)}
                  aria-pressed={isActive}
                  aria-label={`${node.label}: ${node.metric}`}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <motion.span
                    whileHover={reduce ? undefined : { scale: 1.12 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2.5 py-2 transition-colors duration-300 ${
                      isActive
                        ? 'border-primary/40 bg-card shadow-[0_12px_30px_-14px_rgb(249_115_22/0.5)] ring-4 ring-primary/10'
                        : 'border-border bg-card hover:border-foreground/20'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-semibold text-foreground">{node.label}</span>
                  </motion.span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
