'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Sparkles,
  User,
  Bot,
  CheckCircle2,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Layers,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { AIQueryResponse } from './knowledge-base'

interface InsightResultCardProps {
  item: AIQueryResponse
  onDelete?: (id: string) => void
}

export function InsightResultCard({ item, onDelete }: InsightResultCardProps) {
  const reduce = useReducedMotion()
  const [bookmarked, setBookmarked] = useState(false)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs mb-6"
    >
      {/* User Question Header */}
      <div className="flex items-start gap-3.5 pb-5 border-b border-border/70">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary">
          <User className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Student Query • {item.generatedAt}
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
              {item.category}
            </span>
          </div>
          <h2 className="mt-1 font-display text-lg font-bold text-foreground">
            {item.question}
          </h2>
        </div>
      </div>

      {/* AI Synthesized Response Body */}
      <div className="mt-6 flex items-start gap-3.5">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-foreground text-background shadow-xs">
          <Sparkles className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>SmartCampus Intelligence AI</span>
              <span className="rounded-md bg-success/15 px-1.5 py-0.2 text-[10px] font-bold text-success">
                {item.confidenceScore}% Confidence
              </span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBookmarked(!bookmarked)}
                aria-label="Bookmark insight"
                className={`rounded-lg p-1.5 text-xs transition-colors ${
                  bookmarked ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Core Summary */}
          <div className="mt-3 rounded-2xl bg-muted/40 p-4 text-xs sm:text-sm text-foreground leading-relaxed">
            {item.summary}
          </div>

          {/* Key Metrics Grid */}
          {item.keyMetrics && item.keyMetrics.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {item.keyMetrics.map((km, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-3.5"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    {km.label}
                  </span>
                  <div className="mt-1 font-display text-base font-bold text-foreground">
                    {km.value}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{km.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations List */}
          {item.recommendations && item.recommendations.length > 0 && (
            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.03] p-4">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Actionable Recommendations:</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {item.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-primary text-xs">•</span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Telemetry Citations & Feedback Bar */}
          <div className="mt-5 flex flex-col gap-3 pt-4 border-t border-border/60 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-semibold">Telemetry Data Sources:</span>
              {item.telemetryCitations.map((cite, cIdx) => (
                <span
                  key={cIdx}
                  className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-foreground"
                >
                  {cite}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[11px] text-muted-foreground">Helpful?</span>
              <button
                type="button"
                onClick={() => setFeedback('up')}
                className={`rounded-lg p-1 transition-colors ${
                  feedback === 'up' ? 'bg-success/15 text-success' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFeedback('down')}
                className={`rounded-lg p-1 transition-colors ${
                  feedback === 'down' ? 'bg-destructive/15 text-destructive' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
