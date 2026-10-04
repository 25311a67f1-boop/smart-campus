'use client'

import { useState, KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Sparkles, Send, HelpCircle, Loader2, ArrowRight, CornerDownLeft } from 'lucide-react'
import { defaultPresets, AIQueryResponse } from './knowledge-base'

interface ChatQueryBoxProps {
  onSubmitQuery: (query: string) => void
  isLoading: boolean
}

export function ChatQueryBox({ onSubmitQuery, isLoading }: ChatQueryBoxProps) {
  const reduce = useReducedMotion()
  const [input, setInput] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSubmitQuery(input.trim())
        setInput('')
      }
    }
  }

  const handlePresetClick = (q: string) => {
    if (!isLoading) {
      onSubmitQuery(q)
    }
  }

  return (
    <div className="pt-6 pb-6">
      {/* Input Box Card */}
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-md transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
          <Sparkles className="h-4 w-4" />
          <span>Ask anything about your courses, grades, campus occupancy, or energy</span>
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="e.g., How can I boost my CGPA? or Where is the quietest study room right now?"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
            aria-label="Ask Campus AI"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (input.trim() && !isLoading) {
                  onSubmitQuery(input.trim())
                  setInput('')
                }
              }}
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Ask AI</span>
                  <CornerDownLeft className="h-3.5 w-3.5 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggested Queries Bar */}
        <div className="mt-4 pt-3 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-2.5">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Popular suggested inquiries:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {defaultPresets.map((preset) => (
              <button
                key={preset.question}
                type="button"
                onClick={() => handlePresetClick(preset.question)}
                disabled={isLoading}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:bg-card hover:text-foreground active:scale-95 text-left disabled:opacity-50"
              >
                <span className="truncate max-w-[280px] sm:max-w-md">{preset.question}</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 flex-none text-primary" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
