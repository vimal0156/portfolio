"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface QuizOptionProps {
  label: string
  emoji?: string
  selected: boolean
  onClick: () => void
  index: number
}

export function QuizOption({ label, emoji, selected, onClick, index }: QuizOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`
        relative w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-300
        border-2 group
        ${
          selected
            ? "border-phthalo-500 bg-phthalo-500/10"
            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/70"
        }
      `}
    >
      {/* Selection indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {emoji && <span className="text-2xl">{emoji}</span>}
          <span className={`text-base sm:text-lg ${selected ? "text-white font-medium" : "text-zinc-300"}`}>
            {label}
          </span>
        </div>
        
        {/* Checkmark */}
        <div
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${
              selected
                ? "border-phthalo-500 bg-phthalo-500"
                : "border-zinc-700 group-hover:border-zinc-600"
            }
          `}
        >
          {selected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>

      {/* Glow effect on hover */}
      {!selected && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-phthalo-500/0 via-phthalo-500/5 to-phthalo-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      )}
    </motion.button>
  )
}