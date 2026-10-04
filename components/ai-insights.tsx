'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles, TrendingUp, Calendar, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal, StaggerGroup, StaggerItem } from './reveal'

type MiniInsight = {
  icon: LucideIcon
  text: string
  meta: string
}

const miniInsights: MiniInsight[] = [
  { icon: TrendingUp, text: 'Performance is trending up in 4 of 6 faculties.', meta: 'Confidence 92%' },
  { icon: Calendar, text: 'Workshop attendance outperforms lectures by 21%.', meta: 'Last 30 days' },
  { icon: Users, text: 'First-year engagement rose after orientation week.', meta: 'Cohort 2026' },
]

export function AiInsights() {
  const reduce = useReducedMotion()

  return (
    <section id="ai-insights" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          {/* subtle accent glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="relative">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-3 py-1.5 text-xs font-medium text-background/70">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                AI Insights
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl lg:text-5xl">
                Let the data speak.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* featured insight */}
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-3"
              >
                <div className="flex h-full flex-col justify-between rounded-3xl border border-background/10 bg-background/[0.06] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="relative flex h-2.5 w-2.5">
                      {!reduce && (
                        <motion.span
                          className="absolute inline-flex h-full w-full rounded-full bg-success"
                          animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                      )}
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                    </span>
                    <span className="text-xs font-medium tracking-wide text-background/60 uppercase">
                      Insight detected
                    </span>
                  </div>

                  <p className="mt-6 font-display text-2xl font-semibold leading-snug text-balance text-background sm:text-3xl">
                    Attendance has improved by{' '}
                    <span className="text-success">8.4%</span> this month.
                  </p>

                  <a
                    href="#analytics"
                    className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Explore why
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>

              {/* mini insights */}
              <StaggerGroup className="flex flex-col gap-4 lg:col-span-2" amount={0.3}>
                {miniInsights.map((item) => {
                  const Icon = item.icon
                  return (
                    <StaggerItem key={item.text}>
                      <div className="flex items-start gap-3 rounded-2xl border border-background/10 bg-background/[0.04] p-5 transition-colors duration-300 hover:bg-background/[0.08]">
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-background/10 text-primary">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-relaxed text-background">
                            {item.text}
                          </p>
                          <p className="mt-1 text-xs text-background/50">{item.meta}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
