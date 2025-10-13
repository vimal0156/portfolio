"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const devicePixelRatio = window.devicePixelRatio || 1

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Store canvas dimensions
    const getCanvasWidth = () => canvas.width / devicePixelRatio
    const getCanvasHeight = () => canvas.height / devicePixelRatio

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * getCanvasWidth()
        this.y = Math.random() * getCanvasHeight()
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = `hsl(${Math.random() * 30 + 140}, 70%, 60%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > getCanvasWidth() || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > getCanvasHeight() || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(18, 53, 36, 0.3)"
      ctx.lineWidth = 1

      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}