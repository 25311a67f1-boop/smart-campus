'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Sparkles, Bell, ArrowLeft, LogOut, Search, CheckCircle2, User, ChevronDown } from 'lucide-react'

export function DashboardNavbar({ user, activities }: { user: { fullName: string; email: string; role: string }; activities: Array<{ id: string; title: string; detail: string; time: string }> }) {
  const reduce = useReducedMotion()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()

  const notifications = activities.slice(0, 3).map((item, index) => ({
    id: item.id,
    title: item.title,
    desc: item.detail,
    time: item.time,
    unread: index < 2,
  }))

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <span className="font-display text-base font-bold tracking-tight text-foreground block leading-tight">
                SmartCampus
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">
                Student Intelligence
              </span>
            </div>
          </Link>

          <div className="hidden h-5 w-px bg-border md:block" />

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
            <span>Campus systems operational</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Semester pill */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Campus Portal</span>
          </div>

          {/* Back to Home Link */}
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Landing</span>
          </Link>

          {/* Notification dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setProfileOpen(false)
              }}
              aria-label="View notifications"
              aria-expanded={notificationsOpen}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus:outline-none"
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {notifications.length}
                </span>
              )}
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
                    <span className="text-[11px] text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {notifications.length === 0 ? (
                      <p className="px-2.5 py-4 text-center text-xs text-muted-foreground">No notifications yet.</p>
                    ) : notifications.map((n) => (
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
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 sm:px-2.5 sm:py-1.5 transition-colors hover:bg-muted focus:outline-none"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary font-display text-xs font-bold">
                {user.fullName.split(" ").map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden text-left sm:block">
                <span className="block text-xs font-semibold text-foreground leading-tight">{user.fullName}</span>
                <span className="block text-[10px] text-muted-foreground">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
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
                    <p className="font-display text-sm font-semibold text-foreground">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                      <CheckCircle2 className="h-3 w-3" /> Enrolled & Verified
                    </div>
                  </div>

                  <div className="mt-1 space-y-0.5 text-xs">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      Student Profile
                    </Link>
                    {(user.role === 'admin' || user.role === 'faculty') && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        Faculty / Admin Console
                      </Link>
                    )}
                    <Link
                      href="#overview"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      Dashboard Overview
                    </Link>
                    <Link
                      href="#analytics"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      Academic Analytics
                    </Link>
                    <Link
                      href="#ai-insights"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-lg px-2.5 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      AI Recommendations
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <button
                      type="button"
                      onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); router.refresh() }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-destructive hover:bg-destructive/10 transition-colors font-medium"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
