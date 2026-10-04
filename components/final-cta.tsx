'use client'

import { ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Your campus is full of data.
            <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Turn it into insight.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <a
              href="#home"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-4 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore Smart Campus
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
