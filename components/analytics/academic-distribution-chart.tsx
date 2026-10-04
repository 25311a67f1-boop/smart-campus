'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { GraduationCap, Award, HelpCircle } from 'lucide-react'

interface GradeBand {
  bracket: string
  range: string
  count: number
  pct: number
  color: string
  description: string
}

const gradeBands: GradeBand[] = [
  { bracket: 'O (Outstanding)', range: '9.0 – 10.0', count: 184, pct: 15, color: 'bg-primary', description: 'Top honors & Dean’s Academic Gold Medal eligibility.' },
  { bracket: 'A+ (Excellent)', range: '8.0 – 8.9', count: 462, pct: 37, color: 'bg-secondary', description: 'Strong distinction bracket qualifying for accelerated research labs.' },
  { bracket: 'A (Very Good)', range: '7.0 – 7.9', count: 395, pct: 32, color: 'bg-foreground/70', description: 'Solid core performance meeting all placement prerequisites.' },
  { bracket: 'B+ (Good)', range: '6.0 – 6.9', count: 148, pct: 12, color: 'bg-warning', description: 'Satisfactory standing with AI tutoring mentorship suggested.' },
  { bracket: 'B (Average)', range: '5.0 – 5.9', count: 51, pct: 4, color: 'bg-destructive', description: 'Targeted support sessions scheduled with faculty mentors.' },
]

export function AcademicDistributionChart() {
  const reduce = useReducedMotion()
  const [selectedBand, setSelectedBand] = useState<GradeBand>(gradeBands[1]) // Default to A+

  return (
    <section className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              <GraduationCap className="h-3.5 w-3.5" /> Grade Bell Curve
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              CGPA & Grade Bracket Distribution
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Statistical spread of 1,240 enrolled students evaluated against institutional criteria.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Mean: <strong>8.28 CGPA</strong> • Median: <strong>8.35</strong>
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          {/* Visual Horizontal Histogram */}
          <div className="lg:col-span-7 space-y-4">
            {gradeBands.map((band) => {
              const isSelected = selectedBand.bracket === band.bracket
              return (
                <div
                  key={band.bracket}
                  onClick={() => setSelectedBand(band)}
                  className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    isSelected
                      ? 'border-primary/40 bg-primary/[0.04] shadow-xs'
                      : 'border-border bg-background/50 hover:border-foreground/20 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{band.bracket}</span>
                      <span className="font-mono text-muted-foreground text-[11px]">({band.range})</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-foreground">{band.count} students</span>
                      <span className="text-muted-foreground font-semibold">({band.pct}%)</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={reduce ? { width: `${band.pct * 2.5}%` } : { width: 0 }}
                      animate={{ width: `${band.pct * 2.5}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${band.color}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected Grade Band Detail Panel */}
          <div className="lg:col-span-5">
            <motion.div
              key={selectedBand.bracket}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between rounded-2xl border border-secondary/20 bg-secondary/[0.04] p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    Bracket Intelligence
                  </span>
                  <span className="rounded-md bg-card border border-border px-2 py-0.5 text-xs font-mono font-bold text-foreground">
                    {selectedBand.range}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
                  {selectedBand.bracket}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                    {selectedBand.count}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Enrolled students ({selectedBand.pct}% of total cohort)
                  </span>
                </div>

                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {selectedBand.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Placement Qualification:</span>
                    <span className="font-semibold text-success">
                      {selectedBand.pct >= 30 ? '100% Eligible' : 'Eligible'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Research Fellowship:</span>
                    <span className="font-semibold text-foreground">
                      {selectedBand.range.startsWith('9') || selectedBand.range.startsWith('8')
                        ? 'Direct Consideration'
                        : 'Faculty Endorsement'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card p-3">
                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-primary flex-none mt-0.5" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Students in this bracket maintained an average of <strong>86.4% biometric lecture attendance</strong>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
