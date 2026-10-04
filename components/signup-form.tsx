'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2 } from 'lucide-react'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
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

type Errors = {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  studentId?: string
  department?: string
  course?: string
  year?: string
  section?: string
  semester?: string
}

export function SignupForm() {
  const reduce = useReducedMotion()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    course: '',
    year: '',
    section: '',
    semester: '',
  })

  const variantsFor = (v: Variants) =>
    reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : v

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.fullName.trim()) next.fullName = 'Please enter your full name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your college email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.studentId.trim()) next.studentId = 'Student ID / roll number is required.'
    if (!values.department.trim()) next.department = 'Department is required.'
    if (!values.course.trim()) next.course = 'Course is required.'
    if (!values.year) next.year = 'Year is required.'
    if (!values.section.trim()) next.section = 'Section is required.'
    if (!values.semester) next.semester = 'Semester is required.'
    if (!values.password) {
      next.password = 'Please create a password.'
    } else if (values.password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    if (!values.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.'
    } else if (values.confirmPassword !== values.password) {
      next.confirmPassword = 'Passwords do not match.'
    }
    return next
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    setServerError(null)
    if (Object.keys(found).length > 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, year: Number(values.year), semester: Number(values.semester) }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to create account.')
      setDone(true)
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      <motion.div variants={variantsFor(item)} className="mb-7">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Join Smart Campus Intelligence.
        </p>
      </motion.div>

      {done ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-6 py-10 text-center"
          role="status"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-semibold text-foreground">
            Account created
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Your account is ready. Redirecting to your dashboard…
          </p>
          <Link
            href="/login"
            className="mt-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Go to log in
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Full name */}
          <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full name
            </label>
            <div className="group relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={values.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                placeholder="Jane Doe"
                className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
              />
            </div>
            {errors.fullName && (
              <p id="fullName-error" className="text-xs font-medium text-destructive">
                {errors.fullName}
              </p>
            )}
          </motion.div>

          {/* College email */}
          <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              College email
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
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="you@campus.edu"
                className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs font-medium text-destructive">
                {errors.email}
              </p>
            )}
          </motion.div>

          {/* Student profile */}
          <motion.div variants={variantsFor(item)} className="grid grid-cols-2 gap-3">
            {([
              ['studentId', 'Student ID / Roll No.', '25DS001'],
              ['department', 'Department', 'Data Science'],
              ['course', 'Course', 'B.Tech'],
              ['year', 'Year', '2'],
              ['section', 'Section', 'A'],
              ['semester', 'Semester', '3'],
            ] as const).map(([field, label, placeholder]) => (
              <div key={field} className="flex flex-col gap-1.5">
                <label htmlFor={field} className="text-sm font-medium text-foreground">{label}</label>
                <input
                  id={field}
                  name={field}
                  type={field === 'year' || field === 'semester' ? 'number' : 'text'}
                  min={field === 'year' || field === 'semester' ? 1 : undefined}
                  required
                  value={values[field]}
                  onChange={(e) => update(field, e.target.value)}
                  placeholder={placeholder}
                  aria-invalid={!!errors[field]}
                  className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                />
                {errors[field] && <p className="text-xs font-medium text-destructive">{errors[field]}</p>}
              </div>
            ))}
          </motion.div>

          {/* Password */}
          <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="group relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={values.password}
                onChange={(e) => update('password', e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                placeholder="At least 8 characters"
                className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs font-medium text-destructive">
                {errors.password}
              </p>
            )}
          </motion.div>

          {/* Confirm password */}
          <motion.div variants={variantsFor(item)} className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>
            <div className="group relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={values.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? 'confirmPassword-error' : undefined
                }
                placeholder="Re-enter your password"
                className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="text-xs font-medium text-destructive"
              >
                {errors.confirmPassword}
              </p>
            )}
          </motion.div>

          {serverError && (
            <motion.p variants={variantsFor(item)} role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive">
              {serverError}
            </motion.p>
          )}

          {/* Submit */}
          <motion.div variants={variantsFor(item)}>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={reduce || loading ? undefined : { scale: 1.01 }}
              whileTap={reduce || loading ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-6px_rgb(249_115_22/0.5)] transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                  aria-hidden="true"
                />
              )}
              {loading ? 'Creating account…' : 'Create Account'}
            </motion.button>
          </motion.div>

          {/* Divider */}
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

          {/* Google */}
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
      )}

      <motion.p
        variants={variantsFor(item)}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Log in
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
