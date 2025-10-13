"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  repoUrl?: string
  studioUrl?: string
  studioName?: string
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl, studioUrl, studioName }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-phthalo-500/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative h-full flex flex-col">
          <div className="relative overflow-hidden h-56">
            <div className="absolute inset-0 bg-gradient-to-b from-phthalo-500/20 to-phthalo-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
            />
          </div>

          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-400 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300">
                  {tag}
                </Badge>
              ))}
            </div>

            {(repoUrl || studioUrl || demoUrl) && (
              <div className="flex justify-between mt-auto pt-4 border-t border-zinc-700/50">
                {repoUrl ? (
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700/50" asChild>
                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                ) : studioUrl ? (
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700/50" asChild>
                    <Link href={studioUrl} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      {studioName || "Studio"}
                    </Link>
                  </Button>
                ) : demoUrl ? (
                  <div></div>
                ) : null}
                {demoUrl && (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 border-0"
                    asChild
                  >
                    <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="absolute top-3 right-3 z-20">
            <div
              className={`w-3 h-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}