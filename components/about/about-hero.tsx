'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react'

export function AboutHero() {
  const reduce = useReducedMotion()

  return (
    <section className="pt-12 pb-14 border-b border-border/70">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
          <Sparkles className="h-3.5 w-3.5" /> Next-Generation University OS
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
          Transforming Higher Education with Real-Time Intelligence
        </h1>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
          SmartCampus is an integrated IoT telemetry and artificial intelligence platform designed to eliminate informational silos across university campuses. By synthesizing biometric attendance, spatial occupancy, grade trajectories, and energy demand into actionable insights, SmartCampus empowers students and institutional leaders to make data-driven decisions.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-md shadow-primary/30"
          >
            <span>Explore Student Portal</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/intelligence"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs sm:text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <span>Live Campus Pulse</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
