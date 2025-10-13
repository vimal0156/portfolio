"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-block">
          <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
            <span className="relative z-10">{subtitle}</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 animate-pulse"></span>
          </div>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-24 h-1.5 bg-gradient-to-r from-phthalo-600 to-phthalo-800 rounded-full mx-auto mt-6"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      />
    </div>
  )
}
