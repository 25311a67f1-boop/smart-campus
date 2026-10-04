'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Sparkles, ArrowRight, TrendingUp, Lightbulb, Target, BookOpen, CheckCircle2, X } from 'lucide-react'

export function AiInsightCard({ metrics }: { metrics: { academicPerformance: number; assignmentsCompleted: number; assignmentsTotal: number } }) {
  const reduce = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)

  const detailedRecommendations = [
    ...(metrics.academicPerformance > 0
      ? [{
          title: 'Academic record available',
          desc: `Your latest recorded CGPA is ${metrics.academicPerformance.toFixed(1)}. More grade records will improve the trend analysis.`,
          badge: 'Academic data',
        }]
      : []),
    ...(metrics.assignmentsTotal > 0
      ? [{
          title: 'Assignment progress',
          desc: `You have completed ${metrics.assignmentsCompleted} of ${metrics.assignmentsTotal} recorded assignments.`,
          badge: 'Assignments',
        }]
      : []),
    ...(metrics.academicPerformance === 0 && metrics.assignmentsTotal === 0
      ? [{
          title: 'Waiting for campus data',
          desc: 'No academic records are stored for this account yet. Faculty/admin data entry will populate this section automatically.',
          badge: 'No data yet',
        }]
      : []),
  ]

  return (
    <section id="ai-insights" className="pb-8">
      {/* Prominent Dark/Luminous Card following SmartCampus AI aesthetics */}
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-8 sm:px-10 sm:py-10 text-background shadow-lg">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            {/* Live AI status indicator with subtle animation */}
            <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-semibold text-background">
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-primary"
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>SmartCampus Intelligence AI</span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-background sm:text-3xl lg:text-4xl text-balance">
              Insights from your campus data
            </h2>

            <p className="mt-2 text-sm sm:text-base leading-relaxed text-background/80 text-pretty">
              Recommendations will become available as attendance, grades, and assignment data are recorded.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-background/70">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-success" /> Recorded GPA Trend
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {metrics.assignmentsTotal ? Math.round((metrics.assignmentsCompleted / metrics.assignmentsTotal) * 100) : 0}% Assignment Completion
              </span>
              <span>•</span>
              <span>Current CGPA: <strong>{metrics.academicPerformance.toFixed(1)}</strong></span>
            </div>
          </div>

          <div className="flex-none">
            <motion.button
              type="button"
              onClick={() => setModalOpen(true)}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-6px_rgb(249_115_22/0.5)] transition-colors hover:bg-primary/90"
            >
              View AI Insights
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* AI Insights Modal / Slideover */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">AI Intelligence Insights</h3>
                    <p className="text-xs text-muted-foreground">Synthesized from attendance, grades, and campus logs</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {detailedRecommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-background/60 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {rec.title}
                      </span>
                      <span className="rounded-md bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                        {rec.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {rec.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-foreground">Generated from recorded data</span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
                >
                  Close Insights
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
