'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Sparkles, BotMessageSquare, ShieldCheck, Zap } from 'lucide-react'

export function InsightsHeader() {
  const reduce = useReducedMotion()

  return (
    <div className="pt-8 pb-6 border-b border-border/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Generative Neural Campus Assistant
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Campus AI Query Engine
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Ask natural language questions across campus telemetry, cohort performance, study room availability, and academic trajectories.
          </p>
        </div>

        {/* Intelligence Engine Badges */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span>Telemetry Context: <strong>Live</strong></span>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Zero Data Leakage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
