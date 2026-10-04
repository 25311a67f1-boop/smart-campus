'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Cpu, Server, ShieldCheck, Database, Layers, ArrowRight, Sparkles } from 'lucide-react'

export function SystemArchitecture() {
  const reduce = useReducedMotion()

  const tiers = [
    {
      step: '01',
      title: 'IoT Sensor Mesh & Edge Nodes',
      desc: '480+ environmental, biometric, Wi-Fi 6 access points, and smart utility meters capturing telemetry packets with millisecond latency.',
      icon: Cpu,
    },
    {
      step: '02',
      title: 'Real-Time Ingestion & Normalization',
      desc: 'High-throughput stream processing layer sanitizing, anonymizing, and structuring sensor feeds to protect student privacy.',
      icon: Database,
    },
    {
      step: '03',
      title: 'Neural Predictive & Analytics Core',
      desc: 'Continuous machine learning models evaluating grade trajectory curves, occupancy probability, and energy load balancing.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Unified Adaptive Client UI',
      desc: 'Responsive, accessible web portal providing high-contrast visual dashboards, automated notifications, and AI query synthesis.',
      icon: Layers,
    },
  ]

  return (
    <section className="py-12 border-b border-border/70">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          End-to-End System Architecture
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
          A four-tier operational pipeline built with modern web technologies, scalable edge computing, and strict data governance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t, idx) => {
          const Icon = t.icon
          return (
            <motion.div
              key={t.step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {t.step}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-foreground">
                  {t.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Verified Component</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
