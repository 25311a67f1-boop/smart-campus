'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AppNavbar } from '@/components/layout/app-navbar'
import { SiteFooter } from '@/components/site-footer'
import { InsightsHeader } from '@/components/ai-insights/insights-header'
import { ChatQueryBox } from '@/components/ai-insights/chat-query-box'
import { InsightResultCard } from '@/components/ai-insights/insight-result-card'
import {
  generateMockAiResponse,
  AIQueryResponse,
  defaultPresets,
} from '@/components/ai-insights/knowledge-base'
import { Sparkles, BotMessageSquare, RefreshCw, AlertCircle, Trash2, Filter } from 'lucide-react'

export default function AiInsightsPage() {
  const [queries, setQueries] = useState<AIQueryResponse[]>([
    generateMockAiResponse(defaultPresets[0].question, defaultPresets[0].category),
    generateMockAiResponse(defaultPresets[1].question, defaultPresets[1].category),
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [errorState, setErrorState] = useState<string | null>(null)

  const categories = ['All', 'Academics', 'Campus Operations', 'Career & Skills', 'Facility Telemetry']

  const handleQuerySubmit = (question: string) => {
    setIsLoading(true)
    setErrorState(null)

    // Simulate realistic AI model thinking & streaming
    setTimeout(() => {
      try {
        const response = generateMockAiResponse(question)
        setQueries((prev) => [response, ...prev])
        setIsLoading(false)
      } catch (err) {
        setErrorState('Neural query parsing timed out. Please try again.')
        setIsLoading(false)
      }
    }, 700)
  }

  const handleClearHistory = () => {
    setQueries([])
  }

  const filteredQueries =
    selectedCategory === 'All'
      ? queries
      : queries.filter((q) => q.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground flex flex-col justify-between">
      <div>
        {/* Universal Top Navigation */}
        <AppNavbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <InsightsHeader />

          {/* Interactive Chat & Prompt Input Bar */}
          <ChatQueryBox onSubmitQuery={handleQuerySubmit} isLoading={isLoading} />

          {/* Category Filter & History Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 pt-2">
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {queries.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear session queries</span>
              </button>
            )}
          </div>

          {/* Loading Shimmer State */}
          {isLoading && (
            <div className="mb-6 rounded-3xl border border-primary/30 bg-primary/[0.03] p-6 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="h-4 w-4 animate-spin" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-48 rounded-md bg-primary/20" />
                  <div className="h-3 w-64 rounded-md bg-primary/10" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3.5 w-full rounded-md bg-muted" />
                <div className="h-3.5 w-4/5 rounded-md bg-muted" />
              </div>
            </div>
          )}

          {/* Error Message with Retry */}
          {errorState && (
            <div className="mb-6 rounded-3xl border border-destructive/30 bg-destructive/10 p-5 text-destructive flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium">
                <AlertCircle className="h-4 w-4 flex-none" />
                <span>{errorState}</span>
              </div>
              <button
                type="button"
                onClick={() => handleQuerySubmit('How can I improve my 8.4 CGPA?')}
                className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredQueries.length === 0 && (
            <div className="my-12 rounded-3xl border border-dashed border-border p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <BotMessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                No inquiries matching this category
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                Ask a new question using the prompt input above or select &quot;All&quot; to review previous insights.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="mt-4 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
              >
                Show All Questions
              </button>
            </div>
          )}

          {/* Render Query Results */}
          <div className="mt-2">
            {filteredQueries.map((item) => (
              <InsightResultCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>

      {/* Universal Footer */}
      <SiteFooter />
    </div>
  )
}
