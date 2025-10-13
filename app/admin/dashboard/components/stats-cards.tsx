"use client"

import { motion } from "framer-motion"
import { Users, Target, DollarSign, Zap } from "lucide-react"

interface StatsCardsProps {
  totalResponses: number
  hotLeads: number
  willingToPay: number
  readyNow: number
}

export function StatsCards({ totalResponses, hotLeads, willingToPay, readyNow }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Responses",
      value: totalResponses,
      icon: Users,
      color: "from-phthalo-500 to-phthalo-700",
      subtitle: "All quiz submissions",
    },
    {
      label: "Hot Leads",
      value: hotLeads,
      icon: Target,
      color: "from-orange-500 to-red-600",
      subtitle: "Hustlers + Career Switchers willing to pay",
    },
    {
      label: "Willing to Pay",
      value: willingToPay,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      subtitle: "<$30/mo or mentoring",
    },
    {
      label: "Ready Now",
      value: readyNow,
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      subtitle: "Want to start immediately",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group"
        >
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-25 group-hover:opacity-40 transition`}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-zinc-500">{stat.subtitle}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}