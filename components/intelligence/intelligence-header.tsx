'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Cpu, RefreshCw, Layers, ShieldCheck, Clock, MapPin } from 'lucide-react'

interface IntelligenceHeaderProps {
  selectedZone: string
  onZoneChange: (zone: string) => void
  onRefresh: () => void
  isRefreshing: boolean
}

export function IntelligenceHeader({
  selectedZone,
  onZoneChange,
  onRefresh,
  isRefreshing,
}: IntelligenceHeaderProps) {
  const reduce = useReducedMotion()
  const zones = ['All Campus', 'North Quad (Tech & Labs)', 'Central Commons & Library', 'South Residential', 'East Innovation Park']

  return (
    <div className="pt-8 pb-6 border-b border-border/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            <Cpu className="h-3.5 w-3.5" /> Real-time IoT & Spatial Telemetry
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Campus Intelligence
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Live neural sensor telemetry, automated crowd density, predictive utility modeling, and facility optimization.
          </p>
        </div>

        {/* Controls & Zone Filter */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Zone Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={selectedZone}
              onChange={(e) => onZoneChange(e.target.value)}
              className="bg-transparent font-medium text-foreground focus:outline-none cursor-pointer text-xs"
              aria-label="Select Campus Zone"
            >
              {zones.map((z) => (
                <option key={z} value={z} className="bg-card text-foreground">
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Sensor Button */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Real-time sync sub-bar */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>482 IoT Sensors Reporting</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span>Last telemetry packet: 14 seconds ago</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          <span>Campus Edge Node: 99.98% uptime</span>
        </div>
      </div>
    </div>
  )
}
