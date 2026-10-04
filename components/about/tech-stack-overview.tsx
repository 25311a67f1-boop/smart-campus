'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Code2, Globe, Shield, Terminal } from 'lucide-react'

export function TechStackOverview() {
  const reduce = useReducedMotion()

  const tech = [
    { category: 'Frontend Framework', name: 'Next.js 15+ App Router & React 19', badge: 'High Performance' },
    { category: 'Design System & Styling', name: 'Tailwind CSS v4 & Lucide Icons', badge: 'Design Tokens' },
    { category: 'Motion & Interactions', name: 'Motion / Framer Motion', badge: 'Fluid Transitions' },
    { category: 'Data Architecture', name: 'Edge Telemetry Streaming & REST Nodes', badge: 'Real-time' },
    { category: 'AI Inference Layer', name: 'SmartCampus Neural Synthesis Core', badge: 'Context-Aware' },
    { category: 'Security & Access', name: 'Role-Based Authentication Ready', badge: 'Enterprise Standard' },
  ]

  return (
    <section className="py-12">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Technology Stack & Implementation
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Production-grade software engineering standards powering the user interface.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              v2.4 Production Build
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tech.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:border-foreground/20 hover:bg-muted/30"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-muted-foreground font-medium">{t.category}</span>
                <span className="rounded-md bg-muted px-2 py-0.5 font-bold text-muted-foreground text-[10px]">
                  {t.badge}
                </span>
              </div>
              <h3 className="font-display text-sm font-bold text-foreground mt-1">
                {t.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Call to action panel */}
        <div className="mt-10 rounded-2xl bg-foreground p-6 sm:p-8 text-background flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-background">
              Ready to experience SmartCampus?
            </h3>
            <p className="text-xs sm:text-sm text-background/80 mt-1 max-w-md">
              Access your personalized student overview, live IoT sensor analytics, and predictive study tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-md shadow-primary/30"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-background/20 bg-background/10 px-4 py-2.5 text-xs font-semibold text-background hover:bg-background/20 transition-colors"
            >
              <span>Student Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
