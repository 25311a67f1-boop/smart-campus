'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  GraduationCap,
  Zap,
  ShieldCheck,
  Cpu,
  BarChart3,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react'

export function MissionPillars() {
  const reduce = useReducedMotion()

  const pillars = [
    {
      title: 'Actionable Academic Guidance',
      desc: 'Proactive early-warning telemetry detecting at-risk milestones before exam finals, paired with algorithmic study recommendations.',
      icon: GraduationCap,
      color: 'bg-primary/10 text-primary border-primary/20',
      tag: 'Student Success',
    },
    {
      title: 'Autonomous Facility & Spatial Optimization',
      desc: 'Real-time thermal sensing and Wi-Fi load monitoring that optimizes classroom HVAC schedules and prevents library congestion.',
      icon: Zap,
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      tag: 'Sustainability',
    },
    {
      title: 'Unified Institutional Intelligence',
      desc: 'Breaking down cross-departmental silos to provide administrators with clear cohort benchmarking and resource allocation tools.',
      icon: BarChart3,
      color: 'bg-success/10 text-success border-success/20',
      tag: 'Administrative Clarity',
    },
  ]

  return (
    <section className="py-12 border-b border-border/70">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Core Strategic Pillars
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
          Engineered to bridge the gap between physical campus operations and modern digital learning environments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pillars.map((p, idx) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${p.color}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-md bg-muted px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {p.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-1.5 text-xs text-primary font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Implemented in SmartCampus v2.4</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
