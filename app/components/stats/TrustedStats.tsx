'use client'

import { ExternalLink } from 'lucide-react'

export interface StatItem {
  label: string
  value: string
  sourceLabel: string
  sourceUrl: string
  ariaDescription?: string
}

interface TrustedStatsProps {
  title: string
  description?: string
  stats: StatItem[]
}

export default function TrustedStats({ title, description, stats }: TrustedStatsProps) {
  if (stats.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-gray-700 mb-2">{stat.label}</div>
            <a
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
              aria-label={stat.ariaDescription || `Sumber: ${stat.sourceLabel}`}
            >
              {stat.sourceLabel}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
