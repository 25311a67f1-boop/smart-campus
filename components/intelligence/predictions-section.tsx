'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
} from 'lucide-react'

interface PredictionItem {
  id: string
  category: 'Crowd' | 'Energy' | 'Academics' | 'Maintenance'
  title: string
  prediction: string
  confidence: number
  horizon: string
  impact: 'High' | 'Medium' | 'Low'
  impactColor: string
  recommendedAction: string
  icon: typeof Sparkles
}

const predictions: PredictionItem[] = [
  {
    id: 'pred-1',
    category: 'Crowd',
    title: 'Central Library 3rd Floor Saturation',
    prediction: 'Predicted to exceed 94% capacity between 2:45 PM and 5:00 PM due to pre-exam study groups.',
    confidence: 96,
    horizon: 'Next 3 Hours',
    impact: 'High',
    impactColor: 'bg-destructive/15 text-destructive',
    recommendedAction: 'Automated digital signage will redirect students to North Quad Study Annex (68% free).',
    icon: Sparkles,
  },
  {
    id: 'pred-2',
    category: 'Energy',
    title: 'Peak Grid Demand Mitigation',
    prediction: 'HVAC load will surge by 310 kW at 1:30 PM as ambient campus temperature hits 34°C.',
    confidence: 92,
    horizon: 'Next 4 Hours',
    impact: 'Medium',
    impactColor: 'bg-warning/15 text-warning',
    recommendedAction: 'Pre-cooling active in Science Block lecture halls to shift 140 kWh off peak grid tariff.',
    icon: TrendingUp,
  },
  {
    id: 'pred-3',
    category: 'Academics',
    title: 'Term 5 Course Pass Probability',
    prediction: 'Cohort success rate in Algorithms & Complexity projected at 89.2% (+3.8% over last semester).',
    confidence: 94,
    horizon: 'End of Term',
    impact: 'High',
    impactColor: 'bg-success/15 text-success',
    recommendedAction: 'AI tutoring modules suggested for 12 students showing low test score variance.',
    icon: Cpu,
  },
  {
    id: 'pred-4',
    category: 'Maintenance',
    title: 'Predictive HVAC Filter Service',
    prediction: 'Block B Laboratory Air Handler unit #4 pressure variance indicates required filter change.',
    confidence: 88,
    horizon: 'Within 48 Hours',
    impact: 'Medium',
    impactColor: 'bg-secondary/15 text-secondary',
    recommendedAction: 'Automated work order #WO-891 created for campus facilities maintenance staff.',
    icon: Wrench,
  },
]

export function PredictionsSection() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<string>('All')

  const filtered =
    filter === 'All'
      ? predictions
      : predictions.filter((p) => p.category === filter)

  return (
    <section className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Neural Forecasting Engine
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Predictive Outcomes & Modeling
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Machine learning models trained on 3+ years of IoT telemetry and academic logs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-muted/60 p-1">
            {['All', 'Crowd', 'Energy', 'Academics', 'Maintenance'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {item.category} Model
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${item.impactColor}`}>
                        {item.impact} Impact
                      </span>
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground">
                        {item.horizon}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 font-display text-base font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {item.prediction}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60">
                  <div className="rounded-xl bg-muted/60 p-3 text-xs">
                    <span className="font-semibold text-foreground block mb-0.5">Automated AI Recommendation:</span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {item.recommendedAction}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Model Confidence</span>
                    <span className="font-bold text-success font-mono">{item.confidence}% Validated</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
