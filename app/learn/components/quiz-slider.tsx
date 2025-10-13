"use client"

import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"

interface QuizSliderProps {
  value: number
  onChange: (value: number) => void
  labels: string[]
  emoji: string
}

export function QuizSlider({ value, onChange, labels, emoji }: QuizSliderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Current selection display */}
      <div className="text-center space-y-3">
        <div className="text-5xl">{emoji}</div>
        <div className="text-xl sm:text-2xl font-medium text-phthalo-400">
          {labels[value - 1]}
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4 px-2">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={1}
          max={4}
          step={1}
          className="w-full [&_.slider-track]:bg-zinc-800 [&_.slider-range]:bg-gradient-to-r [&_.slider-range]:from-phthalo-500 [&_.slider-range]:to-phthalo-600"
        />
        
        {/* Level indicators */}
        <div className="flex justify-between text-xs sm:text-sm text-zinc-500">
          {labels.map((label, idx) => (
            <span
              key={idx}
              className={`text-center transition-colors ${
                value === idx + 1 ? "text-phthalo-400 font-medium" : ""
              }`}
            >
              {idx + 1}
            </span>
          ))}
        </div>
      </div>

      {/* All labels for reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600">
        {labels.map((label, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg transition-colors ${
              value === idx + 1 ? "bg-phthalo-500/10 text-phthalo-400" : "bg-zinc-900/30"
            }`}
          >
            <span className="font-medium">{idx + 1}.</span> {label}
          </div>
        ))}
      </div>
    </motion.div>
  )
}