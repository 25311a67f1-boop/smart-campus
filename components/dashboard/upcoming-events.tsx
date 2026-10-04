'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Calendar, Clock, MapPin, Sparkles, Check, ArrowRight, Trophy, Users, Laptop } from 'lucide-react'

interface EventItem {
  id: string
  title: string
  date: string
  monthDay: string
  time: string
  location: string
  category: string
  icon: 'workshop' | 'hackathon' | 'meetup'
  registered: boolean
  badge: string
}


export function UpcomingEvents({ events: initialEvents }: { events: Array<EventItem> }) {
  const reduce = useReducedMotion()
  const [events, setEvents] = useState<EventItem[]>(initialEvents)

  async function toggleRegister(id: string) {
    const event = events.find((ev) => ev.id === id)
    if (!event) return
    const response = await fetch(`/api/events/${id}/register`, { method: event.registered ? 'DELETE' : 'POST' })
    if (!response.ok) return
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, registered: !ev.registered } : ev)))
  }

  return (
    <section id="events" className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
              <Calendar className="h-3.5 w-3.5" /> Campus Schedule
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Upcoming Events
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Curated technical workshops, competitions, and academic meetups.
            </p>
          </div>

          <span className="text-xs font-medium text-muted-foreground">
            {events.length} event{events.length === 1 ? '' : 's'} available
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {events.length === 0 ? (
            <div className="lg:col-span-3 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No campus events have been published yet. Faculty/admin event entries will appear here.
            </div>
          ) : events.map((event) => {
            const Icon = event.icon === 'hackathon' ? Trophy : event.icon === 'meetup' ? Users : Laptop
            return (
              <motion.div
                key={event.id}
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
                  event.registered
                    ? 'border-success/30 bg-success/[0.03]'
                    : 'border-border bg-card hover:border-foreground/20 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Category Badge & Date Badge */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                      {event.category}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        event.registered
                          ? 'bg-success/15 text-success'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {event.registered ? 'RSVP Confirmed' : event.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-4 flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary mt-0.5">{event.date}</p>
                    </div>
                  </div>

                  {/* Metadata: Time & Location */}
                  <div className="mt-4 space-y-1.5 text-xs text-muted-foreground border-t border-border/60 pt-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-5 pt-3 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => toggleRegister(event.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                      event.registered
                        ? 'bg-success/15 text-success hover:bg-success/25'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                  >
                    {event.registered ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Registered (Cancel)
                      </>
                    ) : (
                      <>
                        Register Free <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
