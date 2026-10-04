'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Sparkles } from 'lucide-react'

const links = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'AI Insights', href: '/ai-insights' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled
              ? 'border-border bg-card/80 shadow-[0_8px_30px_rgb(15_23_42/0.06)] backdrop-blur-md'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              SmartCampus
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 sm:inline-flex"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-lg md:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Login
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
