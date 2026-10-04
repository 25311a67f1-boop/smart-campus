'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  Lightbulb,
  CheckCircle2,
  Flame,
} from 'lucide-react'

export function AiCampusInsights() {
  const reduce = useReducedMotion()

  const insights = [
    {
      id: 'ins-1',
      title: 'Lab Utilization Imbalance Detected',
      desc: 'Computer Lab 3 experiences 92% peak concurrency while Lab 5 remains at 31% during the same 11:00 AM window. Dynamic scheduling reallocation can balance thermal loads and student wait times.',
      gain: '+24% Capacity Efficiency',
      category: 'Resource Optimization',
    },
    {
      id: 'ins-2',
      title: 'Optimal Shuttle Routing Schedule',
      desc: 'Smart Transit GPS logs show heavy boarding surges at North Station between 8:40 AM and 9:10 AM. Adding one micro-shuttle cycle during this 30-minute interval reduces pedestrian congestion by 40%.',
      gain: '3.5 min Lower Avg Transit Wait',
      category: 'Mobility Intelligence',
    },
    {
      id: 'ins-3',
      title: 'Student Study Window Correlation',
      desc: 'Students utilizing the 4th Floor Collaborative Hub between 3 PM and 6 PM show a 14% higher assignment submission score in Data Structures and Algorithms.',
      gain: 'Measurable Academic Lift',
      category: 'Student Success',
    },
  ]

  return (
    <section className="pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-8 sm:px-10 sm:py-10 text-background shadow-lg">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-background/20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-semibold text-background mb-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Autonomous AI Insights
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-background">
                Autonomous Campus Insights
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-background/80 max-w-xl">
                Continuous machine learning analysis evaluating energy efficiency, spatial allocation, and student outcomes.
              </p>
            </div>

            <Link
              href="/ai-insights"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-md shadow-primary/30 w-fit"
            >
              <span>Ask AI Insights Engine</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Insights 3-column cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {insights.map((ins, i) => (
              <motion.div
                key={ins.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex flex-col justify-between rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur-xs transition-colors hover:bg-background/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-background/10 px-2 py-0.5 text-[10px] font-bold text-background uppercase tracking-wider">
                      {ins.category}
                    </span>
                    <span className="rounded-md bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {ins.gain}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-sm font-bold text-background">
                    {ins.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-background/80">
                    {ins.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-background/15 flex items-center justify-between text-[11px] text-background/70">
                  <span>Synthesized across 4,800+ events</span>
                  <span className="font-semibold text-primary">Active Rule</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
