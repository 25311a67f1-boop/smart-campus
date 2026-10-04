'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Sparkles,
  Menu,
  X,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Cpu,
  BarChart3,
  BotMessageSquare,
  Info,
  LogOut,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

interface NavLink {
  label: string
  href: string
  icon: typeof LayoutDashboard
  badge?: string
}

const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Intelligence', href: '/intelligence', icon: Cpu, badge: 'Live' },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'AI Insights', href: '/ai-insights', icon: BotMessageSquare, badge: 'AI' },
  { label: 'About', href: '/about', icon: Info },
]

export function AppNavbar() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const notifications = [
    {
      id: 1,
      title: 'AI Prediction Alert',
      desc: 'Library 3rd floor capacity predicted to reach 95% at 3:00 PM.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Attendance Synced',
      desc: 'RFID telemetry recorded for Distributed Systems Lecture.',
      time: '45m ago',
      unread: true,
    },
    {
      id: 3,
      title: 'New Campus Event',
      desc: 'Annual Smart Campus AI Hackathon registration is open.',
      time: '2h ago',
      unread: false,
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 lg:gap-6">
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <span className="block font-display text-base font-bold tracking-tight text-foreground leading-tight">
                SmartCampus
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Intelligence Platform
              </span>
            </div>
          </Link>

          <div className="hidden h-5 w-px bg-border lg:block" />

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                        isActive
                          ? 'bg-background/20 text-background'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live system status pill */}
          <div className="hidden items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground md:flex">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-success"
                  animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="font-mono text-[11px] text-foreground/90">System Online</span>
          </div>

          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setProfileOpen(false)
              }}
              aria-label="View notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted focus:outline-none"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                2
              </span>
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-3 shadow-xl z-50"
                >
                  <div className="flex items-center justify-between border-b border-border pb-2 px-1">
                    <span className="font-display text-sm font-semibold text-foreground">Notifications</span>
                    <span className="text-[11px] text-primary font-medium cursor-pointer hover:underline">
                      Mark read
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`rounded-xl p-2.5 text-xs transition-colors ${
                          n.unread ? 'bg-muted/70 text-foreground' : 'text-muted-foreground hover:bg-muted/40'
                        }`}
                      >
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-foreground">{n.title}</span>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Student Profile avatar & dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen)
                setNotificationsOpen(false)
              }}
              aria-label="Student profile menu"
              className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 sm:px-2.5 sm:py-1.5 transition-colors hover:bg-muted focus:outline-none"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-display text-xs font-bold">
                SC
              </div>
              <div className="hidden text-left sm:block">
                <span className="block text-xs font-semibold text-foreground leading-tight">Student Portal</span>
                <span className="block text-[10px] text-muted-foreground">CSE • Fall 2026</span>
              </div>
              <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-muted-foreground" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl z-50"
                >
                  <div className="border-b border-border p-2">
                    <p className="font-display text-sm font-semibold text-foreground">Demo Student Account</p>
                    <p className="text-xs text-muted-foreground">student@campus.edu</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                      <CheckCircle2 className="h-3 w-3" /> Campus Telemetry Active
                    </div>
                  </div>

                  <div className="mt-1 space-y-0.5 text-xs">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors font-medium"
                    >
                      Student Dashboard
                    </Link>
                    <Link
                      href="/intelligence"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors font-medium"
                    >
                      Campus Intelligence
                    </Link>
                    <Link
                      href="/analytics"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors font-medium"
                    >
                      Analytics & Reports
                    </Link>
                    <Link
                      href="/ai-insights"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors font-medium"
                    >
                      AI Query Engine
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-destructive hover:bg-destructive/10 transition-colors font-medium"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Log Out
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-card px-4 py-3 lg:hidden"
          >
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                ← Back to Home
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-primary"
              >
                Log In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
