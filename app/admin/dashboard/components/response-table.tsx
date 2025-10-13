"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Download, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Response {
  id: string
  created_at: string
  name: string
  email: string
  assigned_persona: string
  background_level: string
  main_goal: string
  topics_interest: string[]
  math_confidence: number
  coding_confidence: number
  time_investment: string
  learning_preference: string
  payment_willingness: string
  start_timeline: string
  additional_info: string
}

interface ResponseTableProps {
  responses: Response[]
}

export function ResponseTable({ responses }: ResponseTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [personaFilter, setPersonaFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [goalFilter, setGoalFilter] = useState("all")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Get unique values for filters
  const personas = useMemo(() => 
    Array.from(new Set(responses.map(r => r.assigned_persona))).filter(Boolean),
    [responses]
  )

  const paymentOptions = useMemo(() => 
    Array.from(new Set(responses.map(r => r.payment_willingness))).filter(Boolean),
    [responses]
  )

  const goals = useMemo(() => 
    Array.from(new Set(responses.map(r => r.main_goal))).filter(Boolean),
    [responses]
  )

  // Filter responses
  const filteredResponses = useMemo(() => {
    return responses.filter(response => {
      const matchesSearch = 
        response.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesPersona = personaFilter === "all" || response.assigned_persona === personaFilter
      const matchesPayment = paymentFilter === "all" || response.payment_willingness === paymentFilter
      const matchesGoal = goalFilter === "all" || response.main_goal === goalFilter

      return matchesSearch && matchesPersona && matchesPayment && matchesGoal
    })
  }, [responses, searchTerm, personaFilter, paymentFilter, goalFilter])

  // Export functions
  const exportToCSV = (data: Response[], filename: string) => {
    const headers = ["Name", "Email", "Persona", "Payment Willingness", "Main Goal", "Start Timeline"]
    const csvData = data.map(r => [
      r.name,
      r.email,
      r.assigned_persona,
      r.payment_willingness,
      r.main_goal,
      r.start_timeline
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportEmails = (data: Response[], filename: string) => {
    const emails = data.map(r => r.email).join("\n")
    const blob = new Blob([emails], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const personaLabels: Record<string, string> = {
    hustler: "🚀 Hustler",
    career_switcher: "📈 Career Switcher",
    trading_builder: "💹 Trading Builder",
    ai_quant: "🤖 AI Quant",
    math_specialist: "🧮 Math Specialist",
    code_builder: "💻 Code Builder",
    foundation_builder: "🌱 Foundation Builder",
    explorer: "🧭 Explorer"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">All Responses ({filteredResponses.length})</h3>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* Persona Filter */}
          <Select value={personaFilter} onValueChange={setPersonaFilter}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Filter by persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Personas</SelectItem>
              {personas.map(persona => (
                <SelectItem key={persona} value={persona}>
                  {personaLabels[persona] || persona}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Payment Filter */}
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Types</SelectItem>
              {paymentOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Goal Filter */}
          <Select value={goalFilter} onValueChange={setGoalFilter}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Filter by goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              {goals.map(goal => (
                <SelectItem key={goal} value={goal}>{goal}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => exportToCSV(responses, "all-responses.csv")}
            variant="outline"
            className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Export All CSV
          </Button>
          <Button
            onClick={() => exportToCSV(filteredResponses, "filtered-responses.csv")}
            variant="outline"
            className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 disabled:opacity-30"
            disabled={filteredResponses.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Filtered CSV
          </Button>
          <Button
            onClick={() => exportEmails(filteredResponses, "emails.txt")}
            className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 disabled:opacity-30"
            disabled={filteredResponses.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Emails ({filteredResponses.length})
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Name</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Email</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Persona</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Payment</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Timeline</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Date</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400"></th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((response) => (
                <React.Fragment key={response.id}>
                  <tr
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === response.id ? null : response.id)}
                  >
                    <td className="p-3">{response.name}</td>
                    <td className="p-3 text-sm text-zinc-400">{response.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full bg-phthalo-500/10 text-phthalo-400 text-xs">
                        {personaLabels[response.assigned_persona] || response.assigned_persona}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{response.payment_willingness}</td>
                    <td className="p-3 text-sm">{response.start_timeline}</td>
                    <td className="p-3 text-sm text-zinc-400">
                      {new Date(response.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {expandedRow === response.id ? (
                        <ChevronUp className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </td>
                  </tr>
                  {expandedRow === response.id && (
                    <tr>
                      <td colSpan={7} className="p-6 bg-zinc-800/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-zinc-500 mb-1">Background</p>
                            <p>{response.background_level}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 mb-1">Main Goal</p>
                            <p>{response.main_goal}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 mb-1">Topics of Interest</p>
                            <p>{response.topics_interest.join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 mb-1">Confidence Levels</p>
                            <p>Math: {response.math_confidence}/4 | Code: {response.coding_confidence}/4</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 mb-1">Time Investment</p>
                            <p>{response.time_investment}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 mb-1">Learning Preference</p>
                            <p>{response.learning_preference}</p>
                          </div>
                          {response.additional_info && (
                            <div className="md:col-span-2">
                              <p className="text-zinc-500 mb-1">Additional Info</p>
                              <p className="text-zinc-300">{response.additional_info}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {filteredResponses.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No responses match your filters
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}