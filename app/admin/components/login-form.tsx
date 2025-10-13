"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        toast.error(data.error || "Login failed")
        return
      }

      toast.success("Welcome back!")
      router.push("/admin/dashboard")
      router.refresh()
    } catch (err) {
      setError("Something went wrong")
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
              Admin Login
            </h1>
            <p className="text-zinc-400">Access your dashboard</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-phthalo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-phthalo-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 h-12 text-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}