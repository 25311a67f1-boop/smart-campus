'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './reveal'

type Story = {
  step: string
  title: string
  copy: string
  chart: 'bars' | 'line' | 'stack' | 'area'
  data: number[]
  color: string
}

const stories: Story[] = [
  {
    step: 'Attendance',
    title: 'Consistent presence sets the pace.',
    copy: 'Attendance climbs steadily through the term, peaking mid-semester before exam season.',
    chart: 'bars',
    data: [52, 61, 68, 74, 80, 87],
    color: 'var(--success)',
  },
  {
    step: 'Performance',
    title: 'Presence compounds into performance.',
    copy: 'Cohorts that attend consistently outperform on assessments by a widening margin.',
    chart: 'line',
    data: [40, 46, 55, 63, 72, 84],
    color: 'var(--secondary)',
  },
  {
    step: 'Campus Issues',
    title: 'Friction becomes visible early.',
    copy: 'Reported issues spike, then fall sharply as teams resolve them within SLA windows.',
    chart: 'area',
    data: [30, 68, 92, 74, 48, 26],
    color: 'var(--primary)',
  },
  {
    step: 'Student Activity',
    title: 'Engagement tells the full story.',
    copy: 'Events, resources and participation reveal where campus life is truly thriving.',
    chart: 'stack',
    data: [44, 58, 66, 72, 79, 91],
    color: 'var(--secondary)',
  },
]

function MiniChart({ story }: { story: Story }) {
  const reduce = useReducedMotion()
  const max = Math.max(...story.data)

  if (story.chart === 'line' || story.chart === 'area') {
    const points = story.data.map((d, i) => {
      const x = (i / (story.data.length - 1)) * 100
      const y = 100 - (d / max) * 90 - 5
      return { x, y }
    })
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaPath = `${path} L 100 100 L 0 100 Z`

    return (
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {story.chart === 'area' && (
          <motion.path
            d={areaPath}
            fill={story.color}
            opacity={0.12}
            initial={reduce ? { opacity: 0.12 } : { opacity: 0 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        )}
        <motion.path
          d={path}
          fill="none"
          stroke={story.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
    )
  }

  // bars / stack
  return (
    <div className="flex h-full w-full items-end gap-2 sm:gap-3">
      {story.data.map((d, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ backgroundColor: story.color, opacity: story.chart === 'stack' ? 0.55 + (i / story.data.length) * 0.45 : 1 }}
          initial={reduce ? { height: `${(d / max) * 100}%` } : { height: 0 }}
          whileInView={{ height: `${(d / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

function StoryRow({ story, index }: { story: Story; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])
  const flip = index % 2 === 1

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <Reveal direction={flip ? 'left' : 'right'} className={flip ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold text-primary tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            {story.step}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          {story.title}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
          {story.copy}
        </p>
      </Reveal>

      <motion.div style={{ y }} className={flip ? 'lg:order-1' : ''}>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_20px_50px_-30px_rgb(15_23_42/0.3)] sm:p-8">
          <div className="h-48 w-full sm:h-56">
            <MiniChart story={story} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function DataStory() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">Data story</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Numbers tell a story.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {stories.map((story, i) => (
            <StoryRow key={story.step} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
