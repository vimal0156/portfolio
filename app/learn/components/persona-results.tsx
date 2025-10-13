"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import type { Persona } from "../utils/calculate-persona"

interface PersonaResultProps {
  persona: Persona
  name: string
  email: string
}

export function PersonaResult({ persona, name, email }: PersonaResultProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white flex items-center justify-center p-4 py-20 sm:py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full space-y-8"
      >
        {/* Submission confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-lg font-medium">Response Submitted!</span>
          </div>
          <p className="text-zinc-400">
            We'll notify you at{" "}
            <span className="text-phthalo-400 font-medium">{email}</span> when courses or 1-on-1 mentoring becomes available.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-900 px-4 text-sm text-zinc-500">Your Profile</span>
          </div>
        </div>

        {/* Persona card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Glow effect background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/20 via-phthalo-600/20 to-phthalo-700/20 rounded-2xl blur-xl animate-pulse"></div>
          
          {/* Card content */}
          <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-zinc-700 rounded-2xl p-8 sm:p-12">
            {/* Emoji with glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-phthalo-500 to-phthalo-700 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-phthalo-500/20 to-phthalo-700/20 rounded-full flex items-center justify-center border border-phthalo-500/30">
                <span className="text-6xl">{persona.emoji}</span>
              </div>
            </motion.div>

            {/* Persona name */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              You're{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                {persona.name}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg text-zinc-300 text-center leading-relaxed"
            >
              {persona.description}
            </motion.p>

            {/* Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 p-4 rounded-lg bg-phthalo-900/20 border border-phthalo-700/30"
            >
              <p className="text-sm text-zinc-400 text-center">
                <span className="text-phthalo-400 font-medium">Hey {name}!</span> Fitting candidates will be personally contacted when spots open up for courses and mentorship.
              </p>
            </motion.div>

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900"
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}