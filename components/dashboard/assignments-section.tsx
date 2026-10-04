'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, ClipboardList, Loader2 } from 'lucide-react'

type Assignment = { id: string; title: string; status: 'completed' | 'pending'; dueDate: string }

export function AssignmentsSection({ initialAssignments }: { initialAssignments: Assignment[] }) {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [savingId, setSavingId] = useState<string | null>(null)

  async function toggle(assignment: Assignment) {
    setSavingId(assignment.id)
    const next = assignment.status === 'completed' ? 'pending' : 'completed'
    try {
      const response = await fetch(`/api/assignments/${assignment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to update assignment.')
      setAssignments((items) => items.map((item) => item.id === assignment.id ? data.assignment : item))
    } finally {
      setSavingId(null)
    }
  }

  return (
    <section className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">My Assignments</h2>
          <p className="mt-1 text-xs text-muted-foreground">Assignments created by your faculty are stored in the campus database.</p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{assignments.length} total</span>
      </div>

      {assignments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <ClipboardList className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold">No assignments yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Your faculty can create assignments from the Faculty & Admin Console.</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggle(assignment)}
                  disabled={savingId === assignment.id}
                  className="shrink-0 rounded-full disabled:opacity-60"
                  aria-label={assignment.status === 'completed' ? 'Mark assignment pending' : 'Mark assignment completed'}
                >
                  {savingId === assignment.id ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : assignment.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                </button>
                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold ${assignment.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}>{assignment.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Due {assignment.dueDate}</p>
                </div>
              </div>
              <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold ${assignment.status === 'completed' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                {assignment.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
