"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function CreativeHero() {
  const [glowIntensity, setGlowIntensity] = useState(0)

  const handleClick = () => {
    setGlowIntensity(prev => Math.min(prev + 1, 10)) // Cap at 10 for performance
  }

  // Gradually reduce glow intensity over time
  useEffect(() => {
    if (glowIntensity > 0) {
      const timer = setTimeout(() => {
        setGlowIntensity(prev => Math.max(prev - 1, 0))
      }, 500) // Reduce every 500ms
      
      return () => clearTimeout(timer)
    }
  }, [glowIntensity])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-phthalo-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-phthalo-600/30 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-phthalo-400/25 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-phthalo-700/20 rounded-full animate-pulse delay-3000"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-20 w-4 h-4 bg-phthalo-500 rotate-45 animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-6 h-6 bg-phthalo-600 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-16 w-3 h-3 bg-phthalo-400 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-5 h-5 bg-phthalo-700 rotate-45 animate-spin"
            style={{ animationDuration: "6s", animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Main profile picture container */}
        <div 
          className="relative z-10 group cursor-pointer select-none"
          onClick={handleClick}
        >
          {/* Outer glow ring - intensity based on clicks */}
          <div 
            className="absolute -inset-8 rounded-full bg-gradient-to-r from-phthalo-500/30 to-phthalo-700/30 blur-xl animate-pulse transition-all duration-300 group-hover:from-phthalo-400/60 group-hover:to-phthalo-600/60 group-hover:-inset-12 group-hover:blur-2xl"
            style={{
              filter: `blur(${Math.max(12, 12 + glowIntensity * 4)}px)`,
              opacity: Math.min(0.3 + glowIntensity * 0.1, 1),
              transform: `scale(${1 + glowIntensity * 0.1})`,
            }}
          ></div>

          {/* Additional intense glow layers for spam clicking */}
          {glowIntensity > 3 && (
            <div 
              className="absolute -inset-16 rounded-full bg-gradient-to-r from-phthalo-300/40 to-phthalo-500/40 blur-3xl"
              style={{
                opacity: (glowIntensity - 3) * 0.15,
                transform: `scale(${1 + glowIntensity * 0.05})`,
              }}
            ></div>
          )}

          {glowIntensity > 6 && (
            <div 
              className="absolute -inset-24 rounded-full bg-gradient-to-r from-phthalo-200/30 to-phthalo-400/30 blur-[4rem]"
              style={{
                opacity: (glowIntensity - 6) * 0.1,
                transform: `scale(${1 + glowIntensity * 0.03})`,
              }}
            ></div>
          )}

          {/* Rotating border ring */}
          <div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-phthalo-500 via-phthalo-600 to-phthalo-700 animate-spin transition-all duration-300"
            style={{ 
              animationDuration: "10s",
              boxShadow: glowIntensity > 0 ? `0 0 ${20 + glowIntensity * 10}px rgba(51, 155, 94, ${0.5 + glowIntensity * 0.1})` : 'none'
            }}
          >
            <div className="w-full h-full rounded-full bg-zinc-900 m-1"></div>
          </div>

          {/* Profile picture */}
          <div 
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-phthalo-500/50 shadow-2xl transition-all duration-300"
            style={{
              borderColor: `rgba(51, 155, 94, ${0.5 + glowIntensity * 0.1})`,
              boxShadow: `0 0 ${30 + glowIntensity * 15}px rgba(51, 155, 94, ${0.3 + glowIntensity * 0.1})`
            }}
          >
            <img
              src="/pfpicon.png"
              alt="Shine Kyaw Kyaw Aung"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-phthalo-900/20 via-transparent to-transparent"></div>
          </div>

          {/* Status indicator - moved outside the image */}
          <div className="absolute bottom-0 right-0 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
            <div 
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{
                boxShadow: glowIntensity > 0 ? `0 0 ${5 + glowIntensity * 2}px #10b981` : 'none'
              }}
            ></div>
            <span className="text-xs font-medium text-white">Available</span>
          </div>

          {/* Floating code symbols */}
          <div
            className="absolute -top-8 -left-8 text-phthalo-400 text-2xl font-mono animate-bounce transition-all duration-300"
            style={{ 
              animationDelay: "0.5s",
              textShadow: glowIntensity > 0 ? `0 0 ${5 + glowIntensity * 3}px currentColor` : 'none'
            }}
          >
            {"<>"}
          </div>
          <div
            className="absolute -top-4 -right-12 text-phthalo-500 text-xl font-mono animate-pulse transition-all duration-300"
            style={{ 
              animationDelay: "1s",
              textShadow: glowIntensity > 0 ? `0 0 ${5 + glowIntensity * 3}px currentColor` : 'none'
            }}
          >
            {"{ }"}
          </div>
          <div
            className="absolute -bottom-6 -left-10 text-phthalo-600 text-lg font-mono animate-bounce transition-all duration-300"
            style={{ 
              animationDelay: "1.5s",
              textShadow: glowIntensity > 0 ? `0 0 ${5 + glowIntensity * 3}px currentColor` : 'none'
            }}
          >
            {"</>"}
          </div>
          <div
            className="absolute -bottom-8 -right-8 text-phthalo-400 text-xl font-mono animate-pulse transition-all duration-300"
            style={{ 
              animationDelay: "2s",
              textShadow: glowIntensity > 0 ? `0 0 ${5 + glowIntensity * 3}px currentColor` : 'none'
            }}
          >
            {"( )"}
          </div>
        </div>
      </div>
    </motion.div>
  )
}