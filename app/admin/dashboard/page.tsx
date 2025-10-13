"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "./components/stats-cards"
import { AnalyticsCharts } from "./components/analytics-charts"
import { ResponseTable } from "./components/response-table"
import { toast } from "sonner"

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

export default function AdminDashboard() {
  const router = useRouter()
  const [responses, setResponses] = useState<Response[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchResponses = async () => {
    try {
      console.log('Fetching responses...')
      const res = await fetch("/api/admin/responses")
      
      console.log('Response status:', res.status)
      
      if (!res.ok) {
        if (res.status === 401) {
          console.log('Unauthorized - redirecting to login')
          router.push("/admin")
          return
        }
        throw new Error("Failed to fetch")
      }

      const data = await res.json()
      console.log('Received data:', data)
      console.log('Number of responses:', data.data?.length || 0)
      setResponses(data.data || [])
    } catch (error) {
      console.error("Error fetching responses:", error)
      toast.error("Failed to load responses")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchResponses()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin")
      router.refresh()
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchResponses()
    toast.success("Data refreshed")
  }

  // Calculate stats
  const totalResponses = responses.length
  
  const hotLeads = responses.filter(r => 
    (r.assigned_persona === "hustler" || r.assigned_persona === "career_switcher") &&
    (r.payment_willingness === "under_30" || r.payment_willingness === "mentoring")
  ).length

  const willingToPay = responses.filter(r => 
    r.payment_willingness === "under_30" || r.payment_willingness === "mentoring"
  ).length

  const readyNow = responses.filter(r => r.start_timeline === "now").length

  // Persona data for pie chart
  const personaCounts = responses.reduce((acc, r) => {
    acc[r.assigned_persona] = (acc[r.assigned_persona] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const personaData = Object.entries(personaCounts).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
    color: {
      hustler: "#f97316",
      career_switcher: "#eab308",
      trading_builder: "#22c55e",
      ai_quant: "#3b82f6",
      math_specialist: "#a855f7",
      code_builder: "#ec4899",
      foundation_builder: "#14b8a6",
      explorer: "#64748b"
    }[name] || "#6b7280"
  }))

  // Payment data for pie chart
  const paymentCounts = responses.reduce((acc, r) => {
    acc[r.payment_willingness] = (acc[r.payment_willingness] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const paymentData = Object.entries(paymentCounts).map(([name, value]) => ({
    name,
    value,
    color: {
      under_30: "#22c55e",
      mentoring: "#3b82f6",
      maybe: "#eab308",
      not_now: "#ef4444"
    }[name] || "#6b7280"
  }))

  // Goal data for bar chart
  const goalCounts = responses.reduce((acc, r) => {
    acc[r.main_goal] = (acc[r.main_goal] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const goalLabels: Record<string, string> = {
    quant_career: "Quant Career",
    interview_prep: "Interview Prep",
    math_improvement: "Math Skills",
    algo_trading: "Algo Trading",
    ai_ml_interest: "AI/ML",
    exploring: "Exploring"
  }

  const goalData = Object.entries(goalCounts).map(([name, value]) => ({
    name: goalLabels[name] || name,
    value
  }))

  // Time data for bar chart
  const timeCounts = responses.reduce((acc, r) => {
    acc[r.time_investment] = (acc[r.time_investment] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const timeData = Object.entries(timeCounts).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value
  }))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                Admin
              </span>{" "}
              Dashboard
            </h1>
            <p className="text-zinc-400">Quiz responses and analytics</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-red-500 hover:text-red-500 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards
          totalResponses={totalResponses}
          hotLeads={hotLeads}
          willingToPay={willingToPay}
          readyNow={readyNow}
        />

        {/* Analytics Charts */}
        <AnalyticsCharts
          personaData={personaData}
          paymentData={paymentData}
          goalData={goalData}
          timeData={timeData}
        />

        {/* Response Table */}
        <ResponseTable responses={responses} />
      </div>
    </div>
  )
}