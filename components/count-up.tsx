'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

export function CountUp({
  to,
  suffix = '',
  duration = 1.8,
  className,
}: {
  to: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }

    let raf = 0
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(ease(progress) * to))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
