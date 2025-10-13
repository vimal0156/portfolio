"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, GraduationCap } from "lucide-react"

export function LearnNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Store dismissed state in localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem('learn-navbar-dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('learn-navbar-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        hasScrolled ? "bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800" : "bg-zinc-900/80 backdrop-blur-sm"
      }`}
      style={{ zIndex: 60, height: '56px' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Icon */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            
            {/* Text content */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">
                Want to learn quant finance & math?
              </p>
              <p className="text-xs text-zinc-400">
                Join the waitlist for courses and mentorship
              </p>
            </div>
            <div className="sm:hidden">
              <p className="text-sm font-medium text-white">
                Learn quant finance
              </p>
            </div>
          </div>

          {/* CTA Link */}
          <Link
            href="/learn"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 text-white text-sm font-medium transition-all flex-shrink-0"
          >
            <span className="hidden sm:inline">Take the Quiz</span>
            <span className="sm:hidden">Quiz</span>
          </Link>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-zinc-800 rounded-md transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-zinc-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}