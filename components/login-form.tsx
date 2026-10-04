'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function LoginForm() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const variantsFor = (v: Variants) =>
    reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : v

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to log in.')
      router.push(data.destination || (data.user?.role === 'student' ? '/dashboard' : '/admin'))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      <motion.div variants={variantsFor(item)} className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Sign in to continue to Smart Campus Intelligence.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <div className="group relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@campus.edu"
              className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
          </div>
        </motion.div>

        <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-secondary transition-colors hover:text-secondary/80"
            >
              Forgot password?
            </a>
          </div>
          <div className="group relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.p variants={variantsFor(item)} role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive">
            {error}
          </motion.p>
        )}

        <motion.div variants={variantsFor(item)}>
          <motion.button
            type="submit"
            whileHover={reduce ? undefined : { scale: 1.01 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mt-1 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-6px_rgb(249_115_22/0.5)] transition-colors hover:bg-primary/90"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </motion.button>
        </motion.div>

        <motion.div
          variants={variantsFor(item)}
          className="flex items-center gap-3 py-1"
        >
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </motion.div>

        <motion.div variants={variantsFor(item)}>
          <motion.button
            type="button"
            whileHover={reduce ? undefined : { scale: 1.01 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <GoogleIcon />
            Continue with Google
          </motion.button>
        </motion.div>
      </form>

      <motion.p
        variants={variantsFor(item)}
        className="mt-6 text-center text-xs text-muted-foreground"
      >
        Campus staff?{' '}
        <Link
          href="/staff-setup"
          className="font-semibold text-secondary transition-colors hover:text-secondary/80"
        >
          First-time staff setup
        </Link>
      </motion.p>

      <motion.p
        variants={variantsFor(item)}
        className="mt-4 text-center text-sm text-muted-foreground"
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Sign up
        </Link>
      </motion.p>
    </motion.div>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}
