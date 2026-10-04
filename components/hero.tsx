'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroVisual } from './hero-visual'

const wordVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

const headline = ['Understand', 'Your', 'Campus.']
const headline2 = ['Make', 'Smarter', 'Decisions.']

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
      {/* soft background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -left-40 h-[420px] w-[420px] rounded-full bg-secondary/5 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Campus intelligence, in real time
          </motion.div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden">
              <span className="flex flex-wrap gap-x-3">
                {headline.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i}
                    variants={wordVariants}
                    initial={reduce ? { opacity: 0 } : 'hidden'}
                    animate={reduce ? { opacity: 1 } : 'visible'}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </span>
            <span className="mt-1 block overflow-hidden">
              <span className="flex flex-wrap gap-x-3">
                {headline2.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i + headline.length}
                    variants={wordVariants}
                    initial={reduce ? { opacity: 0 } : 'hidden'}
                    animate={reduce ? { opacity: 1 } : 'visible'}
                    className="inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
          >
            Turn campus data into meaningful insights with intelligent analytics, real-time
            information and AI-powered recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#analytics"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore Campus
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground/20"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
