"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let trailId = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [{ ...newPosition, id: trailId++ }, ...prev.slice(0, 8)]
        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([])
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(0, 155, 119, ${0.8 - index * 0.1})`,
            boxShadow: `0 0 ${8 - index}px rgba(0, 155, 119, 0.5)`
          }}
          initial={{ x: point.x, y: point.y, scale: 1 }}
          animate={{ 
            x: point.x - 2, 
            y: point.y - 2, 
            scale: 1 - index * 0.1,
            opacity: 0.8 - index * 0.1
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 400,
            duration: 0.1
          }}
        />
      ))}

      {/* Main cursor - outer ring */}
      <motion.div
        className="absolute w-7 h-7 rounded-full border border-emerald-400"
        style={{
          background: 'radial-gradient(circle, rgba(0,155,119,0.1) 0%, transparent 70%)',
          boxShadow: '0 0 15px rgba(0,155,119,0.3), inset 0 0 15px rgba(0,155,119,0.1)'
        }}
        animate={{
          x: mousePosition.x - 14,
          y: mousePosition.y - 14,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5
        }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 700,
          mass: 0.2
        }}
      />

      {/* Inner morphing shape */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"
        style={{
          boxShadow: '0 0 10px rgba(0,155,119,0.6)'
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          opacity: isVisible ? 1 : 0,
          rotate: isVisible ? 360 : 0
        }}
        transition={{ 
          x: { type: "spring", damping: 15, stiffness: 900, mass: 0.1 },
          y: { type: "spring", damping: 15, stiffness: 900, mass: 0.1 },
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.2 }
        }}
      />

      {/* Core dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-black"
        style={{
          boxShadow: '0 0 6px rgba(0,0,0,0.8)'
        }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          type: "spring", 
          damping: 10, 
          stiffness: 1000,
          mass: 0.05
        }}
      />

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 rounded-full bg-emerald-300"
          style={{
            boxShadow: '0 0 4px rgba(0,155,119,0.8)'
          }}
          animate={{
            x: mousePosition.x + Math.sin(Date.now() * 0.001 + i) * 20 - 1,
            y: mousePosition.y + Math.cos(Date.now() * 0.001 + i) * 20 - 1,
            opacity: isVisible ? 0.7 : 0,
            scale: isVisible ? [0.5, 1, 0.5] : 0
          }}
          transition={{ 
            x: { type: "spring", damping: 15, stiffness: 600 },
            y: { type: "spring", damping: 15, stiffness: 600 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
        />
      ))}
    </div>
  )
}