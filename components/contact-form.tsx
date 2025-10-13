"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        // Clear the form using ref
        if (formRef.current) {
          formRef.current.reset()
        }
        
        // Show success toast
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
      } else {
        throw new Error(`Server error: ${responseData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      // Show error toast
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-phthalo-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-phthalo-500 focus:ring-phthalo-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-phthalo-500 focus:ring-phthalo-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="subject"
                placeholder="Subject"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-phthalo-500 focus:ring-phthalo-500/20"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-phthalo-500 focus:ring-phthalo-500/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}